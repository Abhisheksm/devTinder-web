import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../store/requestSlice'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector(state => state?.requests)

    const fetchRequests = async () => {
        try {
            const data = await axios.get(API_BASE_URL+'/api/user/requests/received', { withCredentials: true })
            dispatch(addRequests(data?.data?.data))
        }
        catch (err) {
            console.error(err)
        }
    }

    const reviewRequest = async (id, status) => {
        try {
            const data = await axios.post(`${API_BASE_URL}/api/request/review/${status}/${id}`, {}, { withCredentials: true })
            fetchRequests()
        }
        catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        fetchRequests()
    }, [])

    if (!requests) return

    if (!requests?.length) return <h1 className='text-center my-5 text-xl'> No requests found</h1>

    return (
        <div>
            <h1 className='text-center my-5 text-3xl'>Requests</h1>
            <div className='flex flex-wrap items-center justify-center'>
                {requests?.map(request => {
                    const { firstName, lastName, photoUrl, about, age, gender, _id } = request?.fromUserId
                    return <div key={_id} className="card card-side bg-base-300 shadow-sm m-10 w-1/3">
                        <figure>
                            <img
                                style={{ height: '150px', width: '150px', borderRadius: '20px' }}
                                src={photoUrl}
                                alt="user-photo" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{firstName}{' '}{lastName} </h2>
                            {age && gender && <p>{age} {' '} {gender}</p>}
                            <p>{about}</p>

                        </div>
                        <div className="card-actions flex flex-col justify-between m-5">
                            <button className="btn btn-secondary my-2" onClick={() => { reviewRequest(request?._id, 'accepted',) }}>Accept</button>
                            <button className="btn btn-primary" onClick={() => { reviewRequest(request?._id, 'rejected') }}>Reject</button>

                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Requests