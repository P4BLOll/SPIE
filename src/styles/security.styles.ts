import { StyleSheet } from 'react-native';
import { cycleColors } from '@/constants/Colors';

export const securityStyles = StyleSheet.create({

    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
        backgroundColor: cycleColors.background,
    },

    // ===============================
    // CABEÇALHO
    // ===============================

    header: {
        alignItems: 'center',
        marginBottom: 26,
    },

    headerIconRing: {
        width: 76,
        height: 76,
        borderRadius: 38,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        color: cycleColors.text,
        marginTop: 14,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 14,
        color: cycleColors.textMuted,
        textAlign: 'center',
        marginTop: 6,
        lineHeight: 20,
        paddingHorizontal: 10,
    },

    // ===============================
    // CARD DE STATUS (Segurança)
    // ===============================

    card: {
        backgroundColor: cycleColors.surface,
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
        elevation: 4,
    },

    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: cycleColors.tealSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: cycleColors.text,
    },

    cardText: {
        fontSize: 13,
        color: cycleColors.textMuted,
        marginTop: 4,
        lineHeight: 18,
    },

    // ===============================
    // LISTA DE OPÇÕES (Segurança)
    // ===============================

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        backgroundColor: cycleColors.surface,
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        elevation: 3,
    },

    optionIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
    },

    optionText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '700',
        color: cycleColors.text,
    },

    // ===============================
    // COFRE — LISTA DE ITENS
    // ===============================

    vaultCard: {
        backgroundColor: cycleColors.surface,
        borderRadius: 24,
        paddingHorizontal: 18,
        elevation: 4,
    },

    vaultItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: cycleColors.divider,
    },

    vaultItemLast: {
        borderBottomWidth: 0,
    },

    vaultIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },

    vaultText: {
        flex: 1,
    },

    // ===============================
    // ESTADO VAZIO (Histórico)
    // ===============================

    emptyCard: {
        alignItems: 'center',
        backgroundColor: cycleColors.surface,
        borderRadius: 24,
        padding: 32,
        marginTop: 10,
        elevation: 4,
    },

    emptyTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: cycleColors.text,
        marginTop: 14,
        marginBottom: 6,
        textAlign: 'center',
    },

    // ===============================
    // HISTÓRICO — ITEM DE ALERTA
    // ===============================

    alertItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        backgroundColor: cycleColors.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
    },

    alertIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: cycleColors.dangerSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },

    alertInfo: {
        flex: 1,
    },

    alertType: {
        fontSize: 14,
        fontWeight: '800',
        color: cycleColors.text,
    },

    alertDate: {
        fontSize: 12,
        color: cycleColors.textMuted,
        marginTop: 2,
    },

    alertStatus: {
        fontSize: 12,
        fontWeight: '700',
        color: cycleColors.teal,
    },

});