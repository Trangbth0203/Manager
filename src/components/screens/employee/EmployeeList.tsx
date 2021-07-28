import React, { useEffect, useState } from 'react'
import { Table, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import { IMockDataEmployees } from '~/src/models/employees'
import fetchApi from '~/src/helpers/fetchApi'
import { IconEdit, IconDelete } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { EmployeeADD } from '~/src/components/screens/employee/EmployeeAdd'
import { EmployeeEdit } from '~/src/components/screens/employee/EmployeeEdit'
import { Pagination } from '~/src/components/elements/pagination'
import { Limit } from '~/src/components/elements/limit'
import styles from '~/styles/pages/employees.module.scss'

export const EmployeeList = () => {
  const [params, setPrams] = useState({})
  const [listEmployee, setListEmployee] = useState([])
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const fetchEmployeeList = async () => {
    await fetchApi.getListEmployee({ params }).then((res) => {
      if (res && res.data) {
        setListEmployee(res.data)
      }
    })
  }

  useEffect(() => {
    fetchEmployeeList()
  }, [params])

  console.log(listEmployee)

  return (
    <>
      <Card>
        <CardBody className="mt-3">
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">The list of employee</CardTitle>
            <Button color="success" onClick={() => setOpenModalCreate(true)}>
              CREATE
            </Button>
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
                {listEmployee &&
                  listEmployee.map(
                    (item: IMockDataEmployees, index: number) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{++index}</th>
                          <td>{item.department_id}</td>
                          <td>{item.user_id}</td>
                          <td>{item.birth_date}</td>
                          <td>{item.first_name}</td>
                          <td>{item.last_name}</td>
                          <td>{item.age}</td>
                          <td>{item.gender}</td>
                          <td>
                            <span
                              className={styles.iconEdit}
                              onClick={() => setOpenModalEdit(true)}
                            >
                              <IconEdit />
                            </span>
                            <span
                              className={styles.iconDelete}
                              onClick={() => setOpenModalDelete(true)}
                            >
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
      <CustomModal
        title={'You are Sure'}
        show={openModalDelete}
        setShow={setOpenModalDelete}
      >
      </CustomModal>
      <CustomModal
        title={'EDIT EMPLOYEE'}
        show={openModalEdit}
        setShow={setOpenModalEdit}
      >
        <EmployeeEdit />
      </CustomModal>
      <CustomModal
        title={'ADD  NEWS EMPLOYEE'}
        show={openModalCreate}
        setShow={setOpenModalCreate}
      >
        <EmployeeADD />
      </CustomModal>
    </>
  )
}
