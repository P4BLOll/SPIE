import { StyleSheet } from 'react-native';
import { cycleColors } from './calendar.styles';

export const loginStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },

  inner: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: cycleColors.background,
  },

  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 35,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: cycleColors.text,
  },

  subtitle: {
    fontSize: 15,
    color: cycleColors.textMuted,
    textAlign: 'center',
    marginTop: 10,
  },

  form: {
    backgroundColor: cycleColors.surface,
    borderRadius: 20,
    padding: 24,
  },

  label: {
    color: cycleColors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },

  inputContainer: {
    height: 55,
    backgroundColor: cycleColors.background,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: cycleColors.border,
  },

  input: {
    flex: 1,
    color: cycleColors.text,
    fontSize: 16,
  },

  buttonWrapper: {
    marginTop: 30,
    borderRadius: 14,
    overflow: 'hidden',
  },

  button: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: cycleColors.white,
    fontSize: 17,
    fontWeight: '700',
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },

  forgotText: {
    color: cycleColors.rose,
    fontSize: 14,
    fontWeight: '600',
  },

  footerLink: {
    alignItems: 'center',
    marginTop: 30,
  },

  footerText: {
    color: cycleColors.textMuted,
    fontSize: 15,
  },

  footerTextAccent: {
    color: cycleColors.rose,
    fontWeight: '700',
  },

});