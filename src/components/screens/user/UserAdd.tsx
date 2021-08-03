import React,  { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { toast } from 'react-toastify'
import fetchApi from '~/src/helpers/fetchApi'
import { CustomModal } from '~/src/components/widgets/CustomModal'


export const UserAdd = ({ openModalCreate, setOpenModalCreate, refetch }) => {
  const [listRole, setListRole] = useState<any>({})
  const initialInput = {
    name: '',
    role_id: '',
    email: '',
    password: '',
    confirm_password: ''
  }
  const [input, setInput] = useState(initialInput)
  const initialError = {
    name: '',
    role_id: '',
    email: '',
    password: '',
    confirm_password: ''
  }
  const [error, setError] = useState(initialError)
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setInput(state => ({
      ...state,
      [name]: value,
    }))
  }

  const getRole = async () => {
    const response = await fetchApi.getRole({})
    setListRole(response)
  }

  useEffect(() => {
    getRole()
  }, [])

  const onHandleSave = async () => {
    const formData = new FormData()
    formData.set('name', input.name || '')
    formData.set('role_id', input.role_id || '' )
    formData.set('email', input.email || '')
    formData.set('password', input.password || '')
    formData.set('confirm_password', input.confirm_password || '')
    formData.set('created_by', 'SYSTEM')
    formData.set('updated_by', 'SYSTEM')
    const response = await fetchApi.postCreateUser(formData)
    if (!response.status) {
      return setError(response.message)
    }
    toast.success('Thêm mới thành công!', { position: 'top-right' })
    setInput(initialInput)
    setError(initialError)
    refetch()
    setTimeout(() => {
      setOpenModalCreate(false)
    }, 500)
  }

  return (
    <CustomModal
      title= 'ADD USER'
      show= {openModalCreate}
      setShow={setOpenModalCreate}
      clickRightButton= {onHandleSave}
      clickLeftButton={() => {
        setInput(initialInput)
        setError(initialError)
      }}
    >
      
    <Form>
      {/* <FormGroup className="mt-3">
        <Label className="mb-1" for="exampleEmail">RoleName</Label>
        <Input
          type="select"
          name="role_id"
          value={input.role_id || ''}
          onChange={handleOnChange}
        >
          {listRole?.data?.map((item, index) => {
            return (
              <option key={index} value={item.id}>{item.role_name}</option>
            )
          })}
        </Input>
        {error && error.role_id ? (
          <span className="text-danger">{error.role_id[0]}</span>
        ) : null}
      </FormGroup> */}
      <FormGroup className="mt-3">
        <Label className="mb-1" for="exampleEmail">Name</Label>
        <Input
          type="text"
          name="name"
          id="exampleName"
          value={input.name || ''} 
          placeholder="name"
          onChange={handleOnChange}
        />
        {error && error.name ? (
          <span className="text-danger">{error.name[0]}</span>
        ) : null}
      </FormGroup>
      <FormGroup className="mt-3">
        <Label className="mb-1" for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          value={input.email || ''} 
          placeholder="email"
          onChange={handleOnChange}
        />
        {error && error.email ? (
          <span className="text-danger">{error.email[0]}</span>
        ) : null}
      </FormGroup>
      <FormGroup className="mt-3">
        <Label className="mb-1" for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          value={input.password || ''} 
          placeholder="password "
          onChange={handleOnChange}
        />
        {error && error.password ? (
          <span className="text-danger">{error.password[0]}</span>
        ) : null}
      </FormGroup>
      <FormGroup className="mt-3">
        <Label className="mb-1" for="examplePassword">Confirm Password</Label>
        <Input
          type="password"
          name="confirm_password"
          value={input.confirm_password || ''} 
          placeholder="confirm password "
          onChange={handleOnChange}
        />
        {error && error.confirm_password ? (
          <span className="text-danger">{error.confirm_password[0]}</span>
        ) : null}
      </FormGroup>
    </Form>
    </CustomModal>
  )
}
