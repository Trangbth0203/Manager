import React, { useState, useEffect } from 'react'
import {
  Table,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap'
import { toast } from 'react-toastify'
import { IDepartment } from '~/src/models/departments'
import fetchApi from '~/src/helpers/fetchApi'
import { IconEdit, IconDelete } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { DepartmentAdd } from '~/src/components/screens/department/DepartmentAdd'
import { DepartmentEdit } from '~/src/components/screens/department/DepartmentEdit'
import Pagination from '~/src/components/elements/Pagination'
import { Search } from '~/src/components/elements/Search'
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
    if (confirm('Bạn có muốn xóa user này không')) {
      try {
        const response = await fetchApi.deleteDepartment(id)
        if (!response.status) {
          toast.error('Xóa thất bại', { position: 'top-right' })
        }
        toast.success('Xóa thành công', { position: 'top-right' })
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

  let updateItem = {}
  if (idUpdate) {
    const updateIndex = listDepartment.findIndex((item) => item.id === idUpdate)
    if (updateIndex > -1) {
      updateItem = listDepartment[updateIndex]
    }
  }

  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Departments</CardTitle>
            <Button color="success" onClick={() => setOpenModalCreate(true)}>
              CREATE
            </Button>
          </div>
          <Search onChangeValue={onChangeValue} />
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
                {isLoading ? (
                  <tr className="text-center">
                    <td colSpan={7}>Chưa có dữ liệu</td>
                  </tr>
                ) : (
                  listDepartment &&
                  listDepartment.map(
                    (item: IDepartment, index: number) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{++index + params.first * (params.page - 1)}</th>
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
                              onClick={() => onDeleDepartment (item.id)}
                            >
                              <IconDelete />
                            </span>
                          </td>
                        </tr>
                      )
                    }
                  )
                )}
              </tbody>
            </Table>
          </CardText>
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
      >aaaa</CustomModal>
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
