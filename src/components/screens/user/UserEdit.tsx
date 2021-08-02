import React, {Dispatch, FC, useState,  useEffect} from 'react'
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
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false)
  const [inputValues, setInputValues] = useState({

    role_name: '',
    email: '',
    password: '',
    name: '',
  })

  useEffect(() => {
    setInputValues(updateItem)
  }, [updateItem])
  const initialError = {
    role_name: '',
    email: '',
    password: '',
    name: '',
  }
  const [error, setError] = useState(initialError)
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
      params.append(' role_name', inputValues. role_name || '')
      params.append(' email', inputValues. email || '')
      params.append('password',inputValues.password || '')
      params.append('name',inputValues.name || '')
      const response = await fetchApi.updateUser(
        updateItem.id,
        params,
        config
      )
      if (!response.status) {
        setIsLoading(false)
        return setError(response.message)
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
      <FormGroup className="mt-3">
      <Label className="mb-1" for="exampleEmail">RoleName</Label>
      <Input type="select" name="role_name" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <FormGroup>
      <Label className="mb-1" for="exampleEmail">Name</Label>
        <Input
          type="text"
          name="name"
          id="exampleName"
          defaultValue={updateItem.name || ''}
          placeholder="name"
          onChange={onChangeValue}
        />
        {error && error.name ? (
          <span className="text-danger">{error.name[0]}</span>
        ) : null}
      </FormGroup>
      <FormGroup className="mt-3">
        <Label className="mb-1"for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="password "
          defaultValue={updateItem.password || ''}
            onChange={onChangeValue}
        />
        {error && error.password ? (
            <p className="text-danger">{error.password[0]}</p>
          ) : null}
      </FormGroup>
    </Form>
    </CustomModal>
  )
}
