import { StyleSheet } from 'react-native';

import { cycleColors } from './calendar.styles';

export const styles = StyleSheet.create({

  // =====================================================
  // CONTAINER PRINCIPAL
  // =====================================================

  keyboard: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },


  // =====================================================
  // HEADER FIXO
  // =====================================================

  fixedHeader: {
    height: 64,

    backgroundColor: cycleColors.background,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    position: 'relative',

    paddingHorizontal: 20,

    zIndex: 100,

    elevation: 4,
  },


  fixedHeaderTitle: {
    fontSize: 20,

    fontWeight: '800',

    color: cycleColors.text,

    textAlign: 'center',
  },


  // =====================================================
  // BOTÃO VOLTAR
  // =====================================================

  backButton: {
    position: 'absolute',

    left: 20,

    width: 42,

    height: 42,

    borderRadius: 14,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: cycleColors.surface,

    borderWidth: 1,

    borderColor: cycleColors.border,

    zIndex: 101,
  },


  // =====================================================
  // SCROLL
  // =====================================================

  scroll: {
    paddingHorizontal: 20,

    paddingTop: 12,

    paddingBottom: 40,
  },


  // =====================================================
  // CABEÇALHO DO CONTEÚDO
  // =====================================================

  headerText: {
    marginBottom: 25,

    paddingHorizontal: 2,
  },


  eyebrow: {
    fontSize: 12,

    fontWeight: '700',

    letterSpacing: 1.2,

    color: cycleColors.rose,

    marginBottom: 7,
  },


  subtitle: {
    fontSize: 15,

    lineHeight: 21,

    color: cycleColors.textMuted,
  },


  // =====================================================
  // SEÇÕES
  // =====================================================

  section: {
    width: '100%',

    backgroundColor: cycleColors.surface,

    borderRadius: 20,

    padding: 20,

    marginBottom: 18,
  },


  sectionHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 20,
  },


  sectionIcon: {
    width: 40,

    height: 40,

    borderRadius: 14,

    backgroundColor: cycleColors.background,

    alignItems: 'center',

    justifyContent: 'center',

    marginRight: 12,

    borderWidth: 1,

    borderColor: cycleColors.border,
  },


  sectionTitle: {
    flex: 1,

    fontSize: 18,

    fontWeight: '800',

    color: cycleColors.text,
  },


  // =====================================================
  // CAMPOS
  // =====================================================

  field: {
    width: '100%',

    marginBottom: 17,
  },


  label: {
    color: cycleColors.text,

    fontSize: 15,

    fontWeight: '600',

    marginBottom: 8,

    lineHeight: 20,
  },


  input: {
    width: '100%',

    height: 55,

    backgroundColor: cycleColors.background,

    borderRadius: 14,

    paddingHorizontal: 16,

    borderWidth: 1,

    borderColor: cycleColors.border,

    color: cycleColors.text,

    fontSize: 16,
  },


  // =====================================================
  // CAMPOS DE SENHA
  // =====================================================

  passwordContainer: {
    width: '100%',

    height: 55,

    backgroundColor: cycleColors.background,

    borderRadius: 14,

    borderWidth: 1,

    borderColor: cycleColors.border,

    flexDirection: 'row',

    alignItems: 'center',

    paddingLeft: 16,

    paddingRight: 6,

    marginBottom: 17,
  },


  passwordInput: {
    flex: 1,

    height: 53,

    color: cycleColors.text,

    fontSize: 16,

    paddingRight: 10,
  },


  passwordToggle: {
    width: 44,

    height: 44,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: cycleColors.surface,
  },


  passwordHint: {
    color: cycleColors.textMuted,

    fontSize: 12,

    lineHeight: 18,

    marginTop: -5,

    marginBottom: 17,
  },


  changePasswordButton: {
    width: '100%',

    height: 52,

    borderRadius: 14,

    alignItems: 'center',

    justifyContent: 'center',

    flexDirection: 'row',

    gap: 8,

    marginTop: 2,
  },


  changePasswordButtonText: {
    color: cycleColors.white,

    fontSize: 15,

    fontWeight: '700',
  },


  // =====================================================
  // CHIPS
  // =====================================================

  chips: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    gap: 8,

    marginBottom: 18,
  },


  optionChip: {
    minHeight: 42,

    paddingHorizontal: 15,

    paddingVertical: 9,

    borderRadius: 14,

    backgroundColor: cycleColors.background,

    borderWidth: 1,

    borderColor: cycleColors.border,

    alignItems: 'center',

    justifyContent: 'center',
  },


  optionChipSelected: {
    backgroundColor: cycleColors.rose,

    borderColor: cycleColors.rose,
  },


  optionChipText: {
    color: cycleColors.textMuted,

    fontSize: 14,

    fontWeight: '600',

    textAlign: 'center',
  },


  optionChipTextSelected: {
    color: cycleColors.white,

    fontWeight: '700',
  },


  // =====================================================
  // CAIXA DE INFORMAÇÃO
  // =====================================================

  infoBox: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    backgroundColor: cycleColors.background,

    borderRadius: 14,

    borderWidth: 1,

    borderColor: cycleColors.border,

    padding: 14,

    marginTop: 2,

    gap: 9,
  },


  infoText: {
    flex: 1,

    color: cycleColors.textMuted,

    fontSize: 12,

    lineHeight: 18,
  },


  // =====================================================
  // ALTURA / PESO
  // =====================================================

  measureContainer: {
    width: '100%',

    height: 55,

    backgroundColor: cycleColors.background,

    borderRadius: 14,

    borderWidth: 1,

    borderColor: cycleColors.border,

    flexDirection: 'row',

    alignItems: 'center',

    paddingRight: 16,

    marginBottom: 17,
  },


  measureInput: {
    flex: 1,

    height: 53,

    paddingHorizontal: 16,

    color: cycleColors.text,

    fontSize: 16,
  },


  measureUnit: {
    color: cycleColors.textMuted,

    fontSize: 14,

    fontWeight: '600',
  },


  // =====================================================
  // BOTÃO "PREFIRO NÃO INFORMAR"
  // =====================================================

  optionalButton: {
    alignSelf: 'flex-start',

    marginTop: -4,

    marginBottom: 20,

    paddingVertical: 5,
  },


  optionalText: {
    color: cycleColors.rose,

    fontSize: 14,

    fontWeight: '600',
  },


  // =====================================================
  // BOTÃO SALVAR
  // =====================================================

  saveButton: {
    width: '100%',

    height: 56,

    borderRadius: 14,

    alignItems: 'center',

    justifyContent: 'center',

    flexDirection: 'row',

    gap: 9,
  },


  saveButtonText: {
    color: cycleColors.white,

    fontSize: 17,

    fontWeight: '700',
  },


  // =====================================================
  // ESPAÇO FINAL
  // =====================================================

  bottomSpace: {
    height: 100,
  },


  // =====================================================
  // BOTÃO FLUTUANTE
  // =====================================================

  floatingButton: {
    position: 'absolute',

    right: 20,

    bottom: 24,

    width: 52,

    height: 52,

    borderRadius: 16,

    backgroundColor: cycleColors.rose,

    alignItems: 'center',

    justifyContent: 'center',

    elevation: 6,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,

      height: 3,
    },

    shadowOpacity: 0.18,

    shadowRadius: 6,

    zIndex: 200,
  },


  // =====================================================
  // LOADING
  // =====================================================

  loadingContainer: {
    flex: 1,

    backgroundColor: cycleColors.background,

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 20,
  },


  loadingText: {
    marginTop: 14,

    color: cycleColors.textMuted,

    fontSize: 14,

    textAlign: 'center',
  },

});

