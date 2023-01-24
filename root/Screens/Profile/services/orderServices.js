import axios from '../../../http/axiosSet'

export const getOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      header: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.get('/orders', config)
    return resp
  } catch (error) {
    return error.response
  }
}
