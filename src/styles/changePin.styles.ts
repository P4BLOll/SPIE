import {
  StyleSheet,
} from 'react-native';

import {
  cycleColors,
} from './calendar.styles';


export const changePinStyles =
  StyleSheet.create({

    // =====================================================
    // CONTAINER
    // =====================================================

    container: {
      flex: 1,

      backgroundColor:
        cycleColors.background,
    },


    keyboard: {
      flex: 1,
    },


    // =====================================================
    // HEADER
    // =====================================================

    header: {
      height: 64,

      backgroundColor:
        cycleColors.background,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent: 'center',

      position: 'relative',

      paddingHorizontal: 20,

      borderBottomWidth: 1,

      borderBottomColor:
        'rgba(255,255,255,0.07)',

      zIndex: 10,

      elevation: 4,
    },


    headerTitle: {
      fontSize: 20,

      fontWeight: '800',

      color:
        cycleColors.text,

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

      backgroundColor:
        cycleColors.surface,

      borderWidth: 1,

      borderColor:
        cycleColors.border,

      zIndex: 20,
    },


    // =====================================================
    // SCROLL
    // =====================================================

    scroll: {
      paddingHorizontal: 20,

      paddingTop: 28,

      paddingBottom: 40,

      flexGrow: 1,
    },


    // =====================================================
    // ÍCONE
    // =====================================================

    iconRing: {
      width: 78,

      height: 78,

      borderRadius: 26,

      alignSelf: 'center',

      alignItems: 'center',

      justifyContent: 'center',

      marginBottom: 18,
    },


    // =====================================================
    // TÍTULO
    // =====================================================

    title: {
      fontSize: 24,

      fontWeight: '800',

      color:
        cycleColors.text,

      textAlign: 'center',

      marginBottom: 8,
    },


    subtitle: {
      fontSize: 14,

      lineHeight: 21,

      color:
        cycleColors.textMuted,

      textAlign: 'center',

      paddingHorizontal: 15,

      marginBottom: 24,
    },


    // =====================================================
    // CARD
    // =====================================================

    card: {
      width: '100%',

      backgroundColor:
        cycleColors.surface,

      borderRadius: 20,

      padding: 20,

      marginBottom: 18,
    },


    // =====================================================
    // CAMPOS
    // =====================================================

    field: {
      width: '100%',

      marginBottom: 18,
    },


    label: {
      color:
        cycleColors.text,

      fontSize: 15,

      fontWeight: '600',

      marginBottom: 8,
    },


    pinContainer: {
      width: '100%',

      height: 55,

      backgroundColor:
        cycleColors.background,

      borderRadius: 14,

      paddingHorizontal: 16,

      borderWidth: 1,

      borderColor:
        cycleColors.border,

      flexDirection: 'row',

      alignItems: 'center',

      gap: 10,
    },


    pinInput: {
      flex: 1,

      height: 53,

      color:
        cycleColors.text,

      fontSize: 16,

      letterSpacing: 4,
    },


    // =====================================================
    // INFORMAÇÃO
    // =====================================================

    infoBox: {
      flexDirection: 'row',

      alignItems: 'flex-start',

      backgroundColor:
        cycleColors.background,

      borderRadius: 14,

      borderWidth: 1,

      borderColor:
        cycleColors.border,

      padding: 14,

      marginTop: 2,

      gap: 9,
    },


    infoText: {
      flex: 1,

      color:
        cycleColors.textMuted,

      fontSize: 12,

      lineHeight: 18,
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
      color:
        cycleColors.white,

      fontSize: 17,

      fontWeight: '700',
    },


    // =====================================================
    // ESPAÇO FINAL
    // =====================================================

    bottomSpace: {
      height: 40,
    },

  });