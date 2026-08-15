import { StyleSheet } from 'react-native';
import { cycleColors } from '@/constants/Colors';

export const editContactStyles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },

  topBarTitle: {
    color: cycleColors.text,
    fontSize: 18,
    fontWeight: '800',
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
    alignItems: 'center',
    justifyContent: 'center',
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