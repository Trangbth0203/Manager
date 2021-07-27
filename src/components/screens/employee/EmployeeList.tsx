import React, { useState } from 'react'
import { Table, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import { MOCK_DATA_EMPLOYEE,  IMockDataEmployees } from '~/src/models/employees'
import { IconEdit, IconDelete} from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { EmployeeADD } from '~/src/components/screens/employee/EmployeeAdd'
import { EmployeeEdit } from '~/src/components/screens/employee/EmployeeEdit'
import { Paginations } from '~/src/components/elements/pagination'
import { Limit } from '~/src/components/elements/limit'
import styles from '~/styles/pages/employees.module.scss'

export const EmployeeList = () => {
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  return (
    <>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">The list of employee</CardTitle>
            <Button color="success" onClick={() => setOpenModalCreate(true)}>CREATE</Button>
          </div>
          <CardText>
            <Table bordered className="mt-3">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Department Name</th>
                  <th>Email</th>
                  <th>Birthday</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DATA_EMPLOYEE.map(
                  (item: IMockDataEmployees, index: number) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{++index}</th>
                        <td>{item.department_name}</td>
                        <td>{item.email}</td>
                        <td>{item.birthday}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>
                          <span className={styles.iconEdit} onClick={() => setOpenModalEdit(true)}><IconEdit /></span>
                          <span className={styles.iconDelete} onClick={() => setOpenModalDelete(true)}><IconDelete /></span>
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
      <CustomModal title={'EDIT EMPLOYEE'} show={openModalEdit} setShow={setOpenModalEdit}>
        <EmployeeEdit />
      </CustomModal>
      <CustomModal title={'ADD  NEWS EMPLOYEE'} show={openModalCreate} setShow={setOpenModalCreate}>
        <EmployeeADD />
      </CustomModal>
    </>
  )
}
