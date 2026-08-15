import { StyleSheet } from 'react-native';

import { cycleColors } from '@/styles/calendar.styles';

export const emergencyStyles = StyleSheet.create({
  /*
   * ============================================================
   * CONTAINER
   * ============================================================
   */

  container: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /*
   * ============================================================
   * TOPO
   * ============================================================
   */

  topBar: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: cycleColors.background,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cycleColors.surface,
  },

  pageTitle: {
    flex: 1,
    textAlign: 'center',
    color: cycleColors.text,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  topBarSpacer: {
    width: 42,
  },

  headerDivider: {
    height: 1,
    backgroundColor: cycleColors.divider,
    marginHorizontal: 20,
  },

  /*
   * ============================================================
   * INTRODUÇÃO
   * ============================================================
   */

  alertIntro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cycleColors.surface,
    borderRadius: 22,
    padding: 16,
    marginBottom: 24,
    elevation: 4,
  },

  alertIntroIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cycleColors.danger,
  },

  alertIntroContent: {
    flex: 1,
    marginLeft: 13,
  },

  alertIntroTitle: {
    color: cycleColors.text,
    fontSize: 14,
    fontWeight: '800',
  },

  alertIntroText: {
    color: cycleColors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  /*
   * ============================================================
   * SEÇÕES
   * ============================================================
   */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 2,
  },

  sectionHeaderContent: {
    flex: 1,
  },

  sectionLabel: {
    color: cycleColors.text,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
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

  /*
   * ============================================================
   * MAPA
   * ============================================================
   */

  mapCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
  },

  mapWrapper: {
    width: '100%',
    height: 250,
    position: 'relative',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  /*
   * ============================================================
   * ESTADOS DA LOCALIZAÇÃO
   * ============================================================
   */

  locationState: {
    minHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },

  locationLoadingIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: cycleColors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  locationStateIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: cycleColors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  locationStateTitle: {
    color: cycleColors.text,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },

  locationStateText: {
    color: cycleColors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 7,
    maxWidth: 300,
  },

  retryButton: {
    marginTop: 17,
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: cycleColors.surfaceAlt,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  retryButtonText: {
    color: cycleColors.text,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 7,
  },

  secondaryRetryButton: {
    marginTop: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },

  secondaryRetryText: {
    color: cycleColors.lavender,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 5,
  },

  /*
   * ============================================================
   * MAPA — BADGES
   * ============================================================
   */

  locationBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 14, 27, 0.88)',
    paddingHorizontal: 11,
    paddingVertical: 8,
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
    fontSize: 11,
    fontWeight: '800',
  },

  refreshLocationButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: cycleColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  /*
   * ============================================================
   * LOCALIZAÇÃO ATIVA
   * ============================================================
   */

  readyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cycleColors.tealSoft,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
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

  /*
   * ============================================================
   * STATUS DO ENVIO
   * ============================================================
   */

  alertStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cycleColors.surface,
    borderRadius: 20,
    padding: 14,
    marginBottom: 24,
    elevation: 4,
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
    marginLeft: 11,
  },

  alertStatusLabel: {
    color: cycleColors.textMuted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  alertStatusText: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
  },

  statusIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  /*
   * ============================================================
   * CONTATOS
   * ============================================================
   */

  contactsCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
  },

  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: cycleColors.divider,
  },

  contactLast: {
    borderBottomWidth: 0,
  },

  contactAvatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: cycleColors.roseSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactInfo: {
    flex: 1,
    marginLeft: 11,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
  },

  contactStatusText: {
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
  },

  contactEdit: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cycleColors.surfaceAlt,
  },

  addAnother: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },

  addAnotherText: {
    color: cycleColors.lavender,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },

  /*
   * ============================================================
   * ESTADO SEM CONTATOS
   * ============================================================
   */

  emptyContacts: {
    backgroundColor: cycleColors.surface,
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
  },

  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: cycleColors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    color: cycleColors.text,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 12,
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
    marginTop: 17,
    minHeight: 46,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addContactText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 7,
  },

  /*
   * ============================================================
   * CANCELAR / DESATIVAR ALERTA
   * ============================================================
   */

  cancelArea: {
    marginTop: 14,
    marginBottom: 15,
    paddingTop: 4,
  },

  cancelWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
    paddingHorizontal: 10,
  },

  cancelWarningText: {
    color: cycleColors.danger,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginLeft: 7,
    textAlign: 'center',
  },

  cancelDescription: {
    color: cycleColors.textMuted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: 13,
    paddingHorizontal: 20,
  },

  /*
   * BOTÃO MAIS DESTACADO — agora um wrapper; a cor vem do
   * LinearGradient aplicado no componente
   */

  cancelButtonWrapper: {
    borderRadius: 24,
    elevation: 10,
    shadowColor: cycleColors.danger,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 18,
  },

  cancelButton: {
    width: '100%',
    minHeight: 96,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 65, 108, 0.45)',
  },

  cancelButtonIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonContent: {
    flex: 1,
    marginLeft: 13,
  },

  cancelText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  cancelSub: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 5,
  },

  /*
   * ============================================================
   * ALERTA DESATIVADO
   * ============================================================
   */

  cancelled: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: cycleColors.surface,
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
  },

  cancelledIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cycleColors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelledTitle: {
    color: cycleColors.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 12,
  },

  cancelledDescription: {
    color: cycleColors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});