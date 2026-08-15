import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const loginStyles = StyleSheet.create({

  container:{
    flex:1,
  },

  inner:{
    flex:1,
    paddingHorizontal:30,
    justifyContent:'center',
  },

  logo:{
    width:130,
    height:130,
    resizeMode:'contain',
    alignSelf:'center',
    marginBottom:20,
  },

  header:{
    alignItems:'center',
    marginBottom:35,
  },

  title:{
    fontSize:32,
    fontWeight:'800',
    color:Colors.text,
  },

  subtitle:{
    fontSize:15,
    color:Colors.textMuted,
    textAlign:'center',
    marginTop:10,
  },

  form:{
    backgroundColor:Colors.surface,
    borderRadius:20,
    padding:24,
  },

  label:{
    color:Colors.text,
    fontSize:15,
    fontWeight:'600',
    marginBottom:8,
    marginTop:15,
  },

  inputContainer:{
    height:55,
    backgroundColor:Colors.background,
    borderRadius:14,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:16,
  },

  input:{
    flex:1,
    color:Colors.text,
    fontSize:16,
  },

  buttonWrapper:{
    marginTop:30,
    borderRadius:14,
    overflow:'hidden',
  },

  button:{
    height:56,
    alignItems:'center',
    justifyContent:'center',
  },

  buttonText:{
    color:Colors.white,
    fontSize:17,
    fontWeight:'700',

  },

  forgotPassword:{
    alignSelf:'flex-end',
    marginTop:15,
  },

  forgotText:{
    color:Colors.primary,
    fontSize:14,
    fontWeight:'600',
  },

  footerLink:{
    alignItems:'center',
    marginTop:30,
  },

  footerText:{
    color:Colors.textMuted,
    fontSize:15,
  },

  footerTextAccent:{
    color:Colors.accent,
    fontWeight:'700',
  },

});