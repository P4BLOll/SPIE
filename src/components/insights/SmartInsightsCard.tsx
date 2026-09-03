import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cycleColors } from '@/styles/calendar.styles';
import { insightsStyles } from '@/styles/insights.styles';
import { SmartInsightResult } from '@/modules/insights/types/insights.types';

interface SmartInsightsCardProps {
  insight: SmartInsightResult | null;
  origem: 'ia' | 'fallback' | null;
  atualizando: boolean;
  onAtualizar: () => void;
}

export function SmartInsightsCard({
  insight,
  origem,
  atualizando,
  onAtualizar,
}: SmartInsightsCardProps) {
  if (!insight) {
    return (
      <View style={insightsStyles.aiCard}>
        <View style={insightsStyles.aiHeader}>
          <View style={insightsStyles.aiBadge}>
            <Ionicons name="sparkles" size={14} color={cycleColors.rose} />
            <Text style={insightsStyles.aiBadgeText}>INSIGHTS INTELIGENTES</Text>
          </View>
        </View>

        <Text style={insightsStyles.aiSummaryText}>
          Registre seus dias e sintomas no Calendário para ativar a análise personalizada.
        </Text>

        <TouchableOpacity
          style={insightsStyles.refreshButton}
          onPress={onAtualizar}
          disabled={atualizando}
          activeOpacity={0.7}
        >
          {atualizando ? (
            <ActivityIndicator size="small" color={cycleColors.rose} />
          ) : (
            <>
              <Ionicons name="sync" size={15} color={cycleColors.rose} />
              <Text style={insightsStyles.refreshButtonText}>Gerar análise agora</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={insightsStyles.aiCard}>
      {/* Header do Card com Badge */}
      <View style={insightsStyles.aiHeader}>
        <View style={insightsStyles.aiBadge}>
          <Ionicons name="sparkles" size={14} color={cycleColors.rose} />
          <Text style={insightsStyles.aiBadgeText}>
            {origem === 'ia' ? 'ANÁLISE INTELIGENTE (IA)' : 'ANÁLISE ESTRUTURADA'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onAtualizar}
          disabled={atualizando}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {atualizando ? (
            <ActivityIndicator size="small" color={cycleColors.rose} />
          ) : (
            <Ionicons name="refresh" size={18} color={cycleColors.textMuted} />
          )}
        </TouchableOpacity>
      </View>

      {/* Resumo da Fase em Linguagem Natural */}
      <Text style={insightsStyles.aiSummaryText}>{insight.resumoFase}</Text>

      {/* Caixa 1: Padrão Observado */}
      <View style={insightsStyles.aiSectionBox}>
        <View style={insightsStyles.aiSectionHeader}>
          <Ionicons name="analytics" size={16} color={cycleColors.teal} />
          <Text style={insightsStyles.aiSectionTitle}>Padrão identificado</Text>
        </View>
        <Text style={insightsStyles.aiSectionBody}>{insight.padraoObservado}</Text>
      </View>

      {/* Caixa 2: Dica de Bem-Estar */}
      <View style={insightsStyles.aiSectionBox}>
        <View style={insightsStyles.aiSectionHeader}>
          <Ionicons name="leaf" size={16} color={cycleColors.gold} />
          <Text style={insightsStyles.aiSectionTitle}>Dica de bem-estar</Text>
        </View>
        <Text style={insightsStyles.aiSectionBody}>{insight.dicaBemEstar}</Text>
      </View>

      {/* Caixa 3: Nota Médica Preventiva (quando indicada pelo motor de regras) */}
      {insight.notaAcompanhamento && (
        <View style={insightsStyles.medicalNoteCard}>
          <View style={insightsStyles.medicalNoteHeader}>
            <Ionicons name="shield-checkmark" size={16} color={cycleColors.rose} />
            <Text style={insightsStyles.medicalNoteTitle}>Acompanhamento preventivo</Text>
          </View>
          <Text style={insightsStyles.medicalNoteText}>
            {insight.notaAcompanhamento}
          </Text>
        </View>
      )}

      {/* Tag de Auditoria e Origem */}
      <Text style={insightsStyles.sourceTag}>
        {origem === 'ia'
          ? '✨ Análise contextual gerada com apoio de IA e validada clinicamente'
          : '📋 Análise estruturada pelas regras determinísticas do SPIE'}
      </Text>
    </View>
  );
}
