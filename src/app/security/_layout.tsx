import React from 'react';
import {
  Slot,
  Redirect,
  usePathname,
} from 'expo-router';
import {
  useSecurity,
} from '../../context/SecurityContext';

export default function SecurityLayout() {
  const {
    acessoLiberado,
    carregando,
  } = useSecurity();

  const pathname = usePathname();

  if (carregando) {
    return null;
  }

  // A tela de alterar PIN valida o PIN atual de forma autônoma
  if (pathname && pathname.includes('change-pin')) {
    return <Slot />;
  }

  // Se o acesso ainda não foi liberado pelo PIN, redireciona preservando o destino solicitado
  if (!acessoLiberado) {
    return (
      <Redirect
        href={{
          pathname: '/(tabs)/secret',
          params: {
            destino: pathname || '/security',
          },
        }}
      />
    );
  }

  return <Slot />;
}