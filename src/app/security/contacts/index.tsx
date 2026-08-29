import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';
import { AnimatedPressable } from '@/components/AnimatedPressable';

import { cycleColors } from '@/styles/calendar.styles';

import {
  contactsStyles as styles,
} from '@/styles/contacts.styles';

import { useSecurity } from '@/modules/security-vault/contexts/SecurityContext';
import { useDialog } from '@/context/DialogContext';
import { emergencyRepository } from '@/modules/emergency/services/emergencyRepository';
import { EmergencyContact } from '@/modules/emergency/types/emergency.types';

// =====================================================
// TELA DE CONTATOS
// =====================================================

export default function ContactsScreen() {
  const { bloquear } = useSecurity();
  const { showConfirm, showAlert } = useDialog();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CARREGAR CONTATOS
  // =====================================================

  useEffect(() => {
    const unsubscribe = emergencyRepository.subscribeContacts((data) => {
      setContacts(data);
      setLoading(false);
    });

    if (!unsubscribe) {
      setContacts([]);
      setLoading(false);
    }

    return () => {
      unsubscribe?.();
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

  function deleteContact(id: string, name: string) {
    showConfirm({
      title: 'Excluir Contato',
      message: `Deseja realmente remover ${name} dos seus contatos de emergência?`,
      type: 'danger',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        try {
          await emergencyRepository.deleteContact(id);
        } catch (error) {
          console.log('Erro ao excluir contato:', error);
          showAlert({
            title: 'Erro',
            message: 'Não foi possível excluir o contato.',
            type: 'error',
          });
        }
      },
    });
  }


  // =====================================================
  // TELA
  // =====================================================

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: cycleColors.background,
      }}
      edges={['top', 'left', 'right']}
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

              <View
                style={[
                  styles.addButton,
                  { backgroundColor: cycleColors.rose },
                ]}
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
              </View>
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
              keyExtractor={(item, index) => (item as any).id || `contact-${index}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
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
                        {item.nome || 'Contato'}
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
                        {item.telefone || ''}
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
                            id: (item as any).id || '',
                          },
                        })
                      }
                    >

                      <Ionicons
                        name="pencil-outline"
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
                          (item as any).id || '',
                          (item as any).nome || (item as any).name || 'Contato'
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
    </SafeAreaView>
  );
}