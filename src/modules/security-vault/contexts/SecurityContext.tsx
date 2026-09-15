import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';
import { pinAuthService } from '../services/pinAuthService';

interface SecurityContextData {
  senhaSalva: string | null;
  acessoLiberado: boolean;
  carregando: boolean;
  isDefaultPin: boolean;
  rotaDestino: string | null;
  rotaAnterior: string | null;
  definirRotaDestino: (rota: string) => void;
  limparRotaDestino: () => void;
  definirRotaAnterior: (rota: string) => void;
  limparRotaAnterior: () => void;
  carregarSenha: (userId?: string | null) => Promise<void>;
  criarSenha: (senha: string) => Promise<boolean>;
  verificarSenha: (senha: string) => Promise<boolean>;
  alterarSenha: (senhaAtual: string, novaSenha: string) => Promise<boolean>;
  redefinirPinComSenhaDaConta: (
    senhaConta: string,
    novoPin: string
  ) => Promise<{ sucesso: boolean; mensagem?: string }>;
  bloquear: () => void;
}

const SecurityContext = createContext<SecurityContextData | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [senhaSalva, setSenhaSalva] = useState<string | null>(null);
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [isDefaultPin, setIsDefaultPin] = useState(true);
  const [rotaDestino, setRotaDestino] = useState<string | null>(null);
  const [rotaAnterior, setRotaAnterior] = useState<string | null>(null);

  const carregarSenha = useCallback(async (userId?: string | null) => {
    const uid = userId !== undefined ? userId : auth.currentUser?.uid;
    try {
      setCarregando(true);
      const pin = await pinAuthService.getSavedPin(uid);
      const isDefault = await pinAuthService.isDefaultPin(uid);
      setSenhaSalva(pin);
      setIsDefaultPin(isDefault);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Always lock security area and clear routes on auth transitions (switch, logout, login)
      setAcessoLiberado(false);
      setRotaDestino(null);
      setRotaAnterior(null);

      if (user) {
        carregarSenha(user.uid);
      } else {
        setSenhaSalva(null);
        setIsDefaultPin(true);
        setCarregando(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [carregarSenha]);

  const definirRotaDestino = useCallback((rota: string) => setRotaDestino(rota), []);
  const limparRotaDestino = useCallback(() => setRotaDestino(null), []);
  const definirRotaAnterior = useCallback((rota: string) => setRotaAnterior(rota), []);
  const limparRotaAnterior = useCallback(() => setRotaAnterior(null), []);

  const criarSenha = useCallback(async (senha: string): Promise<boolean> => {
    const uid = auth.currentUser?.uid;
    const success = await pinAuthService.savePin(senha, uid);
    if (success) {
      setSenhaSalva(senha);
      setIsDefaultPin(false);
      setAcessoLiberado(true);
    }
    return success;
  }, []);

  const verificarSenha = useCallback(async (senha: string): Promise<boolean> => {
    const uid = auth.currentUser?.uid;
    const isValid = await pinAuthService.verifyPin(senha, uid);
    setAcessoLiberado(isValid);
    if (isValid) setSenhaSalva(senha);
    return isValid;
  }, []);

  const alterarSenha = useCallback(async (senhaAtual: string, novaSenha: string): Promise<boolean> => {
    const uid = auth.currentUser?.uid;
    const success = await pinAuthService.changePin(senhaAtual, novaSenha, uid);
    if (success) {
      setSenhaSalva(novaSenha);
      setIsDefaultPin(false);
    }
    return success;
  }, []);

  const redefinirPinComSenhaDaConta = useCallback(
    async (senhaConta: string, novoPin: string) => {
      const uid = auth.currentUser?.uid;
      const result = await pinAuthService.redefinirPinComSenhaDaConta(senhaConta, novoPin, uid);
      if (result.sucesso) {
        setSenhaSalva(novoPin);
        setIsDefaultPin(false);
        setAcessoLiberado(true);
      }
      return result;
    },
    []
  );

  const bloquear = useCallback(() => {
    setAcessoLiberado(false);
    setRotaDestino(null);
    setRotaAnterior(null);
  }, []);

  return (
    <SecurityContext.Provider
      value={{
        senhaSalva,
        acessoLiberado,
        carregando,
        isDefaultPin,
        rotaDestino,
        rotaAnterior,
        definirRotaDestino,
        limparRotaDestino,
        definirRotaAnterior,
        limparRotaAnterior,
        carregarSenha,
        criarSenha,
        verificarSenha,
        alterarSenha,
        redefinirPinComSenhaDaConta,
        bloquear,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}

