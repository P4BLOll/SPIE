import { StyleSheet } from 'react-native';
import { cycleColors } from '@/styles/calendar.styles';

export const addContactStyles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  // ===============================
  // TOPO
  // ===============================

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: cycleColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  topBarTitle: {
    color: cycleColors.text,
    fontSize: 18,
    fontWeight: '800',
  },

  // ===============================
  // CABEÇALHO
  // ===============================

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  iconRing: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: cycleColors.text,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 16,
    textAlign: 'center',
  },

  subtitle: {
    color: cycleColors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 10,
  },

  // ===============================
  // FORMULÁRIO
  // ===============================

  card: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 18,
    elevation: 4,
  },

  input: {
    height: 56,
    backgroundColor: cycleColors.surfaceAlt,
    borderRadius: 16,
    paddingHorizontal: 16,
    color: cycleColors.text,
    fontSize: 14,
    marginBottom: 12,
  },

  inputLast: {
    marginBottom: 0,
  },

  // ===============================
  // BOTÃO
  // ===============================

  button: {
    height: 56,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 28,
    elevation: 4,
  },

  buttonDisabled: {
    opacity: 0.45,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

});