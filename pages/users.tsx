import React from 'react'
import { NextPage } from 'next'
import { UserList } from '~/src/components/screens/user/UserList'
import { CustomModal } from "~/src/components/widgets/CustomModal"

const Users: NextPage = () => {
  return (
    <div>
      <UserList />
    </div>
  )
}

export default Users
