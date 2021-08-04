import React, { useEffect, useState } from 'react'
import { CardImg, CardBody, CardSubtitle } from 'reactstrap'
import dayjs from 'dayjs'
import fetchApi from '~/src/helpers/fetchApi'
import { getAccount, GENDER } from '~/src/models'
import { Loading } from '~/src/components/elements/Loading'
import styles from '~/styles/components/screen/profile/profile.module.scss'

export const Profile = () => {
  const user = JSON.parse(getAccount())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [profile, setProfile] = useState([])

  const getProfile = async () => {
    setIsLoading(true)
    try {
      const response = await fetchApi.getProfile({ params: { id: user.id } })
      if (!response.status) {
        return
      }
      setProfile(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className="d-flex justify-content-center">
      {isLoading ? <Loading /> : (
        <>
        <CardImg
          className={styles.profileImg}
          src={user.imageUrl || '/static/img/avatar_female.png'}
          alt="avatar"
        />
        <CardBody>
          <CardSubtitle>
            Department: {profile[0]?.department_name || '--'}
            <br/>
            First name: {profile[0]?.first_name || '--'}
            <br/>
            Last name: {profile[0]?.last_name || '--'}
            <br/>
            Email: {user?.email || '--'}
            <br/>
            Age: {profile[0]?.age || '--'}
            <br/>
            Gender: {GENDER[profile[0]?.gender] || '--'}
            <br/>
            Birthday: {dayjs(profile[0]?.birth_date).format('YYYY/MM/DD')}
          </CardSubtitle>
        </CardBody>
      </>
      )}
    </div>
  )
}
