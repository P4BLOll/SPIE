import { StyleSheet } from 'react-native';
import { cycleColors } from '@/constants/Colors';

export const editContactStyles = StyleSheet.create({

    // ===============================
    // TELA
    // ===============================

    screen: {
        flex: 1,
        backgroundColor: cycleColors.background,
    },

    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        flex: 1,

        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 30,
    },

    // ===============================
    // TOPO
    // ===============================

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: 30,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,

        backgroundColor: cycleColors.surface,

        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 14,
    },

    topBarTitle: {
        flex: 1,

        fontSize: 19,
        fontWeight: '800',

        color: cycleColors.text,
    },

    // ===============================
    // FORMULÁRIO
    // ===============================

    card: {
        backgroundColor: cycleColors.surface,

        borderRadius: 22,

        padding: 18,

        marginBottom: 20,
    },

    input: {
        height: 54,

        backgroundColor: cycleColors.surfaceAlt,

        borderRadius: 15,

        paddingHorizontal: 16,

        fontSize: 14,

        color: cycleColors.text,

        borderWidth: 1,

        borderColor: 'rgba(255,255,255,0.06)',

        marginBottom: 12,
    },

    inputLast: {
        marginBottom: 0,
    },

    // ===============================
    // BOTÃO
    // ===============================

    button: {
        height: 54,

        borderRadius: 17,

        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'center',

        gap: 8,
    },

    buttonText: {
        fontSize: 15,

        fontWeight: '800',

        color: '#FFFFFF',
    },

    buttonDisabled: {
        opacity: 0.6,
    },

});