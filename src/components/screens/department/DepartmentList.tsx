import React, { useState, useEffect } from 'react'
import {
  Table,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Input,
} from 'reactstrap'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { IDepartment } from '~/src/models/departments'
import fetchApi from '~/src/helpers/fetchApi'
import { IconEdit, IconDelete, IconCreate } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { DepartmentAdd } from '~/src/components/screens/department/DepartmentAdd'
import { DepartmentEdit } from '~/src/components/screens/department/DepartmentEdit'
import { Pagination } from '~/src/components/elements/pagination'
import { Search } from '~/src/components/elements/search'
import { Loading } from '~/src/components/elements/Loading'
import { ExportCSV } from '~/src/components/elements/exportExcel'
import styles from '~/styles/pages/departments.module.scss'

export const DepartmentList = () => {
  const [params, setParams] = useState({ first: 10, page: 1, keyword: '' })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [idUpdate, setIdUpdate] = useState<string>('')
  const [listDepartment, setListDepartment] = useState([])
  const [totalItems, setTotalItems] = useState<any>()
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [error, setError] = useState<any>()
  const [fileName, setFileName] = useState('department')
  const [valueChecked, setValueChecked] = useState([])

  const fetchDepartmentList = async () => {
    try {
      const response = await fetchApi.getListDepartment({ params })
      if (response && response.data) {
        setListDepartment(response.data)
        setIsLoading(false)
      }
      setTotalItems(response)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchDepartmentList()
  }, [params])

  const onDeleDepartment = async (id: string) => {
    if (confirm('B???n c?? mu???n x??a user n??y kh??ng')) {
      try {
        const response = await fetchApi.deleteDepartment(id)
        if (!response.status) {
          toast.error('X??a th???t b???i', { position: 'top-right' })
        }
        toast.success('X??a th??nh c??ng', { position: 'top-right' })
        fetchDepartmentList()
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  const onPaginate = (value: number) => {
    setParams({ ...params, page: value })
  }

  const onChangeLimit = (value: number) => {
    setParams({ ...params, first: value })
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
    const updateIndex = listDepartment.findIndex((item) => item.id === idUpdate)
    if (updateIndex > -1) {
      updateItem = listDepartment[updateIndex]
    }
  }
  let csvData = []
  for (let i = 1; i < listDepartment.length; i++) {
    csvData.push({
      STT: i,
      'Department Name': listDepartment[i].department_name || '--',
      Phone: listDepartment[i].department_phone || '--',
      'Number Person': listDepartment[i].number_person || 0,
      'Main Manager': listDepartment[i].department_manager || '--',
      'Other Managers': listDepartment[i].department_manager_other || '--',
    })
  }

  const onHandleDeleteIds = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('ids', valueChecked.join(','))
    try {
      const response = await fetchApi.postRemoveMultiRecord(
        'department',
        formData
      )
      console.log(response)
      if (!response.status) {
        setIsLoading(false)
        return setError((response as any).message)
      }
      toast.success('X??a th??nh c??ng', { position: 'top-right' })
      fetchDepartmentList()
    } catch (error) {
      toast.error(`C?? l???i x???y ra`, { position: 'top-right' })
    }
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Departments</CardTitle>
          <div className="d-flex justify-content-between">
            <Search onChangeValue={onChangeValue} />
            <div>
              <Button
                className={styles.export}
                color="success"
                onClick={() => setOpenModalCreate(true)}
              >
                {' '}
                <span className={styles.iconCreate}>
                  <IconCreate />{' '}
                </span>
                CREATE
              </Button>
              <ExportCSV
                csvData={csvData}
                fileName={`department-${dayjs().format('YYYY-MM-DD')}`}
              />
            </div>
          </div>

          <CardText>
            <Table bordered className="mt-3">
              <thead>
                <tr>
                  <th></th>
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
                {isLoading ? (
                  <tr>
                    <td colSpan={8}>
                      {' '}
                      <Loading />{' '}
                    </td>
                  </tr>
                ) : (
                  listDepartment &&
                  listDepartment.map((item: IDepartment, index: number) => {
                    return (
                      <tr key={index}>
                        <th>
                          <Input
                            type="checkbox"
                            onChange={onChangeValueChecked}
                            value={item.id}
                          />
                        </th>
                        <th scope="row">
                          {++index + params.first * (params.page - 1)}
                        </th>
                        <td>{item.department_name}</td>
                        <td>{item.number_person}</td>
                        <td>{item.department_phone}</td>
                        <td>{item.department_manager}</td>
                        <td>{item.department_manager_other}</td>
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
                            onClick={() => onDeleDepartment(item.id)}
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
        isLoading={isLoading}
        currentPage={Number(params.page)}
        perPage={Number(params.first)}
        totalItems={Number(totalItems?.total)}
        onChangeLimit={onChangeLimit}
        onPaginate={onPaginate}
      />
      <CustomModal
        title={'You are Sure'}
        show={openModalDelete}
        setShow={setOpenModalDelete}
      >
        aaaa
      </CustomModal>
      {idUpdate && (
        <DepartmentEdit
          updateItem={updateItem}
          openModalEdit={openModalEdit}
          setOpenModalEdit={setOpenModalEdit}
          refetch={fetchDepartmentList}
        />
      )}
      <DepartmentAdd
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refetch={fetchDepartmentList}
      />
    </div>
  )
}
