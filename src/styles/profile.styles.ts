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
    position: 'relative',
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

  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: cycleColors.rose,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: cycleColors.background,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },

  photoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },

  photoModalContent: {
    backgroundColor: cycleColors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 36,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },

  photoModalHandle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
    marginBottom: 16,
  },

  photoModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: cycleColors.text,
    textAlign: 'center',
    marginBottom: 20,
  },

  photoModalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: cycleColors.surfaceAlt,
    marginBottom: 10,
  },

  photoModalOptionText: {
    fontSize: 15,
    fontWeight: '700',
    color: cycleColors.text,
  },

  photoModalCancel: {
    marginTop: 6,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  photoModalCancelText: {
    fontSize: 15,
    fontWeight: '700',
    color: cycleColors.textMuted,
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