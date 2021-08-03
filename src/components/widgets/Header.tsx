import React from 'react'
import { NavLink, Navbar, Col, Input } from 'reactstrap'
import { IconLogin } from '~/src/components/elements'
import { clearLocalStorage, getLocalStorage, removeLocalStorage } from '~/src/helpers/localStorage'
import { APP_TOKEN, GET_ME } from '~/src/models'
import { IMe } from '~/src/models/users'
import styles from '~/styles/components/widgets/header.module.scss'

export const Header = ({ setAppToken }) => {
  const onHandleLogout = () => {
    removeLocalStorage(APP_TOKEN)
    removeLocalStorage(GET_ME)
    clearLocalStorage()
    setAppToken('')
  }

  let user = {} as IMe
  if (getLocalStorage(GET_ME)) {
    user = JSON.parse(getLocalStorage(GET_ME))
  }

  return (
    <div className={styles.header}>
      <Navbar style={{ backgroundColor: '#282828' }} expand="md">
        <Col xs="4"></Col>
        <Col xs="4">
          <Input
            type="text"
            name="text"
            placeholder="Search..."
          />
        </Col>
        <Col className="d-flex justify-content-end" xs="">
          <NavLink style={{ color: '#FFFFFF' }}>
            <span className="cursor-pointer ml-2" title='Logout'>
              {user.name}
            </span>
          </NavLink>
          <NavLink style={{ color: '#FFFFFF' }} onClick={onHandleLogout}>
            <span className="cursor-pointer ml-2" title='Logout'>
              <IconLogin />
            </span>
          </NavLink>
        </Col>
      </Navbar>
    </div>
  )
}
