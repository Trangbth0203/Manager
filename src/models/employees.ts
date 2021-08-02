export interface IEmployee {
  id?: string
  department_id?: string
  department_name?: string
  user_id?: string
  employee_email?: string
  birth_date?: string
  first_name?: string
  last_name?: string
  age?: number
  gender?: number
}

// export const MOCK_DATA_EMPLOYEE: IMockDataEmployees[] = [
//   {
//     department_id: 'Division1',
//     user_id: 'huyentrang123@',
//     birth_date: '20/01/1999',
//     first_name: 'Huyen',
//     last_name: 'Trang',
//     age: 23,
//     gender: 0,
//   },
//   {
//     department_id: 'Division2',
//     user_id: 'thuhoai123@',
//     birth_date: '20/01/1998',
//     first_name: 'Thu',
//     last_name: 'Hoai',
//     age: 23,
//     gender: 0,
//   },
//   {
//     department_id: 'Division3',
//     user_id: 'thenhat123@',
//     birth_date: '20/01/1997',
//     first_name: 'The',
//     last_name: 'Nhat',
//     age: 23,
//     gender: 0,
//   },
// ]

export const GENDER = {
  1: 'Nam',
  2: 'Nữ'
}
