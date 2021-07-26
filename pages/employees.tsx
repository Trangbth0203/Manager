import React from 'react'
import { NextPage } from 'next'
import { EmployeeList } from '~/src/components/screens/employee/EmployeeList'

const Employees: NextPage = () => {
  return (
    <div>
      <EmployeeList />
    </div>
   
  )
}

export default Employees
