import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../../http/axiosSet'

export const getWarnings = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      header: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.get('/warnings', config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const getSpecificWarning = async (startupId, warningId) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      header: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        startupId,
        warningId,
      },
    }
    const resp = await axios.post('/warnings/warning', config)
    return resp
  } catch (error) {
    return error.response
  }
}
