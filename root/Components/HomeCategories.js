import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from 'react-native'
import React, { useContext, useState } from 'react'
import Context from '../Context/Context'
import SvgImport from './SvgImport'
import MyText from './Text'
const HomeCategories = ({ svg, title, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context)
  return (
    <ImageBackground
      source={props.img}
      imageStyle={{ borderRadius: 19 }}
      resizeMode='cover'
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          height: 130,
          width: 100,

          borderRadius: 19,
        },
        {
          backgroundColor: colors.white,
          ...props.style,
        },
      ]}
    >
      <Pressable
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '40%',
        }}
      >
        <SvgImport svg={svg} style={{ marginTop: props.itemStyle }} />
        <MyText style={{ fontWeight: '500', fontSize: 12 }}>{title}</MyText>
      </Pressable>
    </ImageBackground>
  )
}

export default HomeCategories

const styles = StyleSheet.create({})
