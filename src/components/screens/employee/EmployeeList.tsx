import React, { useState } from 'react'
import { Table, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import { MOCK_DATA_EMPLOYEE,  IMockDataEmployees } from '~/src/models/employees'
import { IconEdit, IconDelete} from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { EmployeeADD } from './EmployeeAdd'
import { EmployeeEdit } from './EmployeeEdit'
import styles from '~/styles/pages/employees.module.scss'

export const EmployeeList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">The list of employee</CardTitle>
            <Button color="success" onClick={() => setOpenModal(true)}>CREATE</Button>
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
                          <span className={styles.icon} onClick={() => setOpenModal(true)}><IconEdit /></span><span><IconDelete /></span>
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
      <CustomModal title={'EDIT EMPLOYEE'} show={openModal} setShow={setOpenModal}>
        <EmployeeEdit />
      </CustomModal>
      <CustomModal title={'ADD  NEWS EMPLOYEE'} show={openModal} setShow={setOpenModal}>
        <EmployeeADD />
      </CustomModal>
    </>
  )
}
