import React from 'react'
import { NextPage } from 'next'
import { DepartmentList } from '~/src/components/screens/department/DepartmentList'

const Departments: NextPage = () => {
  return (
    <div>
      <DepartmentList />
    </div>
  )
}

export default Departments
