
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import {
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import {
  auth,
  db,
} from '@/services/firebaseConfig';

// =====================================
// CONFIGURAÇÕES PADRÃO
// =====================================

export const DURACAO_MENSTRUACAO_PADRAO = 5;
export const DURACAO_CICLO_PADRAO = 28;

// =====================================
// LIMITES
// =====================================

export const DURACAO_MENSTRUACAO_MIN = 1;
export const DURACAO_MENSTRUACAO_MAX = 15;

export const DURACAO_CICLO_MIN = 21;
export const DURACAO_CICLO_MAX = 45;

// =====================================
// SINTOMA
// =====================================

export interface SintomaRegistro {
  id: string;
  intensidade: string | null;
}

// =====================================
// SECREÇÃO
// =====================================

export interface SecrecaoRegistro {
  tipo: string;
  observacao: string;
}

// =====================================
// REGISTRO DE CADA DIA
// =====================================

export interface RegistroDia {
  sintomas?: SintomaRegistro[];
  secrecao?: SecrecaoRegistro;
  humor?: string;
}

// =====================================
// DADOS SALVOS NO FIRESTORE
// =====================================

interface DadosCalendario {
  ultimaMenstruacao: string | null;
  duracaoMenstruacao: number;
  duracaoCiclo: number;
  registros: Record<string, RegistroDia>;
}

// =====================================
// CONTEXT
// =====================================

interface CycleContextData {
  ultimaMenstruacao: string | null;

  setUltimaMenstruacao: (
    data: string
  ) => void;

  duracaoMenstruacao: number;

  setDuracaoMenstruacao: (
    dias: number
  ) => void;

  duracaoCiclo: number;

  setDuracaoCiclo: (
    dias: number
  ) => void;

  registros: Record<string, RegistroDia>;

  setRegistros: React.Dispatch<
    React.SetStateAction<
      Record<string, RegistroDia>
    >
  >;

  registrarSintomas: (dados: {
    data: string;
    sintomas: SintomaRegistro[];
  }) => void;

  registrarSecrecao: (dados: {
    data: string;
    tipo: string;
    observacao: string;
  }) => void;

  registrarHumor: (dados: {
    data: string;
    humor: string;
  }) => void;

  carregando: boolean;
}

// =====================================
// CONTEXT
// =====================================

const CycleContext =
  createContext<CycleContextData | null>(
    null
  );

// =====================================
// PROPS
// =====================================

interface ProviderProps {
  children: ReactNode;
}

// =====================================
// PROVIDER
// =====================================

export function CycleProvider({
  children,
}: ProviderProps) {

  // =====================================
  // ESTADOS
  // =====================================

  const [
    ultimaMenstruacao,
    setUltimaMenstruacaoState,
  ] = useState<string | null>(null);

  const [
    duracaoMenstruacao,
    setDuracaoMenstruacaoState,
  ] = useState<number>(
    DURACAO_MENSTRUACAO_PADRAO
  );

  const [
    duracaoCiclo,
    setDuracaoCicloState,
  ] = useState<number>(
    DURACAO_CICLO_PADRAO
  );

  const [
    registros,
    setRegistrosState,
  ] = useState<
    Record<string, RegistroDia>
  >({});

  const [
    carregando,
    setCarregando,
  ] = useState(true);

  const [
    dadosCarregados,
    setDadosCarregados,
  ] = useState(false);

  const [
    usuario,
    setUsuario,
  ] = useState<User | null>(null);

  // =====================================
  // REFERÊNCIA DO CALENDÁRIO
  // =====================================

  function obterCalendarioRef(uid: string) {
    return doc(
      db,
      'users',
      uid,
      'calendar',
      'data'
    );
  }

  // =====================================
  // CARREGAR DADOS DO FIRESTORE
  // =====================================

  async function carregarDados(
    user: User
  ) {

    try {

      setCarregando(true);
      setDadosCarregados(false);

      const calendarioRef =
        obterCalendarioRef(user.uid);

      const snapshot =
        await getDoc(
          calendarioRef
        );

      // =====================================
      // DOCUMENTO EXISTE
      // =====================================

      if (snapshot.exists()) {

        const dados =
          snapshot.data() as Partial<DadosCalendario>;

        // -----------------------------------
        // ÚLTIMA MENSTRUAÇÃO
        // -----------------------------------

        setUltimaMenstruacaoState(
          typeof dados.ultimaMenstruacao ===
            'string'
            ? dados.ultimaMenstruacao
            : null
        );

        // -----------------------------------
        // DURAÇÃO DA MENSTRUAÇÃO
        // -----------------------------------

        setDuracaoMenstruacaoState(
          typeof dados.duracaoMenstruacao ===
            'number'
            ? dados.duracaoMenstruacao
            : DURACAO_MENSTRUACAO_PADRAO
        );

        // -----------------------------------
        // DURAÇÃO DO CICLO
        // -----------------------------------

        setDuracaoCicloState(
          typeof dados.duracaoCiclo ===
            'number'
            ? dados.duracaoCiclo
            : DURACAO_CICLO_PADRAO
        );

        // -----------------------------------
        // REGISTROS
        // -----------------------------------

        setRegistrosState(
          dados.registros &&
            typeof dados.registros === 'object'
            ? dados.registros
            : {}
        );

      } else {

        // =====================================
        // PRIMEIRO ACESSO DO USUÁRIO
        // =====================================

        setUltimaMenstruacaoState(null);

        setDuracaoMenstruacaoState(
          DURACAO_MENSTRUACAO_PADRAO
        );

        setDuracaoCicloState(
          DURACAO_CICLO_PADRAO
        );

        setRegistrosState({});
      }

    } catch (error) {

      console.log(
        'Erro ao carregar dados do ciclo:',
        error
      );

      // =====================================
      // SE O FIREBASE ESTIVER OFFLINE
      // MANTÉM OS VALORES PADRÃO
      // =====================================

      setUltimaMenstruacaoState(null);

      setDuracaoMenstruacaoState(
        DURACAO_MENSTRUACAO_PADRAO
      );

      setDuracaoCicloState(
        DURACAO_CICLO_PADRAO
      );

      setRegistrosState({});

    } finally {

      setDadosCarregados(true);
      setCarregando(false);

    }
  }

  // =====================================
  // OBSERVAR AUTENTICAÇÃO
  // =====================================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          setUsuario(user);

          // =====================================
          // USUÁRIO DESLOGADO
          // =====================================

          if (!user) {

            setUltimaMenstruacaoState(
              null
            );

            setDuracaoMenstruacaoState(
              DURACAO_MENSTRUACAO_PADRAO
            );

            setDuracaoCicloState(
              DURACAO_CICLO_PADRAO
            );

            setRegistrosState({});

            setDadosCarregados(true);
            setCarregando(false);

            return;
          }

          // =====================================
          // USUÁRIO LOGADO
          // =====================================

          await carregarDados(user);
        }
      );

    return unsubscribe;

  }, []);

  // =====================================
  // SALVAR DADOS NO FIRESTORE
  // =====================================

  async function salvarCalendario(
    dados: Partial<DadosCalendario>
  ) {

    if (!usuario) {
      return;
    }

    try {

      const calendarioRef =
        obterCalendarioRef(
          usuario.uid
        );

      await setDoc(
        calendarioRef,
        {
          ...dados,
          atualizadoEm: new Date(),
        },
        {
          merge: true,
        }
      );

    } catch (error) {

      console.log(
        'Erro ao salvar dados do calendário:',
        error
      );
    }
  }

  // =====================================
  // ÚLTIMA MENSTRUAÇÃO
  // =====================================

  function setUltimaMenstruacao(
    data: string
  ) {

    setUltimaMenstruacaoState(
      data
    );

    if (dadosCarregados) {
      salvarCalendario({
        ultimaMenstruacao: data,
      });
    }
  }

  // =====================================
  // DURAÇÃO DA MENSTRUAÇÃO
  // =====================================

  function setDuracaoMenstruacao(
    dias: number
  ) {

    const valor =
      Math.min(
        Math.max(
          Math.round(dias),
          DURACAO_MENSTRUACAO_MIN
        ),
        DURACAO_MENSTRUACAO_MAX
      );

    setDuracaoMenstruacaoState(
      valor
    );

    if (dadosCarregados) {
      salvarCalendario({
        duracaoMenstruacao: valor,
      });
    }
  }

  // =====================================
  // DURAÇÃO DO CICLO
  // =====================================

  function setDuracaoCiclo(
    dias: number
  ) {

    const valor =
      Math.min(
        Math.max(
          Math.round(dias),
          DURACAO_CICLO_MIN
        ),
        DURACAO_CICLO_MAX
      );

    setDuracaoCicloState(
      valor
    );

    if (dadosCarregados) {
      salvarCalendario({
        duracaoCiclo: valor,
      });
    }
  }

  // =====================================
  // SET REGISTROS
  // =====================================

  const setRegistros:
    React.Dispatch<
      React.SetStateAction<
        Record<string, RegistroDia>
      >
    > = (value) => {

      setRegistrosState(
        (anterior) => {

          const novoEstado =
            typeof value === 'function'
              ? value(anterior)
              : value;

          if (dadosCarregados) {
            salvarCalendario({
              registros: novoEstado,
            });
          }

          return novoEstado;
        }
      );
    };

  // =====================================
  // REGISTRAR SINTOMAS
  // =====================================

  function registrarSintomas({
    data,
    sintomas,
  }: {
    data: string;
    sintomas: SintomaRegistro[];
  }) {

    setRegistrosState(
      (anterior) => {

        const novoEstado = {
          ...anterior,

          [data]: {
            ...anterior[data],
            sintomas,
          },
        };

        if (dadosCarregados) {
          salvarCalendario({
            registros: novoEstado,
          });
        }

        return novoEstado;
      }
    );
  }

  // =====================================
  // REGISTRAR SECREÇÃO
  // =====================================

  function registrarSecrecao({
    data,
    tipo,
    observacao,
  }: {
    data: string;
    tipo: string;
    observacao: string;
  }) {

    setRegistrosState(
      (anterior) => {

        const novoEstado = {
          ...anterior,

          [data]: {

            ...anterior[data],

            secrecao: {
              tipo,
              observacao,
            },

          },
        };

        if (dadosCarregados) {
          salvarCalendario({
            registros: novoEstado,
          });
        }

        return novoEstado;
      }
    );
  }

  // =====================================
  // REGISTRAR HUMOR
  // =====================================

  function registrarHumor({
    data,
    humor,
  }: {
    data: string;
    humor: string;
  }) {

    setRegistrosState(
      (anterior) => {

        const novoEstado = {
          ...anterior,

          [data]: {
            ...anterior[data],
            humor,
          },
        };

        if (dadosCarregados) {
          salvarCalendario({
            registros: novoEstado,
          });
        }

        return novoEstado;
      }
    );
  }

  // =====================================
  // PROVIDER
  // =====================================

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

// =====================================
// HOOK
// =====================================

export function useCycle() {

  const context =
    useContext(
      CycleContext
    );

  if (!context) {

    throw new Error(
      'useCycle deve ser usado dentro de CycleProvider'
    );
  }

  return context;
}
