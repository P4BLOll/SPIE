import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


// =====================================================
// TIPAGEM
// =====================================================

interface SecurityContextData {

  senhaSalva: string | null;

  acessoLiberado: boolean;

  carregando: boolean;

  // Rota que será aberta depois do PIN
  rotaDestino: string | null;

  // Página para onde voltar ao sair dos contatos
  rotaAnterior: string | null;

  definirRotaDestino: (
    rota: string
  ) => void;

  limparRotaDestino: () => void;

  definirRotaAnterior: (
    rota: string
  ) => void;

  limparRotaAnterior: () => void;

  criarSenha: (
    senha: string
  ) => Promise<boolean>;

  verificarSenha: (
    senha: string
  ) => Promise<boolean>;

  bloquear: () => void;
}


// =====================================================
// CONTEXT
// =====================================================

const SecurityContext =
  createContext<
    SecurityContextData | undefined
  >(undefined);


// =====================================================
// PROVIDER
// =====================================================

export function SecurityProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  // ===================================================
  // ESTADOS
  // ===================================================

  const [
    senhaSalva,
    setSenhaSalva,
  ] = useState<string | null>(null);


  const [
    acessoLiberado,
    setAcessoLiberado,
  ] = useState(false);


  const [
    carregando,
    setCarregando,
  ] = useState(true);


  const [
    rotaDestino,
    setRotaDestino,
  ] = useState<string | null>(null);


  const [
    rotaAnterior,
    setRotaAnterior,
  ] = useState<string | null>(null);


  // =====================================================
  // CARREGAR PIN
  // =====================================================

  useEffect(() => {

    async function carregarSenha() {

      try {

        const senha =
          await AsyncStorage.getItem(
            'secret_pin'
          );

        setSenhaSalva(senha);

      } catch (error) {

        console.log(
          'Erro ao carregar PIN:',
          error
        );

        setSenhaSalva(null);

      } finally {

        setCarregando(false);

      }

    }

    carregarSenha();

  }, []);


  // =====================================================
  // DEFINIR ROTA DESTINO
  // =====================================================

  function definirRotaDestino(
    rota: string
  ) {

    setRotaDestino(rota);

  }


  // =====================================================
  // LIMPAR ROTA DESTINO
  // =====================================================

  function limparRotaDestino() {

    setRotaDestino(null);

  }


  // =====================================================
  // DEFINIR ROTA ANTERIOR
  // =====================================================

  function definirRotaAnterior(
    rota: string
  ) {

    setRotaAnterior(rota);

  }


  // =====================================================
  // LIMPAR ROTA ANTERIOR
  // =====================================================

  function limparRotaAnterior() {

    setRotaAnterior(null);

  }


  // =====================================================
  // CRIAR PIN
  // =====================================================

  async function criarSenha(
    senha: string
  ): Promise<boolean> {

    try {

      if (
        senha.length !== 4 ||
        !/^\d{4}$/.test(senha)
      ) {

        return false;

      }


      await AsyncStorage.setItem(
        'secret_pin',
        senha
      );


      setSenhaSalva(senha);

      setAcessoLiberado(true);

      return true;

    } catch (error) {

      console.log(
        'Erro ao criar PIN:',
        error
      );

      return false;

    }

  }


  // =====================================================
  // VERIFICAR PIN
  // =====================================================

  async function verificarSenha(
    senha: string
  ): Promise<boolean> {

    try {

      if (
        senha.length !== 4 ||
        !/^\d{4}$/.test(senha)
      ) {

        return false;

      }


      const senhaAtual =
        await AsyncStorage.getItem(
          'secret_pin'
        );


      if (!senhaAtual) {

        setAcessoLiberado(false);

        return false;

      }


      if (
        senha !== senhaAtual
      ) {

        setAcessoLiberado(false);

        return false;

      }


      setSenhaSalva(senhaAtual);

      setAcessoLiberado(true);

      return true;

    } catch (error) {

      console.log(
        'Erro ao verificar PIN:',
        error
      );

      setAcessoLiberado(false);

      return false;

    }

  }


  // =====================================================
  // BLOQUEAR ÁREA SEGURA
  // =====================================================

  const bloquear = useCallback(() => {

    setAcessoLiberado(false);

    setRotaDestino(null);

    setRotaAnterior(null);

  }, []);


  // =====================================================
  // PROVIDER
  // =====================================================

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

        bloquear,

      }}
    >

      {children}

    </SecurityContext.Provider>

  );

}


// =====================================================
// HOOK
// =====================================================

export function useSecurity() {

  const context =
    useContext(
      SecurityContext
    );


  if (!context) {

    throw new Error(
      'useSecurity deve ser usado dentro de SecurityProvider'
    );

  }


  return context;

}