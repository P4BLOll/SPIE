import { StyleSheet } from 'react-native';
import { cycleColors } from './calendar.styles';

export const registerSecretionStyles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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

  emptySpace: {
    width: 42,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  iconRing: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: cycleColors.text,
    marginTop: 16,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    color: cycleColors.textMuted,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  dateBadge: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: cycleColors.surfaceAlt,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 12,
  },

  dateBadgeText: {
    color: cycleColors.text,
    fontSize: 13,
    fontWeight: '700',
  },

  card: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
  },

  label: {
    color: cycleColors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 14,
  },

  option: {
    backgroundColor: cycleColors.surfaceAlt,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },

  optionSelected: {
    borderColor: cycleColors.rose,
    backgroundColor: cycleColors.roseSoft,
  },

  optionText: {
    color: cycleColors.text,
    fontSize: 14,
    fontWeight: '700',
  },

  optionDescription: {
    color: cycleColors.textMuted,
    marginTop: 4,
    fontSize: 12,
  },

  input: {
    height: 100,
    backgroundColor: cycleColors.surfaceAlt,
    borderRadius: 16,
    padding: 14,
    color: cycleColors.text,
    textAlignVertical: 'top',
    fontSize: 14,
  },

  button: {
    height: 56,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
    elevation: 4,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

});