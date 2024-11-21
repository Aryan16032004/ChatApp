import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

function PotentialChats() {
    const {user} =useContext(AuthContext)
    const {potentialChats,createChat,onlineUsers} = useContext(ChatContext)
    // console.log("Potential Chats",potentialChats);
    
  return (
    <div className='all-users'>
      {potentialChats && potentialChats.map((u,index)=>{
        // {console.log("u",u)}
       return ( <div className="single-user" key={index} onClick={()=>createChat(user.id,u._id)}>
            {u.username}
            <span className={
              onlineUsers?.some((user)=>user?.userId === u?._id)
              ?"user-online":""
            }></span>
        </div>)
      })}
    </div>
  )
}

export default PotentialChats
