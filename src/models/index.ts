export const MENUS = [

  { name: 'Home', href: '/' },
  { name: 'Departments', href: '/departments' },
  { name: 'Employees', href: '/employees' },
  { name: 'Users', href: '/users' },
]

export interface IMenu {
  name: string
  href: string
}

export const DEFAULT_CURRENT_PAGE = 1
