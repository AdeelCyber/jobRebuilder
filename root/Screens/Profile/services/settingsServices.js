import axios from '../../../http/axiosSet'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const modifyEmail = async (email) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.put('/user/update/email', { email }, config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const modifyPhoneNumber = async (phoneNumber) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.put('/user/update/phone', { phoneNumber }, config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const changePassword = async (password, confirmPassword) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.put(
      '/user/update/password',
      { password, confirmPassword },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const deleteAccount = async (password, confirmPassword) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        password,
        confirmPassword,
      },
    }
    const resp = await axios.delete('/user/delete', config)
    return resp
  } catch (error) {
    return error.response
  }
}
