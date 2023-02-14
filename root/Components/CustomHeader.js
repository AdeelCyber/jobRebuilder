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
  imageSource = 'https://bit.ly/kent-c-dodds',
  name = 'Abdullah',
  Notifications = true,
}) => {
  const [user, setUser] = useState()

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
          source={{ uri: axios.defaults.baseURL + user?.avatar }}
          style={{ width: 30, height: 30, borderRadius: 20, marginRight: 8 }}
        />
        <View>
          <MyText style={{ color: colors.lighttext, fontSize: 10 }}>
            {partOfDay}
          </MyText>
          <MyText
            style={{ color: colors.text, fontSize: 12, fontWeight: '700' }}
          >
            {user?.name}
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
