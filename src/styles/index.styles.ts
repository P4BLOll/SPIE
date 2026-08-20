import { StyleSheet } from 'react-native';

import { cycleColors } from './calendar.styles';

export const indexStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cycleColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },


  logo: {
    width: 500,
    height: 150,
    resizeMode: 'contain',

    // Aumenta o espaço entre a logo
    // e o restante do conteúdo
    marginBottom: 50,
  },


  subtitle: {
    fontSize: 26,
    fontWeight: '800',
    color: cycleColors.text,
    textAlign: 'center',

    marginTop: 4,
  },


  description: {
    fontSize: 14,
    color: cycleColors.textMuted,
    textAlign: 'center',
    lineHeight: 21,

    marginTop: 12,
    marginBottom: 60,

    paddingHorizontal: 10,
  },


  buttonWrapper: {
    width: '100%',
    marginBottom: 14,
  },


  button: {
    height: 56,
    borderRadius: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,

    elevation: 4,
  },


  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },


  loginButton: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    gap: 6,

    paddingVertical: 12,
    paddingHorizontal: 16,
  },


  loginText: {
    color: cycleColors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },


  loginTextHighlight: {
    color: cycleColors.rose,
    fontWeight: '800',
  },

});

