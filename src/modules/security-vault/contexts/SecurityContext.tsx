import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { pinAuthService } from '../services/pinAuthService';

interface SecurityContextData {
  senhaSalva: string | null;
  acessoLiberado: boolean;
  carregando: boolean;
  rotaDestino: string | null;
  rotaAnterior: string | null;
  definirRotaDestino: (rota: string) => void;
  limparRotaDestino: () => void;
  definirRotaAnterior: (rota: string) => void;
  limparRotaAnterior: () => void;
  criarSenha: (senha: string) => Promise<boolean>;
  verificarSenha: (senha: string) => Promise<boolean>;
  alterarSenha: (senhaAtual: string, novaSenha: string) => Promise<boolean>;
  bloquear: () => void;
}

const SecurityContext = createContext<SecurityContextData | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [senhaSalva, setSenhaSalva] = useState<string | null>(null);
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [rotaDestino, setRotaDestino] = useState<string | null>(null);
  const [rotaAnterior, setRotaAnterior] = useState<string | null>(null);

  useEffect(() => {
    async function carregarSenha() {
      try {
        const pin = await pinAuthService.getSavedPin();
        setSenhaSalva(pin);
      } finally {
        setCarregando(false);
      }
    }
    carregarSenha();
  }, []);

  const definirRotaDestino = useCallback((rota: string) => setRotaDestino(rota), []);
  const limparRotaDestino = useCallback(() => setRotaDestino(null), []);
  const definirRotaAnterior = useCallback((rota: string) => setRotaAnterior(rota), []);
  const limparRotaAnterior = useCallback(() => setRotaAnterior(null), []);

  const criarSenha = useCallback(async (senha: string): Promise<boolean> => {
    const success = await pinAuthService.savePin(senha);
    if (success) {
      setSenhaSalva(senha);
      setAcessoLiberado(true);
    }
    return success;
  }, []);

  const verificarSenha = useCallback(async (senha: string): Promise<boolean> => {
    const isValid = await pinAuthService.verifyPin(senha);
    setAcessoLiberado(isValid);
    if (isValid) setSenhaSalva(senha);
    return isValid;
  }, []);

  const alterarSenha = useCallback(async (senhaAtual: string, novaSenha: string): Promise<boolean> => {
    const success = await pinAuthService.changePin(senhaAtual, novaSenha);
    if (success) {
      setSenhaSalva(novaSenha);
    }
    return success;
  }, []);

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
        rotaDestino,
        rotaAnterior,
        definirRotaDestino,
        limparRotaDestino,
        definirRotaAnterior,
        limparRotaAnterior,
        criarSenha,
        verificarSenha,
        alterarSenha,
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
    throw new Error('useSecurity deve ser usado dentro de SecurityProvider');
  }
  return context;
}
