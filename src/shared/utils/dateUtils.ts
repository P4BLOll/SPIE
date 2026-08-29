/**
 * Utilitários centralizados para tratamento de datas e horários no Firestore.
 */

/**
 * Converte qualquer representação de data do Firebase (Timestamp, Date, String, Number)
 * para um objeto Date válido do JavaScript.
 */
export function parseFirebaseDate(val: unknown): Date | null {
  if (!val) return null;
  if (val instanceof Date) return val;

  // Firebase Timestamp: possui método toDate()
  if (typeof val === 'object' && val !== null && 'toDate' in val && typeof (val as { toDate: () => Date }).toDate === 'function') {
    return (val as { toDate: () => Date }).toDate();
  }

  // Firebase Timestamp serializado ({ seconds: number })
  if (typeof val === 'object' && val !== null && 'seconds' in val && typeof (val as { seconds: number }).seconds === 'number') {
    return new Date((val as { seconds: number }).seconds * 1000);
  }

  // String ISO ou milissegundos
  if (typeof val === 'string' || typeof val === 'number') {
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  }

  return null;
}

/**
 * Formata data no padrão brasileiro DD/MM/AAAA às HH:mm.
 */
export function formatDateTimeBR(date: Date | null): string {
  if (!date) return 'Data não disponível';
  const pad = (n: number) => (n < 10 ? '0' + n : n);
  const dia = pad(date.getDate());
  const mes = pad(date.getMonth() + 1);
  const ano = date.getFullYear();
  const hora = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${dia}/${mes}/${ano} às ${hora}:${min}`;
}
