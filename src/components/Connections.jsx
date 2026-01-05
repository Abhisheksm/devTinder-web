import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../store/connectionSlice'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector(state => state?.connections)

    const fetchConnections = async () => {
        try {
            const data = await axios.get(API_BASE_URL+'/api/user/connections', { withCredentials: true })
            dispatch(addConnections(data?.data?.data))
        }
        catch (err) {
            console.error('err')
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections) return

    if (!connections?.length) return <h1 className='text-center my-5 text-xl'> No connections found</h1>

    return (
        <div>
            <h1 className='text-center my-5 text-3xl'>Connections</h1>
            <div className='flex flex-wrap items-center justify-center'>
                {connections?.map(connection => {
                    const { firstName, lastName, photoUrl, about, age, gender, _id } = connection
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
                    </div>
                })}
            </div>
        </div>
    )
}

export default Connections