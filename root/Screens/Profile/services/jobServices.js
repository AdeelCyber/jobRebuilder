import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../../http/axiosSet'

export const getAvailableJobs = async (startupid) => {
  try {
    // const token = await AsyncStorage.getItem('@accessToken')
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UyN2RmZmJkMGVjNjAwMWUzYjBkZDIiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1Nzk3NDYzfQ.APUAasv38XBzIeR62kD-LXfDH1Cr6IoqQV4AwlrpRs4'
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
