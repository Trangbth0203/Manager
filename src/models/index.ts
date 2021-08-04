import { getLocalStorage } from "../helpers/localStorage"

export const MENUS = [

  { name: 'Home', href: '/' },
  { name: 'Departments', href: '/departments' },
  { name: 'Employees', href: '/employees' },
  { name: 'Users', href: '/users' },
  { name: 'Profile', href: '/profile' },
]

export const GET_ME = 'GET_ME'
export const APP_TOKEN = 'TOKEN'

export interface IMenu {
  name: string
  href: string
}

export const DEFAULT_CURRENT_PAGE = 1

export const getAccount = () => {
  if (getLocalStorage(GET_ME)) {
    return getLocalStorage(GET_ME)
  }
  return null
}

export const GENDER = {
  '1': 'Nam',
  '2': 'Nữ'
}
