import React, { useContext, useState } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import Context from '../../Context/Context'
import { profileMenu } from '../../utilities/profileMenu'
import Icon from '@expo/vector-icons/FontAwesome'
import MyText from '../../Components/Text'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import SvgImport from '../../Components/SvgImport'
import HomeIcon from '../../../assets/Svgs/Home'
import SettingIcon2 from '../../../assets/Svgs/Setting'
import PaymentCardIcon from '../../../assets/Svgs/PaymentCardIcon'
import BagIcon from '../../../assets/Svgs/BagIcon'
import CrossIcon from '../../../assets/Svgs/CrossIcon'
import LogoutIcon from '../../../assets/Svgs/LogoutIcon'
import CubeIcon from '../../../assets/Svgs/CubeIcon'
import CompassIcon from '../../../assets/Svgs/CompassIcon'
import ArrowRightIcon from '../../../assets/Svgs/ArrowRightIcon'
import CustomHeader from '../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CartContext from '../../Context/CartProvider'
import axios from '../../http/axiosSet'
import * as Linking from 'expo-linking'
import Loader from '../../Components/Loader'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

const ProfileScreen = () => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const {
    theme: { colors },
  } = useContext(Context)

  const {
    userdetails,
    setaccessToken,
    setuserdetails,
    setrefreshToken,
    setislogin,
  } = useContext(CartContext)

  const contest = useContext(CartContext)
  React.useLayoutEffect(() => {
    getData()
    console.log('User', userdetails)
  }, [isFocused])

  const getData = async () => {
    const token = await AsyncStorage.getItem('@accessToken')
    if (!token) {
      navigation.navigate('LoginScreen')
    }
  }
  const icons = [
    <SvgImport svg={HomeIcon} />,
    <SvgImport svg={SettingIcon2} />,
    <SvgImport svg={PaymentCardIcon} />,
    <SvgImport svg={CubeIcon} />,
    <SvgImport svg={BagIcon} />,
    <SvgImport svg={CrossIcon} />,
    // <SvgImport svg={CompassIcon} />,
    <SvgImport svg={LogoutIcon} />,
  ]

  useEffect(() => {
    let socket = io(axios.defaults.baseURL, {
      autoConnect: true,
      extraHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UyOGU2MzZmYzkxZDAwMWUwMDQwNTIiLCJyb2xlIjoiRnJlZWxhbmNlciIsImVtYWlsIjoic3VsZW1hbkBnbWFpbC5jb20iLCJpYXQiOjE2NzY3NTkyODR9.y0VPwrzNfUe3ZH3PNJxfVqPP0Xf3HKdwk21SAJgne3E`,
      },
    })

    console.log(socket)

    socket.connect()
    socket.on('connect', () => {
      console.log('Connected')
    })

    socket.on('account-connected-event', (data) => {
      console.log('Data is here', data)
    })
  }, [])

  const goTo = async () => {
    console.log('Before')
    const token = await AsyncStorage.getItem('@accessToken')
    try {
      var options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: '',
          Authorization: `Bearer ${token}`,
        },
      }
      setLoading(true)

      const resp = fetch(
        `${axios.defaults.baseURL}stripe/multiparty-express`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setLoading(false)
          Linking.openURL(data.url)
        })
    } catch (error) {
      console.log(error.response)
    }
  }

  const ListItem = ({ profile, index }) => (
    <Pressable style={{ marginTop: 10 }}>
      <TouchableOpacity
        onPress={async () => {
          if (profile.navigate === 'LoginScreen') {
            await AsyncStorage.removeItem('@accessToken')
            await AsyncStorage.removeItem('@refreshToken')
            await AsyncStorage.removeItem('@userDetail')
            setuserdetails([])
            setaccessToken('')
            setrefreshToken('')
            setislogin(false)
          } else if (profile.navigate === 'PaymentMethod') {
            goTo()
            return
          }
          navigation.navigate(profile.navigate)
        }}
      >
        <View style={styles.listItemView}>
          <View
            style={{
              backgroundColor: '#EEEEEE',
              borderRadius: 10,
              marginRight: 20,
              padding: 7,
              height: 38,
              width: 38,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {icons[index]}
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <MyText
              style={{
                fontWeight: '600',
                fontSize: 15,
              }}
            >
              {profile.title}
            </MyText>
          </View>
          <View style={styles.iconView}>
            <SvgImport svg={ArrowRightIcon} />
            {/* <Icon style={{ fontWeight: 0 }} name='arrow-right' size={15} /> */}
          </View>
        </View>
      </TouchableOpacity>
    </Pressable>
  )

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <Loader visible={loading} color='white' indicatorSize='large' />
      <CustomHeader
        Title=''
        style={{ elevation: 0 }}
        nav={navigation}
        icon={() => {
          return (
            <MaterialCommunityIcons
              name='bell-circle'
              size={28}
              color='black'
            />
          )
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <Image
            style={{ height: 100, width: 100, borderRadius: 50 }}
            source={{
              uri:
                axios.defaults.baseURL +
                'media/getimage/' +
                userdetails?.avatar,
            }}
          />
        </View>
        <View>
          <MyText
            style={{
              fontWeight: '800',
              fontSize: 23,
              lineHeight: 30,
              color: colors.text,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {userdetails?.name}

          </MyText>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            labelStyle={{ color: '#fff' }}
            onPress={() => {
              navigation.navigate('ChangeProfile')
            }}
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 4,
              width: 100,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <MyText
              style={{
                color: 'white',
                fontSize: 13,
              }}
            >
              <Icon name='pencil' size={11.5} /> &nbsp;&nbsp; Edit Profile
            </MyText>
          </TouchableOpacity>
        </View>
        {profileMenu.map((profile, index) => {
          return <ListItem key={profile.id} index={index} profile={profile} />
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 29,
  },

  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 60,
  },
})

export default ProfileScreen
