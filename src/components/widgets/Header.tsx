import React, { useState } from 'react'
import { IconLogin, IconSignUp } from '~/src/components/elements'
import classnames from 'classnames'
import styles from '~/styles/components/widgets/header.module.scss'
import { NavLink, Navbar, Col, NavbarBrand, Input } from 'reactstrap'

export const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className={classnames(styles.header)}>
      <Navbar style={{ backgroundColor: '#282828' }} expand="md">
        <Col xs="4">
          {/* <NavbarBrand href="/" color="light">Home</NavbarBrand> */}
        </Col>
        <Col xs="4">
          <Input
            type="text"
            name="text"
            id="exampleText"
            placeholder="search..."
          />
        </Col>
        <Col className="d-flex justify-content-end" xs="">
          <NavLink style={{ color: '#FFFFFF' }} href="/">
            {' '}
            <span>
              <IconSignUp /> SignUp
            </span>
          </NavLink>
          <NavLink style={{ color: '#FFFFFF' }} href="/">
            {' '}
            <span>
              {' '}
              <IconLogin />{' '}
            </span>{' '}
            Login
          </NavLink>
        </Col>
      </Navbar>
    </div>
  )
}
