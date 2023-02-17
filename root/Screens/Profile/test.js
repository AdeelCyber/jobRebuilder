import {
  PlatformPayButton,
  StripeProvider,
  usePaymentSheet,
  presentPaymentSheet,
  useStripe,
  CardField,
  useConfirmPayment,
  confirmPayment,
} from '@stripe/stripe-react-native'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import axios from 'axios'
// import CheckoutScreen from './checkoutScreen';
import { Linking } from 'react-native'

function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await axios.post(
        `https://stripetest-production.up.railway.app/create-group-setup-intent`,
        {},
        {}
      )

      const { paymentIntent, ephemeralKey, customer } = await response.json()

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      }
    } catch (err) {
      console.log(err)
    }
  }

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    })
    if (!error) {
      setLoading(true)
    }
  }

  const openPaymentSheet = async () => {
    // see below
  }

  useEffect(() => {
    initializePaymentSheet()
  }, [])

  return (
    <View style={{ padding: 40 }}>
      <Button
        variant='primary'
        disabled={!loading}
        title='Checkout'
        onPress={openPaymentSheet}
      />
    </View>
  )
}

const Card = () => {
  const [name, setName] = useState('')
  // const {confirmPayment, loading} = useConfirmPayment();
  const [ready, setReady] = useState(false)
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()

  useEffect(() => {
    initializePaymentSheet()
  })

  const initializePaymentSheet = async () => {
    const { setupIntent, emphemeralKey, customer } =
      await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: emphemeralKey,
      setupIntentClientSecret: setupIntent,
      merchantDisplayName: 'Example, Inc.',
      // applePay:{
      //   merchantId: 'merchant.com.StepDev',
      // },
      allowsDelayedPaymentMethods: true,
      returnURL: 'stripe-example://stripe-redirect',
    })
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      setReady(true)
    }
  }

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      'https://stripetest-production.up.railway.app/payment-sheet-subscription',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const { setupIntent, emphemeralKey, customer } = await response.json()
    return {
      setupIntent,
      emphemeralKey,
      customer,
    }
  }

  async function buy() {
    const { error } = await presentPaymentSheet()
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      Alert.alert('Success', 'The subscription was successfully created')
      setReady(false)
    }
  }

  const handlePayPress = async () => {
    const response = await fetch(
      'https://stripetest-production.up.railway.app/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          currency: 'usd',
        }),
      }
    )

    const { clientSecret } = await response.json()
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails: { name },
      paymentMethodType: 'Card',
    })
    if (error) {
      console.log(error)
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else if (paymentIntent) {
      Alert.alert('Success', `Payment ${paymentIntent.id} has been confirmed!`)
    }
  }

  return (
    <ScrollView style={{ flex: 1, margin: 10, padding: 10 }}>
      <TextInput
        autoCapitalize='none'
        placeholder='Name'
        keyboardType='name-phone-pad'
        onChangeText={(text) => setName(text)}
        value={name}
        style={{
          borderWidth: 1,
          borderColor: 'black',
          padding: 10,
          margin: 20,
        }}
      />
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        style={{
          width: '100%',
          height: 50,
          marginBottom: 20,
        }}
        cardStyle={{
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
        }}
      />
      <Button title='Pay' onPress={handlePayPress} disabled={loading} />
    </ScrollView>
  )
}

export default function App() {
  const [publishableKey, setPublishableKey] = useState(
    'pk_test_51LzhaeDLdj1mdl4qST8K2SYhT6dtegITKV9aSDuJ5DaL7VyBsDDLzOxKIRcyJlx4vm4etGPhejsXU81UkftTJDSS006ikiPt43'
  )

  // const onboardingCall = async (url) => {
  //   try{
  //     await fetch(url,{
  //       method: 'GET',
  //     })
  //   }catch(err){
  //     Alert.alert('Error: ', JSON.stringify(err));
  //   }

  // }

  const handleOnBoard = async () => {
    try {
      await fetch(
        'https://stripetest-production.up.railway.app/create-conncted-account',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => {
          return res.json()
        })
        .then(async (responseJSON) => {
          if (responseJSON) {
            await Linking.openURL(responseJSON.url)
          }
        })
    } catch (err) {
      console.log(JSON.stringify(err))
      Alert.alert('Error: ', JSON.stringify(err))
    }
  }

  return (
    <StripeProvider
      publishableKey={publishableKey}
      // merchantIdentifier="merchant.com.StepDev" // required for Apple Pay
    >
      <Card />
      {/* <CheckoutScreen /> */}
      {/* <View style={{marginTop:100}}>
   <Button  title='OnBoard'  onPress={handleOnBoard} />
   </View> */}
    </StripeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
})
