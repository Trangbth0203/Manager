import { http } from './http'

export default class fetchApi {
  static async getListDepartment(params) {
    return await http.get('/v1/department', params)
  }
  static async getListEmployee(params) {
    return await http.get('/v1/employee', params)
  }
  static async getListUser(params) {
    return await http.get('/v1/user', params)
  }
  static async postLogin(params) {
    return await http.post('/login', params)
  }
  static async postDepartment(params) {
    return await http.post('/v1/department', params)
  }
}
