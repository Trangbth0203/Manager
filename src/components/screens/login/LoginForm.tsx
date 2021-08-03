import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, CardTitle, Card } from 'reactstrap'
import { useRouter } from 'next/router'
import fetchApi from '~/src/helpers/fetchApi'
import { LoginGoogle } from '~/src/components/screens/login/LoginGoogle'
import { setLocalStorage } from '~/src/helpers/localStorage'
import styles from '~/styles/components/widgets/login.module.scss'

export const LoginForm = ({ setIsLogin }) => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
    let params = {
      email: loginAccount.email,
      password: loginAccount.password,
    }
    setIsLoading(true)
    try {
      const response = await fetchApi.postLogin(params)
      if (!response.status) {
        setIsLoading(false)
      }
      const userInfo = await fetchApi.getMe({ params: { email: params.email } })
      if (!userInfo.status) {
        setIsLoading(false)
      }
      setIsLogin(true)
      setLocalStorage('IS_LOGIN', JSON.stringify(userInfo))
      setTimeout(() => {
        router.replace({ pathname: '/departments' })
      }, 500)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
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
            required
            placeholder="Email"
            value={loginAccount.email || ''}
            onChange={onChangeValue}
          />
          {error ? (
            <span className="text-danger">{error}</span>
          ) : null}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label className="mb-1" for="examplePassword">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            required
            id="examplePassword"
            placeholder="Password "
            value={loginAccount.password || ''}
            onChange={onChangeValue}
          />
        </FormGroup>
        <Button className={styles.ButtonLogin} active onClick={onHandleLogin}>
          {isLoading ? 'Loading' : 'Log In'}
        </Button>
      </Form>
      <div className="mt-3">
        <LoginGoogle />
      </div>
    </Card>
  )
}
