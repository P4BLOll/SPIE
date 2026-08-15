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

});