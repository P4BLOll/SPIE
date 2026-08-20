import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import { Background } from '@/components/Background';

import { cycleColors } from '@/constants/Colors';

import { securityStyles as styles } from '@/styles/security.styles';

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

export default function AlertHistory() {

  const [alertas, setAlertas] = useState<Alerta[]>([]);

  const [carregando, setCarregando] =
    useState(true);


  // =====================================================
  // USUÁRIO ATUAL
  // =====================================================

  const currentUser = auth.currentUser;


  // =====================================================
  // CARREGAR HISTÓRICO DO FIREBASE
  // =====================================================

  useEffect(() => {

    if (!currentUser) {

      setAlertas([]);

      setCarregando(false);

      return;
    }


    const alertasRef = collection(
      db,
      'users',
      currentUser.uid,
      'alert_history'
    );


    const alertasQuery = query(
      alertasRef,
      orderBy('createdAt', 'desc')
    );


    const unsubscribe = onSnapshot(
      alertasQuery,

      (snapshot) => {

        const dados: Alerta[] = [];


        snapshot.forEach((documentSnapshot) => {

          const data =
            documentSnapshot.data();


          let dataFormatada =
            'Data não disponível';


          // =================================================
          // DATA DO FIREBASE
          // =================================================

          if (
            data.createdAt &&
            typeof data.createdAt.toDate === 'function'
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


          dados.push({

            id: documentSnapshot.id,

            data: dataFormatada,

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

        });


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


    return () => unsubscribe();

  }, [currentUser?.uid]);


  // =====================================================
  // CARREGANDO
  // =====================================================

  if (carregando) {

    return (
      <Background>

        <View style={styles.container}>

          <View style={styles.header}>

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
                y: 1,
              }}
              style={styles.headerIconRing}
            >

              <Ionicons
                name="time"
                size={32}
                color="#FFFFFF"
              />

            </LinearGradient>


            <Text style={styles.title}>
              Histórico de Alertas
            </Text>


            <Text style={styles.subtitle}>
              Veja os momentos em que o sistema enviou alertas.
            </Text>

          </View>


          <View style={styles.emptyCard}>

            <ActivityIndicator
              size="large"
              color={cycleColors.rose}
            />

            <Text style={styles.emptyTitle}>
              Carregando histórico...
            </Text>

          </View>

        </View>

      </Background>
    );
  }


  // =====================================================
  // TELA
  // =====================================================

  return (

    <Background>

      <View style={styles.container}>

        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <View style={styles.header}>

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
              y: 1,
            }}
            style={styles.headerIconRing}
          >

            <Ionicons
              name="time"
              size={32}
              color="#FFFFFF"
            />

          </LinearGradient>


          <Text style={styles.title}>
            Histórico de Alertas
          </Text>


          <Text style={styles.subtitle}>
            Veja os momentos em que o sistema enviou alertas.
          </Text>

        </View>


        {/* =================================================
            NENHUM ALERTA
        ================================================= */}

        {alertas.length === 0 ? (

          <View style={styles.emptyCard}>

            <Ionicons
              name="shield-checkmark-outline"
              size={44}
              color={cycleColors.teal}
            />


            <Text style={styles.emptyTitle}>
              Nenhum alerta registrado
            </Text>


            <Text style={styles.cardText}>
              Quando um alerta SOS for enviado,
              ele aparecerá aqui.
            </Text>

          </View>

        ) : (


          /* =================================================
             LISTA DE ALERTAS
          ================================================= */

          alertas.map((alerta) => (

            <View
              key={alerta.id}
              style={styles.alertItem}
            >

              <View style={styles.alertIconWrap}>

                <Ionicons
                  name="warning"
                  size={20}
                  color={cycleColors.danger}
                />

              </View>


              <View style={styles.alertInfo}>

                <Text style={styles.alertType}>
                  {alerta.tipo}
                </Text>


                <Text style={styles.alertDate}>
                  {alerta.data}
                </Text>

              </View>


              <Text style={styles.alertStatus}>
                {alerta.status}
              </Text>

            </View>

          ))

        )}

      </View>

    </Background>

  );
}