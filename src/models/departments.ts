export interface IMockDataDepartment {
  name: string
  number_person: number
  phone: string
  main_manager: string
  others_manager: string
}

export const MOCK_DATA_DEPARTMENTS: IMockDataDepartment[] = [
  {
    name: 'Division1',
    number_person: 50,
    phone: '0123456789',
    main_manager: 'Hoang Duy Dung',
    others_manager: 'Tran Ngoc Duy',
  },
  {
    name: 'Division2',
    number_person: 40,
    phone: '0123456788',
    main_manager: 'Hoang Duy Hung',
    others_manager: 'Tran Ngoc Son',
  },
  {
    name: 'Division3',
    number_person: 30,
    phone: '0123456787',
    main_manager: 'Nguyen Quang Nhat',
    others_manager: 'Tran Ngoc Huy',
  },
]
