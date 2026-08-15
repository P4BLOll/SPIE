import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../constants/Colors';

export const deviceStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  header: {
    marginTop: 20,
    marginBottom: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textMuted,
  },

  statusCard: {
    backgroundColor: Colors.surface,
    padding: 32,
    borderRadius: 16,
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
    borderColor: 'rgba(0, 242, 254, 0.15)',
  },

  deviceIcon: {
    marginBottom: 16,
  },

  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textMuted,
  },

  statusValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textOk: {
    color: Colors.accent,
  },

  textError: {
    color: Colors.danger,
  },

  hardwareSpecs: {
    width: '100%',
    marginTop: 16,
    paddingTop: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },

  specText: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily:
      Platform.OS === 'ios'
        ? 'Courier'
        : 'monospace',
  },

  controlContainer: {
    width: '100%',
  },

  btnWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },

  button: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  connectedPanel: {
    padding: 20,
    borderRadius: 12,
    gap: 12,
    backgroundColor: 'rgba(22, 31, 48, 0.5)',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  infoText: {
    fontSize: 14,
    color: Colors.text,
  },
});