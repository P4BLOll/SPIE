import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationSubscription } from 'expo-location';
import { useDevice } from '@/modules/device/hooks/useDevice';
import { emergencyRepository } from '../services/emergencyRepository';
import { locationTrackerService } from '../services/locationTrackerService';
import { directSmsService } from '../services/directSmsService';
import { EmergencyContact, AlertLocation } from '../types/emergency.types';

interface EmergencyContextData {
  alertaAtivo: boolean;
  activeAlertId: string | null;
  currentLocation: AlertLocation | null;
  contacts: EmergencyContact[];
  ligacaoEmergenciaAtiva: boolean;
  alternarLigacaoEmergencia: (ativa?: boolean) => Promise<void>;
  dispararAlerta: (tipo?: string, deviceSource?: string) => Promise<string | null>;
  desativarAlerta: () => Promise<void>;
  carregarContatos: () => Promise<void>;
}

const EMERGENCY_CALL_KEY = '@spie_emergency_call_enabled';

const EmergencyContext = createContext<EmergencyContextData>({} as EmergencyContextData);

export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertaAtivo, setAlertaAtivo] = useState<boolean>(false);
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<AlertLocation | null>(null);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [ligacaoEmergenciaAtiva, setLigacaoEmergenciaAtiva] = useState<boolean>(true);

  const { registerSosListener } = useDevice();
  const locationWatcherRef = useRef<LocationSubscription | null>(null);
  const contactsRef = useRef<EmergencyContact[]>([]);
  contactsRef.current = contacts;

  const ligacaoEmergenciaAtivaRef = useRef<boolean>(true);
  ligacaoEmergenciaAtivaRef.current = ligacaoEmergenciaAtiva;

  /**
   * Carrega a preferência de chamada telefônica salva.
   */
  useEffect(() => {
    async function carregarPreferenciaLigacao() {
      try {
        const salvo = await AsyncStorage.getItem(EMERGENCY_CALL_KEY);
        if (salvo !== null) {
          setLigacaoEmergenciaAtiva(salvo === 'true');
        }
      } catch (err) {
        console.warn('[EmergencyContext] Erro ao carregar preferência de ligação:', err);
      }
    }
    carregarPreferenciaLigacao();
  }, []);

  /**
   * Ativa ou desativa a chamada de emergência automática.
   */
  const alternarLigacaoEmergencia = useCallback(async (ativa?: boolean) => {
    const novoValor = ativa !== undefined ? ativa : !ligacaoEmergenciaAtivaRef.current;
    setLigacaoEmergenciaAtiva(novoValor);
    try {
      await AsyncStorage.setItem(EMERGENCY_CALL_KEY, String(novoValor));
    } catch (err) {
      console.warn('[EmergencyContext] Erro ao salvar preferência de ligação:', err);
    }
  }, []);

  /**
   * Carrega a lista de contatos cadastrados pelo usuário.
   */
  const carregarContatos = useCallback(async () => {
    try {
      const list = await emergencyRepository.getContacts();
      setContacts(list);
    } catch (err) {
      console.warn('[EmergencyContext] Erro ao carregar contatos:', err);
    }
  }, []);

  /**
   * Finaliza o monitoramento de GPS contínuo e cessa vibrações ativas.
   */
  const stopLiveTracking = useCallback(() => {
    Vibration.cancel();
    if (locationWatcherRef.current) {
      locationWatcherRef.current.remove();
      locationWatcherRef.current = null;
    }
  }, []);

  /**
   * Dispara o protocolo completo de socorro:
   * 1. Vibração simples e rápida no celular da usuária.
   * 2. Obtenção imediata de GPS e contatos.
   * 3. Disparo de rajada dupla de SMS (2 mensagens consecutivas) com link no Google Maps.
   * 4. Início de ligação telefônica direta (se habilitado pela usuária).
   * 5. Sincronização em segundo plano no Firestore e rastreamento contínuo.
   */
  const dispararAlerta = useCallback(
    async (tipo = 'panico_silencioso', deviceSource = 'PULSEIRA_SPIE'): Promise<string | null> => {
      setAlertaAtivo(true);
      Vibration.vibrate(300);

      // 1. Obtém a localização rápida de alta precisão
      const location = await locationTrackerService.getCurrentLocation();
      setCurrentLocation(location);

      // 2. Obtém contatos cadastrados
      let currentContacts = contactsRef.current;
      if (currentContacts.length === 0) {
        try {
          currentContacts = await emergencyRepository.getContacts();
          setContacts(currentContacts);
        } catch (err) {
          console.warn('[EmergencyContext] Erro ao buscar contatos:', err);
        }
      }

      const mapUrl = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      
      // Dupla mensagem para provocar notificações consecutivas no celular do contato
      const msg1 = `[SPIE SOS 1/2] SOCORRO URGENTE! Preciso de ajuda imediata. Minha localizacao em tempo real: ${mapUrl}`;
      const msg2 = `[SPIE SOS 2/2] ATENCAO! O botao de socorro foi acionado. Verifique o link anterior no mapa e tente contato agora!`;

      // Extrai todos os números válidos
      const telefones = currentContacts
        .map((c) => c.telefone || '')
        .filter((t) => t.trim().length > 0);

      console.log('[EmergencyContext] Disparando rajada de SMS para contatos:', telefones);

      // 3. Envia a rajada de 2 mensagens de SMS em sequência
      if (telefones.length > 0) {
        directSmsService.sendBurstMessages(telefones, [msg1, msg2], 1800).catch((smsErr) => {
          console.warn('[EmergencyContext] Erro no envio da rajada de SMS:', smsErr);
        });

        // 4. Inicia chamada telefônica direta (se ativada nas configurações)
        if (ligacaoEmergenciaAtivaRef.current) {
          const primaryContact = currentContacts.find(
            (c) => (c.telefone || '').trim().length > 0
          );

          if (primaryContact && primaryContact.telefone) {
            const phoneToCall = primaryContact.telefone;
            setTimeout(() => {
              directSmsService.makeEmergencyCall(phoneToCall).catch((callErr) => {
                console.warn('[EmergencyContext] Erro ao iniciar chamada:', callErr);
              });
            }, 4500);
          }
        } else {
          console.log('[EmergencyContext] Modo Silencioso: Chamada telefônica desativada pela configuração.');
        }
      } else {
        console.warn('[EmergencyContext] Nenhum contato cadastrado para envio de SMS ou ligação.');
      }

      // 5. Registra o alerta e a sessão de live tracking no Firestore (resiliente)
      let alertId: string | null = null;
      try {
        alertId = await emergencyRepository.createAlert({
          tipo,
          device: deviceSource,
          location,
        });
        setActiveAlertId(alertId);

        // 6. Inicia o rastreamento contínuo de posição em tempo real
        if (locationWatcherRef.current) {
          locationWatcherRef.current.remove();
          locationWatcherRef.current = null;
        }

        locationWatcherRef.current = await locationTrackerService.startTracking((newLoc) => {
          setCurrentLocation(newLoc);
          if (alertId) {
            emergencyRepository.updateLiveLocation(alertId, newLoc).catch(() => {});
          }
        });
      } catch (dbErr) {
        console.warn('[EmergencyContext] Aviso: Alerta salvo localmente, falha ao sincronizar Firestore:', dbErr);
      }

      return alertId;
    },
    [stopLiveTracking]
  );

  const dispararAlertaRef = useRef(dispararAlerta);
  dispararAlertaRef.current = dispararAlerta;

  /**
   * Cancela ou resolve o alerta ativo e interrompe a vibração.
   */
  const desativarAlerta = useCallback(async () => {
    stopLiveTracking();
    if (activeAlertId) {
      try {
        await emergencyRepository.resolveAlert(activeAlertId);
      } catch (err) {
        console.warn('[EmergencyContext] Erro ao resolver alerta:', err);
      }
    }
    setAlertaAtivo(false);
    setActiveAlertId(null);
  }, [activeAlertId, stopLiveTracking]);

  /**
   * Solicita permissões preventivamente e registra o listener para o botão físico da pulseira.
   */
  useEffect(() => {
    directSmsService.requestPermission();
    carregarContatos();

    const unsubscribe = registerSosListener(() => {
      dispararAlertaRef.current('panico_silencioso', 'PULSEIRA_SPIE');
    });

    return () => {
      unsubscribe();
      stopLiveTracking();
    };
  }, [registerSosListener, carregarContatos, stopLiveTracking]);

  return (
    <EmergencyContext.Provider
      value={{
        alertaAtivo,
        activeAlertId,
        currentLocation,
        contacts,
        ligacaoEmergenciaAtiva,
        alternarLigacaoEmergencia,
        dispararAlerta,
        desativarAlerta,
        carregarContatos,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => useContext(EmergencyContext);
