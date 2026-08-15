import { StyleSheet } from 'react-native';
import { cycleColors } from '@/constants/Colors';

export const contactsStyles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: cycleColors.background,
    },

    // ===============================
    // TOPO FIXO
    // ===============================

    fixedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 16,
        gap: 14,
        borderBottomWidth: 1,
        borderBottomColor: cycleColors.divider,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: cycleColors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTextWrap: {
        flex: 1,
    },

    title: {
        fontSize: 19,
        fontWeight: '800',
        color: cycleColors.text,
    },

    subtitle: {
        fontSize: 12,
        color: cycleColors.textMuted,
        marginTop: 2,
    },

    // ===============================
    // BOTÃO ADICIONAR
    // ===============================

    addButtonWrap: {
        paddingHorizontal: 20,
        paddingTop: 18,
    },

    addButton: {
        height: 54,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 15,
    },

    // ===============================
    // LISTA
    // ===============================

    listContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 40,
    },

    contactCard: {
        backgroundColor: cycleColors.surface,
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        elevation: 3,
    },

    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flexShrink: 1,
    },

    avatarBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: cycleColors.roseSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },

    contactName: {
        color: cycleColors.text,
        fontSize: 15,
        fontWeight: '700',
    },

    contactPhone: {
        color: cycleColors.textMuted,
        fontSize: 13,
        marginTop: 3,
    },

    actionsRow: {
        flexDirection: 'row',
        gap: 8,
    },

    actionBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ===============================
    // ESTADO VAZIO
    // ===============================

    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingTop: 40,
    },

    emptyTitle: {
        color: cycleColors.text,
        fontSize: 16,
        fontWeight: '700',
        marginTop: 16,
    },

    emptySubtitle: {
        color: cycleColors.textMuted,
        fontSize: 13,
        textAlign: 'center',
        marginTop: 6,
    },

});