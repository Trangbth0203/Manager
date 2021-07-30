import { http } from './http'

export default class fetchApi {
  static async getListDepartment(params) {
    return await http.get('/v1/department', params)
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
static updateDepartment(id) {
  return http.put(`/v1/department/${id}`)
}
}
