import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import React, { useContext } from 'react'
import Context from '../Context/Context'
import MyText from './Text'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SvgImport from './SvgImport'
import { Entypo } from '@expo/vector-icons'
import Team from '../../assets/Svgs/TeamIcon'
import todo from '../../assets/Svgs/TodoIcon'

import axios from '../http/axiosSet'

// import Video from "react-native-video";
const CampaignCard = ({ ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context)
  return (
    <View style={{ marginTop: 10 }}>
      {/* card header in */}
      <View
        style={{
          paddingHorizontal: 23,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View>
            <Image
              source={{
                uri: `${axios.defaults.baseURL}media/getImage/${props.data.startup.logo}`,
              }}
              style={{ width: 24, height: 24, borderRadius: 13 }}
            />
          </View>
          <View style={{ marginLeft: 8 }}>
            <MyText
              style={{ color: colors.text, fontSize: 13, fontWeight: '700' }}
            >
              {props.title}
            </MyText>
            <MyText style={{ color: colors.lighttext, fontSize: 11 }}>
              {props.niche}
            </MyText>
          </View>
        </View>
        <Pressable
          onPress={() =>
            props.modal((currents) => ({ ...currents, modal1: true }))
          }
        >
          <Entypo name='share' size={24} color={colors.secondary} />
        </Pressable>
      </View>
      {/* card header out */}
      {/* video in */}
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 23,
        }}
      >
        {/* <Video
          source={{ uri: "https://www.youtube.com/watch?v=mpSmBuco6I0" }}
          style={{ width: "100%", height: "30%" }}
        /> */}

        <Image source={props.Thumbnail} style={{}} />

        {/* Buttons View in */}
        {props.isPart ? (
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
            }}
          >
            <Pressable
              style={{
                backgroundColor: colors.secondary,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 45,
                paddingVertical: 10,
                flexDirection: 'row',
                borderRadius: 5,
                marginRight: 10,
              }}
              onPress={() => {
                props.navigation.navigate('Team', {
                  data: props.data,
                  show: props.show,
                })
              }}
            >
              <SvgImport svg={Team} />
              <MyText
                style={{
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 10,
                }}
              >
                Team
              </MyText>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: colors.white,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 45,
                paddingVertical: 10,
                flexDirection: 'row',
                borderRadius: 5,
                borderWidth: 1,
                marginLeft: 10,
              }}
              onPress={() => {
                props.navigation.navigate('Todo', {
                  data: props.data,
                  show: props.show,
                })
              }}
            >
              <SvgImport svg={todo} />
              <MyText
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 10,
                }}
              >
                To do
              </MyText>
            </Pressable>
          </View>
        ) : props.undefinedd ? null : (
          <Pressable
            style={{
              width: '100%',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.text,
              borderRadius: 10,
              paddingVertical: 10,
            }}
            onPress={() => {
              props.navigation.navigate('TeamRoles', {
                data: props.data,
                show: props.show,
                undefinedd: props.undefinedd,
                isPart: props.isPart,
              })
            }}
          >
            <MyText
              style={{ color: colors.white, fontSize: 16, fontWeight: '500' }}
            >
              Apply
            </MyText>
          </Pressable>
        )}
      </View>
    </View>
  )
}

export default CampaignCard

const styles = StyleSheet.create({})
