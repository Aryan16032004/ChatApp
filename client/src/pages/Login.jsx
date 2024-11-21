import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Login() {
    const { logoutUser,
        loginUser,
        loginError,
        isLoginLoading,
        updateLoginInfo,
        loginInfo} = useContext(AuthContext)

  return (
    <div className="flex justify-center items-center h-screen">
      <form
      onSubmit={loginUser}
        className="p-6 rounded shadow-lg shadow-black w-96 text-black"
      >
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Login</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1 text-white" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            onChange={(e)=>updateLoginInfo({...loginInfo,email:e.target.value})}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 text-white" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            onChange={(e)=>updateLoginInfo({...loginInfo,password:e.target.value})}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
         {isLoginLoading? 'Loading...' : 'Login'}
        </button>

       
         {loginError?.error &&
         (
            <p className="text-red-500 text-center mb-4">
            {loginError?.message }
            </p>
         )}
       
      </form>
    </div>
  );
  
}

export default Login
