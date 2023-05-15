import axios from '../../../http/axiosSet'

export const sendOTP = async (email, channel) => {
  try {
    const resp = await axios.post('/auth/sendOTP', {
      to: email,
      channel: channel,
    })
    return resp
  } catch (error) {
    return error.response
  }
}

export const verifyOTP = async (email, code) => {
  try {
    const resp = await axios.post('/auth/verifyOTP', {
      to: email,
      code: code,
    })
    return resp
  } catch (error) {
    return error.response
  }
}
