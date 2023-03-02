import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
  baseURL: 'https://stepdev.up.railway.app/',
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = await AsyncStorage.getItem('@refreshToken')
      const response = await axios.post(
        'https://stepdev.up.railway.app/auth/refresh',
        { refreshToken }
      )
      const accessToken = response.data.accessToken
      await AsyncStorage.setItem('@accessToken', accessToken)
      instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`
      return instance(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default instance
