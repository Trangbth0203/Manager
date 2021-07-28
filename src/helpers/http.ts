import axios from 'axios'
import { BASE_URL_API } from '~/src/utils/constants'

const http = axios.create({
  baseURL: BASE_URL_API,
})

let token = null

const setToken = (_token) => { token = token }

http.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data.result ? response.data.result : response.data
    }
    return response
  },
  (error) => {
    const err = (error.response && error.response.data) || error
    return Promise.reject(err)
  }
)

export { http }
