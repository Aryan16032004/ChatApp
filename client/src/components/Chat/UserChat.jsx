import React, { useContext } from 'react'
import { useFetchRecipientuser } from '../hooks/useFetchRecipient'
import avatar from '../../../assest/undraw_pic_profile_re_7g2h.svg'
import { ChatContext } from '../../context/ChatContext'

function UserChat({chat,user}) {
    const {recipientUser} = useFetchRecipientuser(chat,user)
    const {onlineUsers} = useContext(ChatContext)
// console.log("recipientUser",recipientUser);

    const isOnline = onlineUsers?.some((user)=> user?.userId === recipientUser?._id)
     
    
  return (
    <button className='flex flex-row gap-5 justify-between user-card '>
      <div className='flex'>
        <div className="me-2">
            <img src={avatar} className='h-8'/>
        </div>
        <div>
            <div className="name">{recipientUser?.username}</div>
            <div className="text">text Message</div>
        </div>
      </div>
    <div className="flex gap flex-col items-end">
        <div className="date">12/12/2024</div>
        <div className='this-user-notifications pe-'>5</div>
        <span className={isOnline?"user-online":""}></span>
    </div>
    </button>
  )
}

export default UserChat
