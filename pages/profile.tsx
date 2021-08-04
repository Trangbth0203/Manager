import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Profile as ProfileUser } from '~/src/components/screens/profile/Profile'

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <div>
        <ProfileUser />
      </div>
    </>
  )
}

export default Profile
