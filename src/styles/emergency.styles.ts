import { StyleSheet } from 'react-native';

import { cycleColors } from '@/styles/calendar.styles';

// ============================================================
// TOKENS DE ELEVAÇÃO / SOMBRA
// Centralizados aqui para manter consistência visual entre
// todos os cards da tela (profundidade em camadas, não sombra
// "achatada" genérica).
// ============================================================

const shadowSoft = {
  shadowColor: '#160B12',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.06,
  shadowRadius: 12,
  elevation: 2,
};

const shadowMedium = {
  shadowColor: '#160B12',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.1,
  shadowRadius: 18,
  elevation: 4,
};

const shadowRose = {
  shadowColor: cycleColors.rose,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.32,
  shadowRadius: 20,
  elevation: 8,
};

export const emergencyStyles = StyleSheet.create({

  // ============================================================
  // CONTAINER
  // ============================================================

  container: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 60,
  },

  // ============================================================
  // TOPO
  // ============================================================

  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: cycleColors.background,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cycleColors.surface,
    borderWidth: 1,
    borderColor: cycleColors.divider,
    ...shadowSoft,
  },

  pageTitle: {
    flex: 1,
    textAlign: 'center',
    color: cycleColors.text,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.4,
  },

  topBarSpacer: {
    width: 44,
  },

  headerDivider: {
    height: 1,
    backgroundColor: cycleColors.divider,
    marginHorizontal: 20,
    opacity: 0.6,
  },

  // ============================================================
  // SEÇÕES
  // ============================================================

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 2,
  },

  sectionHeaderContent: {
    flex: 1,
  },

  sectionLabel: {
    color: cycleColors.rose,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
  },

  sectionDescription: {
    color: cycleColors.textMuted,
    fontSize: 11,
    marginTop: 3,
  },

  manageText: {
    color: cycleColors.lavender,
    fontSize: 12,
    fontWeight: '800',
  },

  // ============================================================
  // MAPA / LOCALIZAÇÃO
  // ============================================================

  mapCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: cycleColors.divider,
    ...shadowMedium,
  },

  mapWrapper: {
    width: '100%',
    height: 150,
    position: 'relative',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  // ============================================================
  // ESTADOS DA LOCALIZAÇÃO
  // ============================================================

  locationState: {
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: cycleColors.surface,
  },

  locationLoadingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cycleColors.roseSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cycleColors.roseBorder,
  },

  locationStateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cycleColors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  locationStateTitle: {
    color: cycleColors.text,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },

  locationStateText: {
    color: cycleColors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 5,
    maxWidth: 300,
  },

  retryButton: {
    marginTop: 14,
    minHeight: 42,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: cycleColors.surfaceAlt,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: cycleColors.divider,
  },

  retryButtonText: {
    color: cycleColors.text,
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 7,
  },

  secondaryRetryButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  secondaryRetryText: {
    color: cycleColors.lavender,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 5,
  },

  // ============================================================
  // MAPA — BADGES
  // ============================================================

  locationBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 14, 27, 0.86)',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 14,
  },

  locationBadgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: cycleColors.teal,
    marginRight: 7,
  },

  locationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  refreshLocationButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: cycleColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: cycleColors.divider,
    ...shadowSoft,
  },

  // ============================================================
  // LOCALIZAÇÃO ATIVA
  // ============================================================

  readyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cycleColors.tealSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  readyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: cycleColors.teal,
    marginRight: 5,
  },

  readyText: {
    color: cycleColors.teal,
    fontSize: 10,
    fontWeight: '800',
  },

  // ============================================================
  // STATUS DO ENVIO
  // ============================================================

  alertStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cycleColors.surface,
    borderRadius: 20,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: cycleColors.divider,
    ...shadowSoft,
  },

  alertStatusIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertStatusContent: {
    flex: 1,
    marginLeft: 12,
  },

  alertStatusLabel: {
    color: cycleColors.textMuted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },

  alertStatusText: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
  },

  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // ============================================================
  // CONTATOS
  // ============================================================

  contactsCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: cycleColors.divider,
    ...shadowSoft,
  },

  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: cycleColors.divider,
  },

  contactLast: {
    borderBottomWidth: 0,
  },

  contactAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: cycleColors.roseSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },

  contactName: {
    color: cycleColors.text,
    fontSize: 14,
    fontWeight: '800',
  },

  contactPhone: {
    color: cycleColors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },

  contactStatus: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 7,
  },

  contactStatusText: {
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
  },

  contactEdit: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cycleColors.surfaceAlt,
  },

  addAnother: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: cycleColors.surfaceAlt,
  },

  addAnotherText: {
    color: cycleColors.lavender,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },

  // ============================================================
  // ESTADO SEM CONTATOS
  // ============================================================

  emptyContacts: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: cycleColors.divider,
    borderStyle: 'dashed',
  },

  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: cycleColors.lavenderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    color: cycleColors.text,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 14,
    textAlign: 'center',
  },

  emptyDescription: {
    color: cycleColors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 290,
  },

  addContactButton: {
    marginTop: 18,
    minHeight: 46,
    paddingHorizontal: 22,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cycleColors.rose,
    ...shadowRose,
  },

  addContactText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 7,
  },

  // ============================================================
  // CANCELAR / DESATIVAR ALERTA
  // ============================================================

  cancelArea: {
    marginTop: 6,
    marginBottom: 30,
    paddingTop: 0,
    paddingBottom: 12,
  },

  cancelWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    paddingHorizontal: 10,
  },

  cancelWarningText: {
    color: cycleColors.danger,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginLeft: 7,
    textAlign: 'center',
  },

  cancelDescription: {
    color: cycleColors.textMuted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 18,
  },

  cancelButtonWrapper: {
    width: '100%',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: cycleColors.rose,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 9,
  },

  cancelButton: {
    width: '100%',
    minHeight: 56,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: cycleColors.rose,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
  },

  cancelButtonIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonContent: {
    flex: 1,
    marginLeft: 12,
  },

  cancelText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.4,
  },

  cancelSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },

  // ============================================================
  // ALERTA DESATIVADO
  // ============================================================

  cancelled: {
    marginTop: 18,
    marginBottom: 30,
    paddingBottom: 22,
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cycleColors.divider,
    ...shadowSoft,
  },

  cancelledIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: cycleColors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelledTitle: {
    color: cycleColors.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 14,
  },

  cancelledDescription: {
    color: cycleColors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});