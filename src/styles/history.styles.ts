import { StyleSheet } from 'react-native';
import { cycleColors } from './calendar.styles';

export const historyStyles = StyleSheet.create({

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

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: cycleColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: cycleColors.gold,
    marginTop: 22,
    marginBottom: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: cycleColors.text,
  },

  // ===============================
  // ESTADO VAZIO
  // ===============================

  card: {
    backgroundColor: cycleColors.surface,
    borderRadius: 26,
    paddingVertical: 40,
    paddingHorizontal: 30,
    marginTop: 36,
    alignItems: 'center',
    elevation: 4,
  },

  iconRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: cycleColors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  text: {
    color: cycleColors.text,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },

  sub: {
    color: cycleColors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },

});