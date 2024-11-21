import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Navbar from './components/Navbar'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'

function App() {
const {user} = useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
    <Navbar/>
    <div className='w-3/4 h-52 px-4 mx-auto '>
     <Routes>
      <Route path="/" element={user ?<Chat/>: <Login/>}/>
      <Route path='/register' element={user?<Chat/>:<Register/>}/>
      <Route path='/login' element={user?<Chat/>:<Login/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
     </Routes>
    </div>
    </ChatContextProvider>
  )
}

export default App
