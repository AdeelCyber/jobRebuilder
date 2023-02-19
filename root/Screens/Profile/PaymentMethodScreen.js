import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomHeader from '../../Components/CustomHeader2'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import MyText from '../../Components/Text'
// import { Linking } from 'react-native'
import * as Linking from 'expo-linking'

// import axios from '../../http/axiosSet'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CartProvider } from '../../Context/CartProvider'

import { io } from 'socket.io-client'

const PaymentMethodScreen = () => {
  const navigation = useNavigation()
  const [stripeURL, setStripeURL] = useState(null)
  const [route, setRoute] = useState('')

  // const { socket } = useContext(CartProvider)

  // useEffect(() =>

  // {

  //   // getInitialRoute()
  //   // Linking.addEventListener('url', handleUrl)
  //   // Linking.getInitialURL().then((url) => {
  //   //   if (url) {
  //   //     setInitialUrl(url)
  //   //   }
  //   // })
  //   // return () => {
  //   //   Linking.removeEventListener('url', handleUrl)
  //   // }
  // }, [])

  useEffect(() => {
    let socket = io('https://stepdev.up.railway.app', {
      autoConnect: true,
      extraHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UyOGU2MzZmYzkxZDAwMWUwMDQwNTIiLCJyb2xlIjoiRnJlZWxhbmNlciIsImVtYWlsIjoic3VsZW1hbkBnbWFpbC5jb20iLCJpYXQiOjE2NzY3NTkyODR9.y0VPwrzNfUe3ZH3PNJxfVqPP0Xf3HKdwk21SAJgne3E`,
      },
    })

    console.log(socket)

    socket.on('account-connected-event', (data) => {
      console.log('Data is here', data)
    })
  }, [])

  // socket.on('account-connected-event', (data) => {
  //   console.log('Data is here2', data)
  // })

  const goTo = async () => {
    console.log('Before')
    try {
      var options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: '',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UyN2RmZmJkMGVjNjAwMWUzYjBkZDIiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1OTUwODYxfQ.HgyEwPK-4Hup7bEFkSTG1EC8UG3u-MOvnrbDeHAgrLM`,
        },
      }

      const resp = fetch(
        `https://stepdev.up.railway.app/stripe/multiparty-express`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          Linking.openURL(data.url)
        })

      //     headers: {
      //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UyN2RmZmJkMGVjNjAwMWUzYjBkZDIiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1OTUwODYxfQ.HgyEwPK-4Hup7bEFkSTG1EC8UG3u-MOvnrbDeHAgrLM`,
      //     },
      //   }
      //   const redirectUri = encodeURIComponent('myapp://myapp.com')
      //   const { data } = await axios.post(
      //     'https://stepdev.up.railway.app/stripe/multiparty-express',
      //     config
      //   )
      //   console.log(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  // setTimeout(async () => {
  //   console.log('Hello wordsssss')
  //   await Linking.openURL('myapp://myapp.com')
  // }, 20000)

  const handleURL = () => {
    console.log('Before launch')
  }

  const getInitialRoute = async () => {
    const redirectUrl = Linking.createURL('path/into/app', {
      queryParams: { hello: 'world' },
    })
    console.log(redirectUrl)
    const supported = await Linking.canOpenURL('myapp://myapp.com')
    console.log('Condition', supported)

    setRoute(redirectUrl)
  }

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Payment Method'
        nav={navigation}
        style={{}}
        icon={() => {
          return <Feather name='info' size={20} color='black' />
        }}
      />
      <View
        style={[styles.container, { paddingTop: 17, paddingHorizontal: 10 }]}
      >
        <TouchableOpacity
          onPress={() => {
            goTo()
          }}
          style={{
            backgroundColor: '#8489FC',
            borderRadius: 10,
            paddingTop: 20,
            paddingBottom: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MyText style={{ fontSize: 16, color: 'white' }}>Onboard</MyText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default PaymentMethodScreen
