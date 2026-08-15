import React, { useState } from 'react';

import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Background } from '../../components/Background';
import { cycleColors } from '../../styles/calendar.styles';
import { tipsStyles as styles } from '../../styles/tips.styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type TipItem = {
  icon: string;
  title: string;
  route: string;
};

type Category = {
  icon: string;
  title: string;
  description: string;
  color: string;
  softColor: string;
  items: TipItem[];
};

const categorias: Category[] = [
  // ==========================================
  // CICLO MENSTRUAL
  // ==========================================

  {
    icon: 'calendar-outline',
    title: 'Ciclo menstrual',
    description:
      'Entenda as fases, sintomas e alterações do seu ciclo.',
    color: cycleColors.rose,
    softColor: cycleColors.roseSoft,

    items: [
      {
        icon: 'calendar-outline',
        title: 'Visão geral do ciclo',
        route: '/tips/cycle/cycle-overview',
      },
      {
        icon: 'water-outline',
        title: 'Fluxo menstrual',
        route: '/tips/cycle/flow',
      },
      {
        icon: 'time-outline',
        title: 'Menstruação atrasada',
        route: '/tips/cycle/late-period',
      },
      {
        icon: 'flash-outline',
        title: 'Cólicas menstruais',
        route: '/tips/cycle/menstrual-cramps',
      },
      {
        icon: 'body-outline',
        title: 'Dor abdominal',
        route: '/tips/cycle/abdominal',
      },
      {
        icon: 'ellipse-outline',
        title: 'Coágulos menstruais',
        route: '/tips/cycle/clots',
      },
      {
        icon: 'trending-up-outline',
        title: 'Fluxo menstrual intenso',
        route: '/tips/cycle/heavy-menstrual-flow',
      },
      {
        icon: 'sad-outline',
        title: 'TPM',
        route: '/tips/cycle/pms',
      },
      {
        icon: 'warning-outline',
        title: 'TDPM (PMDD)',
        route: '/tips/cycle/pmdd',
      },
      {
        icon: 'water-outline',
        title: 'Muco cervical',
        route: '/tips/cycle/cervical-mucus',
      },
      {
        icon: 'egg-outline',
        title: 'Ovulação',
        route: '/tips/cycle/ovulation',
      },
      {
        icon: 'water-outline',
        title: 'Fase menstrual',
        route: '/tips/cycle/menstrual-phase',
      },
      {
        icon: 'moon-outline',
        title: 'Fase lútea',
        route: '/tips/cycle/luteal-phase',
      },
      {
        icon: 'leaf-outline',
        title: 'Fase folicular',
        route: '/tips/cycle/follicular-phase',
      },
    ],
  },

  // ==========================================
  // MENSTRUAÇÃO
  // ==========================================

  {
    icon: 'water-outline',
    title: 'Menstruação',
    description:
      'Conheça melhor o sangramento e suas variações.',
    color: cycleColors.lavender,
    softColor: cycleColors.lavenderSoft,

    items: [
      {
        icon: 'color-palette-outline',
        title: 'Cor do sangue menstrual',
        route: '/tips/menstrual/bleeding',
      },
      {
        icon: 'flash-outline',
        title: 'Cólicas menstruais',
        route: '/tips/menstrual/cramps',
      },
      {
        icon: 'calendar-outline',
        title: 'Menstruação irregular',
        route: '/tips/menstrual/irregular-period',
      },
      {
        icon: 'sad-outline',
        title: 'TPM',
        route: '/tips/menstrual/pms',
      },
      {
        icon: 'water-outline',
        title: 'Sangramento de escape',
        route: '/tips/menstrual/spotting',
      },
      {
        icon: 'time-outline',
        title: 'Menstruação atrasada',
        route: '/tips/menstrual/late-period',
      },
      {
        icon: 'calendar-clear-outline',
        title: 'Amenorreia',
        route: '/tips/menstrual/amenorrhea',
      },
    ],
  },

  // ==========================================
  // PRODUTOS MENSTRUAIS
  // ==========================================

  {
    icon: 'bag-outline',
    title: 'Produtos menstruais',
    description:
      'Conheça diferentes opções para cuidar da sua menstruação.',
    color: cycleColors.teal,
    softColor: cycleColors.tealSoft,

    items: [
      {
        icon: 'apps-outline',
        title: 'Conheça os produtos menstruais',
        route: '/tips/menstrual-products/products',
      },
      {
        icon: 'layers-outline',
        title: 'Absorventes externos',
        route: '/tips/menstrual-products/pads',
      },
      {
        icon: 'ellipse-outline',
        title: 'Absorventes internos',
        route: '/tips/menstrual-products/tampons',
      },
      {
        icon: 'radio-button-on-outline',
        title: 'Coletor menstrual',
        route: '/tips/menstrual-products/menstrual-cup',
      },
      {
        icon: 'disc-outline',
        title: 'Disco menstrual',
        route: '/tips/menstrual-products/menstrual-disc',
      },
      {
        icon: 'shirt-outline',
        title: 'Calcinha menstrual',
        route: '/tips/menstrual-products/period-underwear',
      },
    ],
  },

  // ==========================================
  // GRAVIDEZ
  // ==========================================

  {
    icon: 'heart-circle-outline',
    title: 'Gravidez',
    description:
      'Informações sobre gravidez, testes e cuidados.',
    color: '#EC4899',
    softColor: 'rgba(236,72,153,0.15)',

    items: [
      {
        icon: 'heart-outline',
        title: 'Gravidez',
        route: '/tips/pregnancy/pregnancy',
      },
      {
        icon: 'thermometer-outline',
        title: 'Sinais e sintomas da gravidez',
        route: '/tips/pregnancy/pregnancy-signs',
      },
      {
        icon: 'flask-outline',
        title: 'Teste de gravidez',
        route: '/tips/pregnancy/pregnancy-test',
      },
      {
        icon: 'calendar-outline',
        title: 'Semanas de gravidez',
        route: '/tips/pregnancy/pregnancy-weeks',
      },
      {
        icon: 'heart-circle-outline',
        title: 'Início da gravidez',
        route: '/tips/pregnancy/early-pregnancy',
      },
      {
        icon: 'medical-outline',
        title: 'Pré-natal',
        route: '/tips/pregnancy/prenatal-care',
      },
      {
        icon: 'warning-outline',
        title: 'Sinais de alerta na gravidez',
        route: '/tips/pregnancy/pregnancy-warning-signs',
      },
    ],
  },

  // ==========================================
  // INFECÇÕES
  // ==========================================

  {
    icon: 'bug-outline',
    title: 'Infecções',
    description:
      'Conheça sinais, sintomas e cuidados relacionados a infecções.',
    color: '#F97316',
    softColor: 'rgba(249,115,22,0.15)',

    items: [
      {
        icon: 'water-outline',
        title: 'Secreção vaginal',
        route: '/tips/infection/secretion',
      },
      {
        icon: 'warning-outline',
        title: 'Secreções anormais',
        route: '/tips/infection/abnormal-discharges',
      },
      {
        icon: 'bug-outline',
        title: 'Tricomoníase',
        route: '/tips/infection/trichomoniasis',
      },
      {
        icon: 'bacteria-outline',
        title: 'Vaginose bacteriana',
        route: '/tips/infection/bacterial-vaginosis',
      },
      {
        icon: 'flower-outline',
        title: 'Candidíase',
        route: '/tips/infection/candidiasis',
      },
      {
        icon: 'medical-outline',
        title: 'Clamídia',
        route: '/tips/infection/chlamydia',
      },
      {
        icon: 'flame-outline',
        title: 'Herpes genital',
        route: '/tips/infection/genital-herpes',
      },
      {
        icon: 'shield-checkmark-outline',
        title: 'HPV',
        route: '/tips/infection/hpv',
      },
      {
        icon: 'bug-outline',
        title: 'Gonorreia',
        route: '/tips/infection/gonorrhea',
      },
      {
        icon: 'shield-outline',
        title: 'Prevenção de ISTs',
        route: '/tips/infection/sti-prevetion',
      },
    ],
  },

  // ==========================================
  // SAÚDE GINECOLÓGICA
  // ==========================================

  {
    icon: 'medical-outline',
    title: 'Saúde ginecológica',
    description:
      'Informações sobre condições que podem afetar a saúde ginecológica.',
    color: '#8B5CF6',
    softColor: 'rgba(139,92,246,0.15)',

    items: [
      {
        icon: 'ellipse-outline',
        title: 'SOP — Síndrome dos Ovários Policísticos',
        route: '/tips/gynecological/pcos',
      },
      {
        icon: 'body-outline',
        title: 'Adenomiose',
        route: '/tips/gynecological/adenomyosis',
      },
      {
        icon: 'medical-outline',
        title: 'Endometriose',
        route: '/tips/gynecological/endometriosis',
      },
      {
        icon: 'ellipse-outline',
        title: 'Cistos ovarianos',
        route: '/tips/gynecological/ovarian-cysts',
      },
      {
        icon: 'warning-outline',
        title: 'Inflamação pélvica',
        route: '/tips/gynecological/pelvic-inflamation',
      },
      {
        icon: 'layers-outline',
        title: 'Miomas uterinos',
        route: '/tips/gynecological/uterine-fibroids',
      },
      {
        icon: 'ellipse-outline',
        title: 'Pólipos uterinos',
        route: '/tips/gynecological/uterine-polyps',
      },
    ],
  },

  // ==========================================
  // CUIDADOS ÍNTIMOS
  // ==========================================

  {
    icon: 'sparkles-outline',
    title: 'Cuidados íntimos',
    description:
      'Hábitos e cuidados para manter a saúde da região íntima.',
    color: cycleColors.gold,
    softColor: cycleColors.goldSoft,

    items: [
      {
        icon: 'water-outline',
        title: 'Higiene íntima',
        route: '/tips/intimate-care/menstrual-hygiene',
      },
      {
        icon: 'shirt-outline',
        title: 'Coceira e Irritação',
        route: '/tips/intimate-care/vaginal-irritation',
      },
      {
        icon: 'heart-outline',
        title: 'Alteração no Odor',
        route: '/tips/intimate-care/vaginal-odor',
      },
    ],
  },
];

export default function TipsScreen() {
  // acordeão: só uma categoria aberta por vez. null = tudo fechado.
  const [aberta, setAberta] = useState<number | null>(null);

  function alternarCategoria(index: number) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAberta((atual) => (atual === index ? null : index));
  }

  return (
    <Background>
      <View style={styles.screen}>

        {/* ======================================
            CABEÇALHO
        ====================================== */}

        <View style={styles.topHeader}>
          <Text style={styles.eyebrow}>
            APRENDA MAIS
          </Text>

          <Text style={styles.title}>
            Dicas
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.subtitle}>
            Explore conteúdos sobre seu ciclo menstrual,
            saúde íntima, gravidez e bem-estar.
          </Text>

          {categorias.map((categoria, index) => {
            const aberto = aberta === index;

            return (
              <View
                key={index}
                style={[
                  styles.category,
                  { borderLeftColor: categoria.color },
                ]}
              >
                {/* ==================================
                    CABEÇALHO DA CATEGORIA
                ================================== */}

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.categoryHeader,
                    aberto && styles.categoryHeaderOpen,
                  ]}
                  onPress={() => alternarCategoria(index)}
                >
                  <View
                    style={[
                      styles.categoryIcon,
                      {
                        backgroundColor: categoria.softColor,
                      },
                    ]}
                  >
                    <Ionicons
                      name={categoria.icon as any}
                      size={25}
                      color={categoria.color}
                    />
                  </View>

                  <View style={styles.categoryInfo}>
                    <View style={styles.categoryTitleRow}>
                      <Text style={styles.categoryTitle}>
                        {categoria.title}
                      </Text>

                      <View style={styles.categoryCount}>
                        <Text style={styles.categoryCountText}>
                          {categoria.items.length}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.categoryDescription}>
                      {categoria.description}
                    </Text>
                  </View>

                  <View style={styles.categoryChevronWrap}>
                    <Ionicons
                      name={
                        aberto
                          ? 'chevron-up'
                          : 'chevron-down'
                      }
                      size={16}
                      color={cycleColors.textMuted}
                    />
                  </View>
                </TouchableOpacity>

                {/* ==================================
                    ITENS DA CATEGORIA
                ================================== */}

                {aberto &&
                  categoria.items.map((item, itemIndex) => (
                    <TouchableOpacity
                      key={itemIndex}
                      activeOpacity={0.8}
                      style={styles.tipItem}
                      onPress={() =>
                        router.push(item.route as any)
                      }
                    >
                      <View
                        style={[
                          styles.tipIcon,
                          {
                            backgroundColor:
                              categoria.softColor,
                          },
                        ]}
                      >
                        <Ionicons
                          name={item.icon as any}
                          size={19}
                          color={categoria.color}
                        />
                      </View>

                      <Text style={styles.tipTitle}>
                        {item.title}
                      </Text>

                      <Ionicons
                        name="chevron-forward"
                        size={19}
                        color={cycleColors.textMuted}
                      />
                    </TouchableOpacity>
                  ))}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Background>
  );
}