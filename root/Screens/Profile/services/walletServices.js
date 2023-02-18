import axios from '../../../http/axiosSet'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getWalletDetail = async () => {
  const token = await AsyncStorage.getItem('@accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const resp = await axios.get('/wallet/user', config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const sendWithDrawRequest = async () => {
  const token = await AsyncStorage.getItem('@accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const resp = await axios.get('/wallet/withdrawlRequest', config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const getFunds = async (page, limit) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/freelancer/fundsCleared',
      { page, limit },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
