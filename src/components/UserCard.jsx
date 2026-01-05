import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../store/feedSlice'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserCard = ({user, isEditProfile}) => {
    const dispatch = useDispatch()

    const handleSendRequest = async (status, id) =>{
        try{
        const data = await axios.post(`${API_BASE_URL}/api/request/send/${status}/${id}`, {}, {withCredentials:true})
        dispatch(removeUserFromFeed(id))
        }
        catch(err)
        {
            console.error(er)
        }
    }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
    <figure>
      <img
        src={user?.photoUrl}
        alt="user-photo"
        style={{width: '380px', maxHeight: '340px'}} />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{user?.firstName} {' '} {user?.lastName}</h2>
     {user?.age && <p>Age: {user?.age}</p>}
     {user?.gender && <p>Gender: {user?.gender}</p>}
      <p>{user?.about}</p>
      <div className="card-actions justify-center my-5">
        <button className="btn btn-primary" disabled={isEditProfile} onClick={()=>handleSendRequest('ignored', user?._id)}>Ignore</button>
        <button className="btn btn-secondary" disabled={isEditProfile} onClick={()=>handleSendRequest('interested', user?._id)}>Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard