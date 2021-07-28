import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import { Sidebar } from '~/src/components/widgets/Sidebar'
import { Header } from '~/src/components/widgets/Header'
import Login from '../../../pages/auth/login'


export const Layout = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false)

  return (
    <>
      {isLogin ? (
        <Login />
      ) : (
        <div>
        <Header />
          <Row>
            <Col xs="2">
              <Sidebar />
            </Col>
            <Col xs="10">
              <Container className="pt-5">{children}</Container>
            </Col>
          </Row>
          <ToastContainer />
        </div>
      )}
    </>
  )
}
