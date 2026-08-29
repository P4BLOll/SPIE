import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  deleteField,
  onSnapshot,
  serverTimestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db, auth } from '@/services/firebaseConfig';
import { EmergencyContact, AlertHistoryItem, AlertLocation } from '../types/emergency.types';

/**
 * Sanitiza o documento e remove automaticamente campos legados duplicados (name/phone) do Firestore.
 */
function sanitizeAndCleanDoc(docSnap: any): EmergencyContact {
  const data = docSnap.data();
  const nome = String(data.nome || data.name || '').trim();
  const telefone = String(data.telefone || data.phone || '').trim();

  // Se o documento no Firebase ainda tiver os campos duplicados 'name' ou 'phone', remove diretamente no banco
  if ('name' in data || 'phone' in data) {
    updateDoc(docSnap.ref, {
      nome,
      telefone,
      name: deleteField(),
      phone: deleteField(),
    }).catch((err) => {
      console.warn('[EmergencyRepository] Erro ao limpar campos duplicados no Firestore:', err);
    });
  }

  return {
    id: docSnap.id,
    nome,
    telefone,
    parentesco: data.parentesco,
    prioridade: data.prioridade,
    principal: data.principal,
    createdAt: data.createdAt,
  };
}

/**
 * Repositório responsável pelo acesso e persistência de dados de emergência no Firestore.
 */
export const emergencyRepository = {
  /**
   * Obtém a lista de contatos de emergência do usuário autenticado e limpa duplicidades.
   */
  async getContacts(): Promise<EmergencyContact[]> {
    const user = auth.currentUser;
    if (!user) return [];

    const colRef = collection(db, 'users', user.uid, 'emergency_contacts');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((docSnap) => sanitizeAndCleanDoc(docSnap));
  },

  /**
   * Escuta em tempo real os contatos de emergência e limpa duplicidades automaticamente.
   */
  subscribeContacts(onUpdate: (contacts: EmergencyContact[]) => void): Unsubscribe | null {
    const user = auth.currentUser;
    if (!user) return null;

    const colRef = collection(db, 'users', user.uid, 'emergency_contacts');
    return onSnapshot(colRef, (snapshot) => {
      const list = snapshot.docs.map((docSnap) => sanitizeAndCleanDoc(docSnap));
      onUpdate(list);
    });
  },

  /**
   * Adiciona um novo contato de emergência exclusivamente com 'nome' e 'telefone'.
   */
  async addContact(contact: Omit<EmergencyContact, 'id'>): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    const colRef = collection(db, 'users', user.uid, 'emergency_contacts');
    const docRef = await addDoc(colRef, {
      nome: contact.nome.trim(),
      telefone: contact.telefone.trim(),
      ...(contact.parentesco ? { parentesco: contact.parentesco } : {}),
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  /**
   * Atualiza um contato de emergência existente e remove quaisquer resquícios de campos em inglês.
   */
  async updateContact(contactId: string, contact: Partial<EmergencyContact>): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    const docRef = doc(db, 'users', user.uid, 'emergency_contacts', contactId);
    const updateData: any = {
      updatedAt: serverTimestamp(),
      name: deleteField(),
      phone: deleteField(),
    };

    if (contact.nome !== undefined) updateData.nome = contact.nome.trim();
    if (contact.telefone !== undefined) updateData.telefone = contact.telefone.trim();
    if (contact.parentesco !== undefined) updateData.parentesco = contact.parentesco;

    await updateDoc(docRef, updateData);
  },

  /**
   * Remove um contato de emergência.
   */
  async deleteContact(contactId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    const docRef = doc(db, 'users', user.uid, 'emergency_contacts', contactId);
    await deleteDoc(docRef);
  },

  /**
   * Registra um novo alerta de socorro no Firestore e inicializa a sessão de rastreamento.
   */
  async createAlert(data: {
    tipo: string;
    device: string;
    location: AlertLocation;
  }): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    const alertColRef = collection(db, 'users', user.uid, 'alert_history');
    const alertDoc = await addDoc(alertColRef, {
      userId: user.uid,
      tipo: data.tipo,
      device: data.device,
      status: 'active',
      location: data.location,
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      linkMapa: `https://maps.google.com/?q=${data.location.latitude},${data.location.longitude}`,
      createdAt: serverTimestamp(),
    });

    const liveDocRef = doc(db, 'live_tracking', alertDoc.id);
    await setDoc(liveDocRef, {
      alertId: alertDoc.id,
      userId: user.uid,
      active: true,
      currentLocation: data.location,
      startedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return alertDoc.id;
  },

  /**
   * Atualiza as coordenadas em tempo real na sessão de rastreamento.
   */
  async updateLiveLocation(alertId: string, location: AlertLocation): Promise<void> {
    const liveDocRef = doc(db, 'live_tracking', alertId);
    await setDoc(
      liveDocRef,
      {
        currentLocation: location,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  },

  /**
   * Encerra o alerta de emergência e desativa a sessão de live tracking.
   */
  async resolveAlert(alertId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) return;

    const alertDocRef = doc(db, 'users', user.uid, 'alert_history', alertId);
    await updateDoc(alertDocRef, {
      status: 'resolved',
      resolvidoEm: serverTimestamp(),
    });

    const liveDocRef = doc(db, 'live_tracking', alertId);
    await updateDoc(liveDocRef, {
      active: false,
      closedAt: serverTimestamp(),
    });
  },

  /**
   * Escuta em tempo real o histórico de alertas do usuário.
   */
  subscribeAlertHistory(onUpdate: (alerts: AlertHistoryItem[]) => void): Unsubscribe | null {
    const user = auth.currentUser;
    if (!user) return null;

    const colRef = collection(db, 'users', user.uid, 'alert_history');
    return onSnapshot(colRef, (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<AlertHistoryItem, 'id'>),
      }));
      onUpdate(list);
    });
  },

  /**
   * Exclui um alerta específico do histórico.
   */
  async deleteAlert(alertId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid, 'alert_history', alertId);
    await deleteDoc(docRef);
  },

  /**
   * Limpa todo o histórico de alertas do usuário autenticado.
   */
  async clearAllAlerts(): Promise<void> {
    const user = auth.currentUser;
    if (!user) return;

    const colRef = collection(db, 'users', user.uid, 'alert_history');
    const snapshot = await getDocs(colRef);
    const deletePromises = snapshot.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletePromises);
  },
};
