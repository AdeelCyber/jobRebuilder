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
import { modifyPhoneNumber } from '../services/settingsServices'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { sendOTP, verifyOTP } from '../services/otpservice'
import Toast from 'react-native-toast-message'
import ReactNativeModal from 'react-native-modal'

const ChangePhoneNumberScreen = () => {
  const {
    theme: { colors },
  } = useContext(Context)
  const navigation = useNavigation()

  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    getPhoneNumber()
  }, [])
  const [otp, setOTP] = useState('')

  const getPhoneNumber = async () => {
    const user = await AsyncStorage.getItem('@userDetail')
    console.log(JSON.parse(user).phoneNumber)
    setPhoneNumber(JSON.parse(user).phoneNumber)
  }

  const [isModalVisible, setModalVisible] = useState(false)

  const sendCode = async () => {
    console.log('Phonumber', phoneNumber)
    const resp = await sendOTP(phoneNumber, 'sms')
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
    const resp = await verifyOTP(phoneNumber, otp)
    console.log(resp)
    if (resp.status === 200) {
      changePhoneNumber()
    } else {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Wrong OTP',
        text2: '.',
      })
    }
  }

  const changePhoneNumber = async () => {
    const resp = await modifyPhoneNumber(phoneNumber)
    if (resp.status === 200) {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Phone Number Changed',
        text2: '.',
      })
      const user = JSON.parse(await AsyncStorage.getItem('@userDetail'))
      user.phoneNumber = phoneNumber
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
        nav={navigation}
        style={{}}
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
          <MyText
            style={{
              fontWeight: '700',
              lineHeight: 30,
              color: colors.text,
              textAlign: 'left',
              marginTop: 20,
              fontSize: 16,
            }}
          >
            Phone Number
          </MyText>
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Phone Number'
            underlineColorAndroid='transparent'
            value={phoneNumber}
            onChangeText={(e) => {
              setPhoneNumber(e)
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
          onPress={sendCode}
          labelStyle={{ color: '#fff' }}
          style={{
            marginHorizontal: 18,
            backgroundColor: colors.secondary,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginTop: 15,
            marginBottom: 40,
          }}
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
              Verify Phone Number
            </MyText>
            <MyText
              style={{ fontSize: 11, marginVertical: 10, textAlign: 'center' }}
            >
              Enter the OTP sent to {phoneNumber} to verify your phone number
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

export default ChangePhoneNumberScreen
