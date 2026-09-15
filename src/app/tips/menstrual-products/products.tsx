import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function MenstrualProductsScreen() {
  return (
    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tipsDetailStyles.container}
      >
        <TouchableOpacity
          style={tipsDetailStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color={Colors.text}
          />
        </TouchableOpacity>

        <View style={tipsDetailStyles.header}>
          <Ionicons
            name="heart-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Menstrual Products Overview
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Explore different period care options and find the best match for your lifestyle and comfort.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Multiple options for every body
          </Text>
          <Text style={tipsDetailStyles.text}>
            There is no single "best" menstrual product. The ideal choice depends on your daily flow, physical activity, personal comfort, anatomy, and budget.
            {'\n\n'}
            Many people choose to combine or rotate products depending on cycle days.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            External pads
          </Text>
          <Text style={tipsDetailStyles.text}>
            Adhere to underwear to absorb flow externally. Easy to use and available everywhere, ideal for those who prefer not to use internal devices.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Tampons
          </Text>
          <Text style={tipsDetailStyles.text}>
            Inserted into the vaginal canal to absorb fluid internally. Great for swimming, sports, and active movement. Requires changing every 4 to 8 hours.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Menstrual cups and discs
          </Text>
          <Text style={tipsDetailStyles.text}>
            Reusable silicone devices that collect blood inside the body. Wearable for up to 8–12 hours, highly eco-friendly, and cost-effective long term.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Period underwear
          </Text>
          <Text style={tipsDetailStyles.text}>
            Washable, leak-proof underwear with absorbent gussets. Ideal for light to moderate flow, sleeping, or as a backup layer.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            You can mix and match products throughout your cycle to suit your changing flow, activities, and daily routine.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
