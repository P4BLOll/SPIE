import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const pcosStyles = StyleSheet.create({

  // ===============================
  // CONTAINER
  // ===============================

  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },

  // ===============================
  // VOLTAR
  // ===============================

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 4,
  },

  // ===============================
  // CABEÇALHO
  // ===============================

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 15,
  },

  subtitle: {
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
  },

  // ===============================
  // CARDS
  // ===============================

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 25,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    elevation: 4,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(236,72,153,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  content: {
    flex: 1,
  },

  cardTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },

  cardText: {
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },

  // ===============================
  // ALERTA
  // ===============================

  warningCard: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  warningText: {
    flex: 1,
    marginLeft: 12,
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});