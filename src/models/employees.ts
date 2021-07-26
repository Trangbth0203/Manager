export interface IMockDataEmployees {
  department_name: string
  email: string
  birthday: string
  firstName: string
  lastName: string
  age: number
  gender: number
}

export const MOCK_DATA_EMPLOYEE: IMockDataEmployees[] = [
  {
    department_name: 'Division1',
    email: 'huyentrang123@',
    birthday: '20/01/1999',
    firstName: 'Huyen',
    lastName: 'Trang',
    age: 23,
    gender: 0,
  },
  {
    department_name: 'Division2',
    email: 'thuhoai123@',
    birthday: '20/01/1998',
    firstName: 'Thu',
    lastName: 'Hoai',
    age: 23,
    gender: 0,
  },
  {
    department_name: 'Division3',
    email: 'thenhat123@',
    birthday: '20/01/1997',
    firstName: 'The',
    lastName: 'Nhat',
    age: 23,
    gender: 0,
  },
]

export const GENDER = ['Nam', 'Nữ']
