import React from 'react'

const UserCard = ({user}) => {
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
     { user?.age && <p>Age: {user?.age}</p>}
     {user?.gender && <p>Gender: {user?.gender}</p>}
      <p>{user?.about}</p>
      <div className="card-actions justify-center my-5">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard