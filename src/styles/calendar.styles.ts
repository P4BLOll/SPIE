import { StyleSheet } from 'react-native';

// Altura base da tab bar (sem contar a área segura de baixo).
// A tab bar usa position: 'absolute', então qualquer tela com
// rolagem precisa somar isso (+ insets.bottom) ao paddingBottom
// do conteúdo, senão o final da lista fica escondido atrás dela.
export const TAB_BAR_BASE_HEIGHT = 72;

// =====================================
// PALETA — CICLO
// =====================================
import { cycleColors } from '@/constants/Colors';
export { cycleColors };

export const calendarStyles = StyleSheet.create({

    // ===============================
    // CONTAINER
    // ===============================

    root: {
        flex: 1,
        backgroundColor: cycleColors.background,
    },

    scrollArea: {
        flex: 1,
    },

    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },

    // ===============================
    // TOPO FIXO (calendário | data | perfil)
    // ===============================

    fixedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 14,
        backgroundColor: cycleColors.background,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.06)',
        zIndex: 10,
    },

    topBarIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: cycleColors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dateRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
    },

    dateDay: {
        fontSize: 22,
        fontWeight: '800',
        color: cycleColors.rose,
    },

    dateMonth: {
        fontSize: 16,
        fontWeight: '600',
        color: cycleColors.text,
    },

    // ===============================
    // SEM REGISTRO (faixa sobre o calendário)
    // ===============================

    noRecordBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: cycleColors.roseSoft,
        borderWidth: 1,
        borderColor: cycleColors.roseBorder,
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 14,
    },

    noRecordText: {
        flex: 1,
        fontSize: 13,
        fontWeight: '600',
        color: cycleColors.text,
    },

    // ===============================
    // CALENDÁRIO
    // ===============================

    calendarCard: {
        backgroundColor: cycleColors.surface,
        borderRadius: 28,
        padding: 10,
        elevation: 8,
        // altura fixa (cabe o cabeçalho + nomes dos dias + 6 linhas de
        // semana, o máximo que um mês pode ter) — assim o card não muda
        // de tamanho quando o usuário troca de mês
        height: 400,
        justifyContent: 'center',
    },

    calendar: {
        height: 380,
        borderRadius: 20,
    },

    // ===============================
    // LEGENDA
    // ===============================

    legend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: 18,
        rowGap: 8,
        marginTop: 16,
        marginBottom: 6,
    },

    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    legendText: {
        fontSize: 12,
        fontWeight: '600',
        color: cycleColors.textMuted,
    },

    // ===============================
    // SEÇÃO "HOJE" — AÇÕES DIÁRIAS
    // ===============================

    dailySection: {
        marginTop: 28,
    },

    dailyEyebrow: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: cycleColors.gold,
        marginBottom: 4,
    },

    dailyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: cycleColors.text,
        marginBottom: 16,
    },

    dailyActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },

    dailyActionCard: {
        flex: 1,
        minHeight: 118,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 14,
        gap: 10,
    },

    dailyActionIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dailyActionText: {
        fontSize: 12,
        fontWeight: '700',
        color: cycleColors.text,
        textAlign: 'center',
    },

    // ===============================
    // INFORMAÇÕES
    // ===============================

    infoCard: {
        backgroundColor: cycleColors.surface,
        borderRadius: 25,
        padding: 20,
        marginTop: 20,
        elevation: 5,
    },

    infoTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: cycleColors.text,
        marginBottom: 15,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
        flexWrap: 'wrap',
    },

    info: {
        fontSize: 14,
        color: cycleColors.textMuted,
    },

    value: {
        fontSize: 15,
        fontWeight: '800',
        color: cycleColors.text,
    },

    delay: {
        marginTop: 10,
        color: cycleColors.gold,
        fontWeight: '800',
        fontSize: 14,
    },

    // ===============================
    // MODAL — DETALHES DO DIA
    // ===============================

    modalOverlay: {
        flex: 1,
        backgroundColor: cycleColors.overlay,
        justifyContent: 'flex-end',
    },

    modalCard: {
        backgroundColor: cycleColors.surfaceAlt,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        padding: 24,
        paddingBottom: 36,
    },

    modalHandle: {
        width: 42,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'center',
        marginBottom: 18,
    },

    modalTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: cycleColors.text,
        marginBottom: 4,
    },

    modalSubtitle: {
        fontSize: 13,
        color: cycleColors.textMuted,
        marginBottom: 18,
    },

    modalTagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 18,
    },

    modalTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 14,
    },

    modalTagText: {
        fontSize: 12,
        fontWeight: '700',
        color: cycleColors.text,
    },

    modalSectionLabel: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
        color: cycleColors.textMuted,
        marginBottom: 8,
        marginTop: 6,
    },

    modalChipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },

    modalChip: {
        backgroundColor: cycleColors.surface,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 14,
    },

    modalChipText: {
        fontSize: 13,
        color: cycleColors.text,
        fontWeight: '600',
    },

    modalEmptyText: {
        fontSize: 13,
        color: cycleColors.textMuted,
        marginBottom: 20,
    },

    modalPrimaryButton: {
        marginTop: 12,
        backgroundColor: cycleColors.rose,
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
    },

    modalPrimaryButtonText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    modalCloseButton: {
        marginTop: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },

    modalCloseButtonText: {
        fontSize: 13,
        fontWeight: '700',
        color: cycleColors.textMuted,
    },

});