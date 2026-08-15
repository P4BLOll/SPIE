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

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  router,
} from 'expo-router';

import {
  LinearGradient,
} from 'expo-linear-gradient';

import {
  Background,
} from '@/components/Background';

import {
  AnimatedPressable,
} from '@/components/AnimatedPressable';

import {
  cycleColors,
} from '@/constants/Colors';

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

import {
  useSecurity,
} from '@/context/SecurityContext';


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

  // =====================================================
  // SECURITY
  // =====================================================

  const {
    bloquear,
  } = useSecurity();


  // =====================================================
  // ESTADOS
  // =====================================================

  const [
    contacts,
    setContacts,
  ] = useState<Contact[]>([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  // =====================================================
  // CARREGAR CONTATOS
  // =====================================================

  useEffect(() => {

    const user =
      auth.currentUser;


    // ===================================================
    // USUÁRIO NÃO AUTENTICADO
    // ===================================================

    if (!user) {

      setContacts([]);

      setLoading(false);

      return;

    }


    // ===================================================
    // REFERÊNCIA DOS CONTATOS
    // ===================================================

    const contactsRef =
      collection(
        db,
        'users',
        user.uid,
        'emergency_contacts'
      );


    // ===================================================
    // LISTENER DO FIRESTORE
    // ===================================================

    const unsubscribe =
      onSnapshot(
        contactsRef,

        (snapshot) => {

          const data: Contact[] = [];


          snapshot.forEach(
            (item) => {

              const contact =
                item.data();


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

            }
          );


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


    // ===================================================
    // LIMPAR LISTENER
    // ===================================================

    return () => {

      unsubscribe();

    };

  }, []);


  // =====================================================
  // VOLTAR
  // =====================================================

  function voltar() {

    /*
     * A tela de contatos é uma área protegida.
     *
     * Ao sair dela, bloqueamos novamente
     * o acesso à área segura.
     *
     * Depois voltamos para o Perfil,
     * que é o ponto de entrada usado
     * pelo fluxo atual:
     *
     * Perfil
     * ↓
     * Secret
     * ↓
     * PIN
     * ↓
     * Contatos
     */

    bloquear();

    router.replace('/profile');

  }


  // =====================================================
  // EXCLUIR CONTATO
  // =====================================================

  function deleteContact(
    id: string,
    name: string
  ) {

    const user =
      auth.currentUser;


    // ===================================================
    // USUÁRIO NÃO AUTENTICADO
    // ===================================================

    if (!user) {

      Alert.alert(
        'Erro',
        'Usuário não autenticado.'
      );

      return;

    }


    // ===================================================
    // CONFIRMAÇÃO
    // ===================================================

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

              const contactRef =
                doc(
                  db,
                  'users',
                  user.uid,
                  'emergency_contacts',
                  id
                );


              await deleteDoc(
                contactRef
              );

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

    <Background>

      <View
        style={
          styles.root
        }
      >

        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <View
          style={
            styles.fixedHeader
          }
        >

          <AnimatedPressable
            style={
              styles.backButton
            }
            onPress={
              voltar
            }
          >

            <Ionicons
              name="arrow-back"
              size={22}
              color={
                cycleColors.text
              }
            />

          </AnimatedPressable>


          <View
            style={
              styles.headerTextWrap
            }
          >

            <Text
              style={
                styles.title
              }
            >
              Contatos de emergência
            </Text>


            <Text
              style={
                styles.subtitle
              }
            >
              Pessoas que receberão alertas do SPIE
            </Text>

          </View>

        </View>


        {/* =================================================
            BOTÃO ADICIONAR
        ================================================= */}

        <View
          style={
            styles.addButtonWrap
          }
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
              style={
                styles.addButton
              }
            >

              <Ionicons
                name="add-circle-outline"
                size={20}
                color="#FFFFFF"
              />


              <Text
                style={
                  styles.addButtonText
                }
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
            color={
              cycleColors.rose
            }
            style={{
              marginTop: 40,
            }}
          />

        ) : contacts.length === 0 ? (

          /* =================================================
             LISTA VAZIA
          ================================================= */

          <View
            style={
              styles.emptyState
            }
          >

            <Ionicons
              name="people-outline"
              size={52}
              color={
                cycleColors.textMuted
              }
            />


            <Text
              style={
                styles.emptyTitle
              }
            >
              Nenhum contato cadastrado
            </Text>


            <Text
              style={
                styles.emptySubtitle
              }
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
            data={
              contacts
            }

            keyExtractor={
              (item) =>
                item.id
            }

            showsVerticalScrollIndicator={
              false
            }

            contentContainerStyle={
              styles.listContent
            }

            renderItem={({
              item,
            }) => (

              <View
                style={
                  styles.contactCard
                }
              >

                {/* =========================================
                    INFORMAÇÕES DO CONTATO
                ========================================= */}

                <View
                  style={
                    styles.contactInfo
                  }
                >

                  <View
                    style={
                      styles.avatarBadge
                    }
                  >

                    <Ionicons
                      name="person"
                      size={18}
                      color={
                        cycleColors.rose
                      }
                    />

                  </View>


                  <View
                    style={{
                      flexShrink: 1,
                    }}
                  >

                    <Text
                      style={
                        styles.contactName
                      }
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>


                    <Text
                      style={
                        styles.contactPhone
                      }
                    >
                      {item.phone}
                    </Text>

                  </View>

                </View>


                {/* =========================================
                    AÇÕES
                ========================================= */}

                <View
                  style={
                    styles.actionsRow
                  }
                >

                  {/* =======================================
                      EDITAR
                  ======================================= */}

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
                      color={
                        cycleColors.teal
                      }
                    />

                  </AnimatedPressable>


                  {/* =======================================
                      EXCLUIR
                  ======================================= */}

                  <AnimatedPressable
                    style={[
                      styles.actionBadge,
                      {
                        backgroundColor:
                          cycleColors.dangerSoft,
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
                      color={
                        cycleColors.danger
                      }
                    />

                  </AnimatedPressable>

                </View>

              </View>

            )}
          />

        )}

      </View>

    </Background>

  );

}