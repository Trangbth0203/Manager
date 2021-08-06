import React, { useEffect, useState } from 'react'
import {
  Table,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Input,
} from 'reactstrap'
import dayjs from 'dayjs'
import { GENDER } from '~/src/models/employees'
import { DEFAULT_CURRENT_PAGE } from '~/src/models'
import { toast } from 'react-toastify'
import fetchApi from '~/src/helpers/fetchApi'
import { IEmployee } from '~/src/models/employees'
import { IconEdit, IconDelete, IconCreate } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { EmployeeAdd } from '~/src/components/screens/employee/EmployeeAdd'
import { EmployeeEdit } from '~/src/components/screens/employee/EmployeeEdit'
import { Pagination } from '~/src/components/elements/pagination'
import { Search } from '~/src/components/elements/search'
import { Loading } from '~/src/components/elements/Loading'
import { ExportCSV } from '~/src/components/elements/exportExcel'
import styles from '~/styles/pages/employees.module.scss'

export const EmployeeList = () => {
  const [params, setParams] = useState({ first: 10, page: 1, keyword: '' })
  const [totalItem, setTotalItem] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [idUpdate, setIdUpdate] = useState<string>('')
  const [listEmployee, setListEmployee] = useState([])
  const [error, setError] = useState<any>()
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [valueChecked, setValueChecked] = useState([])

  const fetchEmployeeList = async () => {
    await fetchApi.getListEmployee({ params }).then((res) => {
      if (res && res.data) {
        setListEmployee(res.data)
        setIsLoading(false)
      }
      setTotalItem(res)
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

  const onChangeLimit = (value: number) => {
    setParams({ ...params, first: value, page: DEFAULT_CURRENT_PAGE })
  }

  const onPaginate = (value: number) => {
    setParams({ ...params, page: value })
  }

  const onChangeValue = (value: string) => {
    setTimeout(() => {
      setParams({ ...params, keyword: value })
    }, 500)
  }
  const onChangeValueChecked = (e) => {
    const { checked, value } = e.target
    const ids = [...valueChecked]
    if (checked) {
      setValueChecked([...ids, value])
    } else {
      const removeId = ids.filter((id) => id !== value)
      setValueChecked(removeId)
    }
  }
  let updateItem = {}
  if (idUpdate) {
    const updateIndex = listEmployee.findIndex((item) => item.id === idUpdate)
    if (updateIndex > -1) {
      updateItem = listEmployee[updateIndex]
    }
  }

  let csvData = []
  for (let i = 1; i < listEmployee.length; i++) {
    csvData.push({
      STT: i,
      'Department Name': listEmployee[i].department_name || '--',
      Email: listEmployee[i].employee_email || '--',
      Birthday: listEmployee[i].birth_date || '--',
      'First Name': listEmployee[i].first_name || '--',
      'Last Name': listEmployee[i].last_name || '--',
      Age: listEmployee[i].age || '--',
      Gender: GENDER[listEmployee[i].gender] || '--',
    })
  }
  const onHandleDeleteIds = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('ids', valueChecked.join(','))
    try {
      const response = await fetchApi.postRemoveMultiRecord(
        'employee',
        formData
      )
      console.log(response)
      if (!response.status) {
        setIsLoading(false)
        return setError((response as any).message)
      }
      toast.success('Xóa thành công', { position: 'top-right' })
      fetchEmployeeList()
    } catch (error) {
      toast.error(`Có lỗi xảy ra`, { position: 'top-right' })
    }
  }

  return (
    <>
      <Card>
        <CardBody className="mt-3">
          <CardTitle tag="h5">The list of employee</CardTitle>
          <div className="d-flex justify-content-between">
            <Search onChangeValue={onChangeValue} />
            <div>
              <Button
                className={styles.export}
                color="success"
                onClick={() => setOpenModalCreate(true)}
              >
                <span className={styles.iconCreate}>
                  <IconCreate />{' '}
                </span>
                CREATE
              </Button>
              <ExportCSV
                csvData={csvData}
                fileName={`employee-${dayjs().format('YYYY-MM-DD')}`}
              />
            </div>
          </div>
          <CardText>
            <Table bordered className="mt-3">
              <thead>
                <tr>
                  <th></th>
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
                {isLoading ? (
                  <tr>
                    <td colSpan={9}>
                      {' '}
                      <Loading />{' '}
                    </td>
                  </tr>
                ) : (
                  listEmployee &&
                  listEmployee.map((item: IEmployee, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Input
                            type="checkbox"
                            onChange={onChangeValueChecked}
                            value={item.id}
                          />
                        </td>
                        <th scope="row">
                          {++index + params.first * (params.page - 1)}
                        </th>
                        <td>{item.department_name}</td>
                        <td>{item.employee_email}</td>
                        <td>{dayjs(item.birth_date).format('MM-DD-YYYY')}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.age}</td>
                        <td>{GENDER[item.gender]}</td>
                        <td>
                          <span
                            className={styles.iconEdit}
                            onClick={() => {
                              setOpenModalEdit(true)
                              setIdUpdate(item.id)
                            }}
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
                  })
                )}
              </tbody>
            </Table>
          </CardText>
          <Button color="danger" type="button" onClick={onHandleDeleteIds}>
            Delete
          </Button>
        </CardBody>
      </Card>
      <Pagination
        currentPage={params.page}
        totalItems={totalItem?.total}
        perPage={params.first}
        onPaginate={onPaginate}
        onChangeLimit={onChangeLimit}
        isLoading={isLoading}
      />
      <CustomModal
        title={'You are Sure'}
        show={openModalDelete}
        setShow={setOpenModalDelete}
      >
        Xóa nhân viên
      </CustomModal>
      {idUpdate ? (
        <EmployeeEdit
          updateItem={updateItem}
          openModalEdit={openModalEdit}
          setOpenModalEdit={setOpenModalEdit}
          fetchEmployeeList={fetchEmployeeList}
        />
      ) : null}
      <EmployeeAdd
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refetch={fetchEmployeeList}
      />
    </>
  )
}
