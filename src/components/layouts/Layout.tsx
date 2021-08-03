import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import { Sidebar } from '~/src/components/widgets/Sidebar'
import { Header } from '~/src/components/widgets/Header'
import { LoginForm } from '~/src/components/screens/login/LoginForm'
import { getLocalStorage } from '~/src/helpers/localStorage'

export const Layout = ({ children }) => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)

  return (
    <>
      {!isLogin ? (
        <LoginForm setIsLogin={setIsLogin} /> 
      ) : (
        <>
          <Header />
          <Row>
            <Col xs="2">
              <Sidebar />
            </Col>
            <Col xs="10">
              <Container className="pt-5 mt-5">{children}</Container>
            </Col>
          </Row>
          <ToastContainer />
        </>
      )}
    </>
  )
}
