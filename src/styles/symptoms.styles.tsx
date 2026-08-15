import { StyleSheet } from 'react-native';
import { cycleColors } from './calendar.styles';

export const symptomsStyles = StyleSheet.create({

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
    paddingBottom: 40,
  },

  // ===============================
  // TOPO
  // ===============================

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 6,
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

  pageTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: cycleColors.text,
  },

  emptySpace: {
    width: 42,
  },

  // ===============================
  // CABEÇALHO
  // ===============================

  header: {
    alignItems: 'center',
    marginTop: 10,
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
    fontSize: 22,
    fontWeight: '800',
    color: cycleColors.text,
    marginTop: 16,
    textAlign: 'center',
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

  subtitle: {
    textAlign: 'center',
    color: cycleColors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    paddingHorizontal: 10,
  },

  // ===============================
  // CARDS
  // ===============================

  card: {
    backgroundColor: cycleColors.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: cycleColors.text,
    marginBottom: 18,
  },

  // ===============================
  // GRADE DE SINTOMAS
  // ===============================

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  symptom: {
    width: '48%',
    minHeight: 100,
    borderRadius: 20,
    backgroundColor: cycleColors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    paddingHorizontal: 10,
  },

  selected: {
    backgroundColor: cycleColors.rose,
  },

  selectedNone: {
    backgroundColor: cycleColors.teal,
  },

  symptomText: {
    fontSize: 13,
    color: cycleColors.text,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
  },

  selectedText: {
    color: '#FFFFFF',
  },

  // ===============================
  // INTENSIDADE POR SINTOMA
  // ===============================

  intensityCard: {
    marginBottom: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: cycleColors.surfaceAlt,
  },

  intensityCardLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },

  intensityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: cycleColors.text,
    marginBottom: 10,
  },

  intensityRow: {
    flexDirection: 'row',
    gap: 8,
  },

  intensityButton: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    backgroundColor: cycleColors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },

  intensitySelected: {
    backgroundColor: cycleColors.rose,
  },

  intensityText: {
    color: cycleColors.text,
    fontSize: 13,
    fontWeight: '600',
  },

  intensityTextSelected: {
    color: '#FFFFFF',
  },

  // ===============================
  // BOTÃO SALVAR
  // ===============================

  button: {
    height: 56,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    elevation: 4,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },

});