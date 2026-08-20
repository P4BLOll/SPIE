import { StyleSheet } from 'react-native';

import {
  cycleColors,
} from './calendar.styles';

export const messageStyles =
  StyleSheet.create({

    root: {
      flex: 1,
      backgroundColor:
        cycleColors.background,
    },

    scrollArea: {
      flex: 1,
    },

    container: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },

    fixedHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 14,
      backgroundColor:
        cycleColors.background,
      borderBottomWidth: 1,
      borderBottomColor:
        'rgba(255,255,255,0.06)',
      zIndex: 10,
    },

    topBarIcon: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor:
        cycleColors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },

    pageTitle: {
      flex: 1,
      textAlign: 'center',
      color: cycleColors.text,
      fontSize: 15,
      fontWeight: '800',
      letterSpacing: 0.4,
    },

    topBarSpacer: {
      width: 46,
    },

    heroCard: {
      borderRadius: 28,
      padding: 20,
      marginBottom: 20,
      elevation: 6,
    },

    heroTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },

    heroAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },

    heroSenderName: {
      color: cycleColors.text,
      fontSize: 14,
      fontWeight: '900',
    },

    heroTimestamp: {
      color: cycleColors.textMuted,
      fontSize: 11,
      marginTop: 1,
    },

    heroBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
    },

    heroBadgeText: {
      color: cycleColors.text,
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 0.4,
    },

    bubble: {
      backgroundColor:
        cycleColors.surface,
      borderRadius: 20,
      borderTopLeftRadius: 4,
      padding: 16,
      maxWidth: '92%',
    },

    bubbleText: {
      color: cycleColors.text,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: '600',
    },

    bubbleTail: {
      position: 'absolute',
      left: 0,
      top: -1,
      width: 0,
      height: 0,
      borderRightWidth: 10,
      borderBottomWidth: 10,
      borderRightColor:
        'transparent',
      borderBottomColor:
        cycleColors.surface,
    },

    heroFootnote: {
      color: cycleColors.textMuted,
      fontSize: 11,
      marginTop: 12,
      textAlign: 'center',
    },

    pillContainer: {
      flexDirection: 'row',
      backgroundColor:
        cycleColors.surface,
      borderRadius: 18,
      padding: 4,
      marginBottom: 24,
      position: 'relative',
      height: 58,
    },

    pillIndicator: {
      position: 'absolute',
      top: 4,
      bottom: 4,
      left: 4,
      width: '50%',
      borderRadius: 14,
    },

    pillOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      zIndex: 1,
    },

    pillOptionText: {
      fontSize: 13,
      fontWeight: '800',
    },

    sectionLabel: {
      color: cycleColors.rose,
      fontSize: 12,
      fontWeight: '800',
      letterSpacing: 1.2,
      marginBottom: 4,
    },

    sectionDescription: {
      color: cycleColors.textMuted,
      fontSize: 12,
      marginBottom: 12,
    },

    editorCard: {
      backgroundColor:
        cycleColors.surface,
      borderRadius: 22,
      padding: 18,
      marginBottom: 22,
      elevation: 4,
    },

    messageInput: {
      minHeight: 120,
      color: cycleColors.text,
      fontSize: 14,
      lineHeight: 22,
      padding: 0,
      textAlignVertical: 'top',
    },

    editIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 14,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor:
        'rgba(255,255,255,0.06)',
    },

    editIndicatorText: {
      color: cycleColors.textMuted,
      fontSize: 11.5,
      marginLeft: 6,
    },

    infoCard: {
      flexDirection: 'row',
      backgroundColor:
        cycleColors.lavenderSoft,
      borderRadius: 20,
      padding: 16,
      marginBottom: 24,
    },

    infoIcon: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor:
        cycleColors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },

    infoContent: {
      flex: 1,
    },

    infoTitle: {
      color: cycleColors.text,
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 5,
    },

    infoText: {
      color: cycleColors.textMuted,
      fontSize: 12.5,
      lineHeight: 19,
    },

    saveButtonWrapper: {
      marginTop: 4,
    },

    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 58,
      borderRadius: 18,
      elevation: 6,
    },

    saveButtonText: {
      color: cycleColors.text,
      fontSize: 15,
      fontWeight: '800',
    },

  });