export const MENUS = [

  { name: 'Home', href: '/' },
  { name: 'Departments', href: '/departments' },
  { name: 'Employees', href: '/employees' },
  { name: 'Users', href: '/users' },
]

export const GET_ME = 'GET_ME'
export const APP_TOKEN = 'TOKEN'

export interface IMenu {
  name: string
  href: string
}

export const DEFAULT_CURRENT_PAGE = 1
