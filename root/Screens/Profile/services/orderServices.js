import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../../http/axiosSet'
import Axios from 'axios'
export const getOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    // console.log(axios.defaults.baseURL, 'orders')
    const resp = await Axios.get(`${axios.defaults.baseURL}orders`, config)
    // console.log('Orders', resp)
    return resp
  } catch (error) {
    // console.log('Hello', error.response)
    return error.response
  }
}

export const getOrderCategoryWise = async (category) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await Axios.post(
      `${axios.defaults.baseURL}orders/category`,
      { category },
      config
    )
    console.log('Resp', resp)
    return resp
  } catch (error) {
    console.log('errrorrr', error.response)
    return error.response
  }
}

export const getSingleOrder = async (orderId) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post('/orders/order', { orderId }, config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const deliverOneTimeOrder = async (orderId, comment, attachments) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.put(
      '/orders/oneTime/deliver',
      { orderId, comment, attachments },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const cancelOneTimeOrder = async (orderId, reason) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.put(
      '/orders/oneTime/cancel',
      {
        orderId,
        reason,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const uploadFileServer = async (formData) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    console.log('Start')
    const resp = await axios.post('/media/uploadfile', formData, config)
    console.log('Resp', resp)
    return resp
  } catch (error) {
    return error.response
  }
}

export const changeDeliveryStatus = async (orderId, status) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.put(
      '/orders/oneTime/deliveryStatus/update',
      {
        orderId,
        status,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
