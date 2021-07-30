import React, { useEffect, useState } from 'react'
import { Table, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import dayjs from 'dayjs'
import { GENDER } from '~/src/models/employees'
import { toast } from 'react-toastify'
import fetchApi from '~/src/helpers/fetchApi'
import { IEmployees} from '~/src/models/employees'
import { IconEdit, IconDelete } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { EmployeeAdd } from '~/src/components/screens/employee/EmployeeAdd'
import { EmployeeEdit } from '~/src/components/screens/employee/EmployeeEdit'
import { Pagination } from '~/src/components/elements/pagination'
import { Limit } from '~/src/components/elements/limit'
import styles from '~/styles/pages/employees.module.scss'

export const EmployeeList = () => {
  const [params, setPrams] = useState({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [listEmployee, setListEmployee] = useState([])
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const fetchEmployeeList = async () => {
    await fetchApi.getListEmployee({ params }).then((res) => {
      if (res && res.data) {
        setListEmployee(res.data)
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    fetchEmployeeList()
  }, [params])
  const onDeleteEmployee = async (id: string) => {
    if (confirm('Bạn có muốn xóa user này không')) {
      try {
        const response = await fetchApi.deleteEmployee(id)
        if (!response.status) {
          toast.error('Xóa thất bại', { position: 'top-right' })
        }
        toast.success('Xóa thành công', { position: 'top-right' })
        fetchEmployeeList()
      } catch (error) {
        console.log('error', error)
      }
    }
  }

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
                    (item: IEmployees, index: number) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{++index}</th>
                          <td>{item.department_id}</td>
                          <td>{item.user_id}</td>
                          <td>{dayjs(item.birth_date).format('MM-DD-YYYY')}</td>
                          <td>{item.first_name}</td>
                          <td>{item.last_name}</td>
                          <td>{item.age}</td>
                          <td>{GENDER[Number(item.gender)]}</td>
                          <td>
                            <span
                              className={styles.iconEdit}
                              onClick={() => setOpenModalEdit(true)}
                            >
                              <IconEdit />
                            </span>
                            <span
                              className={styles.iconDelete}
                              onClick={() => onDeleteEmployee(item.id)}
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
      aaa</CustomModal>
      <CustomModal
        title={'EDIT EMPLOYEE'}
        show={openModalEdit}
        setShow={setOpenModalEdit}
      >
        <EmployeeEdit />
      </CustomModal>
      <EmployeeAdd 
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refetch={fetchEmployeeList}
      />
    </>
  )
}
