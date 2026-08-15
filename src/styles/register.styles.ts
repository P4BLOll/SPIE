import { StyleSheet } from 'react-native';
import { cycleColors } from '../constants/Colors';

export const registerStyles = StyleSheet.create({

  /* ==========================================================
   * CONTAINER DA TELA
   * ========================================================== */

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: cycleColors.background,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: cycleColors.background,
  },

  /* ==========================================================
   * HEADER (Cadastro)
   * ========================================================== */

  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  registerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: cycleColors.text,
  },

  registerSubtitle: {
    fontSize: 15,
    color: cycleColors.textMuted,
    marginTop: 8,
    marginBottom: 20,
  },

  /* ==========================================================
   * INDICADOR DE ETAPAS
   * ========================================================== */

  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: cycleColors.border,
    backgroundColor: cycleColors.surface,
  },

  stepActive: {
    backgroundColor: cycleColors.rose,
    borderColor: cycleColors.rose,
    transform: [
      {
        scale: 1.08,
      },
    ],
  },

  stepCompleted: {
    backgroundColor: cycleColors.rose,
    borderColor: cycleColors.rose,
  },

  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: cycleColors.textMuted,
  },

  stepNumberActive: {
    color: cycleColors.white,
  },

  stepLine: {
    width: 38,
    height: 3,
    backgroundColor: cycleColors.border,
  },

  stepLineActive: {
    backgroundColor: cycleColors.rose,
  },

  /* ==========================================================
   * TÍTULOS DAS ETAPAS
   * ========================================================== */

  stepTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: cycleColors.text,
    marginBottom: 10,
  },

  stepSubtitle: {
    fontSize: 15,
    color: cycleColors.textMuted,
    lineHeight: 22,
    marginBottom: 30,
  },

  /* ==========================================================
   * FORMULÁRIO
   * ========================================================== */

  form: {
    width: '100%',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: cycleColors.text,
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    height: 58,
    borderRadius: 14,
    backgroundColor: cycleColors.surface,
    borderWidth: 1,
    borderColor: cycleColors.border,
    paddingHorizontal: 18,
    color: cycleColors.text,
    fontSize: 16,
  },

  /* ==========================================================
   * BOTÕES
   * ========================================================== */

  buttonRow: {
    flexDirection: 'row',
    marginTop: 40,
  },

  backButton: {
    flex: 1,
    height: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cycleColors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: cycleColors.surface,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: cycleColors.text,
  },

  nextButton: {
    flex: 1,
    height: 58,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: cycleColors.rose,
  },

  stepOneButton: {
    marginTop: 55,
  },

  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: cycleColors.white,
  },

  /* ==========================================================
   * BOTÃO ÚNICO (STEP 1)
   * ========================================================== */

  fullButton: {
    height: 58,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    backgroundColor: cycleColors.rose,
  },

  /* ==========================================================
   * BOTÕES DE OPÇÃO
   * ========================================================== */

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 20,
  },

  optionButton: {
    flex: 1,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cycleColors.border,
    backgroundColor: cycleColors.surface,
  },

  optionButtonSelected: {
    backgroundColor: cycleColors.rose,
    borderColor: cycleColors.rose,
  },

  optionText: {
    color: cycleColors.text,
    fontWeight: '600',
    fontSize: 15,
  },

  optionTextSelected: {
    color: cycleColors.white,
  },

  /* ==========================================================
   * CHIPS
   * ========================================================== */

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },

  chip: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: cycleColors.border,
    backgroundColor: cycleColors.surface,
    marginRight: 10,
    marginBottom: 12,
  },

  chipSelected: {
    backgroundColor: cycleColors.rose,
    borderColor: cycleColors.rose,
  },

  chipText: {
    color: cycleColors.text,
    fontSize: 14,
    fontWeight: '600',
  },

  chipTextSelected: {
    color: cycleColors.white,
  },

  /* ==========================================================
   * CAMPO DE SENHA
   * ========================================================== */

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cycleColors.border,
    backgroundColor: cycleColors.surface,
    paddingHorizontal: 18,
  },

  passwordInput: {
    flex: 1,
    color: cycleColors.text,
    fontSize: 16,
  },

  /* ==========================================================
   * CHECKBOX DOS TERMOS
   * ========================================================== */

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 28,
  },

  checkboxText: {
    flex: 1,
    marginLeft: 10,
    color: cycleColors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },

  /* ==========================================================
   * LINK PARA LOGIN
   * ========================================================== */

  loginLink: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },

  loginLinkText: {
    fontSize: 15,
    fontWeight: '600',
    color: cycleColors.rose,
  },

  /* ==========================================================
   * LOGO
   * ========================================================== */

  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 25,
  },

  /* ==========================================================
   * RODAPÉ
   * ========================================================== */

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

  /* ==========================================================
   * UTILITÁRIOS
   * ========================================================== */

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* ==========================================================
   * CAMPOS DE MEDIDAS (PESO E ALTURA) — passo 4
   * ========================================================== */

  measureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    backgroundColor: cycleColors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cycleColors.border,
    paddingHorizontal: 16,
  },

  measureInput: {
    flex: 1,
    height: '100%',
    color: cycleColors.text,
    fontSize: 18,
    fontWeight: '600',
  },

  measureUnit: {
    color: cycleColors.textMuted,
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '600',
  },

  /* ==========================================================
   * OPÇÃO DE NÃO INFORMAR
   * ========================================================== */

  optionalButton: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
  },

  optionalText: {
    color: cycleColors.rose,
    fontSize: 14,
    fontWeight: '600',
  },

  /* ==========================================================
   * RESUMO DOS DADOS
   * ========================================================== */

  summaryContainer: {
    backgroundColor: cycleColors.background,
    borderRadius: 16,
    padding: 18,
    marginTop: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cycleColors.border,
  },

  summaryTitle: {
    color: cycleColors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },

  summaryItem: {
    color: cycleColors.textMuted,
    fontSize: 14,
    marginBottom: 8,
  },

  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },

});