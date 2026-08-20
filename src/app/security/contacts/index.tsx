import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Background } from '@/components/Background';
import { AnimatedPressable } from '@/components/AnimatedPressable';

import { cycleColors } from '@/styles/calendar.styles';

import {
  contactsStyles as styles,
} from '@/styles/contacts.styles';

import {
  db,
  auth,
} from '@/services/firebaseConfig';

import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import { useSecurity } from '@/context/SecurityContext';


// =====================================================
// TIPAGEM
// =====================================================

interface Contact {
  id: string;
  name: string;
  phone: string;
}


// =====================================================
// TELA DE CONTATOS
// =====================================================

export default function ContactsScreen() {

  const { bloquear } = useSecurity();

  const [contacts, setContacts] =
    useState<Contact[]>([]);

  const [loading, setLoading] =
    useState(true);


  // =====================================================
  // CARREGAR CONTATOS
  // =====================================================

  useEffect(() => {

    const user = auth.currentUser;

    if (!user) {
      setContacts([]);
      setLoading(false);
      return;
    }

    const contactsRef = collection(
      db,
      'users',
      user.uid,
      'emergency_contacts'
    );

    const unsubscribe = onSnapshot(
      contactsRef,

      (snapshot) => {

        const data: Contact[] = [];

        snapshot.forEach((item) => {

          const contact = item.data();

          data.push({
            id: item.id,

            name:
              typeof contact.name === 'string'
                ? contact.name
                : '',

            phone:
              typeof contact.phone === 'string'
                ? contact.phone
                : '',
          });

        });

        setContacts(data);
        setLoading(false);
      },

      (error) => {

        console.log(
          'Erro ao carregar contatos:',
          error
        );

        setContacts([]);
        setLoading(false);

        Alert.alert(
          'Erro',
          'Não foi possível carregar seus contatos de emergência.'
        );
      }
    );

    return () => {
      unsubscribe();
    };

  }, []);


  // =====================================================
  // VOLTAR
  // =====================================================

  function voltar() {

    bloquear();

    router.back();

  }


  // =====================================================
  // EXCLUIR CONTATO
  // =====================================================

  function deleteContact(
    id: string,
    name: string
  ) {

    const user = auth.currentUser;

    if (!user) {

      Alert.alert(
        'Erro',
        'Usuário não autenticado.'
      );

      return;
    }

    Alert.alert(
      'Excluir contato',

      `Deseja remover ${name}?`,

      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',
          style: 'destructive',

          onPress: async () => {

            try {

              const contactRef = doc(
                db,
                'users',
                user.uid,
                'emergency_contacts',
                id
              );

              await deleteDoc(contactRef);

            } catch (error) {

              console.log(
                'Erro ao excluir contato:',
                error
              );

              Alert.alert(
                'Erro',
                'Não foi possível excluir o contato.'
              );
            }
          },
        },
      ]
    );
  }


  // =====================================================
  // TELA
  // =====================================================

  return (

    <View
      style={{
        flex: 1,
        backgroundColor: cycleColors.background,
      }}
    >

      <Background
        style={{
          flex: 1,
          backgroundColor: cycleColors.background,
        }}
      >

        <View
          style={[
            styles.root,
            {
              backgroundColor:
                cycleColors.background,
            },
          ]}
        >

          {/* =================================================
              CABEÇALHO
          ================================================= */}

          <View
            style={[
              styles.fixedHeader,
              {
                backgroundColor:
                  cycleColors.background,
                borderBottomColor:
                  'rgba(255,255,255,0.06)',
              },
            ]}
          >

            <AnimatedPressable
              style={[
                styles.backButton,
                {
                  backgroundColor:
                    cycleColors.surface,
                },
              ]}
              onPress={voltar}
            >

              <Ionicons
                name="arrow-back"
                size={22}
                color={cycleColors.text}
              />

            </AnimatedPressable>


            <View
              style={styles.headerTextWrap}
            >

              <Text
                style={[
                  styles.title,
                  {
                    color:
                      cycleColors.text,
                  },
                ]}
              >
                Contatos de emergência
              </Text>


              <Text
                style={[
                  styles.subtitle,
                  {
                    color:
                      cycleColors.textMuted,
                  },
                ]}
              >
                Pessoas que receberão alertas do SPIE
              </Text>

            </View>

          </View>


          {/* =================================================
              BOTÃO ADICIONAR
          ================================================= */}

          <View
            style={styles.addButtonWrap}
          >

            <AnimatedPressable
              onPress={() =>
                router.push(
                  '/security/contacts/add'
                )
              }
            >

              <LinearGradient
                colors={[
                  cycleColors.rose,
                  cycleColors.lavender,
                ]}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
                style={styles.addButton}
              >

                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color="#FFFFFF"
                />

                <Text
                  style={styles.addButtonText}
                >
                  Adicionar contato
                </Text>

              </LinearGradient>

            </AnimatedPressable>

          </View>


          {/* =================================================
              CARREGANDO
          ================================================= */}

          {loading ? (

            <ActivityIndicator
              size="small"
              color={cycleColors.rose}
              style={{
                marginTop: 40,
              }}
            />

          ) : contacts.length === 0 ? (

            /* =================================================
               ESTADO VAZIO
            ================================================= */

            <View
              style={styles.emptyState}
            >

              <Ionicons
                name="people-outline"
                size={52}
                color={cycleColors.lavender}
              />

              <Text
                style={[
                  styles.emptyTitle,
                  {
                    color:
                      cycleColors.text,
                  },
                ]}
              >
                Nenhum contato cadastrado
              </Text>

              <Text
                style={[
                  styles.emptySubtitle,
                  {
                    color:
                      cycleColors.textMuted,
                  },
                ]}
              >
                Toque em "Adicionar contato" para
                cadastrar o primeiro.
              </Text>

            </View>

          ) : (

            /* =================================================
               LISTA
            ================================================= */

            <FlatList
              data={contacts}

              keyExtractor={(item) =>
                item.id
              }

              showsVerticalScrollIndicator={false}

              contentContainerStyle={
                styles.listContent
              }

              renderItem={({ item }) => (

                <View
                  style={[
                    styles.contactCard,
                    {
                      backgroundColor:
                        cycleColors.surface,
                    },
                  ]}
                >

                  {/* =========================================
                      INFORMAÇÕES
                  ========================================= */}

                  <View
                    style={styles.contactInfo}
                  >

                    <View
                      style={[
                        styles.avatarBadge,
                        {
                          backgroundColor:
                            cycleColors.roseSoft,
                        },
                      ]}
                    >

                      <Ionicons
                        name="person"
                        size={18}
                        color={cycleColors.rose}
                      />

                    </View>


                    <View
                      style={{
                        flexShrink: 1,
                      }}
                    >

                      <Text
                        style={[
                          styles.contactName,
                          {
                            color:
                              cycleColors.text,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>


                      <Text
                        style={[
                          styles.contactPhone,
                          {
                            color:
                              cycleColors.textMuted,
                          },
                        ]}
                      >
                        {item.phone}
                      </Text>

                    </View>

                  </View>


                  {/* =========================================
                      AÇÕES
                  ========================================= */}

                  <View
                    style={styles.actionsRow}
                  >

                    {/* EDITAR */}

                    <AnimatedPressable
                      style={[
                        styles.actionBadge,
                        {
                          backgroundColor:
                            cycleColors.tealSoft,
                        },
                      ]}
                      onPress={() =>
                        router.push({
                          pathname:
                            '/security/contacts/edit',
                          params: {
                            id: item.id,
                          },
                        })
                      }
                    >

                      <Ionicons
                        name="create-outline"
                        size={18}
                        color={cycleColors.teal}
                      />

                    </AnimatedPressable>


                    {/* EXCLUIR */}

                    <AnimatedPressable
                      style={[
                        styles.actionBadge,
                        {
                          backgroundColor:
                            cycleColors.roseSoft,
                        },
                      ]}
                      onPress={() =>
                        deleteContact(
                          item.id,
                          item.name
                        )
                      }
                    >

                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color={cycleColors.rose}
                      />

                    </AnimatedPressable>

                  </View>

                </View>

              )}
            />

          )}

        </View>

      </Background>

    </View>

  );
}