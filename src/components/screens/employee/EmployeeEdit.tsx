import React, { useState, FC, Dispatch } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Form, FormGroup, Label, Input, Spinner } from 'reactstrap'
import fetchApi from '~/src/helpers/fetchApi'
import { CustomModal } from '../../widgets/CustomModal'

interface Props {
  updateItem: any
  openModalEdit: boolean
  setOpenModalEdit: Dispatch<boolean>
  fetchEmployeeList: () => void
}

export const EmployeeEdit: FC<Props> = ({
  updateItem,
  openModalEdit,
  setOpenModalEdit,
  fetchEmployeeList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false)
  const [inputValues, setInputValues] = useState({
    department_id: '',
    user_id: '',
    birth_date: '',
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
  })

  useEffect(() => {
    setInputValues(updateItem)
  }, [updateItem])

  const initialError = {
    department_id: '',
    user_id: '',
    birth_date: '',
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
  }
  const [error, setError] = useState(initialError)
  const [listDepartment, setListDepartment] = useState([])

  const fetchListDepartment = async () => {
    setIsLoadingList(true)
    try {
      const response = await fetchApi.getListDepartment({})
      setListDepartment(response.data)
      setIsLoadingList(false)
    } catch (error) {
      setIsLoadingList(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchListDepartment()
  }, [])

  const clickLeftButton = () => {
    // setError({} as any)
    // setInputValues({} as any)
  }

  const clickRightButton = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      const config = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      }
      params.append('department_id', inputValues.department_id || '')
      params.append('user_id', inputValues.user_id || '')
      params.append('birth_date', inputValues.birth_date || '')
      params.append('user_id', inputValues.user_id || '')
      params.append('first_name', inputValues.first_name || '')
      params.append('last_name', inputValues.last_name || '')
      params.append('age', inputValues.age || '')
      params.append('gender', inputValues.gender || '1')
      const response = await fetchApi.updateEmployee(updateItem.id, params, config)
      if (!response.status) {
        setIsLoading(false)
        return setError(response.message)
      }
      toast.success('Updated successfully', { position: 'top-right' })
      setIsLoading(false)
      setError({} as any)
      setInputValues({} as any)
      fetchEmployeeList()
      setTimeout(() => {
        setOpenModalEdit(false)
      }, 500)
    } catch (error) {
      setIsLoading(false)
      console.log('error', error)
    }
  }

  const onChangeValue = (e) => {
    const { name, value } = e.target
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <CustomModal
      title="EDIT EMPLOYEE"
      isLoading={isLoading}
      show={openModalEdit}
      setShow={setOpenModalEdit}
      clickLeftButton={clickLeftButton}
      clickRightButton={clickRightButton}
    >
      {isLoadingList ? (
        <Spinner size="sm" />
      ) : (
        <Form>
          <FormGroup>
            <Label className="mb-1" for="exampleSelect">
              Department name
            </Label>
            <Input
              type="select"
              defaultValue={inputValues.department_id || ''}
              name="department_id"
              onChange={onChangeValue}
            >
              <option value={0}>Choose Department</option>
              {listDepartment &&
                listDepartment.length > 0 &&
                listDepartment.map((item, index: number) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.department_name}
                    </option>
                  )
                })}
            </Input>
            {error && error.department_id ? (
              <p className="text-danger">{error.department_id}</p>
            ) : null}
          </FormGroup>

          <FormGroup className="mt-3">
            <Label className="mb-1" for="exampleDate">
              Date
            </Label>
            <Input
              type="date"
              defaultValue={inputValues.birth_date || ''}
              name="birth_date"
              placeholder="date placeholder"
              onChange={onChangeValue}
            />
            {error && error.birth_date ? (
              <p className="text-danger">{error.birth_date}</p>
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
                placeholder="With firstname"
                defaultValue={inputValues.first_name || ''}
                onChange={onChangeValue}
              />
              {error && error.first_name ? (
                <p className="text-danger">{error.first_name}</p>
              ) : null}
            </FormGroup>
            <FormGroup className="mt-3">
              <Label className="mb-1" for="exampleLastName">
                Last Name
              </Label>
              <Input
                type="text"
                name="last_name"
                placeholder="with Lastname"
                defaultValue={inputValues.last_name || ''}
                onChange={onChangeValue}
              />
              {error && error.last_name ? (
                <p className="text-danger">{error.last_name}</p>
              ) : null}
            </FormGroup>
          </div>
          <FormGroup className="mt-3">
            <Label className="mb-1" for="exampleFirstName">
              Age
            </Label>
            <Input
              type="text"
              name="age"
              id="exampleFistName"
              defaultValue={inputValues.age || ''}
              placeholder="with Age"
              onChange={onChangeValue}
            />
            {error && error.age ? (
              <p className="text-danger">{error.age}</p>
            ) : null}
          </FormGroup>
          <Label className="mt-3" for="exampleEmail">
            Gender:{' '}
          </Label>
          
          <div className="d-flex justify-content-start ">
            <FormGroup check style={{ marginRight: 25 }}>
              <Label check>
                <Input checked={inputValues.gender === '1'} value={'1'} type="radio" name="gender" onChange={onChangeValue} /> Nam 
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input checked={inputValues.gender === '2'} type="radio" value={'2'} name="gender" onChange={onChangeValue} /> Nữ
              </Label>
            </FormGroup>
          </div>
        </Form>
      )}
    </CustomModal>
  )
}
