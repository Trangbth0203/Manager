import { http } from './http'

export default class fetchApi {
  static getListDepartment(params) {
    return http.get('/v1/department', params)
  }
  static async postCreateDepartment(params) {
    return await http.post('/v1/department', params)
  }
  static async getListEmployee(params) {
    return await http.get('/v1/employee', params)
  }
  static async postCreateEmployee(params) {
    return await http.post('/v1/employee', params)
  }
  static async getListUser(params) {
    return await http.get('/v1/user', params)
  }
  static postLogin(params) {
    return http.post('/login', params)
  }
  static async postDepartment(params) {
    return await http.post('/v1/department', params)
  }
  static getMe(params) {
    return http.get('/v1/me', params)
  }
  static postCreateUser(params) {
    return http.post('/v1/user', params)
  }
  static getRole(params) {
    return http.get('/v1/role', params)
  }
  static deleteUser(id) {
    return http.delete(`/v1/user/${id}`)
  }
  static deleteDepartment(id) {
    return http.delete(`/v1/department/${id}`)
  }
  static deleteEmployee(id) {
    return http.delete(`/v1/employee/${id}`)
  }
  static updateDepartment(id, params, config) {
    return http.put(`/v1/department/${id}`, params, config)
  }
  static updateEmployee(id, params, config) {
    return http.put(`/v1/employee/${id}`, params, config)
  }
  static updateUser(id, params, config) {
    return http.put(`/v1/user/${id}`, params, config)
  }
  static getProfile(params) {
    return http.get(`/v1/profile`, params)
  }
  static postRemoveMultiRecord(key, params) {
    return http.post(`v1/${key}/delete-multi`, params)
  }
}
