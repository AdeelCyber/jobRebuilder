import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import global from '../globalStyles';

const PinkButton = ({text="Sign In", arrow=true}) => {
  return (
    <Pressable style={styles.container}>
      <Text style={[styles.text,global.Lexend400]}>{text}</Text>
      <View><AntDesign name="arrowright" size={19} color="white" /></View>
    </Pressable>
  )
}

export default PinkButton

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#C38BFF',
        borderRadius:15,
    },
    text:{
      flex:1,
        borderWidth:1,

    },
    s:{
        // alignSelf:'end'
        // borderWidth:1
    }



})