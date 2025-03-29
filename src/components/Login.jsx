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
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async () => {
        try {
            const result = await axios.post(BASE_URL + '/login', {
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
        catch (err) {
            setError(err?.response?.data)
        }
    }

    const handleSignUP = async () => {
        try {
            const data = await axios.post(BASE_URL + '/signup', {
                firstName,
                lastName,
                emailId: email,
                password
            }, { withCredentials: true })
            dispatch(addUser(data?.data?.data))
            navigate('/profile')
        }

        catch (err) {
            setError(err?.response?.data)
        }
    }
    return (
        <div className='flex justify-center my-20'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">{isLoginForm ? 'Login' : 'Sign Up'}</h2>
                    <div>
                        <fieldset className="fieldset">
                            {
                                !isLoginForm && <>
                                    <legend className="fieldset-legend">FirstName</legend>
                                    <input type="text"
                                        className="input"
                                        placeholder="Enter first name.."
                                        value={firstName}
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                    />
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input type="text"
                                        className="input"
                                        placeholder="Enter last name.."
                                        value={lastName}
                                        onChange={(e) => { setLastName(e.target.value) }}
                                    />
                                </>
                            }
                            <legend className="fieldset-legend">Email Id</legend>
                            <input type="text"
                                className="input"
                                placeholder="Enter email id.."
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text"
                                className="password"
                                placeholder="Enter password.."
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </fieldset>
                    </div>
                    <p className='text-red-500 flex justify-center'>{error}</p>
                    <div className="card-actions justify-center py-5">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUP}>{isLoginForm ? 'Login' : 'Sign Up'}</button>
                    </div>
                    {isLoginForm ? <p className='text-center cursor-pointer' onClick={() => setIsLoginForm(!isLoginForm)}>New User? Sign Up here</p> :
                        <p className='text-center cursor-pointer' onClick={() => setIsLoginForm(!isLoginForm)}>Exisitng User? Login here</p>}
                </div>
            </div>
        </div>
    )
}

export default Login