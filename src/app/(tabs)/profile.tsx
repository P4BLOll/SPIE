import React from 'react';

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { router } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { profileStyles } from '@/styles/profile.styles';

import {
  cycleColors,
  TAB_BAR_BASE_HEIGHT,
} from '@/styles/calendar.styles';


// =====================================================
// ITEM DE MENU
// =====================================================

function MenuItem({
  icon,
  title,
  iconColor = cycleColors.text,
  iconBg = cycleColors.surfaceAlt,
  isLast = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  iconColor?: string;
  iconBg?: string;
  isLast?: boolean;
  onPress?: () => void;
}) {

  return (
    <TouchableOpacity
      style={[
        profileStyles.menuItem,
        isLast && profileStyles.menuItemLast,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >

      <View style={profileStyles.menuLeft}>

        <View
          style={[
            profileStyles.menuIconWrap,
            {
              backgroundColor: iconBg,
            },
          ]}
        >

          <Ionicons
            name={icon}
            size={18}
            color={iconColor}
          />

        </View>

        <Text style={profileStyles.menuText}>
          {title}
        </Text>

      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color={cycleColors.textMuted}
      />

    </TouchableOpacity>
  );
}


// =====================================================
// PROFILE
// =====================================================

export default function ProfileScreen() {

  const userEmail = 'usuario@email.com';

  const insets = useSafeAreaInsets();

  const espacoParaTabBar =
    TAB_BAR_BASE_HEIGHT +
    insets.bottom +
    24;


  // =====================================================
  // ABRIR CONTATOS DE EMERGÊNCIA
  // =====================================================

  function abrirContatosEmergencia() {

    router.push({
      pathname: '/secret',
      params: {
        destino: '/security/contacts',
      },
    });

  }


  // =====================================================
  // LOGOUT
  // =====================================================

  function handleLogout() {

    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair?',

      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Sair',
          style: 'destructive',

          onPress: () => {
            router.replace('/login');
          },
        },
      ],
    );

  }


  // =====================================================
  // TELA
  // =====================================================

  return (

    <SafeAreaView
      style={profileStyles.container}
      edges={[
        'top',
        'left',
        'right',
      ]}
    >

      {/* =================================================
          CABEÇALHO FIXO
      ================================================= */}

      <View style={profileStyles.fixedHeader}>

        <Text style={profileStyles.eyebrow}>
          SUA CONTA
        </Text>

        <Text style={profileStyles.title}>
          Perfil
        </Text>

      </View>


      {/* =================================================
          CONTEÚDO ROLÁVEL
      ================================================= */}

      <ScrollView
        style={profileStyles.scrollArea}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          profileStyles.scroll,
          {
            paddingBottom: espacoParaTabBar,
          },
        ]}
      >

        {/* =================================================
            AVATAR
        ================================================= */}

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
          style={profileStyles.avatarRing}
        >

          <View style={profileStyles.avatar}>

            <Image
              source={{
                uri:
                  `https://api.dicebear.com/9.x/adventurer/png?seed=${userEmail}`,
              }}
              style={profileStyles.avatarImage}
            />

          </View>

        </LinearGradient>


        {/* =================================================
            DADOS DO USUÁRIO
        ================================================= */}

        <Text style={profileStyles.name}>
          Usuária
        </Text>

        <Text style={profileStyles.email}>
          {userEmail}
        </Text>


        {/* =================================================
            EDITAR PERFIL
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            router.push('/profile/edit')
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
            style={profileStyles.editButton}
          >

            <Ionicons
              name="pencil"
              size={16}
              color="#FFFFFF"
            />

            <Text style={profileStyles.editButtonText}>
              Editar perfil
            </Text>

          </LinearGradient>

        </TouchableOpacity>


        {/* =================================================
            ESTATÍSTICAS
        ================================================= */}

        <View style={profileStyles.statsContainer}>

          {/* ALERTAS */}

          <View style={profileStyles.statCard}>

            <View
              style={[
                profileStyles.statIconWrap,
                {
                  backgroundColor:
                    cycleColors.roseSoft,
                },
              ]}
            >

              <Ionicons
                name="notifications-outline"
                size={18}
                color={cycleColors.rose}
              />

            </View>

            <Text style={profileStyles.statNumber}>
              12
            </Text>

            <Text style={profileStyles.statTitle}>
              Alertas
            </Text>

          </View>


          {/* CONTATOS */}

          <View style={profileStyles.statCard}>

            <View
              style={[
                profileStyles.statIconWrap,
                {
                  backgroundColor:
                    cycleColors.tealSoft,
                },
              ]}
            >

              <Ionicons
                name="people-outline"
                size={18}
                color={cycleColors.teal}
              />

            </View>

            <Text style={profileStyles.statNumber}>
              5
            </Text>

            <Text style={profileStyles.statTitle}>
              Contatos
            </Text>

          </View>


          {/* DESDE */}

          <View style={profileStyles.statCard}>

            <View
              style={[
                profileStyles.statIconWrap,
                {
                  backgroundColor:
                    cycleColors.goldSoft,
                },
              ]}
            >

              <Ionicons
                name="calendar-outline"
                size={18}
                color={cycleColors.gold}
              />

            </View>

            <Text style={profileStyles.statNumber}>
              2026
            </Text>

            <Text style={profileStyles.statTitle}>
              Desde
            </Text>

          </View>

        </View>


        {/* =================================================
            MENU
        ================================================= */}

        <Text style={profileStyles.menuSectionLabel}>
          CONTA
        </Text>


        <View style={profileStyles.menuContainer}>

          {/* HISTÓRICO */}

          <MenuItem
            icon="time-outline"
            title="Histórico de alertas"
            iconColor={cycleColors.teal}
            iconBg={cycleColors.tealSoft}
            onPress={() =>
              router.push('/profile/history')
            }
          />


          {/* CONTATOS DE EMERGÊNCIA */}

          <MenuItem
            icon="people-outline"
            title="Contatos de emergência"
            iconColor={cycleColors.lavender}
            iconBg={cycleColors.lavenderSoft}
            onPress={abrirContatosEmergencia}
          />


          {/* PRIVACIDADE */}

          <MenuItem
            icon="shield-checkmark-outline"
            title="Privacidade"
            iconColor={cycleColors.gold}
            iconBg={cycleColors.goldSoft}
            onPress={() =>
              router.push('/legal/privacy-policy')
            }
          />


          {/* SOBRE O SPIE */}

          <MenuItem
            icon="information-circle-outline"
            title="Sobre o SPIE"
            iconColor={cycleColors.rose}
            iconBg={cycleColors.roseSoft}
            onPress={() =>
              router.push('/legal/terms')
            }
          />


          {/* SAIR */}

          <MenuItem
            icon="log-out-outline"
            title="Sair da conta"
            iconColor="#FF5C77"
            iconBg="rgba(255, 92, 119, 0.16)"
            isLast
            onPress={handleLogout}
          />

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}