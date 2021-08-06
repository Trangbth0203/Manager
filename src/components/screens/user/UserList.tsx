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
import fetchApi from '~/src/helpers/fetchApi'
import { IUsers } from '~/src/models/users'
import { DEFAULT_CURRENT_PAGE } from '~/src/models'
import { IconEdit, IconDelete, IconCreate } from '~/src/components/elements'
import { CustomModal } from '~/src/components/widgets/CustomModal'
import { UserAdd } from '~/src/components/screens/user/UserAdd'
import { UserEdit } from '~/src/components/screens/user/UserEdit'
import { Pagination } from '~/src/components/elements/pagination'
import { Search } from '~/src/components/elements/search'
import { Loading } from '~/src/components/elements/Loading'
import { ExportCSV } from '~/src/components/elements/exportExcel'
import styles from '~/styles/pages/users.module.scss'

export const UserList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [params, setParams] = useState({ first: 10, page: 1, keyword: '' })
  const [totalItem, setTotalItem] = useState<any>()
  const [listUser, setListUser] = useState([])
  const [idUpdate, setIdUpdate] = useState<string>('')
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [fileName, setFileName] = useState('User')
  const [valueChecked, setValueChecked] = useState([])
  const [error, setError] = useState<any>()

  const fetchUserList = async () => {
    await fetchApi.getListUser({ params }).then((res) => {
      if (res && res.data) {
        setListUser(res.data)
        setIsLoading(false)
      }
      setTotalItem(res)
    })
  }
  useEffect(() => {
    fetchUserList()
  }, [params])

  const onDeleteUser = async (id: string) => {
    if (confirm('Bạn có muốn xóa user này không')) {
      try {
        const response = await fetchApi.deleteUser(id)
        if (!response.status) {
          toast.error('Xóa thất bại', { position: 'top-right' })
        }
        toast.success('Xóa thành công', { position: 'top-right' })
        fetchUserList()
      } catch (error) {
        console.log('error', error)
      }
    }
  }
  const onchangeLimit = (value: number) => {
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
    const updateIndex = listUser.findIndex((item) => item.id === idUpdate)
    if (updateIndex > -1) {
      updateItem = listUser[updateIndex]
    }
  }
  let csvData = []
  for (let i = 1; i < listUser.length; i++) {
    csvData.push({
      STT: i,
      Name: listUser[i].name || '--',
      Email: listUser[i].email || '--',
    })
  }
  const onHandleDeleteIds = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('ids', valueChecked.join(','))
    try {
      const response = await fetchApi.postRemoveMultiRecord('user', formData)
      console.log(response)
      if (!response.status) {
        setIsLoading(false)
        return setError((response as any).message)
      }
      toast.success('Xóa thành công', { position: 'top-right' })
      fetchUserList()
    } catch (error) {
      toast.error(`Có lỗi xảy ra`, { position: 'top-right' })
    }
  }

  console.log(listUser)

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Users</CardTitle>
          <div className="d-flex justify-content-between">
            <Search onChangeValue={onChangeValue} />
            <div>
              <Button
                className={styles.export}
                color="success "
                onClick={() => setOpenModalCreate(true)}
              >
                <span className={styles.iconCreate}>
                  <IconCreate />{' '}
                </span>
                CREATE
              </Button>
              <ExportCSV
                csvData={csvData}
                fileName={`user-${dayjs().format('YYYY-MM-DD')}`}
              />
            </div>
          </div>
          <CardText>
            <Table bordered className="mt-3">
              <thead>
                <tr>
                  <th></th>
                  <th>STT</th>
                  {/* <th>Role Name</th> */}
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4}>
                      {' '}
                      <Loading />{' '}
                    </td>
                  </tr>
                ) : (
                  listUser &&
                  listUser.map((item: IUsers, index: number) => {
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
                        {/* <td>{item.role_name}</td> */}
                        <td>{item.name}</td>
                        <td>{item.email}</td>

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
                            onClick={() => onDeleteUser(item.id)}
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
        onChangeLimit={onchangeLimit}
        isLoading={isLoading}
      />
      <CustomModal
        title={'You are Sure'}
        show={openModalDelete}
        setShow={setOpenModalDelete}
      >
      </CustomModal>
      {idUpdate ? (
        <UserEdit
          updateItem={updateItem}
          openModalEdit={openModalEdit}
          setOpenModalEdit={setOpenModalEdit}
          fetchUserList={fetchUserList}
        />
      ) : null}
      <UserAdd
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refetch={fetchUserList}
      />
    </>
  )
}
