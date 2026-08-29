import { StyleSheet } from 'react-native';
import { cycleColors } from './calendar.styles';

export const historyStyles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: cycleColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: cycleColors.border,
  },

  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  clearButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: cycleColors.gold,
    marginTop: 12,
    marginBottom: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: '900',
    color: cycleColors.text,
    marginBottom: 16,
  },

  // ===============================
  // ESTADO VAZIO / LOADING
  // ===============================

  card: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 24,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cycleColors.border,
  },

  iconRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: cycleColors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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

  // ===============================
  // LISTA DE ITENS DO HISTÓRICO
  // ===============================

  listContainer: {
    paddingBottom: 40,
  },

  alertCard: {
    backgroundColor: cycleColors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: cycleColors.border,
  },

  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  alertHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },

  alertIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertType: {
    fontSize: 16,
    fontWeight: '800',
    color: cycleColors.text,
  },

  alertDate: {
    fontSize: 12,
    color: cycleColors.textMuted,
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  alertDivider: {
    height: 1,
    backgroundColor: cycleColors.border,
    marginVertical: 10,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  locationText: {
    fontSize: 13,
    color: cycleColors.textMuted,
  },

  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(236, 72, 153, 0.12)',
  },

  mapButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: cycleColors.rose,
  },

  deleteAlertBtn: {
    padding: 6,
    borderRadius: 14,
    marginLeft: 6,
  },
});