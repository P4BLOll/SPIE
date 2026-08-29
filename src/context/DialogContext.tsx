import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type DialogType = 'info' | 'warning' | 'danger' | 'success' | 'error';

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  type?: DialogType;
  icon?: string;
  confirmText?: string;
  cancelText?: string;
  confirmStyle?: 'danger' | 'primary' | 'success';
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

export interface AlertDialogOptions {
  title: string;
  message: string;
  type?: DialogType;
  icon?: string;
  buttonText?: string;
  onDismiss?: () => void;
}

interface DialogContextData {
  isOpen: boolean;
  dialogConfig: (ConfirmDialogOptions & { isConfirm: boolean; buttonText?: string; onDismiss?: () => void }) | null;
  showConfirm: (options: ConfirmDialogOptions) => void;
  showAlert: (options: AlertDialogOptions) => void;
  hideDialog: () => void;
}

const DialogContext = createContext<DialogContextData | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<DialogContextData['dialogConfig']>(null);

  const showConfirm = useCallback((options: ConfirmDialogOptions) => {
    setDialogConfig({
      ...options,
      isConfirm: true,
      type: options.type || 'warning',
      confirmText: options.confirmText || 'Confirmar',
      cancelText: options.cancelText || 'Cancelar',
      confirmStyle: options.confirmStyle || (options.type === 'danger' ? 'danger' : 'primary'),
    });
    setIsOpen(true);
  }, []);

  const showAlert = useCallback((options: AlertDialogOptions) => {
    setDialogConfig({
      ...options,
      isConfirm: false,
      type: options.type || 'info',
      buttonText: options.buttonText || 'Entendi',
    });
    setIsOpen(true);
  }, []);

  const hideDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        dialogConfig,
        showConfirm,
        showAlert,
        hideDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog deve ser usado dentro de DialogProvider');
  }
  return context;
}
