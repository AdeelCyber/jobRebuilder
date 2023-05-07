import React, { useContext, useState, useEffect } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import Toast from 'react-native-toast-message'

import Context from '../Context/Context'
import MyText from './Text'
import { useIsFocused } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'

import Icon from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo'
import StarRating from 'react-native-star-rating-widget'
import axios from 'axios'

import CartProvider from '../Context/CartProvider'
const UserInfo = () => {
  const {
    theme: { colors },
  } = useContext(Context)
  const navigation = useNavigation()
  const [getRating, setRating] = useState(5)
  const [userinfo, setuserinfo] = useState()
  const [getcondition, setcondition] = useState(true)
  const [userreviews, setuserreviews] = useState([])
  var rate = []
  const { accessToken } = useContext(CartProvider)
  const isFocused = useIsFocused()
  const [copiedText, setCopiedText] = useState('')
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      `https://stepev-dev.up.railway.app/media/getimage/${userinfo?.userInfo.url}`
    )
    const t = await Clipboard.getStringAsync()
    console.log(t)
    Toast.show({
      topOffset: 60,
      type: 'success',
      text1: 'Copied to Clipboard',
    })
  }

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
    }

    axios
      .get(
        'https://stepev-dev.up.railway.app/freelancer/profile',

        config
      )
      .then((res) => {
        //   console.log(res.data.data.ratingAndReviews);
        setuserreviews(res.data.data.ratingAndReviews)
        setuserinfo(res.data.data)
        setcondition(false)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [isFocused])

  if (getcondition) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 30,
        }}
      >
        <ActivityIndicator animating={true} color={colors.Bluish} />

        <MyText>Loading..</MyText>
      </View>
    )
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, marginTop: 20 },
      ]}
    >
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          paddingBottom: 40,
          borderBottomWidth: 1,
          borderColor: '#ebebeb',
          width: 346,
          height: 140,
          marginTop: 17,
        }}
      >
        <Image
          style={{ height: 78, width: 78, borderRadius: 50, margin: 10 }}
          source={{
            uri: `https://stepev-dev.up.railway.app/media/getimage/${userinfo?.userInfo.avatar}`,
          }}
        />
        <View style={{ flexDirection: 'column' }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <MyText
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginRight: 17,
                marginLeft: 8,
              }}
            >
              {userinfo?.userInfo.name}
            </MyText>
            <Pressable
              style={{
                marginLeft: 18,
                height: 18,
                width: 18,
                borderRadius: 50,
                padding: 1,
                backgroundColor: colors.Bluish,
                alignSelf: 'flex-end',
                marginBottom: 7,
              }}
              onPress={() => {
                navigation.navigate('EditProfile', {
                  userinfo: userinfo,
                })
              }}
            >
              <MaterialCommunityIcons
                name='pencil'
                size={16}
                color={colors.white}
              />
            </Pressable>
            <MaterialCommunityIcons
              name='content-copy'
              size={25}
              style={{ marginLeft: 3, marginTop: 0, alignSelf: 'flex-end' }}
              color={colors.Bluish}
              onPress={() => {
                copyToClipboard()
              }}
            />
          </View>
          <MyText
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: '#23232380',
              marginLeft: 10,
              marginBottom: 6,
            }}
          >
            {userinfo?.about.jobTitle}
          </MyText>
          <View style={{ flexDirection: 'row' }}>
            <MyText
              style={{
                fontSize: 12,
                fontWeight: '700',
                marginLeft: 10,
                marginBottom: 6,
              }}
            >
              ${userinfo?.services.hourlyRate}/
            </MyText>
            <MyText
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: '#23232380',
                marginRight: 16,
                margin: 1,
              }}
            >
              Hr
            </MyText>
            <Entypo name='location-pin' size={13} color='grey' />
            <MyText
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#23232380',
                marginLeft: 3,
                marginBottom: 6,
              }}
            >
              {userinfo?.about.city}, {userinfo?.about.country}
            </MyText>
          </View>
          <MyText
            style={{
              fontSize: 12,
              fontWeight: '400',
              marginLeft: 10,
              color: '#23232380',
              marginBottom: 6,
            }}
          >
            Availability : {userinfo?.about.responseTime} Hrs/week
          </MyText>
          <View style={{ flexDirection: 'row' }}>
            <StarRating
              rating={userinfo.userInfo.rating}
              //onChange={setRating}
              starSize={16}
              style={{ padding: 0, margin: 4, width: 10 }}
            />

            <MyText
              style={{
                fontSize: 14,
                fontWeight: '700',
                marginLeft: 60,
                margin: 4,
              }}
            >
              {userinfo.userInfo.rating}
            </MyText>
            <MyText
              style={{
                fontSize: 12,
                fontWeight: '400',
                marginLeft: 10,
                margin: 7,
                color: '#23232380',
              }}
            >
              ({userreviews.length} Reviews)
            </MyText>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default UserInfo
