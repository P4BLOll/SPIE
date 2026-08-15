import {StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

export const privacyStyles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
  },

  backButton:{
    width:42,
    height:42,
    borderRadius:21,
    backgroundColor:'transparent',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20,
  },

  title:{
    fontSize:28,
    fontWeight:'700',
    color:'#FFFFFF',
    marginBottom:20,
  },

  text:{
    fontSize:16,
    lineHeight:26,
    color:'#FFFFFF',
  }

});