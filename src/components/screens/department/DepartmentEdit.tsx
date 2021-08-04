import React, { Dispatch, FC, useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { toast } from 'react-toastify'
import fetchApi from '~/src/helpers/fetchApi'
import { CustomModal } from '../../widgets/CustomModal'

interface Props {
  updateItem: any
  openModalEdit: boolean
  setOpenModalEdit: Dispatch<boolean>
  refetch: () => void
}

export const DepartmentEdit: FC<Props> = ({
  updateItem,
  openModalEdit,
  setOpenModalEdit,
  refetch,
}) => {
  const [inputValues, setInputValues] = useState({
    department_name: '',
    department_number_person: '',
    department_phone: '',
    department_manager: '',
    department_manager_other: '',
  })

  useEffect(() => {
    setInputValues(updateItem)
  }, [updateItem])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const initialError = {
    department_name: '',
    department_number_person: '',
    department_phone: '',
    department_manager: '',
    department_manager_other: '',
  }
  const [error, setError] = useState<any>(initialError)
  const onChangeValue = (e) => {
    const { name, value } = e.target
    setInputValues((preState) => ({
      ...preState,
      [name]: value,
    }))
  }
  const onHandleEditDepartment = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      const config = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      }
      params.append('department_name', inputValues.department_name || '')
      params.append(
        'department_number_person',
        inputValues.department_number_person || ''
      )
      params.append('department_phone', inputValues.department_phone || '')
      params.append('department_manager', inputValues.department_manager || '')
      params.append('department_manager_other',inputValues.department_manager_other || '')
      const response = await fetchApi.updateDepartment(
        updateItem.id,
        params,
        config
      )
      if (!response.status) {
        setIsLoading(false)
        return setError((response as any).message)
      }
      setIsLoading(false)
      toast.success('Chỉnh sửa thành công', { position: 'top-right' })
      refetch()
      setError(initialError)
      setInputValues(initialError)
      setTimeout(() => {
        setOpenModalEdit(false)
      }, 500)
    } catch (error) {
      console.log(`Error ${error}`)
      setIsLoading(false)
    }
  }

  const clickLeftButton = () => {
    setError(initialError)
  }

  return (
    <CustomModal
      title="EDIT"
      isLoading={isLoading}
      show={openModalEdit}
      setShow={setOpenModalEdit}
      clickLeftButton={clickLeftButton}
      clickRightButton={onHandleEditDepartment}
    >
      <Form>
        <FormGroup className="mt-3">
          <Label for="exampleSelect">DepartmentName</Label>
          <Input
            type="text"
            name="department_name"
            placeholder="Division"
            defaultValue={updateItem.department_name || ''}
            onChange={onChangeValue}
          />
          {error  && error.department_name ? (
            <p className="text-danger">{error.department_name[0]}</p>
          ) : null}
        </FormGroup>
      
        <FormGroup className="mt-3">
          <Label for="exampleOtherPhone">Phone</Label>
          <Input
            type="text"
            name="department_phone"
            placeholder="Phone"
            defaultValue={updateItem.department_phone || ''}
            onChange={onChangeValue}
          />
          {error && error.department_phone ? (
            <p className="text-danger">{error.department_phone[0]}</p>
          ) : null}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label for="exampleMainManager">Main Manager</Label>
          <Input
            type="text"
            name="department_manager"
            placeholder="Name  Mainmanager"
            defaultValue={updateItem.department_manager || ''}
            onChange={onChangeValue}
          />
          {error && error.department_manager ? (
            <p className="text-danger">{error.department_manager[0]}</p>
          ) : null}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label for="exampleOtherManagers">Other Managers</Label>
          <Input
            type="text"
            name="department_manager_other"
            defaultValue={updateItem.department_manager_other || ''}
            placeholder="Name OtherManagers"
            onChange={onChangeValue}
          />
          {error  && error.department_manager_other ? (
            <p className="text-danger">{error.department_manager_other[0]}</p>
          ) : null}
        </FormGroup>
      </Form>
    </CustomModal>
  )
}
