import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../../http/axiosSet'

export const getOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.get('/orders', config)
    return resp
  } catch (error) {
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
      data: {
        category,
      },
    }
    const resp = axios.post('/orders/category', config)
    return resp
  } catch (error) {
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
      data: {
        orderId,
      },
    }
    const resp = axios.post('/orders/order', config)
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
      data: {
        orderId,
        comment,
        attachments,
      },
    }
    const resp = await axios.put('/orders/oneTime/deliver', config)
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
      data: {
        orderId,
        reason,
      },
    }
    const resp = await axios.put('/orders/oneTime/cancel', config)
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
