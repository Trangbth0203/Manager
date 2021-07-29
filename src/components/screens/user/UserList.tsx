import React, { useState, useEffect } from 'react'
import { Table, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import fetchApi from '~/src/helpers/fetchApi'
import { IMockDataUsers } from '~/src/models/users'
import { IconEdit, IconDelete } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { UserAdd } from '~/src/components/screens/user/UserAdd'
import { UserEdit } from '~/src/components/screens/user/UserEdit'
import { Pagination } from '~/src/components/elements/pagination'
import { Limit } from '~/src/components/elements/limit'
import styles from '~/styles/pages/users.module.scss'

export const UserList = () => {
  const [params, setParams ] = useState({})
  const [listUser, setListUser] = useState([])
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const fetchUserList = async () => {
    await fetchApi.getListUser({ params }).then((res) => {
      if (res && res.data) {
        setListUser(res.data)
      }
    })
  }
  useEffect(() => {
    fetchUserList()
  }, [params])

  return (
    <>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Users</CardTitle>
            <Button color="success" onClick={() => setOpenModalCreate(true)}>CREATE</Button>
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
                {listUser && listUser.map((item: IMockDataUsers, index: number) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{++index}</th>
                      <td>{item.role_id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <span className={styles.iconEdit}  onClick={() => setOpenModalEdit(true)}>
                        <IconEdit />
                        </span>
                        <span className={styles.iconDelete}   onClick={() => setOpenModalDelete(true)}>
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
      <div className="d-flex justify-content-between">
      <Limit />
      <Pagination />
      </div>
    
      <CustomModal title={'You are Sure'} show={openModalDelete} setShow={setOpenModalDelete}>
       
      </CustomModal>
      <CustomModal title={'EDIT USER'} show={openModalEdit} setShow={setOpenModalEdit}>
        <UserEdit />
      </CustomModal> 
      <CustomModal title={'ADD  NEWS USER'} show={openModalCreate} setShow={setOpenModalCreate}>
        <UserAdd />
      </CustomModal>
    </>
  )
}