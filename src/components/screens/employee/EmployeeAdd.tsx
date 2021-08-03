import React, { useState, Dispatch, FC, useEffect } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { toast } from 'react-toastify'
import fetchApi from '~/src/helpers/fetchApi'
import { CustomModal } from '~/src/components/widgets/CustomModal'

interface Props {
  openModalCreate: boolean
  setOpenModalCreate: Dispatch<boolean>
  refetch?: () => void
}

export const EmployeeAdd: FC<Props> = ({
  openModalCreate,
  setOpenModalCreate,
  refetch,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [listDepartment, setListDepartment] = useState([])
  const [listUser, setListUser] = useState([])
  const initialError = {
    department_id: '',
    user_id: '',
    birth_date: '',
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
  }
  const initialInput = {
    department_id: '',
    user_id: '',
    birth_date: '',
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
  }
  const [error, setError] = useState<any>(initialError)
  const [inputValues, setInputValues] = useState(initialInput)
  const onChangeValue = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInputValues((preState) => ({
      ...preState,
      [name]: value,
    }))
  }

  const fetchDepartment = async () => {
    const response = await fetchApi.getListDepartment({})
    setListDepartment(response.data)
  }
  const fetchUser = async () => {
     const response = await fetchApi.getListUser({})
     setListUser(response.data)
  }

  useEffect(() => {
    fetchDepartment()
    fetchUser()
  }, [])

  const onHandleCreateEmployee = async () => {
    const formData = new FormData()
    formData.set('department_id', inputValues.department_id || '')
    formData.set('user_id', inputValues.user_id || '')
    formData.set('birth_date', inputValues.birth_date || '')
    formData.set('first_name', inputValues.first_name || '')
    formData.set('last_name', inputValues.last_name || '')
    formData.set('age', inputValues.age || '')
    formData.set('gender', inputValues.gender || '')
    formData.set('created_by', 'SYSTEM')
    formData.set('updated_by', 'SYSTEM')
    setIsLoading(true)
    try {
      const response = await fetchApi.postCreateEmployee(formData)
      if (!response.status) {
        setIsLoading(false)
        return setError(response)
      }
      setIsLoading(false)
      toast.success('Thêm mới thành công', { position: 'top-right' })
      refetch()
      setError(initialError)
      setInputValues(initialError)
      setTimeout(() => {
        setOpenModalCreate(false)
      }, 500)
    } catch (error) {
      setIsLoading(false)
      toast.error(`Có lỗi xảy ra`, { position: 'top-right' })
    }
  }

  const clickLeftButton = () => {
    setError(initialError)
    setInputValues(initialInput)
  }

  return (
    <CustomModal
      title={'ADD Employee'}
      show={openModalCreate}
      setShow={setOpenModalCreate}
      isLoading={isLoading}
      clickLeftButton={clickLeftButton}
      clickRightButton={onHandleCreateEmployee}
    >
      <Form>
        <FormGroup>
          <Label className="mb-1" for="exampleSelect">
            Department name
          </Label>
          <Input
            type="select"
            value={inputValues.department_id}
            name="department_id"
            onChange={onChangeValue}
          >
            <option value={0}>Choose Department</option>
            {listDepartment && listDepartment.length > 0 && listDepartment.map((item, index: number) => {
              return (
                <option key={index} value={item.id}>
                  {item.department_name}
                </option>
              )
            })}
          </Input>
          {error && error.message && error.department_id ? (
            <p className="text-danger">{error.message.department_id}</p>
          ) : null}
        </FormGroup>
        <FormGroup className="mt-3">
        <Label className="mb-1" for="exampleSelect">
            Email
          </Label>
          <Input
            type="select"
            value={inputValues.user_id}
            name="user_id"
            onChange={onChangeValue}
          >
            <option value={0}>Choose Email</option>
            {listUser && listUser.length > 0 && listUser.map((item, index: number) => {
              return (
                <option key={index} value={item.id}>
                  {item.email}
                </option>
              )
            })}
          </Input>
          {error && error.message && error.department_id ? (
            <p className="text-danger">{error.message.email}</p>
          ) : null}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label className="mb-1" for="exampleDate">
            Date
          </Label>
          <Input
            type="date"
            name="birth_date"
            id="exampleDate"
            value={inputValues.birth_date || ''}
            placeholder="date placeholder"
            onChange={onChangeValue}
          />
          {error && error.message && error.birth_date ? (
            <p className="text-danger">{error.message.birth_date}</p>
          ) : null}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label className="mb-1" for="exampleFirstName">
            Age
          </Label>
          <Input
            type="text"
            name="age"
            id="exampleFistName"
            value={inputValues.age || ''}
            placeholder="with Age"
            onChange={onChangeValue}
          />
          {error && error.message && error.age ? (
            <p className="text-danger">{error.message.age}</p>
          ) : null}
        </FormGroup>
        <div className="d-flex justify-content-between">
          <FormGroup className="mt-3">
            <Label className="mb-1" for="exampleFirstName">
              First Name
            </Label>
            <Input
              type="text"
              name="first_name"
              id="exampleFistName"
              value={inputValues.first_name || ''}
              placeholder="with Firstname"
              onChange={onChangeValue}
            />
            {error &&  error.message && error.first_name ? (
              <p className="text-danger">{error.message.first_name}</p>
            ) : null}
          </FormGroup>
          <FormGroup className="mt-3">
            <Label className="mb-1" for="exampleLastName">
              Last Name
            </Label>
            <Input
              type="text"
              name="last_name"
              value={inputValues.last_name || ''}
              id="exampleLastName"
              placeholder="with Lastname"
              onChange={onChangeValue}
            />
            {error && error.message && error.last_name ? (
              <p className="text-danger">{error.message.last_name}</p>
            ) : null}
          </FormGroup>
        </div>
        <Label className="mt-3" for="exampleEmail">
          Gender:
        </Label>
        <div className="d-flex justify-content-start ">
          <FormGroup>
            <Label style={{ marginRight: 25 }}>
              <Input
                checked
                type="radio"
                name="gender"
                value={'1'}
                onChange={onChangeValue}
              />{' '}
              Nam
              <Input
                type="radio"
                name="gender"
                value={'2'}
                onChange={onChangeValue}
              />{' '}
              Nữ
            </Label>
          </FormGroup>
        </div>
      </Form>
    </CustomModal>
  )
}
