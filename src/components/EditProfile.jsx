import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlice'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl)
  const [about, setAbout] = useState(user?.about || '')
  const [age, setAge] = useState(user?.age || '')
  const [gender, setGender] = useState(user?.gender || '')
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  const dispatch = useDispatch()

  const updateProfile = async () => {
    setError('')
    try {
      const data = await axios.patch(API_BASE_URL+'/api/profile/edit', {
        firstName,
        lastName,
        about,
        photoUrl,
        age,
        gender
      }, { withCredentials: true })

      dispatch(addUser(data?.data?.data))
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
    }
    catch (err) {
      setError(err?.response?.data)
    }
  }
  return (
    <>
      <div className='flex justify-center my-5'>
        <div className="card bg-base-300 w-96 shadow-sm mx-10">
          <div className="card-body">
            <h2 className="card-title flex justify-center">Update Profile</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input type="text"
                  className="input"
                  placeholder="Enter firstname..."
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value) }}
                />
                <legend className="fieldset-legend">LastName</legend>
                <input type="text"
                  className="input"
                  placeholder="Enter lastname.."
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value) }}
                />
                <legend className="fieldset-legend">About</legend>
                <input type="text"
                  className="input"
                  placeholder="Enter about.."
                  value={about}
                  onChange={(e) => { setAbout(e.target.value) }}
                />
                <legend className="fieldset-legend">PhotoURL</legend>
                <input type="text"
                  className="input"
                  placeholder="Enter photourl.."
                  value={photoUrl}
                  onChange={(e) => { setPhotoUrl(e.target.value) }}
                />
                <legend className="fieldset-legend">Gender</legend>
                <input type="text"
                  className="input"
                  placeholder="Enter gender.."
                  value={gender}
                  onChange={(e) => { setGender(e.target.value) }}
                />
                <legend className="fieldset-legend">Age</legend>
                <input type="text"
                  className="input"
                  placeholder="Enter age.."
                  value={age}
                  onChange={(e) => { setAge(e.target.value) }}
                />
              </fieldset>
            </div>
            <p className='text-red-500 flex justify-center'>{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary"
                onClick={updateProfile}
              >Update</button>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, photoUrl, about, age, gender }} isEditProfile />
      </div>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>
      </div>}
    </>

  )
}

export default EditProfile