import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../../http/axiosSet'

export const getAvailableJobs = async (startupid) => {
  try {
    // const token = await AsyncStorage.getItem('@accessToken')
    const token = await AsyncStorage.getItem('@accessItem')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post('/jobs/startupJobs', { startupid }, config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const getCareerJobs = async () => {
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
    }
    const resp = await axios.post(
      '/jobs/job',
      {
        clientId,
        roleId,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const applyOnJob = async (startupId, roleId) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post('/jobs/apply', { startupId, roleId }, config)
    return resp
  } catch (error) {
    return error.response
  }
}
