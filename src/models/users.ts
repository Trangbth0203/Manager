export interface IUsers {
  id: string
  role_name: string,
  name: string
  email: string
  password: string
}

export interface IMe {
  change_password?: string
  email: string
  email_verified_at: string
  id: string
  name: string
  password: string
  remember_token: string
  role_id: string
  status: number
  updated_at: string
  created_at: string
  created_by: string
  imageUrl: string
}
