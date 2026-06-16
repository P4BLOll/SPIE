import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Platform, PermissionsAndroid, Vibration } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { Buffer as ExpoBuffer } from 'buffer';
import * as Location from 'expo-location'; // 👈 Novo import para o GPS

// Importações do Firebase para buscar a rede de apoio
import { db, auth } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface BLEContextData {
  status: string;
  alertaAtivo: boolean;
  deviceConectado: Device | null;
  conectarDispositivo: () => Promise<void>;
  desativarAlertaManual: () => void;
}

const BLEContext = createContext<BLEContextData | undefined>(undefined);
const manager = new BleManager();

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

const PADRAO_ALARME_VIBRACAO = [500, 1000, 500, 1000, 500, 1000];

export function BLEProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState('Desconectado');
  const [alertaAtivo, setAlertaAtivo] = useState(false);
  const [deviceConectado, setDeviceConectado] = useState<Device | null>(null);

  const requisitarPermissoes = async () => {
    if (Platform.OS === 'android') {
      const concedida = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
      return concedida['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

const enviarMensagemWhatsApp = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    // 📡 🔑 Buscando credenciais seguras das variáveis de ambiente
    const ACCOUNT_SID = process.env.EXPO_PUBLIC_TWILIO_ACCOUNT_SID;
    const AUTH_TOKEN = process.env.EXPO_PUBLIC_TWILIO_AUTH_TOKEN;
    const NUMERO_SANDBOX_TWILIO = 'whatsapp:+14155238886';

    if (!ACCOUNT_SID || !AUTH_TOKEN) {
      console.error("[SPIE TWILIO] Erro: Credenciais da Twilio não foram carregadas do .env");
      return;
    }

    try {
      // 🛰️ 1. Captura a localização do GPS do Celular
      console.log("[SPIE GPS] Solicitando permissão de localização...");
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      
      let linkGoogleMaps = "Localização não disponível (Permissão negada)";

      if (locationStatus === 'granted') {
        console.log("[SPIE GPS] Capturando coordenadas atuais...");
        // Captura a posição com alta precisão
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });
        
        const { latitude, longitude } = location.coords;
        // Gera o link oficial que abre direto no app do Google Maps do contato
        linkGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      }

      // 2. Busca o contato salvo no Firestore
      const contactsRef = collection(db, 'users', currentUser.uid, 'emergency_contacts');
      const snapshot = await getDocs(contactsRef);
      
      if (snapshot.empty) {
        console.log("[SPIE TWILIO] Nenhum contato cadastrado no Firestore.");
        return;
      }

      const primeiroContato = snapshot.docs[0].data();
      let telefoneLimpo = primeiroContato.phone.replace(/[^0-9]/g, '');

      if (telefoneLimpo.length <= 11) {
        telefoneLimpo = `55${telefoneLimpo}`;
      }

      const nomeUsuaria = currentUser.displayName || currentUser.email?.split('@')[0];
      
      // 🚨 3. Mensagem estruturada incluindo o Link do Mapa
      const mensagemAlerta = `🛡️ *SISTEMA SPIE — CENTRAL DE SEGURANÇA* 🛡️\n\n` +
        `⚠️ *ALERTA DE RISCO IMINENTE* ⚠️\n\n` +
        `A usuária *${nomeUsuaria}* acionou o dispositivo vestível de emergência.\n\n` +
        `📍 *Localização Atual:* ${linkGoogleMaps}\n\n` +
        `_Por favor, tente contato imediato ou verifique a integridade física da usuária._`;

      console.log(`[SPIE TWILIO] Enviando requisição HTTP para a Twilio com GPS...`);

      const urlAPI = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`;

      const formData = new URLSearchParams();
      formData.append('To', `whatsapp:+${telefoneLimpo}`);
      formData.append('From', NUMERO_SANDBOX_TWILIO);
      formData.append('Body', mensagemAlerta);

      const credenciaisCodificadas = btoa(`${ACCOUNT_SID}:${AUTH_TOKEN}`);

      const resposta = await fetch(urlAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credenciaisCodificadas}`,
        },
        body: formData.toString(),
      });

      if (resposta.ok) {
        console.log('[SPIE TWILIO] Mensagem com localização enviada com sucesso!');
      } else {
        const txtErro = await resposta.text();
        console.log('[SPIE TWILIO] Falha na API da Twilio:', txtErro);
      }

    } catch (error) {
      console.error("[SPIE TWILIO] Erro geral no fluxo de disparo: ", error);
    }
  };

  const conectarDispositivo = async () => {
    const temPermissao = await requisitarPermissoes();
    if (!temPermissao) {
      setStatus('Permissão negada');
      return;
    }

    setStatus('Buscando pulseira...');
    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log('Erro no escaneamento:', error);
        setStatus('Erro no rastreamento');
        return;
      }

      if (device?.name === 'ESP32S3_Simulador' || device?.name === 'SPIE_Hardware') {
        manager.stopDeviceScan();
        setStatus('Conectando...');
        
        try {
          const conectado = await device.connect();
          const descoberto = await conectado.discoverAllServicesAndCharacteristics();
          setDeviceConectado(descoberto);
          setStatus('Pulseira Conectada');
          
          manager.onDeviceDisconnected(descoberto.id, () => {
            setStatus('Desconectado');
            setDeviceConectado(null);
            Vibration.cancel();
          });

          ouvirSinal(descoberto.id);
        } catch (err) {
          setStatus('Falha na conexão');
          console.log('Erro ao conectar no dispositivo:', err);
        }
      }
    });
  };

  const ouvirSinal = (deviceId: string) => {
    manager.monitorCharacteristicForDevice(
      deviceId,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.log('Erro no monitoramento de sinal:', error);
          setStatus('Conexão perdida');
          setDeviceConectado(null);
          Vibration.cancel();
          return;
        }

        if (characteristic?.value) {
          const dadoDecodificado = ExpoBuffer.from(characteristic.value, 'base64').toString('ascii');
          
          if (dadoDecodificado === '1') {
            setAlertaAtivo(true);
            Vibration.vibrate(PADRAO_ALARME_VIBRACAO, true);
            enviarMensagemWhatsApp();
          }
        }
      }
    );
  };

  const desativarAlertaManual = () => {
    setAlertaAtivo(false);
    Vibration.cancel();
  };

  useEffect(() => {
    return () => {
      if (deviceConectado) {
        deviceConectado.cancelConnection();
      }
      Vibration.cancel();
    };
  }, [deviceConectado]);

  return (
    <BLEContext.Provider value={{ status, alertaAtivo, deviceConectado, conectarDispositivo, desativarAlertaManual }}>
      {children}
    </BLEContext.Provider>
  );
}

export function useBLE() {
  const context = useContext(BLEContext);
  if (!context) {
    throw new Error('useBLE deve ser usado dentro de um BLEProvider');
  }
  return context;
}