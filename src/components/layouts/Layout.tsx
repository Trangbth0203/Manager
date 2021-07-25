import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Sidebar } from '~/src/components/widgets/Sidebar'

export const Layout = ({ children }) => {
  return (
    <div>
      <Row>
        <Col xs="2">
          <Sidebar />
        </Col>
        <Col xs="10">
          <Container className="pt-5">{children}</Container>
        </Col>
      </Row>
    </div>
  )
}
