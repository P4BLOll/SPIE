import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';
import { cycleRepository } from '../services/cycleRepository';
import { RegistroDia, SintomaRegistro, DadosCalendario } from '../types/cycle.types';

export const DURACAO_MENSTRUACAO_PADRAO = 5;
export const DURACAO_CICLO_PADRAO = 28;
export const DURACAO_MENSTRUACAO_MIN = 1;
export const DURACAO_MENSTRUACAO_MAX = 15;
export const DURACAO_CICLO_MIN = 21;
export const DURACAO_CICLO_MAX = 45;

interface CycleContextData {
  ultimaMenstruacao: string | null;
  setUltimaMenstruacao: (data: string) => void;
  duracaoMenstruacao: number;
  setDuracaoMenstruacao: (dias: number) => void;
  duracaoCiclo: number;
  setDuracaoCiclo: (dias: number) => void;
  registros: Record<string, RegistroDia>;
  setRegistros: React.Dispatch<React.SetStateAction<Record<string, RegistroDia>>>;
  registrarSintomas: (dados: { data: string; sintomas: SintomaRegistro[] }) => void;
  registrarSecrecao: (dados: { data: string; tipo: string; observacao?: string }) => void;
  registrarHumor: (dados: { data: string; humor: string }) => void;
  carregando: boolean;
}

const CycleContext = createContext<CycleContextData | null>(null);

export function CycleProvider({ children }: { children: ReactNode }) {
  const [ultimaMenstruacao, setUltimaMenstruacaoState] = useState<string | null>(null);
  const [duracaoMenstruacao, setDuracaoMenstruacaoState] = useState<number>(DURACAO_MENSTRUACAO_PADRAO);
  const [duracaoCiclo, setDuracaoCicloState] = useState<number>(DURACAO_CICLO_PADRAO);
  const [registros, setRegistrosState] = useState<Record<string, RegistroDia>>({});
  const [carregando, setCarregando] = useState(true);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [usuario, setUsuario] = useState<User | null>(null);

  const carregarDados = useCallback(async (user: User) => {
    try {
      setCarregando(true);
      setDadosCarregados(false);
      const dados = await cycleRepository.loadCalendarData(user.uid);

      if (dados) {
        setUltimaMenstruacaoState(typeof dados.ultimaMenstruacao === 'string' ? dados.ultimaMenstruacao : null);
        setDuracaoMenstruacaoState(
          typeof dados.duracaoMenstruacao === 'number' ? dados.duracaoMenstruacao : DURACAO_MENSTRUACAO_PADRAO
        );
        setDuracaoCicloState(typeof dados.duracaoCiclo === 'number' ? dados.duracaoCiclo : DURACAO_CICLO_PADRAO);
        setRegistrosState(dados.registros && typeof dados.registros === 'object' ? dados.registros : {});
      } else {
        setUltimaMenstruacaoState(null);
        setDuracaoMenstruacaoState(DURACAO_MENSTRUACAO_PADRAO);
        setDuracaoCicloState(DURACAO_CICLO_PADRAO);
        setRegistrosState({});
      }
    } catch (error) {
      console.warn('[CycleContext] Erro ao carregar dados do ciclo:', error);
      setUltimaMenstruacaoState(null);
      setDuracaoMenstruacaoState(DURACAO_MENSTRUACAO_PADRAO);
      setDuracaoCicloState(DURACAO_CICLO_PADRAO);
      setRegistrosState({});
    } finally {
      setDadosCarregados(true);
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);
      if (!user) {
        setUltimaMenstruacaoState(null);
        setDuracaoMenstruacaoState(DURACAO_MENSTRUACAO_PADRAO);
        setDuracaoCicloState(DURACAO_CICLO_PADRAO);
        setRegistrosState({});
        setDadosCarregados(true);
        setCarregando(false);
        return;
      }
      await carregarDados(user);
    });

    return unsubscribe;
  }, [carregarDados]);

  const salvarCalendario = useCallback(
    async (dados: Partial<DadosCalendario>) => {
      if (!usuario) return;
      try {
        await cycleRepository.saveCalendarData(usuario.uid, dados);
      } catch (error) {
        console.warn('[CycleContext] Erro ao salvar dados do calendário:', error);
      }
    },
    [usuario]
  );

  const setUltimaMenstruacao = useCallback(
    (data: string) => {
      setUltimaMenstruacaoState(data);
      if (dadosCarregados) {
        salvarCalendario({ ultimaMenstruacao: data });
      }
    },
    [dadosCarregados, salvarCalendario]
  );

  const setDuracaoMenstruacao = useCallback(
    (dias: number) => {
      const valor = Math.min(Math.max(Math.round(dias), DURACAO_MENSTRUACAO_MIN), DURACAO_MENSTRUACAO_MAX);
      setDuracaoMenstruacaoState(valor);
      if (dadosCarregados) {
        salvarCalendario({ duracaoMenstruacao: valor });
      }
    },
    [dadosCarregados, salvarCalendario]
  );

  const setDuracaoCiclo = useCallback(
    (dias: number) => {
      const valor = Math.min(Math.max(Math.round(dias), DURACAO_CICLO_MIN), DURACAO_CICLO_MAX);
      setDuracaoCicloState(valor);
      if (dadosCarregados) {
        salvarCalendario({ duracaoCiclo: valor });
      }
    },
    [dadosCarregados, salvarCalendario]
  );

  const setRegistros: React.Dispatch<React.SetStateAction<Record<string, RegistroDia>>> = useCallback(
    (value) => {
      setRegistrosState((anterior) => {
        const novoEstado = typeof value === 'function' ? value(anterior) : value;
        if (dadosCarregados) {
          salvarCalendario({ registros: novoEstado });
        }
        return novoEstado;
      });
    },
    [dadosCarregados, salvarCalendario]
  );

  const registrarSintomas = useCallback(
    ({ data, sintomas }: { data: string; sintomas: SintomaRegistro[] }) => {
      setRegistrosState((anterior) => {
        const novoEstado = {
          ...anterior,
          [data]: {
            ...anterior[data],
            sintomas,
          },
        };
        if (dadosCarregados) {
          salvarCalendario({ registros: novoEstado });
        }
        return novoEstado;
      });
    },
    [dadosCarregados, salvarCalendario]
  );

  const registrarSecrecao = useCallback(
    ({ data, tipo, observacao = '' }: { data: string; tipo: string; observacao?: string }) => {
      setRegistrosState((anterior) => {
        const novoEstado = {
          ...anterior,
          [data]: {
            ...anterior[data],
            secrecao: { tipo, observacao },
          },
        };
        if (dadosCarregados) {
          salvarCalendario({ registros: novoEstado });
        }
        return novoEstado;
      });
    },
    [dadosCarregados, salvarCalendario]
  );

  const registrarHumor = useCallback(
    ({ data, humor }: { data: string; humor: string }) => {
      setRegistrosState((anterior) => {
        const novoEstado = {
          ...anterior,
          [data]: {
            ...anterior[data],
            humor,
          },
        };
        if (dadosCarregados) {
          salvarCalendario({ registros: novoEstado });
        }
        return novoEstado;
      });
    },
    [dadosCarregados, salvarCalendario]
  );

  return (
    <CycleContext.Provider
      value={{
        ultimaMenstruacao,
        setUltimaMenstruacao,
        duracaoMenstruacao,
        setDuracaoMenstruacao,
        duracaoCiclo,
        setDuracaoCiclo,
        registros,
        setRegistros,
        registrarSintomas,
        registrarSecrecao,
        registrarHumor,
        carregando,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}

export function useCycle() {
  const context = useContext(CycleContext);
  if (!context) {
    throw new Error('useCycle deve ser usado dentro de CycleProvider');
  }
  return context;
}
