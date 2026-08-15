// ===============================
// PALETA DE CORES DO SPIE
// ===============================
// Fonte única de cores do aplicativo.
// Compatível com:
// Colors (telas antigas)
// cycleColors (calendário, sintomas, secreção, insights)

export const cycleColors = {

  // ===============================
  // FUNDOS
  // ===============================

  background: '#120E1B',

  surface: '#1E1830',

  surfaceAlt: '#2A2340',


  // ===============================
  // CORES PRINCIPAIS
  // ===============================
  // primary/accent agora apontam pros mesmos tons de rose/teal —
  // qualquer tela que ainda use Colors.primary ou Colors.accent
  // (em vez de cycleColors.rose/teal) já fica na paleta nova sem
  // precisar ser migrada linha por linha.

  primary: '#FF5C8D', // = rose

  secondary: '#8B7FE8', // = lavender

  accent: '#3DDC97', // = teal


  // ===============================
  // CORES DO CALENDÁRIO
  // ===============================

  rose: '#FF5C8D',

  lavender: '#8B7FE8',

  teal: '#3DDC97',

  gold: '#F2C94C',


  // ===============================
  // CORES SUAVES
  // ===============================

  roseSoft: 'rgba(255, 92, 141, 0.15)',

  lavenderSoft: 'rgba(139,127,232,0.15)',

  tealSoft: 'rgba(61,220,151,0.15)',

  goldSoft: 'rgba(242,201,76,0.15)',


  // ===============================
  // STATUS
  // ===============================

  danger: '#FF416C',

  dangerSoft: 'rgba(255,92,119,0.16)',

  success: '#2ECC71',

  warning: '#E65100',


  // ===============================
  // TEXTOS
  // ===============================

  text: '#FFFFFF',

  textSecondary: '#D8D3E8',

  textMuted: '#9C93B5',


  // ===============================
  // BORDAS
  // ===============================

  border: '#3A4048',

  divider: 'rgba(255,255,255,0.06)',


  // ===============================
  // AUXILIARES
  // ===============================
  // Mantidas por compatibilidade com telas antigas que ainda
  // referenciam esses nomes diretamente. Evite usá-las em telas
  // novas — prefira rose/lavender/teal/gold.

  navy: '#0B111E',

  royalBlue: '#2563EB',

  deepPurple: '#9333EA',

  hotPink: '#EC4899',

  deepPink: '#E91E63',

  vibrantPink: '#FF1493',

  softPink: '#F472B6',

  roseRed: '#FB7185',


  emerald: '#4ADE80',

  darkGray: '#1E1E1E',

  slate: '#2A2340',

  gray: '#3A4048',


  // ===============================
  // BÁSICAS
  // ===============================

  white: '#FFFFFF',

  black: '#000000',

} as const;



// Compatibilidade com telas antigas
export const Colors = {

  background: cycleColors.background,

  surface: cycleColors.surface,

  primary: cycleColors.primary,

  secondary: cycleColors.secondary,

  accent: cycleColors.accent,

  danger: cycleColors.danger,

  success: cycleColors.success,

  text: cycleColors.text,

  textMuted: cycleColors.textMuted,

  textSecondary: cycleColors.textSecondary,

  border: cycleColors.border,

  white: cycleColors.white,

  black: cycleColors.black,

  navy: cycleColors.navy,

  royalBlue: cycleColors.royalBlue,

  deepPurple: cycleColors.deepPurple,

  hotPink: cycleColors.hotPink,

  warning: cycleColors.warning,

  emerald: cycleColors.emerald,

  darkGray: cycleColors.darkGray,

  slate: cycleColors.slate,

  gray: cycleColors.gray,

  inicial: cycleColors.background,

  softPink: cycleColors.softPink,

  deepPink: cycleColors.deepPink,

  vibrantPink: cycleColors.vibrantPink,

  rose: cycleColors.rose,

} as const;


export type CycleColors = typeof cycleColors;

export type ColorsType = typeof Colors;