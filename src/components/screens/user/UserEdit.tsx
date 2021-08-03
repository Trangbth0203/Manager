import React, { Dispatch, FC, useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { toast } from 'react-toastify'
import fetchApi from '~/src/helpers/fetchApi'
import { CustomModal } from '../../widgets/CustomModal'

interface Props {
  updateItem: any
  openModalEdit: boolean
  setOpenModalEdit: Dispatch<boolean>
  fetchUserList: () => void
}

export const UserEdit: FC<Props> = ({
  updateItem,
  openModalEdit,
  setOpenModalEdit,
  fetchUserList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [enableChangePassword, setEnableChangePassword] = useState(false)
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false)
  const [roleName, setRoleName] = useState([])
  const [inputValues, setInputValues] = useState({
    role_id: '',
    email: '',
    password: '',
    confirm_password: '',
    name: '',
  })

  useEffect(() => {
    setInputValues(updateItem)
  }, [updateItem])

  const fetchRoles = async () => {
    const fetchRole = await fetchApi.getRole({})
    setRoleName(fetchRole.data)
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const initialError = {
    role_id: '',
    email: '',
    password: '',
    name: '',
    confirm_password: '',
  }

  const [error, setError] = useState<any>(initialError)
  const [listUser, setListUser] = useState([])
  const fetchListUser = async () => {
    setIsLoadingList(true)
    try {
      const response = await fetchApi.getListUser({})
      setListUser(response.data)
      setIsLoadingList(false)
    } catch (error) {
      setIsLoadingList(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchListUser()
  }, [])
  const clickRightButton = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      const config = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      }
      params.append('role_id', inputValues.role_id || '')
      params.append('email', inputValues.email || '')
      params.append('name', inputValues.name || '')
      if (enableChangePassword) {
        params.append('password', inputValues.password || '')
        params.append('confirm_password', inputValues.confirm_password || '')
      }
      const response = await fetchApi.updateUser(updateItem.id, params, config)
      if (!response.status) {
        setIsLoading(false)
        return setError(response)
      }
      setIsLoading(false)
      toast.success('Chỉnh sửa thành công', { position: 'top-right' })
      fetchUserList()
      setError(initialError)
      setInputValues(initialError)

      setTimeout(() => {
        setOpenModalEdit(false)
      }, 500)
    } catch (error) {
      console.log('error', error)
      setIsLoading(false)
    }
  }
  const clickLeftButton = () => {
    setError(initialError)
  }
  const onChangeValue = (e) => {
    const { name, value } = e.target
    setInputValues((preState) => ({
      ...preState,
      [name]: value,
    }))
  }

  console.log(inputValues.role_id)
  return (
    <CustomModal
      title="EDIT"
      isLoading={isLoading}
      show={openModalEdit}
      setShow={setOpenModalEdit}
      clickLeftButton={clickLeftButton}
      clickRightButton={clickRightButton}
    >
      <Form>
        {/* <FormGroup className="mt-3">
      <Label className="mb-1" for="exampleEmail">RoleName</Label>
        <Input type="select" name="role_name" defaultValue={inputValues.role_id}>
          {roleName && roleName.length > 0 && roleName.map((item, index) => {
            return (
              <option value={item.role_id} key={index}>{item.role_name}</option>
            )
          })}
        </Input>
      </FormGroup> */}
        <FormGroup>
          <Label className="mb-1" for="exampleEmail">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            id="exampleName"
            defaultValue={updateItem.name || ''}
            placeholder="name"
            onChange={onChangeValue}
          />
          {error && error.message && error.name ? (
            <span className="text-danger">{error.message.name[0]}</span>
          ) : null}
        </FormGroup>
        <FormGroup className="mt-3">
          <Input
            type="checkbox"
            checked={enableChangePassword}
            onChange={(e) => setEnableChangePassword(!enableChangePassword)}
          />{' '}
          Đổi mật khẩu
        </FormGroup>
        {enableChangePassword ? (
          <>
            <FormGroup className="mt-3">
              <Label className="mb-1" for="examplePassword">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="*************"
                onChange={onChangeValue}
              />
              {error && error.message && error.password ? (
                <p className="text-danger">{error.message.password[0]}</p>
              ) : null}
            </FormGroup>
            <FormGroup className="mt-3">
              <Label className="mb-1" for="examplePassword">
                Confirm Password
              </Label>
              <Input
                type="password"
                name="confirm_password"
                placeholder="*************"
                onChange={onChangeValue}
              />
              {error && error.message &&  error.confirm_password ? (
                <span className="text-danger">{error.message.confirm_password[0]}</span>
              ) : null}
            </FormGroup>
          </>
        ) : null}
      </Form>
    </CustomModal>
  )
}
