import React, {
  useCallback,
  useState,
} from 'react';

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { useDialog } from '@/context/DialogContext';

import { Ionicons } from '@expo/vector-icons';
import { requireOptionalNativeModule } from 'expo-modules-core';

function getImagePicker(): typeof import('expo-image-picker') | null {
  try {
    const nativeModule = requireOptionalNativeModule('ExponentImagePicker');
    if (!nativeModule) {
      return null;
    }
    return require('expo-image-picker');
  } catch {
    return null;
  }
}

import {
  router,
  useFocusEffect,
} from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { profileStyles } from '@/styles/profile.styles';
import { AppTutorial } from '@/components/AppTutorial';

import {
  cycleColors,
  TAB_BAR_BASE_HEIGHT,
} from '@/styles/calendar.styles';

import {
  auth,
  db,
} from '@/services/firebaseConfig';

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getCountFromServer,
  getDocs,
} from 'firebase/firestore';

import {
  signOut,
} from 'firebase/auth';


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
  disabled = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  iconColor?: string;
  iconBg?: string;
  isLast?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}) {

  return (

    <TouchableOpacity
      style={[
        profileStyles.menuItem,
        isLast &&
          profileStyles.menuItemLast,
        disabled && {
          opacity: 0.45,
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >

      <View
        style={
          profileStyles.menuLeft
        }
      >

        <View
          style={[
            profileStyles.menuIconWrap,
            {
              backgroundColor:
                iconBg,
            },
          ]}
        >

          <Ionicons
            name={icon}
            size={18}
            color={iconColor}
          />

        </View>


        <Text
          style={
            profileStyles.menuText
          }
        >
          {title}
        </Text>

      </View>


      <Ionicons
        name="chevron-forward"
        size={18}
        color={
          cycleColors.textMuted
        }
      />

    </TouchableOpacity>

  );

}


// =====================================================
// PROFILE
// =====================================================

export default function ProfileScreen() {
  const { showConfirm, showAlert } = useDialog();

  // =====================================================
  // ESTADOS DO USUÁRIO
  // ======================================================

  const [
    userName,
    setUserName,
  ] = useState('User');


  const [
    userEmail,
    setUserEmail,
  ] = useState('');


  const [
    userAvatarId,
    setUserAvatarId,
  ] = useState<number | null>(null);


  const [
    avatarCarregado,
    setAvatarCarregado,
  ] = useState(false);

  const [
    userPhotoUrl,
    setUserPhotoUrl,
  ] = useState<string | null>(null);

  const [
    modalFotoVisivel,
    setModalFotoVisivel,
  ] = useState(false);

  const [
    salvandoFoto,
    setSalvandoFoto,
  ] = useState(false);

  const [
    tutorialVisivel,
    setTutorialVisivel,
  ] = useState(false);


  const [
    quantidadeAlertas,
    setQuantidadeAlertas,
  ] = useState(0);


  const [
    quantidadeContatos,
    setQuantidadeContatos,
  ] = useState(0);


  const [
    anoCadastro,
    setAnoCadastro,
  ] = useState('----');


  const [
    carregando,
    setCarregando,
  ] = useState(true);


  const insets =
    useSafeAreaInsets();


  const espacoParaTabBar =
    TAB_BAR_BASE_HEIGHT +
    insets.bottom +
    24;


  // =====================================================
  // CARREGAR DADOS DO USUÁRIO
  // =====================================================

  const carregarUsuario =
    useCallback(
      async () => {

        let componenteAtivo = true;

        try {

          setCarregando(true);

          setAvatarCarregado(false);


          const user =
            auth.currentUser;


          // =================================================
          // USUÁRIO NÃO AUTENTICADO
          // =================================================

          if (!user) {

            setUserName('User');

            setUserEmail('');

            setUserAvatarId(null);
            setUserPhotoUrl(null);

            setQuantidadeAlertas(0);

            setQuantidadeContatos(0);

            setAnoCadastro('----');

            setAvatarCarregado(true);

            setCarregando(false);

            return;

          }


          // =================================================
          // DADOS IMEDIATOS DO FIREBASE AUTH
          // =================================================

          setUserEmail(
            user.email ?? ''
          );


          if (
            user.metadata?.creationTime
          ) {

            const dataCadastro =
              new Date(
                user.metadata.creationTime
              );


            setAnoCadastro(
              dataCadastro
                .getFullYear()
                .toString()
            );

          }


          // =================================================
          // REFERÊNCIAS
          // =================================================

          const userRef =
            doc(
              db,
              'users',
              user.uid
            );


          const alertHistoryRef =
            collection(
              db,
              'users',
              user.uid,
              'alert_history'
            );


          const contactsRef =
            collection(
              db,
              'users',
              user.uid,
              'emergency_contacts'
            );


          // =================================================
          // BUSCA SEGURA COM SUPORTE A MODO OFFLINE
          // =================================================

          let userSnapshot = null;
          try {
            userSnapshot = await getDoc(userRef);
          } catch (err) {
            console.log('Aviso ao carregar dados do usuário (modo offline ativo):', err);
          }

          let totalAlertas = 0;
          try {
            const alertCountResult = await getCountFromServer(alertHistoryRef);
            totalAlertas = alertCountResult.data().count;
          } catch {
            try {
              const snap = await getDocs(alertHistoryRef);
              totalAlertas = snap.size;
            } catch {}
          }

          let totalContatos = 0;
          try {
            const contactsCountResult = await getCountFromServer(contactsRef);
            totalContatos = contactsCountResult.data().count;
          } catch {
            try {
              const snap = await getDocs(contactsRef);
              totalContatos = snap.size;
            } catch {}
          }


          // =================================================
          // DADOS DO FIRESTORE
          // =================================================

          if (
            userSnapshot?.exists()
          ) {

            const data =
              userSnapshot.data();


            // -----------------------------------------------
            // NOME
            // -----------------------------------------------

            if (
              typeof data.fullName === 'string' &&
              data.fullName.trim() !== ''
            ) {

              setUserName(
                data.fullName.trim()
              );

            } else if (
              typeof data.name === 'string' &&
              data.name.trim() !== ''
            ) {

              setUserName(
                data.name.trim()
              );

            } else {

              setUserName(
                'User'
              );

            }


            // -----------------------------------------------
            // AVATAR
            // -----------------------------------------------

            if (
              typeof data.avatarId === 'number'
            ) {

              setUserAvatarId(
                data.avatarId
              );

            } else {

              setUserAvatarId(
                0
              );

            }


            // -----------------------------------------------
            // FOTO DE PERFIL
            // -----------------------------------------------

            if (
              typeof data.photoUrl === 'string' &&
              data.photoUrl.trim() !== ''
            ) {
              setUserPhotoUrl(data.photoUrl.trim());
            } else {
              setUserPhotoUrl(null);
            }

            // -----------------------------------------------
            // E-MAIL
            //
            // O perfil usa o e-mail salvo no Firestore
            // quando existir.
            // -----------------------------------------------

            if (
              typeof data.email === 'string' &&
              data.email.trim() !== ''
            ) {

              setUserEmail(
                data.email.trim()
              );

            } else {

              setUserEmail(
                user.email ?? ''
              );

            }

          } else {

            setUserName(
              'User'
            );

            setUserAvatarId(
              0
            );

          }


          setQuantidadeAlertas(totalAlertas);
          setQuantidadeContatos(totalContatos);


          // =================================================
          // AVATAR PODE SER EXIBIDO
          // =================================================

          setAvatarCarregado(true);

        } catch (error) {

          console.log(
            'Erro ao carregar dados do perfil:',
            error
          );


          setAvatarCarregado(true);

        } finally {

          setCarregando(false);

        }

      },
      []
    );


  // =====================================================
  // RECARREGAR SEMPRE QUE A TELA RECEBER FOCO
  // =====================================================

  useFocusEffect(
    useCallback(() => {

      let ativo = true;


      async function carregarAoVoltar() {

        if (!ativo) {
          return;
        }

        await carregarUsuario();

      }


      carregarAoVoltar();


      return () => {

        ativo = false;

      };

    }, [
      carregarUsuario,
    ])
  );


  // =====================================================
  // AVATAR
  // =====================================================

  const avatarSeed =
    `${auth.currentUser?.uid || userEmail || userName}-${userAvatarId ?? 0}`;


  const avatarUrl =
    avatarCarregado
      ? `https://api.dicebear.com/9.x/adventurer/png?seed=${encodeURIComponent(
          avatarSeed
        )}`
      : '';


  // =====================================================
  // ABRIR CONTATOS DE EMERGÊNCIA
  // =====================================================

  function abrirContatosEmergencia() {

    if (carregando) {
      return;
    }


    router.push({

      pathname: '/secret',

      params: {

        destino:
          '/security/contacts',

        origem:
          '/(tabs)/profile',

      },

    });

  }


  // =====================================================
  // ABRIR HISTÓRICO DE ALERTAS
  // =====================================================

  function abrirHistoricoAlertas() {

    if (carregando) {
      return;
    }


    router.push({

      pathname: '/secret',

      params: {

        destino:
          '/security/alert-history',

        origem:
          '/(tabs)/profile',

      },

    });

  }


  // =====================================================
  // GESTÃO DE FOTO DE PERFIL
  // =====================================================

  async function salvarFoto(asset: { uri: string; base64?: string | null }) {
    try {
      setSalvandoFoto(true);
      const user = auth.currentUser;
      if (!user) {
        showAlert({
          title: 'Error',
          message: 'User not authenticated.',
          type: 'error',
        });
        return;
      }

      const photoUri = asset.base64
        ? `data:image/jpeg;base64,${asset.base64}`
        : asset.uri;

      setUserPhotoUrl(photoUri);
      await updateDoc(doc(db, 'users', user.uid), { photoUrl: photoUri });
      setModalFotoVisivel(false);

      showAlert({
        title: 'Photo Updated',
        message: 'Your profile picture has been updated successfully!',
        type: 'success',
      });
    } catch (error) {
      console.warn('[Profile] Error saving photo:', error);
      showAlert({
        title: 'Error',
        message: 'Could not save profile picture.',
        type: 'error',
      });
    } finally {
      setSalvandoFoto(false);
    }
  }

  async function escolherDaGaleria() {
    try {
      const picker = getImagePicker();
      if (!picker) {
        showAlert({
          title: 'Rebuild Required',
          message: 'To use the gallery on your phone/emulator, rebuild the app by running: npx expo run:android',
          type: 'info',
        });
        return;
      }

      const { status } = await picker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        showAlert({
          title: 'Permission Required',
          message: 'Please allow gallery access to choose your profile picture.',
          type: 'warning',
        });
        return;
      }

      const result = await picker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        await salvarFoto(result.assets[0]);
      }
    } catch (error) {
      console.warn('[Profile] Error opening gallery:', error);
      showAlert({
        title: 'Error',
        message: 'Could not open image gallery.',
        type: 'error',
      });
    }
  }

  async function tirarComCamera() {
    try {
      const picker = getImagePicker();
      if (!picker) {
        showAlert({
          title: 'Rebuild Required',
          message: 'To use the camera on your phone/emulator, rebuild the app by running: npx expo run:android',
          type: 'info',
        });
        return;
      }

      const { status } = await picker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        showAlert({
          title: 'Permission Required',
          message: 'Please allow camera access to take your profile picture.',
          type: 'warning',
        });
        return;
      }

      const result = await picker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        await salvarFoto(result.assets[0]);
      }
    } catch (error) {
      console.warn('[Profile] Error opening camera:', error);
      showAlert({
        title: 'Error',
        message: 'Could not open camera.',
        type: 'error',
      });
    }
  }

  async function removerFoto() {
    try {
      setSalvandoFoto(true);
      const user = auth.currentUser;
      if (!user) return;

      setUserPhotoUrl(null);
      await updateDoc(doc(db, 'users', user.uid), { photoUrl: null });
      setModalFotoVisivel(false);

      showAlert({
        title: 'Photo Removed',
        message: 'Your default avatar has been restored.',
        type: 'info',
      });
    } catch (error) {
      console.warn('[Profile] Error removing photo:', error);
      showAlert({
        title: 'Error',
        message: 'Could not remove photo.',
        type: 'error',
      });
    } finally {
      setSalvandoFoto(false);
    }
  }

  // =====================================================
  // EDITAR PERFIL
  // =====================================================

  function abrirEditarPerfil() {

    if (carregando) {
      return;
    }


    router.push(
      '/profile/edit'
    );

  }


  // =====================================================
  // LOGOUT
  // =====================================================

  function handleLogout() {
    if (carregando) {
      return;
    }

    showConfirm({
      title: 'Log Out',
      message: 'Are you sure you want to end your SPIE session?',
      type: 'danger',
      confirmText: 'Log Out',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          await signOut(auth);
          router.replace('/(auth)/login');
        } catch (error) {
          console.log('Error logging out:', error);
          showAlert({
            title: 'Error',
            message: 'Could not log out.',
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
      style={
        profileStyles.container
      }
      edges={[
        'top',
        'left',
        'right',
      ]}
    >

      {/* =================================================
          CABEÇALHO FIXO
      ================================================= */}

      <View
        style={
          profileStyles.fixedHeader
        }
      >

        <Text
          style={
            profileStyles.eyebrow
          }
        >
          YOUR ACCOUNT
        </Text>


        <Text
          style={
            profileStyles.title
          }
        >
          Profile
        </Text>

      </View>


      {/* =================================================
          CONTEÚDO ROLÁVEL
      ================================================= */}

      <ScrollView
        style={
          profileStyles.scrollArea
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={[
          profileStyles.scroll,
          {
            paddingBottom:
              espacoParaTabBar,
          },
        ]}
      >

        {/* =================================================
            AVATAR
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={carregando || salvandoFoto}
          onPress={() => setModalFotoVisivel(true)}
          style={[
            profileStyles.avatarRing,
            { backgroundColor: cycleColors.rose },
          ]}
        >
          <View style={profileStyles.avatar}>
            {salvandoFoto ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: cycleColors.surface,
                }}
              >
                <ActivityIndicator size="small" color={cycleColors.rose} />
              </View>
            ) : userPhotoUrl ? (
              <Image
                source={{ uri: userPhotoUrl }}
                style={profileStyles.avatarImage}
              />
            ) : avatarCarregado ? (
              <Image
                key={avatarUrl}
                source={{
                  uri: avatarUrl,
                }}
                style={profileStyles.avatarImage}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: cycleColors.surface,
                }}
              >
                <ActivityIndicator
                  size="small"
                  color={cycleColors.rose}
                />
              </View>
            )}
          </View>

          <View style={profileStyles.cameraBadge}>
            <Ionicons name="camera" size={17} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* =================================================
            DADOS DO USUÁRIO
        ================================================= */}

        <Text
          style={
            profileStyles.name
          }
        >
          {userName}
        </Text>

        <Text
          style={
            profileStyles.email
          }
        >
          {userEmail}
        </Text>

        {/* =================================================
            BOTÃO EDITAR PERFIL
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={carregando}
          onPress={abrirEditarPerfil}
          style={{
            opacity:
              carregando
                ? 0.45
                : 1,
          }}
        >
          <View
            style={[
              profileStyles.editButton,
              { backgroundColor: cycleColors.rose },
            ]}
          >
            <Text
              style={
                profileStyles.editButtonText
              }
            >
              Edit profile
            </Text>
          </View>
        </TouchableOpacity>


        {/* =================================================
            ESTATÍSTICAS
        ================================================= */}

        <View
          style={
            profileStyles.statsContainer
          }
        >

          {/* ALERTAS */}

          <View
            style={
              profileStyles.statCard
            }
          >

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
                color={
                  cycleColors.rose
                }
              />

            </View>


            <Text
              style={
                profileStyles.statNumber
              }
            >
              {quantidadeAlertas}
            </Text>


            <Text
              style={
                profileStyles.statTitle
              }
            >
              Alerts
            </Text>

          </View>


          {/* CONTATOS */}

          <View
            style={
              profileStyles.statCard
            }
          >

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
                color={
                  cycleColors.teal
                }
              />

            </View>


            <Text
              style={
                profileStyles.statNumber
              }
            >
              {quantidadeContatos}
            </Text>


            <Text
              style={
                profileStyles.statTitle
              }
            >
              Contacts
            </Text>

          </View>


          {/* DESDE */}

          <View
            style={
              profileStyles.statCard
            }
          >

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
                color={
                  cycleColors.gold
                }
              />

            </View>


            <Text
              style={
                profileStyles.statNumber
              }
            >
              {anoCadastro}
            </Text>


            <Text
              style={
                profileStyles.statTitle
              }
            >
              Since
            </Text>

          </View>

        </View>


        {/* =================================================
            MENU
        ================================================= */}

        <Text
          style={
            profileStyles.menuSectionLabel
          }
        >
          ACCOUNT
        </Text>


        <View
          style={[
            profileStyles.menuContainer,
            carregando && {
              opacity: 0.45,
            },
          ]}
        >

          {/* HISTÓRICO */}

          <MenuItem
            icon="time-outline"
            title="Alert history"
            iconColor={
              cycleColors.teal
            }
            iconBg={
              cycleColors.tealSoft
            }
            onPress={
              abrirHistoricoAlertas
            }
            disabled={
              carregando
            }
          />


          {/* CONTATOS */}

          <MenuItem
            icon="people-outline"
            title="Emergency contacts"
            iconColor={
              cycleColors.lavender
            }
            iconBg={
              cycleColors.lavenderSoft
            }
            onPress={
              abrirContatosEmergencia
            }
            disabled={
              carregando
            }
          />


          {/* PRIVACIDADE */}

          <MenuItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            iconColor={
              cycleColors.gold
            }
            iconBg={
              cycleColors.goldSoft
            }
            onPress={() =>
              router.push(
                '/legal/privacy-policy'
              )
            }
            disabled={
              carregando
            }
          />


          {/* SOBRE */}

          <MenuItem
            icon="information-circle-outline"
            title="About SPIE / Terms"
            iconColor={
              cycleColors.rose
            }
            iconBg={
              cycleColors.roseSoft
            }
            onPress={() =>
              router.push(
                '/legal/terms'
              )
            }
            disabled={
              carregando
            }
          />


          {/* COMO USAR / TUTORIAL */}

          <MenuItem
            icon="help-circle-outline"
            title="How to use SPIE"
            iconColor={
              cycleColors.teal
            }
            iconBg={
              cycleColors.tealSoft
            }
            onPress={() =>
              setTutorialVisivel(true)
            }
            disabled={
              carregando
            }
          />


          {/* SAIR */}

          <MenuItem
            icon="log-out-outline"
            title="Log out"
            iconColor="#FF5C77"
            iconBg="rgba(255, 92, 119, 0.16)"
            isLast
            onPress={
              handleLogout
            }
            disabled={
              carregando
            }
          />

        </View>

      </ScrollView>

      {/* =================================================
          MODAL DE SELEÇÃO DE FOTO DE PERFIL
      ================================================= */}
      <Modal
        visible={modalFotoVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalFotoVisivel(false)}
      >
        <TouchableOpacity
          style={profileStyles.photoModalOverlay}
          activeOpacity={1}
          onPress={() => setModalFotoVisivel(false)}
        >
          <TouchableOpacity activeOpacity={1} style={profileStyles.photoModalContent}>
            <View style={profileStyles.photoModalHandle} />
            <Text style={profileStyles.photoModalTitle}>Profile Picture</Text>

            <TouchableOpacity
              style={profileStyles.photoModalOption}
              onPress={tirarComCamera}
              activeOpacity={0.7}
            >
              <Ionicons name="camera" size={22} color={cycleColors.rose} />
              <Text style={profileStyles.photoModalOptionText}>Take photo now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={profileStyles.photoModalOption}
              onPress={escolherDaGaleria}
              activeOpacity={0.7}
            >
              <Ionicons name="images" size={22} color={cycleColors.lavender} />
              <Text style={profileStyles.photoModalOptionText}>Choose from gallery</Text>
            </TouchableOpacity>

            {userPhotoUrl && (
              <TouchableOpacity
                style={profileStyles.photoModalOption}
                onPress={removerFoto}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={22} color="#FF5C77" />
                <Text style={[profileStyles.photoModalOptionText, { color: '#FF5C77' }]}>
                  Remove custom photo
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={profileStyles.photoModalCancel}
              onPress={() => setModalFotoVisivel(false)}
              activeOpacity={0.7}
            >
              <Text style={profileStyles.photoModalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <AppTutorial
        visible={tutorialVisivel}
        onFinish={() => setTutorialVisivel(false)}
      />

    </SafeAreaView>

  );

}

