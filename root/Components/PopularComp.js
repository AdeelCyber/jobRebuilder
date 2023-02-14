import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
} from 'react-native'
import React, { useContext, useState } from 'react'
import Context from '../Context/Context'
import SvgImport from './SvgImport'
import MyText from './Text'
import { Entypo } from '@expo/vector-icons'
import GoldenStar from '../../assets/Svgs/GolderStart'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
const PopularComp = (props) => {
  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useContext(Context)
  return (
    <TouchableOpacity
      style={[
        { padding: 10, backgroundColor: colors.white, borderRadius: 16 },
        styles.shadow,
        props.style,
      ]}
      onPress={() => {
        navigation.navigate('ShowFreelancer', { id: props.id })
      }}
    >
      {/* image heart in */}
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{
            uri: props.Image,
          }}
          style={{ width: 45, height: 45, borderRadius: 5, marginRight: 66 }}
        />

        <Entypo name='heart' size={22} color='#B40F0F' />
      </View>
      {/* image heart out*/}
      {/* Name and pricing in */}
      <View style={{ marginTop: 10 }}>
        <MyText style={{ fontSize: 14 }}>{props.name}</MyText>
        <MyText style={{ fontSize: 13, marginTop: 3, fontWeight: '700' }}>
          {props.Price}$
          <MyText
            style={{ color: colors.lighttext, fontSize: 13, fontWeight: '400' }}
          >
            /Hr
          </MyText>
        </MyText>
        <MyText
          style={{
            color: colors.lighttext,
            fontSize: 12,
            fontWeight: '400',
            marginTop: 5,
          }}
        >
          {props.designation}
        </MyText>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 3,
          }}
        >
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
            }}
          >
            <Entypo name='star' size={15} color='#FFB33E' />
            <MyText
              style={{
                fontWeight: '700',
                fontSize: 12.5,
                alignItems: 'center',
              }}
            >
              {props.Rating}
            </MyText>
          </View>
          <Pressable
            onPress={() =>
              props.nav.navigate('CampaignManagement', { id: props.id })
            }
          >
            <AntDesign name='arrowright' size={20} color='black' />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PopularComp

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,
  },
})
