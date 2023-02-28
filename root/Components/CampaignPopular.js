import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import Context from '../Context/Context'
import SvgImport from './SvgImport'
import { AntDesign } from '@expo/vector-icons'
import MyText from './Text'
import PopularArrow from '../../assets/Svgs/PopularArrow'
import { Entypo } from '@expo/vector-icons'
import edit from '../../assets/Svgs/PopularEdit'
import axios from '../http/axiosSet'

import Buildings from '../../assets/img/Buildings.png'
//"http://stepdev.up.railway.app/media/getImage/9f3d4992e16ca7b2a6fa87b5c01e9771.png",

const CampaignPopular = ({
  Src,
  title,
  show = true,
  label = 'IT Company',
  Logo = { Logo },
  ...props
}) => {
  const {
    theme: { colors },
  } = useContext(Context)
  // console.log(props.id);

  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',

          elevation: 10,
          shadowColor: '#000',

          borderRadius: 10,
          paddingBottom: 5,
        },
        {
          backgroundColor: colors.white,
          ...props.style,
        },
      ]}
    >
      <Image
        source={Src}
        style={{
          width: '100%',
          maxWidth: '100%',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MyText style={{ fontWeight: '700', fontSize: 16, marginRight: 2 }}>
              {title}
            </MyText>
            <Entypo name='share' size={20} color={colors.secondary} />
          </View>

          <MyText
            style={{ fontWeight: '500', fontSize: 7, color: colors.lighttext }}
          >
            {label}
          </MyText>
        </View>
        {/* label title view out */}
        <View>
          <Image
            source={{
              uri: `${axios.defaults.baseURL}media/getImage/${Logo}`,
            }}
            style={{ width: 20, height: 20 ,borderRadius:10 }}
          />
        </View>
      </View>
      {/* All investment paramenters in */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
          alignItems: 'center',

          paddingHorizontal: 14,
          marginBottom: 20,
        }}
      >
        {/* 1 */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MyText
            style={{ fontWeight: '500', fontSize: 7, color: colors.lighttext }}
          >
            Stage
          </MyText>
          <MyText style={{ fontWeight: '700', fontSize: 14 }}>
            {props.Stage !== null
              ? `${props.Stage.slice(0, 10)}` + '...'
              : null}
          </MyText>
        </View>
        {/* 2 */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MyText
            style={{ fontWeight: '500', fontSize: 7, color: colors.lighttext }}
          >
            Team
          </MyText>
          <MyText style={{ fontWeight: '700', fontSize: 14 }}>
            {props.Team}
          </MyText>
        </View>
        {/* 3 */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MyText
            style={{ fontWeight: '500', fontSize: 7, color: colors.lighttext }}
          >
            Budget
          </MyText>
          <MyText style={{ fontWeight: '700', fontSize: 14 }}>
            ${props.Budget}
          </MyText>
        </View>
        {/*  4 button */}
        {show ? (
          <Pressable
            style={{
              backgroundColor: colors.secondary,

              paddingHorizontal: 8,
              paddingVertical: 7,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              props.navigation.navigate('ManagingCampaign', {
                id: props.id,
                show: show,
              })
            }}
          >
            <SvgImport svg={edit} style={{ marginRight: 4 }} />
            <MyText
              style={{ fontSize: 11, color: colors.white, marginLeft: 4 }}
            >
              Edit Campaign
            </MyText>
          </Pressable>
        ) : (
          <Pressable
            style={{
              backgroundColor: colors.secondary,

              paddingHorizontal: 8,
              paddingVertical: 7,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              props.navigation.navigate('ManagingCampaign', {
                id: props.id,
                show: show,
              })
            }}
          >
            <MyText
              style={{ fontSize: 11, color: colors.white, marginLeft: 4 }}
            >
              View Campaign
            </MyText>
          </Pressable>
        )}
        {/* 4 out */}
      </View>
      {/* arrow back */}
      <View
        style={{
          position: 'absolute',
          right: 8,
          backgroundColor: colors.white,
          top: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            width: 24,
            height: 24,
          }}
        >
          <SvgImport svg={PopularArrow} />
        </View>
      </View>
      {/* arrow back over */}
      {show && (
        <View
          style={{
            position: 'absolute',
            left: 8,
            backgroundColor: colors.white,
            top: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
        >
          {props.status === 'Approved' ? (
            <Pressable
              style={{
                backgroundColor: '#13B887',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <MyText
                style={{ fontSize: 10, fontWeight: '500', color: colors.white }}
              >
                Approved
              </MyText>
            </Pressable>
          ) : props.status === 'Pending' ? (
            <Pressable
              style={{
                backgroundColor: '#8EB5FF',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <MyText
                style={{ fontSize: 10, fontWeight: '500', color: colors.white }}
              >
                Pending
              </MyText>
            </Pressable>
          ) : (
            <Pressable
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <MyText
                style={{ fontSize: 10, fontWeight: '500', color: '#000' }}
              >
                Draft
              </MyText>
            </Pressable>
          )}
        </View>
      )}
    </View>
  )
}

export default CampaignPopular

const styles = StyleSheet.create({})
