import React, { useState, useEffect } from 'react'
import { Table, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import {  IMockDataDepartment } from '~/src/models/departments'
import fetchApi from '~/src/helpers/fetchApi'
import { IconEdit, IconDelete } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { DepartmentAdd } from '~/src/components/screens/department/DepartmentAdd'
import { DepartmentEdit } from '~/src/components/screens/department/DepartmentEdit'
import { Pagination } from '~/src/components/elements/pagination'
import { Limit } from '~/src/components/elements/limit'
import styles from '~/styles/pages/departments.module.scss'

export const DepartmentList = () => {

  const [params, setParams] = useState({})
  const [listDepartment, setListDepartment] = useState([])
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const fetchDepartmentList = async () => {
    await fetchApi.getListDepartment({ params }).then((res) => {
      if (res && res.data) {
        setListDepartment(res.data)
      }
    })
  }

  useEffect(() => {
    fetchDepartmentList()
  }, [params])

   const onHandleCreateDepartment = () => {
        
  }

  return (
    <>
      <Card className="mt-3">
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Departments</CardTitle>
            <Button color="success" onClick={() => setOpenModalCreate(true)}>
              CREATE
            </Button>
          </div>
          <CardText>
            <Table bordered className="mt-3">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Number Person</th>
                  <th>Phone</th>
                  <th> Main Manager</th>
                  <th> Other Managers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listDepartment && listDepartment.map(
                  (item: IMockDataDepartment, index: number) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{++index}</th>
                        <td>{item.department_name}</td>
                        <td>{item.department_number_person}</td>
                        <td>{item.department_phone}</td>
                        <td>{item.department_manager}</td>
                        <td>{item.department_manager_other}</td>
                        <td>
                          <span className={styles.iconEdit} onClick={() => setOpenModalEdit(true)}>
                            <IconEdit />
                          </span>
                          <span className={styles.iconDelete} onClick={() => setOpenModalDelete(true)}> 
                            <IconDelete />
                          </span>
                        </td>
                      </tr>
                    )
                  }
                )}
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
      <CustomModal title={'EDIT DEPARTMENT'} show={openModalEdit} setShow={setOpenModalEdit}>
        <DepartmentEdit />
      </CustomModal> 
      <CustomModal
        title={'ADD DEPARTMENT'}
        show={openModalCreate}
        setShow={setOpenModalCreate}
        clickRightButton ={onHandleCreateDepartment}
      >
        <DepartmentAdd />
      </CustomModal>
    </>
  )
}
