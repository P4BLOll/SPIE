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

  // Página para onde voltar ao sair da área segura
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

  alterarSenha: (
    senhaAtual: string,
    novaSenha: string
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

  const definirRotaDestino =
    useCallback(
      (rota: string) => {

        setRotaDestino(rota);

      },
      []
    );


  // =====================================================
  // LIMPAR ROTA DESTINO
  // =====================================================

  const limparRotaDestino =
    useCallback(() => {

      setRotaDestino(null);

    }, []);


  // =====================================================
  // DEFINIR ROTA ANTERIOR
  // =====================================================

  const definirRotaAnterior =
    useCallback(
      (rota: string) => {

        setRotaAnterior(rota);

      },
      []
    );


  // =====================================================
  // LIMPAR ROTA ANTERIOR
  // =====================================================

  const limparRotaAnterior =
    useCallback(() => {

      setRotaAnterior(null);

    }, []);


  // =====================================================
  // CRIAR PIN
  // =====================================================

  async function criarSenha(
    senha: string
  ): Promise<boolean> {

    try {

      // -----------------------------------------------
      // VALIDAR PIN
      // -----------------------------------------------

      if (
        senha.length !== 4 ||
        !/^\d{4}$/.test(senha)
      ) {

        return false;

      }


      // -----------------------------------------------
      // SALVAR PIN
      // -----------------------------------------------

      await AsyncStorage.setItem(
        'secret_pin',
        senha
      );


      setSenhaSalva(senha);


      // -----------------------------------------------
      // LIBERAR ACESSO
      // -----------------------------------------------

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

      // -----------------------------------------------
      // VALIDAR PIN
      // -----------------------------------------------

      if (
        senha.length !== 4 ||
        !/^\d{4}$/.test(senha)
      ) {

        setAcessoLiberado(false);

        return false;

      }


      // -----------------------------------------------
      // BUSCAR PIN SALVO
      // -----------------------------------------------

      const senhaAtual =
        await AsyncStorage.getItem(
          'secret_pin'
        );


      // -----------------------------------------------
      // PIN NÃO EXISTE
      // -----------------------------------------------

      if (!senhaAtual) {

        setAcessoLiberado(false);

        return false;

      }


      // -----------------------------------------------
      // PIN INCORRETO
      // -----------------------------------------------

      if (
        senha !== senhaAtual
      ) {

        setAcessoLiberado(false);

        return false;

      }


      // -----------------------------------------------
      // PIN CORRETO
      // -----------------------------------------------

      setSenhaSalva(
        senhaAtual
      );

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
  // ALTERAR PIN
  // =====================================================

  async function alterarSenha(
    senhaAtual: string,
    novaSenha: string
  ): Promise<boolean> {

    try {

      // -----------------------------------------------
      // VALIDAR PIN ATUAL
      // -----------------------------------------------

      if (
        senhaAtual.length !== 4 ||
        !/^\d{4}$/.test(senhaAtual)
      ) {

        return false;

      }


      // -----------------------------------------------
      // VALIDAR NOVO PIN
      // -----------------------------------------------

      if (
        novaSenha.length !== 4 ||
        !/^\d{4}$/.test(novaSenha)
      ) {

        return false;

      }


      // -----------------------------------------------
      // BUSCAR PIN SALVO
      // -----------------------------------------------

      const senhaAtualSalva =
        await AsyncStorage.getItem(
          'secret_pin'
        );


      // -----------------------------------------------
      // PIN NÃO EXISTE
      // -----------------------------------------------

      if (!senhaAtualSalva) {

        return false;

      }


      // -----------------------------------------------
      // VERIFICAR PIN ATUAL
      // -----------------------------------------------

      if (
        senhaAtual !== senhaAtualSalva
      ) {

        return false;

      }


      // -----------------------------------------------
      // SALVAR NOVO PIN
      // -----------------------------------------------

      await AsyncStorage.setItem(
        'secret_pin',
        novaSenha
      );


      // -----------------------------------------------
      // ATUALIZAR ESTADO
      // -----------------------------------------------

      setSenhaSalva(
        novaSenha
      );


      return true;

    } catch (error) {

      console.log(
        'Erro ao alterar PIN:',
        error
      );

      return false;

    }

  }


  // =====================================================
  // BLOQUEAR ÁREA SEGURA
  // =====================================================

  const bloquear =
    useCallback(() => {

      // -----------------------------------------------
      // BLOQUEIA IMEDIATAMENTE
      // -----------------------------------------------

      setAcessoLiberado(false);


      // -----------------------------------------------
      // LIMPA NAVEGAÇÃO TEMPORÁRIA
      // -----------------------------------------------

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

        alterarSenha,

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

