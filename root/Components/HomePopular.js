import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import Context from '../Context/Context'
import SvgImport from './SvgImport'
import { AntDesign } from '@expo/vector-icons'
import MyText from './Text'
import arrow from '../../assets/Svgs/PopularArrow'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from "../http/axiosSet";

const HomePopular = ({
  Src,
  title,
    item,
  id,
  label = 'IT Company',
  Logo = { Logo },
  ...props
}) => {
  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useContext(Context)
    console.log(item)

  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          paddingBottom: 5,
          marginVertical: 17,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 3,
          margin: 5,
          backgroundColor: colors.white,
          ...props.style,
        },
      ]}
      onPress={() => {
        navigation.navigate('CampaignMenu', { id: id })
      }}
    >
      {/*{props.w && <Image source={item?.promoMedia?.mediatype === "image" ?*/}
      {/*  { uri: axios.defaults.baseURL +*/}
      {/*          'media/getimage/' +item?.promoMedia?.media } : Src*/}
      {/*} style={{ width: '100%' }} />}*/}
      {!props.w && <Image source={{ uri: axios.defaults.baseURL +
              'media/getimage/' +item?.promoMedia?.url }} style={{minWidth:"100%", maxWidth: '100%' }} />}

        <Image source={{ uri: axios.defaults.baseURL +'media/getimage/' +item?.promoMedia?.url }} style={{minWidth:"100%",height:120, maxWidth: '100%' }} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 14,
          paddingTop: 10,
        }}
      >
        {/* label title view in */}
        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
          <MyText style={{ fontWeight: '700', fontSize: 16 }}>{title}</MyText>
          <MyText
            style={{ fontWeight: '500', fontSize: 7, color: colors.lighttext }}
          >
            {item?.category}
          </MyText>
        </View>
        {/* label title view out */}
        <View>
          <Image source={{ uri: Logo }} />
          {/* <SvgImport svg={Logo} /> */}
        </View>
      </View>
      {/* All investment paramenters in */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
          paddingHorizontal: 14,
        }}
      >
        {/* 1 */}
        <View>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 10,
              color: colors.lighttext,
              textAlign: 'center',
            }}
          >
            Stage
          </MyText>
          <MyText
            style={{ fontWeight: '700', fontSize: 10, textAlign: 'center', }}
          >
            {/* {props.raisedFunds} */}
              {item?.stage }
          </MyText>
        </View>
        {/* 2 */}
        <View>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 10,
              color: colors.lighttext,
              textAlign: 'center',
            }}
          >
            Team
          </MyText>
          <MyText
            style={{ fontWeight: '700', fontSize: 10, textAlign: 'center' }}
          >
            {/* {props.minInv} */}
            Complete
          </MyText>
        </View>
        {/* 3 */}
        <View style={{ marginBottom: 20 }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 10,
              color: colors.lighttext,
              textAlign: 'center',
            }}
          >
            Budget
          </MyText>
          <MyText style={{ fontWeight: '700', fontSize: 10 }}>
            {props.ShareHolders}
          </MyText>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          right: 8,
          backgroundColor: colors.white,
          top: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          padding: 7,
          paddingVertical: 9,
        }}
      >
        <SvgImport svg={arrow} />

        {/* <AntDesign name='arrowright' size={20} color='black' /> */}
      </View>
    </TouchableOpacity>
  )
}

export default HomePopular

const styles = StyleSheet.create({})
