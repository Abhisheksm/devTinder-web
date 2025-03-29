import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
    const userData = useSelector(state=> state?.user)
  return (
    <>
    {userData && <EditProfile user={userData} />}
    </>
  )
}

export default Profile