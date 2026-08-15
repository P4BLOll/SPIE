import { StyleSheet } from 'react-native';
import { cycleColors } from './calendar.styles';

export const registerPeriodStyles = StyleSheet.create({

  // ===============================
  // TELA
  // ===============================

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

  // ===============================
  // TOPO
  // ===============================

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
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  emptySpace: {
    width: 42,
  },

  // ===============================
  // CABEÇALHO
  // ===============================

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
    fontSize: 26,
    fontWeight: '800',
    color: cycleColors.text,
    marginTop: 16,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: cycleColors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  // ===============================
  // CALENDÁRIO
  // ===============================

  card: {
    backgroundColor: cycleColors.surface,
    borderRadius: 26,
    padding: 12,
    overflow: 'hidden',
    elevation: 4,
  },

  // ===============================
  // DATA ESCOLHIDA
  // ===============================

  selectedCard: {
    marginTop: 20,
    backgroundColor: cycleColors.surface,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: cycleColors.teal,
    elevation: 3,
  },

  selectedTitle: {
    color: cycleColors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 3,
  },

  selectedText: {
    color: cycleColors.text,
    fontSize: 16,
    fontWeight: '700',
  },

  // ===============================
  // REGISTROS DO DIA
  // ===============================

  dayRecordsCard: {
    marginTop: 16,
    backgroundColor: cycleColors.surface,
    borderRadius: 22,
    padding: 18,
    elevation: 3,
  },

  dayRecordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  dayRecordsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: cycleColors.text,
  },

  quickActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },

  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 44,
    borderRadius: 14,
    backgroundColor: cycleColors.surfaceAlt,
    borderWidth: 1.5,
  },

  quickActionButtonSymptom: {
    borderColor: cycleColors.rose,
  },

  quickActionButtonSecretion: {
    borderColor: cycleColors.lavender,
  },

  quickActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: cycleColors.text,
  },

  badgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: cycleColors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
  },

  badgeDotSymptom: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: cycleColors.rose,
  },

  badgeDotSecretion: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: cycleColors.lavender,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: cycleColors.text,
  },

  emptyDayText: {
    fontSize: 13,
    color: cycleColors.textMuted,
    fontStyle: 'italic',
  },

  // ===============================
  // BOTÃO
  // ===============================

  button: {
    marginTop: 28,
    height: 56,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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