import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDialog, DialogType } from '@/context/DialogContext';
import { cycleColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export function CustomDialogModal() {
  const { isOpen, dialogConfig, hideDialog } = useDialog();

  if (!dialogConfig) return null;

  const {
    title,
    message,
    type = 'info',
    icon,
    isConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    buttonText = 'Got it',
    confirmStyle = 'primary',
    onConfirm,
    onCancel,
    onDismiss,
  } = dialogConfig;

  function handleConfirm() {
    hideDialog();
    if (onConfirm) {
      onConfirm();
    }
  }

  function handleCancel() {
    hideDialog();
    if (onCancel) {
      onCancel();
    }
  }

  function handleDismiss() {
    hideDialog();
    if (onDismiss) {
      onDismiss();
    }
  }

  function getThemeColors(dialogType: DialogType) {
    switch (dialogType) {
      case 'danger':
      case 'error':
        return {
          icon: icon || 'alert-circle',
          color: cycleColors.rose,
          bgSoft: 'rgba(255, 92, 141, 0.15)',
          btnBg: cycleColors.rose,
          btnText: '#FFFFFF',
        };
      case 'warning':
        return {
          icon: icon || 'warning',
          color: cycleColors.gold,
          bgSoft: 'rgba(242, 201, 76, 0.15)',
          btnBg: cycleColors.gold,
          btnText: '#120E1B',
        };
      case 'success':
        return {
          icon: icon || 'checkmark-circle',
          color: cycleColors.teal,
          bgSoft: 'rgba(61, 220, 151, 0.15)',
          btnBg: cycleColors.teal,
          btnText: '#120E1B',
        };
      case 'info':
      default:
        return {
          icon: icon || 'information-circle',
          color: cycleColors.lavender,
          bgSoft: 'rgba(139, 127, 232, 0.15)',
          btnBg: cycleColors.lavender,
          btnText: '#FFFFFF',
        };
    }
  }

  const theme = getThemeColors(type);

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={isConfirm ? handleCancel : handleDismiss}
    >
      <TouchableWithoutFeedback onPress={isConfirm ? handleCancel : handleDismiss}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              {/* ÍCONE DE DESTAQUE */}
              <View style={[styles.iconWrapper, { backgroundColor: theme.bgSoft }]}>
                <Ionicons name={theme.icon as any} size={36} color={theme.color} />
              </View>

              {/* TÍTULO */}
              <Text style={styles.title}>{title}</Text>

              {/* MENSAGEM */}
              <Text style={styles.message}>{message}</Text>

              {/* BOTÕES DE AÇÃO */}
              {isConfirm ? (
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.cancelButtonText}>{cancelText}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.confirmButton,
                      {
                        backgroundColor:
                          confirmStyle === 'danger'
                            ? cycleColors.rose
                            : confirmStyle === 'success'
                            ? cycleColors.teal
                            : cycleColors.primary,
                      },
                    ]}
                    onPress={handleConfirm}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.confirmButtonText,
                        {
                          color:
                            confirmStyle === 'success'
                              ? '#120E1B'
                              : '#FFFFFF',
                        },
                      ]}
                    >
                      {confirmText}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.singleButton, { backgroundColor: theme.btnBg }]}
                  onPress={handleDismiss}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.singleButtonText, { color: theme.btnText }]}>
                    {buttonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 8, 18, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: Math.min(width - 48, 380),
    backgroundColor: '#1E1830',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  iconWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#A09CB0',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#2A2340',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D8D4E5',
  },
  confirmButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5C8D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
  singleButton: {
    width: '100%',
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  singleButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
});
