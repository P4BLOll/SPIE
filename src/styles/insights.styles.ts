import { StyleSheet } from 'react-native';
import { cycleColors } from './calendar.styles';

export const insightsStyles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },

  topHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
    backgroundColor: cycleColors.background,
    borderBottomWidth: 1,
    borderBottomColor: cycleColors.surfaceAlt,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: cycleColors.text,
  },

  subtitle: {
    fontSize: 15,
    color: cycleColors.textMuted,
    marginBottom: 28,
  },

  /* ===================== */

  mainCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 28,
    padding: 24,
    marginBottom: 22,
    elevation: 6,
  },

  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },

  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: cycleColors.text,
  },

  dayText: {
    fontSize: 34,
    fontWeight: '900',
    color: cycleColors.rose,
    marginBottom: 18,
  },

  progressBackground: {
    height: 12,
    backgroundColor: cycleColors.surfaceAlt,
    borderRadius: 12,
    overflow: 'hidden',
  },

  progressFill: {
    height: 12,
    borderRadius: 12,
    backgroundColor: cycleColors.rose,
  },

  progressText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: cycleColors.textMuted,
  },

  /* ===================== */

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  statCard: {
    width: '48%',
    backgroundColor: cycleColors.surface,
    borderRadius: 22,
    paddingVertical: 22,
    alignItems: 'center',
    marginBottom: 14,
  },

  statNumber: {
    marginTop: 12,
    fontSize: 28,
    fontWeight: '800',
    color: cycleColors.text,
  },

  statLabel: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 13,
    color: cycleColors.textMuted,
  },

  /* ===================== */

  eventsCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: cycleColors.text,
    marginBottom: 20,
  },

  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: cycleColors.text,
  },

  eventDate: {
    marginTop: 4,
    color: cycleColors.textMuted,
  },

  divider: {
    height: 1,
    backgroundColor: cycleColors.divider,
    marginVertical: 18,
  },

  /* ===================== */

  historyCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
  },

  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  historyMonth: {
    width: 36,
    color: cycleColors.text,
    fontWeight: '700',
  },

  historyBarBackground: {
    flex: 1,
    height: 12,
    backgroundColor: cycleColors.surfaceAlt,
    borderRadius: 12,
    marginHorizontal: 12,
    overflow: 'hidden',
  },

  historyBar: {
    height: 12,
    backgroundColor: cycleColors.teal,
    borderRadius: 12,
  },

  historyValue: {
    width: 60,
    textAlign: 'right',
    color: cycleColors.textMuted,
  },

  /* ===================== */

  symptomsCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  progressLabel: {
    width: 110,
    marginLeft: 10,
    color: cycleColors.text,
    fontWeight: '600',
  },

  progressSmallBackground: {
    flex: 1,
    height: 10,
    backgroundColor: cycleColors.surfaceAlt,
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressSmallFill: {
    height: 10,
    backgroundColor: cycleColors.rose,
    borderRadius: 10,
  },

  /* ===================== */

  moodCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
  },

  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  moodItem: {
    alignItems: 'center',
  },

  emoji: {
    fontSize: 36,
  },

  moodText: {
    marginTop: 10,
    color: cycleColors.text,
    fontWeight: '600',
  },

  /* ===================== */

  insightCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
  },

  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 18,
  },

  tipText: {
    flex: 1,
    color: cycleColors.text,
    fontSize: 15,
    lineHeight: 24,
  },

  /* ===================== */

  dailyTipCard: {
    backgroundColor: cycleColors.surfaceAlt,
    borderRadius: 24,
    padding: 22,
    marginBottom: 40,
  },

  dailyTipText: {
    color: cycleColors.text,
    lineHeight: 26,
    fontSize: 15,
  },

  /* ===================== */
  /* SMART IA INSIGHTS */
  /* ===================== */

  aiCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 26,
    padding: 22,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(217, 154, 136, 0.25)',
    elevation: 4,
  },

  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(217, 154, 136, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  aiBadgeText: {
    color: cycleColors.rose,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  aiSummaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: cycleColors.text,
    fontWeight: '600',
    marginBottom: 16,
  },

  aiSectionBox: {
    backgroundColor: cycleColors.surfaceAlt,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  aiSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  aiSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: cycleColors.text,
  },

  aiSectionBody: {
    fontSize: 14,
    lineHeight: 21,
    color: cycleColors.textMuted,
  },

  medicalNoteCard: {
    backgroundColor: 'rgba(169, 87, 67, 0.12)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(169, 87, 67, 0.3)',
    marginTop: 6,
  },

  medicalNoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },

  medicalNoteTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: cycleColors.rose,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  medicalNoteText: {
    fontSize: 13,
    lineHeight: 19,
    color: cycleColors.text,
  },

  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  refreshButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: cycleColors.rose,
  },

  sourceTag: {
    fontSize: 11,
    color: cycleColors.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
});