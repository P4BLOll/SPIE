import { StyleSheet } from 'react-native';
import { cycleColors } from './calendar.styles';

export const SOS_BUTTON_SIZE = 190;

export const secretStyles = StyleSheet.create({
    // ===============================
    // CONTAINER
    // ===============================

    container: {
        flex: 1,
        backgroundColor: cycleColors.background,
    },

    scroll: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },

    // ===============================
    // CABEÇALHO
    // ===============================

    eyebrow: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: cycleColors.gold,
        textAlign: 'center',
        marginTop: 6,
    },

    title: {
        fontSize: 26,
        fontWeight: '800',
        color: cycleColors.text,
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 16,
    },

    connectionPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        alignSelf: 'center',
        backgroundColor: cycleColors.surface,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 24,
    },

    connectionDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
    },

    connectionText: {
        fontSize: 12,
        fontWeight: '700',
        color: cycleColors.textMuted,
    },

    // ===============================
    // STATUS (linha, sem cor gritante)
    // ===============================

    statusCard: {
        backgroundColor: cycleColors.surface,
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginBottom: 24,
        elevation: 4,
    },

    alertCard: {
        backgroundColor: cycleColors.dangerSoft,
    },

    statusIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statusContent: {
        flex: 1,
    },

    statusInfo: {
        flex: 1,
    },

    statusTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: cycleColors.text,
    },

    alertTitle: {
        color: cycleColors.danger,
    },

    statusDesc: {
        fontSize: 12,
        color: cycleColors.textMuted,
        marginTop: 2,
    },

    statusSubtitle: {
        fontSize: 12,
        color: cycleColors.textMuted,
        marginTop: 2,
    },

    // ===============================
    // CONFIGURAÇÃO DE EMERGÊNCIA
    // ===============================

    settingCard: {
        backgroundColor: cycleColors.surface,
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.06)',
    },

    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        flex: 1,
        paddingRight: 12,
    },

    settingIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: cycleColors.surfaceAlt,
        justifyContent: 'center',
        alignItems: 'center',
    },

    settingContent: {
        flex: 1,
    },

    settingTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: cycleColors.text,
    },

    settingDesc: {
        fontSize: 12,
        color: cycleColors.textMuted,
        marginTop: 2,
        lineHeight: 17,
    },

    // ===============================
    // ESTATÍSTICAS / CARDS DUPLOS
    // ===============================

    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 28,
    },

    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 28,
    },

    statCard: {
        flex: 1,
        backgroundColor: cycleColors.surface,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        elevation: 3,
    },

    statIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    statNumber: {
        fontSize: 15,
        fontWeight: '800',
        color: cycleColors.text,
        textAlign: 'center',
        marginBottom: 2,
    },

    statTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: cycleColors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    // ===============================
    // BOTÃO SOS
    // ===============================

    sosSectionLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: cycleColors.textMuted,
        letterSpacing: 1.5,
        marginBottom: 8,
        textTransform: 'uppercase',
    },

    sosContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },

    sosInstruction: {
        fontSize: 13,
        fontWeight: '600',
        color: cycleColors.textMuted,
        textAlign: 'center',
        marginBottom: 20,
    },

    sosWrapper: {
        width: SOS_BUTTON_SIZE,
        height: SOS_BUTTON_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pulseRing: {
        position: 'absolute',
        width: SOS_BUTTON_SIZE,
        height: SOS_BUTTON_SIZE,
        borderRadius: SOS_BUTTON_SIZE / 2,
        borderWidth: 2,
        borderColor: cycleColors.rose,
    },

    sosTouch: {
        width: SOS_BUTTON_SIZE,
        height: SOS_BUTTON_SIZE,
        borderRadius: SOS_BUTTON_SIZE / 2,
        overflow: 'hidden',
        elevation: 15,
        shadowColor: cycleColors.rose,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },

    sosButton: {
        width: '100%',
        height: '100%',
        borderRadius: SOS_BUTTON_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sosText: {
        color: cycleColors.white,
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 1,
    },

    sosSubText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 11,
        marginTop: 4,
        textAlign: 'center',
        paddingHorizontal: 20,
    },

    // ===============================
    // TELA DE PIN
    // ===============================

    lockBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    lockIconRing: {
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },

    lockTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: cycleColors.text,
        textAlign: 'center',
        marginTop: 18,
    },

    lockSubtitle: {
        fontSize: 13,
        color: cycleColors.textMuted,
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 28,
        lineHeight: 19,
    },

    pinCard: {
        backgroundColor: cycleColors.surface,
        borderRadius: 22,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 24,
    },

    pinInput: {
        width: 180,
        height: 56,
        backgroundColor: cycleColors.surfaceAlt,
        borderRadius: 16,
        color: cycleColors.text,
        fontSize: 28,
        textAlign: 'center',
        letterSpacing: 15,
    },

    pinButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        alignSelf: 'center',
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 16,
        minWidth: 220,
    },

    pinButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
});