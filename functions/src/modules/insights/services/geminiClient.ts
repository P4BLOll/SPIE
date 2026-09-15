import { GoogleGenAI } from '@google/genai';
import * as logger from 'firebase-functions/logger';
import { GeminiInsightPayload, SmartInsightResult } from '../types/insights.types';

const SYSTEM_INSTRUCTION = `
You are a supportive communication and wellness assistant for the SPIE app (women's health and safety).
Your mission is to translate cycle metrics and observed patterns into clear, warm, empathetic English.

SAFETY AND CLINICAL ETHICS GUIDELINES (STRICT AND INVIOLABLE):
1. You are NOT a doctor and NEVER make medical diagnoses.
2. It is STRICTLY FORBIDDEN to mention hormone names (such as progesterone or estrogen) or assert biological hypotheses.
3. Base yourself STRICTLY on the provided data and frequencies. Describe what the user logged ("You logged X most frequently during phase Y").
4. NEVER prescribe medications, remedies, NSAIDs, or clinical treatments.
5. Recommend only general wellness habits (hydration, gentle rest, warm compresses, mild herbal tea, regular sleep).
6. If the field "sugerirAtencaoMedica" is true in safety guidelines, include a cordial suggestion in "notaAcompanhamento" to share their history with a gynecologist or healthcare professional. Otherwise, keep "notaAcompanhamento" as null.
7. Return strictly the requested JSON, without markdown formatting or code blocks.
`.trim();

export const geminiClient = {
  async gerarInsight(payload: GeminiInsightPayload): Promise<SmartInsightResult | null> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      logger.info('[GeminiClient] GEMINI_API_KEY not configured in environment. Triggering deterministic fallback.');
      return null;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Analyze the cycle metrics below and generate supportive insights in JSON:\n${JSON.stringify(payload, null, 2)}`;

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
                description: 'Brief warm explanation about the current cycle phase.',
              },
              padraoObservado: {
                type: 'STRING',
                description: 'Symptom and mood patterns observed in recorded data.',
              },
              dicaBemEstar: {
                type: 'STRING',
                description: 'General safe lifestyle, hydration, or rest tip aligned with phase.',
              },
              notaAcompanhamento: {
                type: 'STRING',
                nullable: true,
                description: 'Cordial note for doctor visit when safety flag is set, or null.',
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
