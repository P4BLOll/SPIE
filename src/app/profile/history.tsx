import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { router } from 'expo-router';

import { Background } from '@/components/Background';

import { cycleColors } from '@/styles/calendar.styles';

import {
  historyStyles as styles,
} from '@/styles/history.styles';

import {
  db,
  auth,
} from '@/services/firebaseConfig';

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';


// =====================================================
// TIPAGEM
// =====================================================

interface Alerta {
  id: string;
  data: string;
  tipo: string;
  status: string;
  createdAt?: Timestamp;
}


// =====================================================
// COMPONENTE
// =====================================================

export default function History() {

  const [
    alertas,
    setAlertas,
  ] = useState<Alerta[]>([]);


  const [
    carregando,
    setCarregando,
  ] = useState(true);


  // =====================================================
  // CARREGAR HISTÓRICO
  // =====================================================

  useEffect(() => {

    // ---------------------------------------------------
    // PEGA O USUÁRIO ATUAL
    // ---------------------------------------------------

    const currentUser =
      auth.currentUser;


    // ---------------------------------------------------
    // USUÁRIO NÃO AUTENTICADO
    // ---------------------------------------------------

    if (!currentUser) {

      setAlertas([]);

      setCarregando(false);

      return;

    }


    // =================================================
    // REFERÊNCIA DO HISTÓRICO
    // =================================================

    const alertasRef =
      collection(
        db,
        'users',
        currentUser.uid,
        'alert_history'
      );


    // =================================================
    // QUERY
    // =================================================

    const alertasQuery =
      query(
        alertasRef,
        orderBy(
          'createdAt',
          'desc'
        )
      );


    // =================================================
    // LISTENER
    // =================================================

    const unsubscribe =
      onSnapshot(

        alertasQuery,

        (snapshot) => {

          const dados: Alerta[] = [];


          snapshot.forEach(
            (documentSnapshot) => {

              const data =
                documentSnapshot.data();


              // -----------------------------------------
              // DATA PADRÃO
              // -----------------------------------------

              let dataFormatada =
                'Data não disponível';


              // -----------------------------------------
              // DATA DO ALERTA
              // -----------------------------------------

              if (
                data.createdAt &&
                typeof data.createdAt.toDate ===
                  'function'
              ) {

                const dataAlerta =
                  data.createdAt.toDate();


                dataFormatada =
                  dataAlerta.toLocaleString(
                    'pt-BR',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  );

              }


              // -----------------------------------------
              // ADICIONAR ALERTA
              // -----------------------------------------

              dados.push({

                id:
                  documentSnapshot.id,

                data:
                  dataFormatada,

                tipo:
                  typeof data.tipo === 'string'
                    ? data.tipo
                    : 'SOS',

                status:
                  typeof data.status === 'string'
                    ? data.status
                    : 'Enviado',

                createdAt:
                  data.createdAt,

              });

            }
          );


          setAlertas(dados);

          setCarregando(false);

        },

        (error) => {

          console.log(
            'Erro ao carregar histórico de alertas:',
            error
          );


          setAlertas([]);

          setCarregando(false);

        }

      );


    // =================================================
    // LIMPAR LISTENER
    // =================================================

    return () => {

      unsubscribe();

    };

  }, []);


  // =====================================================
  // VOLTAR PARA O PERFIL
  // =====================================================

  function voltar() {

    /*
     * O histórico é acessado somente através do Perfil.
     *
     * Não usamos router.back(), porque o histórico
     * de navegação pode conter a tela /secret.
     *
     * Também não usamos signOut() ou qualquer função
     * relacionada à autenticação.
     *
     * O usuário simplesmente retorna para o Perfil.
     */

    router.replace(
      '/(tabs)/profile'
    );

  }


  // =====================================================
  // CARREGANDO
  // =====================================================

  if (carregando) {

    return (

      <Background>

        <View
          style={
            styles.screen
          }
        >

          <View
            style={
              styles.container
            }
          >

            {/* =========================================
                BOTÃO VOLTAR
            ========================================= */}

            <TouchableOpacity
              style={
                styles.backButton
              }
              activeOpacity={0.7}
              onPress={voltar}
            >

              <Ionicons
                name="arrow-back"
                size={22}
                color={
                  cycleColors.text
                }
              />

            </TouchableOpacity>


            {/* =========================================
                CABEÇALHO
            ========================================= */}

            <Text
              style={
                styles.eyebrow
              }
            >
              SEGURANÇA
            </Text>


            <Text
              style={
                styles.title
              }
            >
              Histórico de alertas
            </Text>


            {/* =========================================
                CARREGANDO
            ========================================= */}

            <View
              style={
                styles.card
              }
            >

              <ActivityIndicator
                size="large"
                color={
                  cycleColors.rose
                }
              />


              <Text
                style={
                  styles.text
                }
              >
                Carregando histórico...
              </Text>

            </View>

          </View>

        </View>

      </Background>

    );

  }


  // =====================================================
  // TELA PRINCIPAL
  // =====================================================

  return (

    <Background>

      <View
        style={
          styles.screen
        }
      >

        <View
          style={
            styles.container
          }
        >

          {/* =============================================
              BOTÃO VOLTAR
          ============================================= */}

          <TouchableOpacity
            style={
              styles.backButton
            }
            activeOpacity={0.7}
            onPress={voltar}
          >

            <Ionicons
              name="arrow-back"
              size={22}
              color={
                cycleColors.text
              }
            />

          </TouchableOpacity>


          {/* =============================================
              CABEÇALHO
          ============================================= */}

          <Text
            style={
              styles.eyebrow
            }
          >
            SEGURANÇA
          </Text>


          <Text
            style={
              styles.title
            }
          >
            Histórico de alertas
          </Text>


          {/* =============================================
              NENHUM ALERTA
          ============================================= */}

          {alertas.length === 0 ? (

            <View
              style={
                styles.card
              }
            >

              <View
                style={
                  styles.iconRing
                }
              >

                <Ionicons
                  name="shield-checkmark"
                  size={40}
                  color={
                    cycleColors.teal
                  }
                />

              </View>


              <Text
                style={
                  styles.text
                }
              >
                Nenhum alerta registrado
              </Text>


              <Text
                style={
                  styles.sub
                }
              >
                Quando ocorrer uma emergência,
                ela aparecerá aqui.
              </Text>

            </View>

          ) : (

            /* =============================================
               LISTA DE ALERTAS
            ============================================= */

            <View>

              {alertas.map(
                (alerta) => (

                  <View
                    key={
                      alerta.id
                    }
                    style={
                      styles.card
                    }
                  >

                    <View
                      style={{
                        flexDirection:
                          'row',
                        alignItems:
                          'center',
                      }}
                    >

                      {/* =================================
                          ÍCONE
                      ================================= */}

                      <View
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 24,
                          alignItems:
                            'center',
                          justifyContent:
                            'center',
                          backgroundColor:
                            cycleColors.dangerSoft,
                          marginRight: 14,
                        }}
                      >

                        <Ionicons
                          name="warning"
                          size={22}
                          color={
                            cycleColors.danger
                          }
                        />

                      </View>


                      {/* =================================
                          INFORMAÇÕES
                      ================================= */}

                      <View
                        style={{
                          flex: 1,
                        }}
                      >

                        <Text
                          style={
                            styles.text
                          }
                        >
                          {alerta.tipo}
                        </Text>


                        <Text
                          style={
                            styles.sub
                          }
                        >
                          {alerta.data}
                        </Text>

                      </View>


                      {/* =================================
                          STATUS
                      ================================= */}

                      <View
                        style={{
                          paddingHorizontal:
                            10,
                          paddingVertical:
                            6,
                          borderRadius:
                            12,
                          backgroundColor:
                            alerta.status
                              .toLowerCase()
                              .includes(
                                'cancel'
                              )
                              ? cycleColors.roseSoft
                              : cycleColors.tealSoft,
                        }}
                      >

                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight:
                              '600',
                            color:
                              alerta.status
                                .toLowerCase()
                                .includes(
                                  'cancel'
                                )
                                ? cycleColors.rose
                                : cycleColors.teal,
                          }}
                        >
                          {alerta.status}
                        </Text>

                      </View>

                    </View>

                  </View>

                )
              )}

            </View>

          )}

        </View>

      </View>

    </Background>

  );

}