import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'
import axios from 'axios'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(state => state?.user)

  const fetchUser = async () => {
    try {
      const data = await axios.get('/api/profile/view', {
        withCredentials: true
      })
      dispatch(addUser(data?.data))
    }
    catch (err) {
      if (err.status === 401) {
        navigate('/login')
      }
      console.error(err)
    }
  }

  useEffect(() => {
    !userData && fetchUser()
  }, [])
  return (
    <>
    <div>
       <Navbar className='h-[10vh]'/>
    </div>
     
      <div className='h-[80vh] overflow-y-scroll'>
<Outlet />
      </div>
      <div className='h-[10vh]'>
<Footer />
      </div>
      
    </>

  )
}

export default Body