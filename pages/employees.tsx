import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import {  toast } from 'react-toastify';
import { EmployeeList } from '~/src/components/screens/employee/EmployeeList'

const Employees: NextPage = () => {
  const notify = () => toast.success('Wow so easy!', { position: 'top-right' })

  return (
    <>
      <Head>
        <title>Employees</title>
      </Head>
      <div>
        <EmployeeList />
        <button onClick={notify}>Notify!</button>
      </div>
    </>
  )
}

export default Employees
