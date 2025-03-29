import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addFeed } from '../store/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'

const Feed = () => {

    const dispatch = useDispatch()
    const feedData = useSelector(state => state?.feed)

    const getFeed =async ()=>{
      try{
        const data = await axios.get(BASE_URL+'/feed',{ withCredentials: true})
        dispatch(addFeed(data?.data))
      }
      catch(err)
      {
        console.error(err)
      }        
    }

    useEffect(()=>{
      getFeed()
    },[])

    if(!feedData) return 

    if(!feedData?.length) return <h1 className='text-center my-5 text-xl'> No new user found</h1>
  return (
    feedData && <div className='flex justify-center my-10'>
        <UserCard user={feedData[0]}/>
    </div>
  )
}

export default Feed