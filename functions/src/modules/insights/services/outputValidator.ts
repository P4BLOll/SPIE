import { z } from 'zod';
import { SmartInsightResult } from '../types/insights.types';

const smartInsightSchema = z.object({
  resumoFase: z.string().min(5).max(350),
  padraoObservado: z.string().min(5).max(450),
  dicaBemEstar: z.string().min(5).max(450),
  notaAcompanhamento: z.string().max(450).nullable().optional(),
});

// Termos médicos causais, farmacológicos ou diagnósticos que a IA jamais pode citar
const PALAVRAS_PROIBIDAS_REGEX = /\b(progesterona|estrog[eê]nio|horm[oô]nio|diagn[oó]stico|endometriose|sop|rem[eé]dio|medicamento|anti-?inflamat[oó]rio|analg[eé]sico|posologia|prescri[cç][aã]o|comprimido|farmac[eê]utico)\b/i;

export const outputValidator = {
  validar(data: unknown): { valido: true; resultado: SmartInsightResult } | { valido: false; erro: string } {
    const parseResult = smartInsightSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        valido: false,
        erro: `Falha no schema de saída: ${parseResult.error.message}`,
      };
    }

    const { resumoFase, padraoObservado, dicaBemEstar, notaAcompanhamento } = parseResult.data;
    const textoCompleto = `${resumoFase} ${padraoObservado} ${dicaBemEstar} ${notaAcompanhamento ?? ''}`;

    const matchProibido = textoCompleto.match(PALAVRAS_PROIBIDAS_REGEX);
    if (matchProibido) {
      return {
        valido: false,
        erro: `Termo não permitido detectado na saída da IA: "${matchProibido[0]}"`,
      };
    }

    return {
      valido: true,
      resultado: {
        resumoFase: resumoFase.trim(),
        padraoObservado: padraoObservado.trim(),
        dicaBemEstar: dicaBemEstar.trim(),
        notaAcompanhamento: notaAcompanhamento?.trim() ?? null,
      },
    };
  },
};
