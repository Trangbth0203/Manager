import React, { useState } from 'react'
import { Table, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import {
  MOCK_DATA_DEPARTMENTS,
  IMockDataDepartment,
} from '~/src/models/departments'
import { IconEdit, IconDelete } from '~/src/components/elements'
import { CustomModal } from '../../widgets/CustomModal'
import { DepartmentAdd } from './DepartmentAdd'
import styles from '~/styles/pages/departments.module.scss'

export const DepartmentList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Departments</CardTitle>
            <Button color="success" onClick={() => setOpenModal(true)}>
              CREATE
            </Button>
          </div>
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
                {MOCK_DATA_DEPARTMENTS.map(
                  (item: IMockDataDepartment, index: number) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{++index}</th>
                        <td>{item.name}</td>
                        <td>{item.number_person}</td>
                        <td>{item.phone}</td>
                        <td>{item.main_manager}</td>
                        <td>{item.others_manager}</td>
                        <td>
                          <span className={styles.icon}>
                            <IconEdit />
                          </span>
                          <span>
                            <IconDelete />
                          </span>
                        </td>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </Table>
          </CardText>
        </CardBody>
      </Card>
      <CustomModal
        title={'ADD DEPARTMENT'}
        show={openModal}
        setShow={setOpenModal}
      >
        <DepartmentAdd />
      </CustomModal>
    </>
  )
}
