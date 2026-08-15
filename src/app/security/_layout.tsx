import React from 'react';

import {
  Slot,
  Redirect,
} from 'expo-router';

import {
  useSecurity,
} from '../../context/SecurityContext';


// =====================================================
// SECURITY LAYOUT
// =====================================================

export default function SecurityLayout() {

  const {
    acessoLiberado,
    carregando,
  } = useSecurity();


  // =====================================================
  // CARREGANDO
  // =====================================================

  if (carregando) {
    return null;
  }


  // =====================================================
  // BLOQUEADO
  // =====================================================

  if (!acessoLiberado) {

    return (
      <Redirect
        href="/secret"
      />
    );

  }


  // =====================================================
  // LIBERADO
  // =====================================================

  return <Slot />;

}