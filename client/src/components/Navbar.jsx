import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
    const {user,logoutUser} =useContext(AuthContext)
  return (
    <div className='bg-black mb-4 h-14 w-full p-6 px-10 flex justify-between items-center'>
      <div>
        <h2 className='text-white font-bold text-lg'>
           <Link to="/">ChatApp</Link>
        </h2>
      </div>

       {user &&  <span className='text-yellow-400 font-semibold'>Logged in as {user?.username}</span>}

        {user ? (
            <Link>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={()=>logoutUser()}>Logout</button>
            </Link>
        ):(
            <div className='flex gap-5'>
            <Link
              to="/login"
              className="text-white  px-4 py-2 rounded hover:underline  transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white  px-4 py-2 rounded hover:underline transition duration-200"
            >
              Signup
            </Link>
            </div>
        )}
     
    </div>
  )
}

export default Navbar
