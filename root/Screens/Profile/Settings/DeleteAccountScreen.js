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
import ReactNativeModal from 'react-native-modal'
import CustomHeader from '../../../Components/CustomHeader2'
import { useNavigation } from '@react-navigation/native'
import { deleteAccount } from '../services/settingsServices'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CartProvider from '../../../Context/CartProvider'

const DeleteAccountScreen = () => {
  const {
    theme: { colors },
  } = useContext(Context)
  const navigation = useNavigation()

  const [isModalVisible, setModalVisible] = useState(false)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {
    userdetails,
    setaccessToken,
    setuserdetails,
    setrefreshToken,
    setislogin,
  } = useContext(CartProvider)

  const accountDelete = async () => {
    const resp = await deleteAccount(password, confirmPassword)
    console.log(resp)
    if (resp.status === 200) {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Account Deleted',
        text2: '.',
      })
      await AsyncStorage.removeItem('@accessToken')
      await AsyncStorage.removeItem('@userDetail')
      await AsyncStorage.removeItem('@refreshToken')
      setaccessToken('')
      setrefreshToken('')
      setuserdetails([])
      setislogin(false)

      navigation.navigate('LoginScreen')
    } else if (resp.status === 400) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Password do not match',
        text2: '.',
      })
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Delete Account'
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
            Enter Password
          </MyText>
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Password'
            underlineColorAndroid='transparent'
            onChangeText={(e) => {
              setPassword(e)
            }}
          />
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Confirm Password'
            underlineColorAndroid='transparent'
            onChangeText={(e) => {
              setConfirmPassword(e)
            }}
          />
        </View>

        <TouchableOpacity
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
            opacity:
              confirmPassword.trim().length < 8 || password.trim().length < 8
                ? 0.5
                : 1,
          }}
          disabled={
            confirmPassword.trim().length < 8 || password.trim().length < 8
          }
          onPress={() => {
            setModalVisible(!isModalVisible)
          }}
        >
          <MyText
            style={{
              color: 'white',
              fontSize: 14,
            }}
          >
            Delete Account
          </MyText>
        </TouchableOpacity>

        <ReactNativeModal transparent isVisible={isModalVisible}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              paddingBottom: 30,
              padding: 35,
            }}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <MyText
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  lineHeight: 20.83,
                  textAlign: 'center',
                  marginTop: 29,
                }}
              >
                Are you sure you want to delete your account permanently?
              </MyText>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 18,
                    backgroundColor: '#EFEFEF',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    marginTop: 28,
                    marginBottom: 18,
                    width: 100,
                  }}
                  onPress={() => {
                    setModalVisible(!isModalVisible)
                  }}
                >
                  <MyText
                    style={{
                      color: colors.secondaryText,
                      fontSize: 16,
                    }}
                  >
                    Cancel
                  </MyText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginHorizontal: 18,
                    backgroundColor: '#8489FC',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    marginTop: 28,
                    marginBottom: 18,
                    width: 100,
                  }}
                  onPress={() => {
                    accountDelete()
                  }}
                >
                  <MyText
                    style={{
                      color: 'white',
                      fontSize: 16,
                    }}
                  >
                    Confirm
                  </MyText>
                </TouchableOpacity>
              </View>
            </View>
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
})

export default DeleteAccountScreen
