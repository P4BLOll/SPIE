import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { Colors } from '../../constants/Colors';
import { db, auth } from '../../services/firebaseConfig';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export default function ContactsScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const currentUser = auth.currentUser;

  // Escuta a subcoleção de contatos em tempo real dentro do nó do usuário logado
  useEffect(() => {
    if (!currentUser) return;

    // 📂 Caminho da subcoleção: users -> {userId} -> emergency_contacts
    const contactsCollectionRef = collection(db, 'users', currentUser.uid, 'emergency_contacts');

    // O onSnapshot mantém o app atualizado se houver mudanças nessa subcoleção específica
    const unsubscribe = onSnapshot(contactsCollectionRef, (querySnapshot) => {
      const contactsData: Contact[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        contactsData.push({
          id: doc.id,
          name: data.name,
          phone: data.phone,
        });
      });
      setContacts(contactsData);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar subcoleção de contatos: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Função para salvar o contato na subcoleção do usuário
  async function handleAddContact() {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o nome e o telefone do contato.');
      return;
    }

    if (!currentUser) return;

    setSubmitting(true);
    try {
      // 📂 Apontando para a subcoleção interna do usuário
      const contactsCollectionRef = collection(db, 'users', currentUser.uid, 'emergency_contacts');
      
      await addDoc(contactsCollectionRef, {
        name: name.trim(),
        phone: phone.trim(),
        createdAt: new Date(),
      });

      setName('');
      setPhone('');
      Keyboard.dismiss();
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível salvar o contato na sua lista.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  // Função para deletar um contato de dentro da subcoleção
  async function handleDeleteContact(id: string, contactName: string) {
    if (!currentUser) return;

    Alert.alert(
      "Remover Contato",
      `Tem certeza que deseja remover ${contactName}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Remover", 
          style: "destructive",
          onPress: async () => {
            try {
              // 📂 Apontando para o documento específico dentro da subcoleção do usuário
              const contactDocRef = doc(db, 'users', currentUser.uid, 'emergency_contacts', id);
              await deleteDoc(contactDocRef);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível deletar o contato.');
              console.error(error);
            }
          }
        }
      ]
    );
  }

  return (
    <Background style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contatos de Emergência</Text>
        <Text style={styles.subtitle}>Sua lista de apoio salva com segurança no seu perfil</Text>
      </View>

      {/* Formulário para Adicionar Contato */}
      <View style={styles.formCard}>
        <TextInput
          style={styles.input}
          placeholder="Nome do contato de confiança"
          placeholderTextColor={Colors.textMuted}
          value={name}
          onChangeText={setName}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Celular com DDD"
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddContact}
            disabled={submitting}
            activeOpacity={0.8}
          >
            {submitting ? (
              <ActivityIndicator color={Colors.text} size="small" />
            ) : (
              <Ionicons name="add" size={24} color={Colors.text} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Contatos */}
      {loading ? (
        <ActivityIndicator color={Colors.accent} style={{ marginTop: 40 }} />
      ) : contacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={48} color={Colors.textMuted} style={{ marginBottom: 12 }} />
          <Text style={styles.emptyText}>Nenhum contato na sua subcoleção.</Text>
          <Text style={styles.emptySubText}>Sua rede de apoio aparecerá aqui.</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
              </View>
              <TouchableOpacity 
                onPress={() => handleDeleteContact(item.id, item.name)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-outline" size={20} color={Colors.danger} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 40 },
  header: { marginBottom: 24, marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
  subtitle: { fontSize: 13, color: Colors.textMuted, marginTop: 4 },
  formCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  row: { flexDirection: 'row', gap: 12, marginTop: 12 },
  input: {
    height: 48,
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: Colors.text,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactInfo: { flex: 1 },
  contactName: { color: Colors.text, fontSize: 16, fontWeight: '600' },
  contactPhone: { color: Colors.textMuted, fontSize: 13, marginTop: 2 },
  deleteButton: { padding: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 80 },
  emptyText: { color: Colors.text, fontSize: 15, fontWeight: '500' },
  emptySubText: { color: Colors.textMuted, fontSize: 12, marginTop: 4 },
});