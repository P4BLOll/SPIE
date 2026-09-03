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
  ] = useState('Usuária');


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

            setUserName('Usuária');

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
          // BUSCAR TUDO AO MESMO TEMPO
          // =================================================

          const [
            userSnapshot,
            alertCountResult,
            contactsCountResult,
          ] = await Promise.all([

            getDoc(
              userRef
            ),

            getCountFromServer(
              alertHistoryRef
            ),

            getCountFromServer(
              contactsRef
            ),

          ]);


          // =================================================
          // DADOS DO FIRESTORE
          // =================================================

          if (
            userSnapshot.exists()
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
                'Usuária'
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
              'Usuária'
            );

            setUserAvatarId(
              0
            );

          }


          // =================================================
          // QUANTIDADE DE ALERTAS
          // =================================================

          try {

            setQuantidadeAlertas(
              alertCountResult
                .data()
                .count
            );

          } catch (error) {

            console.log(
              'Erro ao obter quantidade de alertas:',
              error
            );

            setQuantidadeAlertas(0);

          }


          // =================================================
          // QUANTIDADE DE CONTATOS
          // =================================================

          try {

            setQuantidadeContatos(
              contactsCountResult
                .data()
                .count
            );

          } catch (error) {

            console.log(
              'Erro ao obter quantidade de contatos:',
              error
            );

            setQuantidadeContatos(0);

          }


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
          '/profile/history',

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
          title: 'Erro',
          message: 'Usuário não autenticado.',
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
        title: 'Foto Atualizada',
        message: 'Sua foto de perfil foi alterada com sucesso!',
        type: 'success',
      });
    } catch (error) {
      console.warn('[Profile] Erro ao salvar foto:', error);
      showAlert({
        title: 'Erro',
        message: 'Não foi possível salvar a foto de perfil.',
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
          title: 'Recompilação Necessária',
          message: 'Para usar a galeria no seu celular/emulador, recompile o app rodando: npx expo run:android',
          type: 'info',
        });
        return;
      }

      const { status } = await picker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        showAlert({
          title: 'Permissão Necessária',
          message: 'Permita o acesso à galeria para escolher sua foto de perfil.',
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
      console.warn('[Profile] Erro ao abrir galeria:', error);
      showAlert({
        title: 'Erro',
        message: 'Não foi possível abrir a galeria de imagens.',
        type: 'error',
      });
    }
  }

  async function tirarComCamera() {
    try {
      const picker = getImagePicker();
      if (!picker) {
        showAlert({
          title: 'Recompilação Necessária',
          message: 'Para usar a câmera no seu celular/emulador, recompile o app rodando: npx expo run:android',
          type: 'info',
        });
        return;
      }

      const { status } = await picker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        showAlert({
          title: 'Permissão Necessária',
          message: 'Permita o acesso à câmera para tirar sua foto de perfil.',
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
      console.warn('[Profile] Erro ao abrir câmera:', error);
      showAlert({
        title: 'Erro',
        message: 'Não foi possível abrir a câmera.',
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
        title: 'Foto Removida',
        message: 'Seu avatar padrão foi restaurado.',
        type: 'info',
      });
    } catch (error) {
      console.warn('[Profile] Erro ao remover foto:', error);
      showAlert({
        title: 'Erro',
        message: 'Não foi possível remover a foto.',
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
      title: 'Sair da Conta',
      message: 'Deseja realmente encerrar a sua sessão no SPIE?',
      type: 'danger',
      confirmText: 'Sair',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        try {
          await signOut(auth);
          router.replace('/(auth)/login');
        } catch (error) {
          console.log('Erro ao sair da conta:', error);
          showAlert({
            title: 'Erro',
            message: 'Não foi possível sair da conta.',
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
          SUA CONTA
        </Text>


        <Text
          style={
            profileStyles.title
          }
        >
          Perfil
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
              Editar perfil
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
              Alertas
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
              Contatos
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
              Desde
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
          CONTA
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
            title="Histórico de alertas"
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
            title="Contatos de emergência"
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
            title="Privacidade"
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
            title="Sobre o SPIE"
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


          {/* SAIR */}

          <MenuItem
            icon="log-out-outline"
            title="Sair da conta"
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
            <Text style={profileStyles.photoModalTitle}>Foto de Perfil</Text>

            <TouchableOpacity
              style={profileStyles.photoModalOption}
              onPress={tirarComCamera}
              activeOpacity={0.7}
            >
              <Ionicons name="camera" size={22} color={cycleColors.rose} />
              <Text style={profileStyles.photoModalOptionText}>Tirar foto agora</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={profileStyles.photoModalOption}
              onPress={escolherDaGaleria}
              activeOpacity={0.7}
            >
              <Ionicons name="images" size={22} color={cycleColors.lavender} />
              <Text style={profileStyles.photoModalOptionText}>Escolher da galeria</Text>
            </TouchableOpacity>

            {userPhotoUrl && (
              <TouchableOpacity
                style={profileStyles.photoModalOption}
                onPress={removerFoto}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={22} color="#FF5C77" />
                <Text style={[profileStyles.photoModalOptionText, { color: '#FF5C77' }]}>
                  Remover foto personalizada
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={profileStyles.photoModalCancel}
              onPress={() => setModalFotoVisivel(false)}
              activeOpacity={0.7}
            >
              <Text style={profileStyles.photoModalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>

  );

}

