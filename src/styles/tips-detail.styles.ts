import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const tipsDetailStyles = StyleSheet.create({

// ===============================
// CONTAINER
// ===============================

container:{
  flexGrow:1,
  padding:20,
  paddingBottom:40,
},

// ===============================
// BOTÃO VOLTAR
// ===============================

backButton:{
  width:42,
  height:42,
  borderRadius:21,
  backgroundColor:Colors.surface,
  alignItems:'center',
  justifyContent:'center',
  marginBottom:20,
},

// ===============================
// CABEÇALHO
// ===============================

header:{
  alignItems:'center',
  marginBottom:25,
},

title:{
  color:Colors.text,
  fontSize:28,
  fontWeight:'900',
  marginTop:15,
},

subtitle:{
  color:Colors.textMuted,
  textAlign:'center',
  fontSize:14,
  lineHeight:20,
  marginTop:8,
},

// ===============================
// CARDS
// ===============================

card:{
  backgroundColor:Colors.surface,
  borderRadius:25,
  padding:20,
  marginBottom:18,
},

sectionTitle:{
  color:Colors.text,
  fontSize:18,
  fontWeight:'900',
  marginBottom:12,
},

text:{
  color:Colors.textMuted,
  fontSize:14,
  lineHeight:22,
},

// ===============================
// ALERTA
// ===============================

infoBox:{
  backgroundColor:'rgba(245,158,11,0.15)',
  borderRadius:20,
  padding:18,
  flexDirection:'row',
  alignItems:'center',
},

infoText:{
  flex:1,
  color:Colors.text,
  fontSize:13,
  lineHeight:20,
},


});