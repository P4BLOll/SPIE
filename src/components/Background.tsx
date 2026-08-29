import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  StatusBar,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  LinearGradient,
} from 'expo-linear-gradient';

import { Colors } from '../constants/Colors';


interface BackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: readonly [string, string] | readonly [string, string, string];
}


export function Background({
  children,
  style,
  colors = [
    Colors.background,
    '#060A12',
  ],
}: BackgroundProps) {


  return (

    <>

      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.background}
        translucent={false}
      />


      <LinearGradient
        colors={colors}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.gradient}
      >

        <SafeAreaView
          edges={[
            'left',
            'right',
            'bottom',
          ]}
          style={[
            styles.container,
            style,
          ]}
        >

          {children}

        </SafeAreaView>


      </LinearGradient>


    </>

  );
}


const styles = StyleSheet.create({

  gradient: {
    flex:1,
  },


  container: {
    flex:1,
  },


});