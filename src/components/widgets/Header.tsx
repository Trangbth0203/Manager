import React from 'react'
import { NavLink, Navbar, Col, Input } from 'reactstrap'
import { IconLogin, IconSignUp } from '~/src/components/elements'
import styles from '~/styles/components/widgets/header.module.scss'

export const Header = () => {
  return (
    <div className={styles.header}>
      <Navbar style={{ backgroundColor: '#282828' }} expand="md">
        <Col xs="4"></Col>
        <Col xs="4">
          <Input
            type="text"
            name="text"
            id="exampleText"
            placeholder="Search..."
          />
        </Col>
        <Col className="d-flex justify-content-end" xs="">
          <NavLink style={{ color: '#FFFFFF' }} href="/">
            <span>
              <IconSignUp /> SignUp
            </span>
          </NavLink>
          <NavLink style={{ color: '#FFFFFF' }} href="/">
            <span>
              <IconLogin />
            </span>
            Login
          </NavLink>
        </Col>
      </Navbar>
    </div>
  )
}
