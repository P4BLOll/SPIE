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
    // CABEÇALHO (igual ao do perfil)
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
        borderRadius: 20,
        backgroundColor: cycleColors.surfaceAlt,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statusInfo: {
        flex: 1,
    },

    statusTitle: {
        color: cycleColors.text,
        fontWeight: '800',
        fontSize: 14,
    },

    alertTitle: {
        color: cycleColors.danger,
    },

    statusSubtitle: {
        color: cycleColors.textMuted,
        fontSize: 12,
        marginTop: 3,
    },

    // ===============================
    // MINI CARDS — igual ao statCard do perfil
    // ===============================

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 28,
    },

    statCard: {
        flex: 1,
        backgroundColor: cycleColors.surface,
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: 'center',
        gap: 8,
        elevation: 4,
    },

    statIconWrap: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 14,
        fontWeight: '800',
        color: cycleColors.text,
        textAlign: 'center',
    },

    statTitle: {
        fontSize: 11,
        fontWeight: '600',
        color: cycleColors.textMuted,
    },

    // ===============================
    // SOS
    // ===============================

    sosSectionLabel: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
        color: cycleColors.textMuted,
        marginBottom: 14,
        marginLeft: 4,
    },

    sosContainer: {
        alignItems: 'center',
        marginTop: 8,
    },

    sosInstruction: {
        color: cycleColors.textMuted,
        textAlign: 'center',
        fontSize: 13,
        marginBottom: 26,
        paddingHorizontal: 20,
    },

    sosWrapper: {
        width: SOS_BUTTON_SIZE + 90,
        height: SOS_BUTTON_SIZE + 90,
        alignItems: 'center',
        justifyContent: 'center',
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
    // TELA DE PIN (mesmo padrão do avatar/editButton do perfil)
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