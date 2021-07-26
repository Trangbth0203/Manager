import React, { useState } from 'react'
import { Table, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import { MOCK_DATA_USER, IMockDataUsers } from '~/src/models/users'
import { IconEdit, IconDelete } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { UserAdd } from './UserAdd'
import { UserEdit } from './UserEdit'
import styles from '~/styles/pages/users.module.scss'

export const UserList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Users</CardTitle>
            <Button color="success" onClick={() => setOpenModal(true)}>CREATE</Button>
          </div>
          <CardText>
            <Table bordered className="mt-3">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Role Name</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DATA_USER.map((item: IMockDataUsers, index: number) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{++index}</th>
                      <td>{item.role_id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <span className={styles.icon}  onClick={() => setOpenModal(true)}>
                        <IconEdit />
                        </span>
                        <span>
                          <IconDelete />
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CardText>
        </CardBody>
      </Card>
      <CustomModal title={'EDIT USER'} show={openModal} setShow={setOpenModal}>
        <UserEdit />
      </CustomModal> 
      <CustomModal title={'ADD  NEWS USER'} show={openModal} setShow={setOpenModal}>
        <UserAdd />
      </CustomModal>
    </>
  )
}
