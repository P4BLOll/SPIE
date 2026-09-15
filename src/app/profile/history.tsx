import React from 'react';
import { Redirect } from 'expo-router';

/**
 * Rota legada: redireciona para a tela oficial de histórico em /security/alert-history
 */
export default function ProfileHistoryRedirect() {
  return <Redirect href="/security/alert-history" />;
}