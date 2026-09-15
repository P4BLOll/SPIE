import React, { useState } from 'react';

import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '../../components/Background';
import { cycleColors } from '../../styles/calendar.styles';
import { tipsStyles as styles } from '../../styles/tips.styles';

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
    title: 'Menstrual cycle',
    description:
      'Understand the phases, symptoms, and changes of your cycle.',
    color: cycleColors.rose,
    softColor: cycleColors.roseSoft,

    items: [
      {
        icon: 'calendar-outline',
        title: 'Cycle overview',
        route: '/tips/cycle/cycle-overview',
      },
      {
        icon: 'layers-outline',
        title: 'Cycle phases',
        route: '/tips/cycle/cycle',
      },
      {
        icon: 'water-outline',
        title: 'Menstrual flow',
        route: '/tips/cycle/flow',
      },
      {
        icon: 'flash-outline',
        title: 'Menstrual cramps',
        route: '/tips/cycle/menstrual-cramps',
      },
      {
        icon: 'ellipse-outline',
        title: 'Menstrual clots',
        route: '/tips/cycle/clots',
      },
      {
        icon: 'trending-up-outline',
        title: 'Heavy menstrual flow',
        route: '/tips/cycle/heavy-menstrual-flow',
      },
      {
        icon: 'warning-outline',
        title: 'PMDD (Premenstrual Dysphoric Disorder)',
        route: '/tips/cycle/pmdd',
      },
      {
        icon: 'water-outline',
        title: 'Cervical mucus',
        route: '/tips/cycle/cervical-mucus',
      },
      {
        icon: 'egg-outline',
        title: 'Ovulation',
        route: '/tips/cycle/ovulation',
      },
      {
        icon: 'water-outline',
        title: 'Menstrual phase',
        route: '/tips/cycle/menstrual-phase',
      },
      {
        icon: 'leaf-outline',
        title: 'Follicular phase',
        route: '/tips/cycle/follicular-phase',
      },
      {
        icon: 'moon-outline',
        title: 'Luteal phase',
        route: '/tips/cycle/luteal-phase',
      },
    ],
  },

  // ==========================================
  // MENSTRUAÇÃO
  // ==========================================

  {
    icon: 'water-outline',
    title: 'Menstruation',
    description:
      'Learn more about bleeding and its natural variations.',
    color: cycleColors.lavender,
    softColor: cycleColors.lavenderSoft,

    items: [
      {
        icon: 'color-palette-outline',
        title: 'Menstrual blood color',
        route: '/tips/menstrual/bleeding',
      },
      {
        icon: 'flash-outline',
        title: 'Menstrual cramps',
        route: '/tips/menstrual/cramps',
      },
      {
        icon: 'calendar-outline',
        title: 'Irregular periods',
        route: '/tips/menstrual/irregular-period',
      },
      {
        icon: 'sad-outline',
        title: 'PMS',
        route: '/tips/menstrual/pms',
      },
      {
        icon: 'water-outline',
        title: 'Spotting',
        route: '/tips/menstrual/spotting',
      },
      {
        icon: 'time-outline',
        title: 'Late period',
        route: '/tips/menstrual/late-period',
      },
      {
        icon: 'calendar-clear-outline',
        title: 'Amenorrhea',
        route: '/tips/menstrual/amenorrhea',
      },
    ],
  },

  // ==========================================
  // PRODUTOS MENSTRUAIS
  // ==========================================

  {
    icon: 'bag-outline',
    title: 'Menstrual products',
    description:
      'Explore different options for managing your period.',
    color: cycleColors.teal,
    softColor: cycleColors.tealSoft,

    items: [
      {
        icon: 'apps-outline',
        title: 'Explore menstrual products',
        route: '/tips/menstrual-products/products',
      },
      {
        icon: 'layers-outline',
        title: 'Pads',
        route: '/tips/menstrual-products/pads',
      },
      {
        icon: 'ellipse-outline',
        title: 'Tampons',
        route: '/tips/menstrual-products/tampons',
      },
      {
        icon: 'radio-button-on-outline',
        title: 'Menstrual cup',
        route: '/tips/menstrual-products/menstrual-cup',
      },
      {
        icon: 'disc-outline',
        title: 'Menstrual disc',
        route: '/tips/menstrual-products/menstrual-disc',
      },
      {
        icon: 'shirt-outline',
        title: 'Period underwear',
        route: '/tips/menstrual-products/period-underwear',
      },
    ],
  },

  // ==========================================
  // GRAVIDEZ
  // ==========================================

  {
    icon: 'heart-circle-outline',
    title: 'Pregnancy',
    description:
      'Information on pregnancy, testing, and prenatal care.',
    color: '#EC4899',
    softColor: 'rgba(236,72,153,0.15)',

    items: [
      {
        icon: 'heart-outline',
        title: 'Pregnancy',
        route: '/tips/pregnancy/pregnancy',
      },
      {
        icon: 'thermometer-outline',
        title: 'Signs and symptoms of pregnancy',
        route: '/tips/pregnancy/pregnancy-signs',
      },
      {
        icon: 'flask-outline',
        title: 'Pregnancy tests',
        route: '/tips/pregnancy/pregnancy-test',
      },
      {
        icon: 'calendar-outline',
        title: 'Pregnancy weeks',
        route: '/tips/pregnancy/pregnancy-weeks',
      },
      {
        icon: 'heart-circle-outline',
        title: 'Early pregnancy',
        route: '/tips/pregnancy/early-pregnancy',
      },
      {
        icon: 'medical-outline',
        title: 'Prenatal care',
        route: '/tips/pregnancy/prenatal-care',
      },
      {
        icon: 'warning-outline',
        title: 'Pregnancy warning signs',
        route: '/tips/pregnancy/pregnancy-warning-signs',
      },
    ],
  },

  // ==========================================
  // INFECÇÕES
  // ==========================================

  {
    icon: 'bug-outline',
    title: 'Infections',
    description:
      'Learn signs, symptoms, and care regarding infections.',
    color: '#F97316',
    softColor: 'rgba(249,115,22,0.15)',

    items: [
      {
        icon: 'water-outline',
        title: 'Vaginal discharge',
        route: '/tips/infections/secretion',
      },
      {
        icon: 'warning-outline',
        title: 'Abnormal discharge',
        route: '/tips/infections/abnormal-discharge',
      },
      {
        icon: 'bug-outline',
        title: 'Trichomoniasis',
        route: '/tips/infections/trichomoniasis',
      },
      {
        icon: 'bacteria-outline',
        title: 'Bacterial vaginosis',
        route: '/tips/infections/bacterial-vaginosis',
      },
      {
        icon: 'flower-outline',
        title: 'Candidiasis (Yeast infection)',
        route: '/tips/infections/candidiasis',
      },
      {
        icon: 'medical-outline',
        title: 'Chlamydia',
        route: '/tips/infections/chlamydia',
      },
      {
        icon: 'flame-outline',
        title: 'Genital herpes',
        route: '/tips/infections/genital-herpes',
      },
      {
        icon: 'shield-checkmark-outline',
        title: 'HPV',
        route: '/tips/infections/hpv',
      },
      {
        icon: 'bug-outline',
        title: 'Gonorrhea',
        route: '/tips/infections/gonorrhea',
      },
      {
        icon: 'shield-outline',
        title: 'STI prevention',
        route: '/tips/infections/sti-prevention',
      },
    ],
  },

  // ==========================================
  // SAÚDE GINECOLÓGICA
  // ==========================================

  {
    icon: 'medical-outline',
    title: 'Gynecological health',
    description:
      'Information on conditions affecting gynecological health.',
    color: '#8B5CF6',
    softColor: 'rgba(139,92,246,0.15)',

    items: [
      {
        icon: 'ellipse-outline',
        title: 'PCOS — Polycystic Ovary Syndrome',
        route: '/tips/gynecological/pcos',
      },
      {
        icon: 'body-outline',
        title: 'Adenomyosis',
        route: '/tips/gynecological/adenomyosis',
      },
      {
        icon: 'medical-outline',
        title: 'Endometriosis',
        route: '/tips/gynecological/endometriosis',
      },
      {
        icon: 'ellipse-outline',
        title: 'Ovarian cysts',
        route: '/tips/gynecological/ovarian-cysts',
      },
      {
        icon: 'warning-outline',
        title: 'Pelvic inflammatory disease',
        route: '/tips/gynecological/pelvic-inflammatory-disease',
      },
      {
        icon: 'layers-outline',
        title: 'Uterine fibroids',
        route: '/tips/gynecological/uterine-fibroids',
      },
      {
        icon: 'ellipse-outline',
        title: 'Uterine polyps',
        route: '/tips/gynecological/uterine-polyps',
      },
    ],
  },

  // ==========================================
  // CUIDADOS ÍNTIMOS
  // ==========================================

 {
  icon: 'sparkles-outline',
  title: 'Intimate care',
  description:
    'Habits and routines to maintain intimate health.',
  color: cycleColors.gold,
  softColor: cycleColors.goldSoft,

  items: [
    {
      icon: 'water-outline',
      title: 'Intimate hygiene',
      route: '/tips/intimate-care/menstrual-hygiene',
    },

    {
      icon: 'bandage-outline',
      title: 'Itching and Irritation',
      route: '/tips/intimate-care/vaginal-irritation',
    },

    {
      icon: 'flower-outline',
      title: 'Odor Changes',
      route: '/tips/intimate-care/vaginal-odor',
    },

    {
      icon: 'calendar-outline',
      title: 'Menstrual pad care',
      route: '/tips/intimate-care/menstrual-pads-care',
    },

    {
      icon: 'shirt-outline',
      title: 'Underwear hygiene',
      route: '/tips/intimate-care/underwear-hygiene',
    },

    {
      icon: 'body-outline',
      title: 'Daily intimate care',
      route: '/tips/intimate-care/intimate-care-daily',
    },
  ],
},
]

export default function TipsScreen() {
  // acordeão: só uma categoria aberta por vez. null = tudo fechado.
  const [aberta, setAberta] = useState<number | null>(null);

  function alternarCategoria(index: number) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAberta((atual) => (atual === index ? null : index));
  }

  return (
    <Background>
      <SafeAreaView
        style={styles.screen}
        edges={['top', 'left', 'right']}
      >
        {/* ======================================
            CABEÇALHO
        ====================================== */}
        <View style={styles.topHeader}>
          <Text style={styles.eyebrow}>
            LEARN MORE
          </Text>

          <Text style={styles.title}>
            Tips
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.subtitle}>
            Explore guides on your menstrual cycle,
            intimate health, pregnancy, and wellness.
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
      </SafeAreaView>
    </Background>
  );
}