import React from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import { CLIENT_ID } from '~/src/utils/constants'
import styles from '~/styles/components/screen/loginGoogle.module.scss'

export const LoginGoogle = () => {
  const responseGoogle = (response: GoogleLoginResponse) => {
  }

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login with Google"
      className={styles.buttonLoginGoogle}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}
