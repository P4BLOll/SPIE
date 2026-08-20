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
  // CARD DO DISPOSITIVO
  // =====================================

  statusCard: {
    backgroundColor: cycleColors.surface,
    padding: 30,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,

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
    marginBottom: 18,
  },

  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: cycleColors.textMuted,
  },

  statusValue: {
    marginTop: 7,
    fontSize: 20,
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
    marginTop: 18,
    paddingTop: 16,
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

  // =====================================
  // CONTROLES
  // =====================================

  controlContainer: {
    width: '100%',
  },

  btnWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },

  button: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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