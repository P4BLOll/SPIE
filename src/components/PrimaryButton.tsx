import React from 'react';
import {TouchableOpacity,Text,StyleSheet} from 'react-native';

type Props = {
  title:string;
  onPress:()=>void;
};

export function PrimaryButton({title,onPress}:Props){

  return(

    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >

      <Text style={styles.text}>
        {title}
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

button:{
  backgroundColor:'#7B2CBF',
  padding:16,
  borderRadius:12,
  alignItems:'center'
},

text:{
  color:'#fff',
  fontSize:18,
  fontWeight:'bold'
}

});