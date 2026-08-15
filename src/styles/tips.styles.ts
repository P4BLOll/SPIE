import { StyleSheet } from 'react-native';
import { cycleColors } from './calendar.styles';

export const tipsStyles = StyleSheet.create({

  // ===============================
  // TELA
  // ===============================

  screen: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },

  // ===============================
  // CABEÇALHO
  // ===============================

  topHeader: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: cycleColors.background,
    borderBottomWidth: 1,
    borderBottomColor: cycleColors.surfaceAlt,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 140,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: cycleColors.gold,
    marginBottom: 6,
  },

  title: {
    color: cycleColors.text,
    fontSize: 28,
    fontWeight: '900',
  },

  subtitle: {
    color: cycleColors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 22,
  },

  // ===============================
  // CATEGORIA
  // ===============================

  category: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    borderLeftWidth: 3,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },

  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryHeaderOpen: {
    marginBottom: 14,
  },

  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  categoryInfo: {
    flex: 1,
  },

  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  categoryTitle: {
    color: cycleColors.text,
    fontSize: 17,
    fontWeight: '900',
  },

  categoryCount: {
    backgroundColor: cycleColors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  categoryCountText: {
    color: cycleColors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },

  categoryDescription: {
    color: cycleColors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },

  categoryChevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cycleColors.surfaceAlt,
    marginLeft: 8,
  },

  // ===============================
  // ITEM
  // ===============================

  tipItem: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: cycleColors.surfaceAlt,
    paddingVertical: 9,
  },

  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  tipTitle: {
    flex: 1,
    color: cycleColors.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    paddingRight: 8,
  },

});