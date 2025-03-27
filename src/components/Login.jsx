import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userData = useSelector(state=> state)

    const handleLogin = async()=>{
        try{
            const result = await axios.post(BASE_URL+'/login',{
                emailId: email,
                password
            },
        {
            //Frontend configuration to include token in cookies
            withCredentials: true
        })

       dispatch(addUser(result?.data))
       navigate('/')
        
        }
        catch(err){
            console.error('Error occurred ', err)
        }
    }
    return (
        <div className='flex justify-center my-20'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email Id</legend>
                            <input type="text" 
                            className="input" 
                            placeholder="Enter email id.."
                             value={email} 
                             onChange={(e)=>{setEmail(e.target.value)}}
                             />
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text"
                             className="input" 
                             placeholder="Enter password.." 
                             value={password} 
                             onChange={(e)=>{setPassword(e.target.value)}}
                             />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center py-5">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login