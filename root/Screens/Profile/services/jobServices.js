import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../../http/axiosSet'

export const getAvailableJobs = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.get('/jobs/availableJobs', config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const getSpecificJob = async (clientId, roleId) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        clientId,
        roleId,
      },
    }
    const resp = await axios.post('/jobs/job', config)
    return resp
  } catch (error) {
    return error.response
  }
}
