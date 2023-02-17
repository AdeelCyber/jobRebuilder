import React, { useState, useEffect, useContext } from 'react'
import Context from './root/Context/Context'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from './root/utils'
import Main from './root/Main'
import { useFonts } from 'expo-font'
import ContextWrapper from './root/Context/ContextWrapper'
import { CartProvider } from './root/Context/CartProvider'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { StripeProvider } from '@stripe/stripe-react-native'
import axios from './root/http/axiosSet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Linking from 'expo-linking'
export default function App() {
  const {
    theme: { colors },
  } = useContext(Context)

  const [publishableKey, setPublishableKey] = useState(
    'pk_test_51LzhaeDLdj1mdl4qST8K2SYhT6dtegITKV9aSDuJ5DaL7VyBsDDLzOxKIRcyJlx4vm4etGPhejsXU81UkftTJDSS006ikiPt43'
  )

  const fetchPublishableKey = async () => {
    const token = await AsyncStorage.getItem('@accessToken')
    try {
      const { data } = await axios.get('/stripe/get-publishable-key', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // fetch key from your server here
      setPublishableKey(data.publishableKey)
      console.log(data.publishableKey)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPublishableKey()

    const handleUrl = async (event) => {
      console.log('Hello')
      // const { url } = event
      // const parsedUrl = await Linking.parse(url)

      // console.log('event= ', event)
      // console.log('URL', url)
      // if (parsedUrl.path === 'stripe-redirect') {
      //   const stripeUserId = parsedUrl.queryParams.stripe_user_id
      //   setStripeAccountId(stripeUserId)
      // }
    }

    Linking.addEventListener('url', handleUrl)
  }, [])
  return (
    <StripeProvider
      publishableKey={publishableKey}
      //   merchantIdentifier='merchant.identifier' // required for Apple Pay
    >
      <CartProvider>
        <ContextWrapper>
          <Main />
          <Toast refs={(refs) => Toast.setRef(refs)} />
        </ContextWrapper>
      </CartProvider>
    </StripeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: "center",
    // justifyContent: "center",
  },
})
