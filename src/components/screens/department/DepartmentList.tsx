import React, { useState } from 'react'
import { Table, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import { MOCK_DATA_DEPARTMENTS, IMockDataDepartment } from '~/src/models/departments'
import { IconEdit, IconDelete } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { DepartmentAdd } from '~/src/components/screens/department/DepartmentAdd'
import { DepartmentEdit } from '~/src/components/screens/department/DepartmentEdit'
import { Paginations } from '~/src/components/elements/pagination'
import { Limit } from '~/src/components/elements/limit'
import styles from '~/styles/pages/departments.module.scss'

export const DepartmentList = () => {
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

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
                {MOCK_DATA_DEPARTMENTS.map(
                  (item: IMockDataDepartment, index: number) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{++index}</th>
                        <td>{item.name}</td>
                        <td>{item.number_person}</td>
                        <td>{item.phone}</td>
                        <td>{item.main_manager}</td>
                        <td>{item.others_manager}</td>
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
      <Paginations/>
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
      >
        <DepartmentAdd />
      </CustomModal>
    </>
  )
}
