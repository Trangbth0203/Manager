import React from 'react'
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
import styles from '~/styles/components/widgets/login.module.scss'

const Login: NextPage = () => {
  const onHandleLogin = async(e) => {
    e.preventDefault()
    let params = {
      email: 'trangbth@rikkeisoft.com',
      password: 'trang123'
    }
    await fetchApi.postLogin(params).then((res) => {
      console.log(res)
    })
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
