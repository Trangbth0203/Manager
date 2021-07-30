import React, { useState } from 'react'
import { NextPage } from 'next'
import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CardTitle,
} from 'reactstrap'
import fetchApi from '~/src/helpers/fetchApi'
import { LoginGoogle } from '~/src/components/screens/login/LoginGoogle'
import { setLocalStorage } from '~/src/helpers/localStorage'
import styles from '~/styles/components/widgets/login.module.scss'

const KEY_STORE = 'TOKEN'

const Login: NextPage = () => {
  const [loginAccount, setLoginAccount] = useState({
    email: '',
    password: '',
  })
  const onChangeValue = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setLoginAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const onHandleLogin = async (e) => {
    e.preventDefault()
    const params = {
      email: loginAccount.email,
      password: loginAccount.password,
    }
    const response = await fetchApi.postLogin(params)
    setLocalStorage(KEY_STORE, response.access_token)
  }

  return (
    <Card className={styles.CardLogin}>
      <CardTitle className={styles.TitleLogin}>LOGIN FORM</CardTitle>
      <Form className={styles.FormLogin}>
        <FormGroup>
          <Label className="mb-1" for="exampleEmail">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Email"
            value={loginAccount.email || ''}
            onChange={onChangeValue}
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <Label className="mb-1" for="examplePassword">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Password "
            value={loginAccount.password || ''}
            onChange={onChangeValue}
          />
        </FormGroup>
        <Button className={styles.ButtonLogin} active onClick={onHandleLogin}>
          Log In
        </Button>
      </Form>
      <div className="mt-3">
        <LoginGoogle />
      </div>
    </Card>
  )
}

export default Login
