import AsyncStorage from '@react-native-community/async-storage'
import axios from '../../../http/axiosSet'

export const getAvailableJobs = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      header: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.get('/jobs/availableJobs', config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const getSpecificJob = async (startupId, roleId) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      header: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        startupId,
        roleId,
      },
    }
    const resp = await axios.post('/jobs/job', config)
    return resp
  } catch (error) {
    return error.response
  }
}
