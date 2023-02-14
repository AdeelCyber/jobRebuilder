import React, { useContext, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native'

import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import CustomHeader from '../../../Components/CustomHeader2'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { modifyEmail } from '../services/settingsServices'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { sendOTP, verifyOTP } from '../services/otpservice'
import ReactNativeModal from 'react-native-modal'

const ChangeEmailScreen = () => {
  const {
    theme: { colors },
  } = useContext(Context)
  const navigation = useNavigation()
  const [isModalVisible, setModalVisible] = useState(false)

  const [email, setEmail] = useState('')
  const [otp, setOTP] = useState('')

  useEffect(() => {
    getEmail()
  }, [])

  const getEmail = async () => {
    const user = await AsyncStorage.getItem('@userDetail')
    setEmail(JSON.parse(user).email)
  }

  const sendCode = async () => {
    const resp = await sendOTP(email, 'email')
    console.log('WWWW', resp)
    if (resp.status === 200) {
      setModalVisible(true)
    } else {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Something went wrong',
        text2: '.',
      })
      navigation.navigate('Settings')
    }
  }

  const verify = async () => {
    const resp = await verifyOTP(email, otp)
    console.log(resp)
    if (resp.status === 200) {
      updateEmail()
    } else {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Wrong OTP',
        text2: '.',
      })
    }
  }

  const updateEmail = async () => {
    const resp = await modifyEmail(email)
    if (resp.status === 200) {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Email Changed',
        text2: '.',
      })
      const user = JSON.parse(await AsyncStorage.getItem('@userDetail'))
      user.email = email
      await AsyncStorage.setItem('@userDetail', JSON.stringify(user))
      navigation.navigate('Settings')
    } else if (resp.status === 422) {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Invalid Value',
        text2: '.',
      })
    } else if (resp.status === 400 || resp.status === 401) {
      navigation.navigate('LoginScreen')
    } else {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Some error occured',
        text2: '.',
      })
      navigation.navigate('Settings')
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Settings'
        style={{}}
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
      <View style={[styles.container]}>
        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: 20,
          }}
        >
          <MyText style={[styles.heading, { color: colors.text }]}>
            Email Address
          </MyText>
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Email Address'
            underlineColorAndroid='transparent'
            value={email}
            onChangeText={(e) => {
              setEmail(e)
            }}
          />
          <FontAwesome
            style={styles.searchIcon}
            name='pencil'
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          onPress={sendCode}
          disabled={email.trim().length === 0}
          style={[styles.btn, { backgroundColor: colors.secondary }]}
        >
          <MyText
            style={{
              color: 'white',
              fontSize: 14,
            }}
          >
            Done
          </MyText>
        </TouchableOpacity>

        <ReactNativeModal
          transparent
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setModalVisible(!isModalVisible)
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              padding: 35,
              paddingBottom: 0,
            }}
          >
            <MyText style={{ fontSize: 20, textAlign: 'center' }}>
              Verify Email
            </MyText>
            <MyText
              style={{ fontSize: 11, marginVertical: 10, textAlign: 'center' }}
            >
              Enter the OTP sent to {email} to verify your email
            </MyText>
            <View
              style={[
                styles.searchSection,
                { width: '100%', marginHorizontal: 0 },
              ]}
            >
              <TextInput
                style={[styles.input, { width: '100%' }]}
                placeholder='OTP'
                underlineColorAndroid='transparent'
                value={otp}
                onChangeText={(e) => {
                  setOTP(e)
                }}
              />
              <FontAwesome
                style={styles.searchIcon}
                name='pencil'
                size={20}
                color={colors.secondaryText}
              />
            </View>

            <TouchableOpacity
              labelStyle={{ color: '#fff' }}
              onPress={verify}
              style={[
                styles.btn,
                {
                  backgroundColor: colors.secondary,
                  width: '100%',
                  marginHorizontal: 0,
                },
              ]}
            >
              <MyText
                style={{
                  color: 'white',
                  fontSize: 14,
                }}
              >
                Done
              </MyText>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontWeight: '700',
    lineHeight: 30,
    textAlign: 'left',
    marginTop: 20,
    fontSize: 16,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 18,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 26,
    color: '#424242',
  },

  btn: {
    marginHorizontal: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    marginBottom: 40,
  },
})

export default ChangeEmailScreen
