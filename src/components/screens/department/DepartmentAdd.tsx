import React, { useState, Dispatch, FC } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { toast } from 'react-toastify'
import fetchApi from '~/src/helpers/fetchApi'
import { CustomModal } from '~/src/components/widgets/CustomModal'

interface Props {
  openModalCreate: boolean
  setOpenModalCreate: Dispatch<boolean>
  refetch?: () => void
}

export const DepartmentAdd: FC<Props> = ({
  openModalCreate,
  setOpenModalCreate,
  refetch,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const initialError = {
    department_name: '',
    department_number_person: '',
    department_phone: '',
    department_manager: '',
    department_manager_other: '',
  }
  const initialInput = {
    department_name: '',
    department_number_person: '',
    department_phone: '',
    department_manager: '',
    department_manager_other: '',
  }
  const [error, setError] = useState(initialError)
  const [inputValues, setInputValues] = useState(initialInput)
  const onChangeValue = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInputValues((preState) => ({
      ...preState,
      [name]: value,
    }))
  }

  const onHandleCreateDepartment = async () => {
    const formData = new FormData()
    formData.set('department_name', inputValues.department_name || '')
    formData.set(
      'department_number_person',
      inputValues.department_number_person || ''
    )
    formData.set('department_phone', inputValues.department_phone || '')
    formData.set('department_manager', inputValues.department_manager || '')
    formData.set(
      'department_manager_other',
      inputValues.department_manager_other || ''
    )
    formData.set('created_by', 'SYSTEM')
    formData.set('updated_by', 'SYSTEM')

    setIsLoading(true)
    try {
      const response = await fetchApi.postCreateDepartment(formData)
      if (!response.status) {
        setIsLoading(false)
        return setError((response as any).message)
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
      title={'ADD DEPARTMENT'}
      show={openModalCreate}
      setShow={setOpenModalCreate}
      isLoading={isLoading}
      clickLeftButton={clickLeftButton}
      clickRightButton={onHandleCreateDepartment}
    >
      <Form>
      <div className="d-flex justify-content-between">
        <FormGroup className="mt-3">
          <Label className="mb-1" for="exampleSelect">
            DepartmentName
          </Label>
          <Input
            type="text"
            name="department_name"
            id="exampleDivision"
            placeholder="Division"
            onChange={onChangeValue}
          />
          {error && error.department_name ? (
            <p className="text-danger">{error.department_name}</p>
          ) : null}
        </FormGroup>
        {/* <div className="d-flex justify-content-between">
          <FormGroup className="mt-3">
            <Label className="mb-1" for="exampleNumberPerson">
              Number Person
            </Label>
            <Input
              type="number"
              name="department_number_person"
              id="exampleNumberPerson"
              placeholder="NumberPerson"
              onChange={onChangeValue}
            />
            {error && error.department_number_person ? (
              <p className="text-danger">{error.department_number_person}</p>
            ) : null}
          </FormGroup> */}
          <FormGroup className="mt-3">
            <Label className="mb-1" for="exampleOtherPhone">
              Phone
            </Label>
            <Input
              type="text"
              name="department_phone"
              id="exampleOtherPhone"
              placeholder="Phone"
              onChange={onChangeValue}
            />
            {error && error.department_phone ? (
              <p className="text-danger">{error.department_phone}</p>
            ) : null}
          </FormGroup>
          </div>
       
        <div className="d-flex justify-content-between">
          <FormGroup className="mt-3">
            <Label className="mb-1" for="exampleMainManager">
              Main Manager
            </Label>
            <Input
              type="text"
              name="department_manager"
              id="exampleMainManager"
              placeholder="Name  MainManager"
              onChange={onChangeValue}
            />
            {error && error.department_manager ? (
              <p className="text-danger">{error.department_manager}</p>
            ) : null}
          </FormGroup>
          <FormGroup className="mt-3">
            <Label className="mb-1" for="exampleOtherManagers">
              Other Managers
            </Label>
            <Input
              type="text"
              name="department_manager_other"
              id="exampleOtherManagers"
              placeholder="Name OtherManagers"
              onChange={onChangeValue}
            />
            {error && error.department_manager_other ? (
              <p className="text-danger">{error.department_manager_other}</p>
            ) : null}
          </FormGroup>
        </div>
      </Form>
    </CustomModal>
  )
}
