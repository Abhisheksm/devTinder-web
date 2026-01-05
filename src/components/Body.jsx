import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(state => state?.user)

  const fetchUser = async () => {
    try {
      const data = await axios.get(API_BASE_URL+'/api/profile/view', {
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
        <Navbar className='h-[10vh]' />
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