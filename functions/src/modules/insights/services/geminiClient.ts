import { GoogleGenAI } from '@google/genai';
import * as logger from 'firebase-functions/logger';
import { GeminiInsightPayload, SmartInsightResult } from '../types/insights.types';

const SYSTEM_INSTRUCTION = `
Você é uma assistente de comunicação e bem-estar para o aplicativo SPIE (saúde e segurança feminina).
Sua missão é transformar os dados e padrões observados do ciclo em uma linguagem clara, humana e acolhedora.

DIRETRIZES DE SEGURANÇA E ÉTICA CLÍNICA (INVIOLÁVEIS):
1. Você NÃO é médica e NUNCA faz diagnósticos.
2. É ESTRITAMENTE PROIBIDO citar nomes de hormônios (como progesterona ou estrogênio) ou afirmar causas biológicas hipotéticas.
3. Baseie-se ESTRITAMENTE nos dados e frequências fornecidos. Descreva o que a usuária registrou ("Você registrou X com mais frequência na fase Y").
4. JAMAIS prescreva medicamentos, remédios, anti-inflamatórios ou tratamentos clínicos.
5. Recomende apenas hábitos gerais de bem-estar (hidratação, repouso, compressas mornas, chás leves, sono regular).
6. Se o campo "sugerirAtencaoMedica" for verdadeiro nas diretrizes de segurança, inclua em "notaAcompanhamento" uma sugestão cordial para levar o histórico à consulta com o ginecologista. Caso contrário, mantenha "notaAcompanhamento" como null.
7. Retorne estritamente o JSON solicitado, sem formatação markdown ou blocos de código adicionais.
`.trim();

export const geminiClient = {
  async gerarInsight(payload: GeminiInsightPayload): Promise<SmartInsightResult | null> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      logger.info('[GeminiClient] GEMINI_API_KEY não configurada no ambiente. Acionando fallback determinístico.');
      return null;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Analise as métricas do ciclo abaixo e gere o insight acolhedor em JSON:\n${JSON.stringify(payload, null, 2)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.1,
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              resumoFase: {
                type: 'STRING',
                description: 'Breve explicação acolhedora sobre o momento atual do ciclo.',
              },
              padraoObservado: {
                type: 'STRING',
                description: 'Padrões de sintomas e humor observados nos dados registrados.',
              },
              dicaBemEstar: {
                type: 'STRING',
                description: 'Dica geral e segura de estilo de vida, hidratação ou repouso alinhada à fase.',
              },
              notaAcompanhamento: {
                type: 'STRING',
                nullable: true,
                description: 'Nota cordial para consulta médica quando houver flag de segurança, ou null.',
              },
            },
            required: ['resumoFase', 'padraoObservado', 'dicaBemEstar'],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        logger.warn('[GeminiClient] Resposta vazia do modelo Gemini.');
        return null;
      }

      const parsed = JSON.parse(responseText.trim());
      return parsed as SmartInsightResult;
    } catch (error) {
      logger.warn('[GeminiClient] Erro ao comunicar com a API do Gemini:', error);
      return null;
    }
  },
};
