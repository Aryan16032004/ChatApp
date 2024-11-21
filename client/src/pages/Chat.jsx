import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import UserChat from '../components/Chat/UserChat'
import { AuthContext } from '../context/AuthContext'
import PotentialChats from '../components/Chat/PotentialChats'
import ChatBox from '../components/Chat/ChatBox'

function Chat() {
    const {user} = useContext(AuthContext)
    const {userChats,isUserChatsLoading,updateCurrentChat} = useContext(ChatContext)
    // console.log("User Chats",userChats);
    
  return (
    <div className=''>
        <PotentialChats/>
      {userChats?.length<1 ? null :
      <div className='flex mt-10 flex-row justify-end'>
        <div className="flex flex-col gap-7 messgaes-box pe-10 ">
            {isUserChatsLoading && <p>Loading Chats...</p>}
            {userChats ?. map((chat,index)=>{
                return(
                    <div className="" key={index} onClick={()=>updateCurrentChat(chat)}>
                        <UserChat chat={chat} user={user}/>
                    </div>
                )
            })}
        </div>
        <ChatBox/>
      </div>
      }
    </div>
  )
}

export default Chat
