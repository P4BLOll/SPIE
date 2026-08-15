import { StyleSheet } from 'react-native';

import { cycleColors } from './calendar.styles';


export const profileStyles = StyleSheet.create({

  // ===============================
  // CONTAINER
  // ===============================

  container: {
    flex: 1,
    backgroundColor: cycleColors.background,
  },


  // ===============================
  // CABEÇALHO FIXO
  // ===============================

  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,

    backgroundColor: cycleColors.background,

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',

    zIndex: 10,
  },


  scrollArea: {
    flex: 1,
  },


  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },


  // ===============================
  // CABEÇALHO
  // ===============================

  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: cycleColors.gold,
    textAlign: 'center',
    marginTop: 2,
  },


  title: {
    fontSize: 26,
    fontWeight: '800',
    color: cycleColors.text,
    textAlign: 'center',
    marginTop: 2,
  },


  // ===============================
  // AVATAR
  // ===============================

  avatarRing: {
    width: 118,
    height: 118,
    borderRadius: 59,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },


  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
    backgroundColor: cycleColors.surface,
    overflow: 'hidden',
  },


  avatarImage: {
    width: '100%',
    height: '100%',
  },


  name: {
    fontSize: 22,
    fontWeight: '800',
    color: cycleColors.text,
    textAlign: 'center',
    marginTop: 14,
  },


  email: {
    fontSize: 14,
    color: cycleColors.textMuted,
    textAlign: 'center',
    marginTop: 3,
  },


  // ===============================
  // BOTÃO EDITAR
  // ===============================

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,

    alignSelf: 'center',

    paddingHorizontal: 28,
    paddingVertical: 12,

    borderRadius: 16,

    marginTop: 16,
  },


  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },


  // ===============================
  // ESTATÍSTICAS
  // ===============================

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    gap: 10,

    marginTop: 22,
  },


  statCard: {
    flex: 1,

    backgroundColor: cycleColors.surface,

    borderRadius: 16,

    paddingVertical: 12,

    alignItems: 'center',

    gap: 6,

    elevation: 3,
  },


  statIconWrap: {
    width: 32,
    height: 32,

    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',
  },


  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: cycleColors.text,
  },


  statTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: cycleColors.textMuted,
  },


  // ===============================
  // MENU
  // ===============================

  menuSectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,

    color: cycleColors.textMuted,

    marginTop: 24,
    marginBottom: 8,
    marginLeft: 4,
  },


  menuContainer: {
    backgroundColor: cycleColors.surface,

    borderRadius: 18,

    overflow: 'hidden',
  },


  menuItem: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 14,
    paddingVertical: 11,

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },


  menuItemLast: {
    borderBottomWidth: 0,
  },


  menuLeft: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 10,
  },


  menuIconWrap: {
    width: 32,
    height: 32,

    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',
  },


  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: cycleColors.text,
  },

});