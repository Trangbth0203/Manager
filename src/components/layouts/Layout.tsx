import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import { Sidebar } from '~/src/components/widgets/Sidebar'
import { Header } from '~/src/components/widgets/Header'
import { getLocalStorage } from '~/src/helpers/localStorage'


export const Layout = ({ children }) => {
  if (typeof window === undefined) {
    if (!getLocalStorage('TOKEN')) {
      Router.push('/auth/login')
    }
  }

  return (
    <>
        {/* {!isLogin ? <Login /> : null} */}
        <Header />
        <Row>
          <Col xs="2">
            <Sidebar />
          </Col>
          <Col xs="10">     
            <Container className="pt-5 mt-5">
              {children}
            </Container>
          </Col>
        </Row>
        <ToastContainer />
    </>
  )
}
