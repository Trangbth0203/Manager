import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { EmployeeList } from '~/src/components/screens/employee/EmployeeList'

const Employees: NextPage = () => {
  return (
    <>
      <Head>
        <title>Employees</title>
      </Head>
      <div>
        <EmployeeList />
      </div>
    </>
  )
}

export default Employees
