import { StyleSheet } from 'react-native';

import {
  cycleColors,
} from '@/styles/calendar.styles';

export const privacyStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      cycleColors.background,
  },

  header: {
    height: 64,

    position: 'relative',

    justifyContent: 'center',

    paddingHorizontal: 20,
  },

  backButton: {
    position: 'absolute',

    left: 20,

    top: 11,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor:
      'transparent',

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 2,
  },

  title: {
    fontSize: 24,

    fontWeight: '700',

    color: cycleColors.rose,

    textAlign: 'center',
  },

  scrollContent: {
    paddingHorizontal: 20,

    paddingTop: 18,

    paddingBottom: 30,
  },

  text: {
    fontSize: 16,

    lineHeight: 26,

    color: cycleColors.text,
  },

});