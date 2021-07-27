export const MENUS = [

  { name: 'Login', href: '/auth/login' },
  { name: 'Home', href: '/' },
  { name: 'Departments', href: '/departments' },
  { name: 'Employees', href: '/employees' },
  { name: 'Users', href: '/users' },
]

export interface IMenu {
  name: string
  href: string
}
