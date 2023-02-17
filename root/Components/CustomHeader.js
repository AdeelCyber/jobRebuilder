import { Image, StyleSheet, Text, View } from 'react-native'

import React, { useContext, useEffect } from 'react'
import Context from '../Context/Context'
import MyText from './Text'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CartProvider } from '../Context/CartProvider'
import axios from '../http/axiosSet'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomHeader = ({
  partOfDay = 'Morning',
  imageSource = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-d1dpDq5AkEEY6j3428cbey9fdBYEbVk2xw&usqp=CAU',
  name = 'User',
  Notifications = true,
}) => {
  const [user, setUser] = useState()
  const img =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-d1dpDq5AkEEY6j3428cbey9fdBYEbVk2xw&usqp=CAU'
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const u = await AsyncStorage.getItem('@userDetail')

    setUser(JSON.parse(u))
  }
  const {
    theme: { colors },
  } = useContext(Context)
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',

        backgroundColor: colors.white,

        padding: 6,
        justifyContent: 'space-between',
        paddingHorizontal: 13,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{
            uri: user?.avatar ? axios.defaults.baseURL + user?.avatar : img,
          }}
          style={{ width: 30, height: 30, borderRadius: 20, marginRight: 8 }}
        />
        <View>
          <MyText style={{ color: colors.lighttext, fontSize: 10 }}>
            {partOfDay}
          </MyText>
          <MyText
            style={{ color: colors.text, fontSize: 12, fontWeight: '700' }}
          >
            {user?.name ? user?.name : 'Guest User'}
          </MyText>
        </View>
      </View>

      <View>
        {Notifications ? (
          <MaterialCommunityIcons name='bell-circle' size={28} color='black' />
        ) : (
          <MaterialCommunityIcons name='bell-circle' size={28} color='black' />
        )}
      </View>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({})
