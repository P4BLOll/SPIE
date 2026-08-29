import { StyleSheet, Platform } from 'react-native';
import { cycleColors } from './calendar.styles';

export const deviceStyles = StyleSheet.create({
  // =====================================
  // CONTAINER
  // =====================================

  container: {
    flex: 1,
    backgroundColor: cycleColors.background,
    paddingHorizontal: 20,
  },

  // =====================================
  // CABEÇALHO
  // =====================================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 20,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: cycleColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerContent: {
    flex: 1,
  },

  title: {
    fontSize: 23,
    fontWeight: '800',
    color: cycleColors.text,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: cycleColors.textMuted,
  },

  // =====================================
  // CARD DO DISPOSITIVO ATUAL
  // =====================================

  statusCard: {
    backgroundColor: cycleColors.surface,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  statusCardConnected: {
    borderWidth: 1,
    borderColor: cycleColors.roseBorder,
  },

  deviceIcon: {
    marginBottom: 14,
  },

  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: cycleColors.textMuted,
  },

  statusValue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },

  textOk: {
    color: cycleColors.teal,
  },

  textError: {
    color: cycleColors.rose,
  },

  // =====================================
  // INFORMAÇÕES DO HARDWARE
  // =====================================

  hardwareSpecs: {
    width: '100%',
    marginTop: 16,
    paddingTop: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },

  specText: {
    marginTop: 3,
    fontSize: 12,
    color: cycleColors.textMuted,
    fontFamily:
      Platform.OS === 'ios'
        ? 'Courier'
        : 'monospace',
  },

  disconnectButton: {
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(232, 139, 165, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(232, 139, 165, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  disconnectButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: cycleColors.rose,
  },

  // =====================================
  // SEÇÃO DE DISPOSITIVOS DISPONÍVEIS
  // =====================================

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 6,
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: cycleColors.text,
  },

  countBadge: {
    backgroundColor: cycleColors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: cycleColors.textMuted,
  },

  scanActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: cycleColors.surface,
    gap: 6,
  },

  scanActionButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: cycleColors.rose,
  },

  // =====================================
  // LISTA DE DISPOSITIVOS
  // =====================================

  deviceListContainer: {
    gap: 10,
    paddingBottom: 24,
  },

  deviceItemCard: {
    backgroundColor: cycleColors.surface,
    padding: 16,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  deviceItemCardActive: {
    borderColor: cycleColors.teal,
    backgroundColor: 'rgba(56, 178, 172, 0.08)',
  },

  deviceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },

  deviceIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: cycleColors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deviceItemDetails: {
    flex: 1,
  },

  deviceItemName: {
    fontSize: 15,
    fontWeight: '700',
    color: cycleColors.text,
  },

  deviceItemMac: {
    fontSize: 11,
    marginTop: 2,
    color: cycleColors.textMuted,
    fontFamily:
      Platform.OS === 'ios'
        ? 'Courier'
        : 'monospace',
  },

  deviceSignalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },

  deviceSignalText: {
    fontSize: 10,
    color: cycleColors.textMuted,
  },

  deviceItemButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: cycleColors.rose,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 84,
  },

  deviceItemButtonConnected: {
    backgroundColor: 'rgba(56, 178, 172, 0.15)',
    borderWidth: 1,
    borderColor: cycleColors.teal,
  },

  deviceItemButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  deviceItemButtonTextConnected: {
    color: cycleColors.teal,
  },

  // =====================================
  // ESTADO VAZIO / BUSCANDO
  // =====================================

  emptyCard: {
    backgroundColor: cycleColors.surface,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  emptyCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: cycleColors.textMuted,
    textAlign: 'center',
  },

  emptyCardSubtext: {
    fontSize: 12,
    color: cycleColors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },

  fullScanButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: cycleColors.rose,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  fullScanButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // =====================================
  // PAINEL CONECTADO
  // =====================================

  connectedPanel: {
    padding: 20,
    borderRadius: 18,
    gap: 14,
    backgroundColor: cycleColors.surface,
    borderWidth: 1,
    borderColor: cycleColors.roseBorder,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: cycleColors.text,
  },
});