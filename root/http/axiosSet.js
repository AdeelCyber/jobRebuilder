import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://stepdev.up.railway.app/',
})

export default instance
