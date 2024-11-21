import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { useFetchRecipientuser } from '../hooks/useFetchRecipient'
import moment from 'moment'
import InputEmoji from 'react-input-emoji'
import { IoSend } from "react-icons/io5";

function ChatBox() {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessageLoading, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientuser(currentChat, user);
  const [textMessage, setTextMessage] = useState('');

  if (!recipientUser)
      return (
          <p className="text-center w-full text-gray-500">
              No conversation selected yet...
          </p>
      );

  if (isMessageLoading)
      return (
          <p className="text-center w-full text-gray-500">
              Loading chat...
          </p>
      );

  return (
      <div className="flex flex-col w-full gap-4 p-4 bg-black rounded-lg shadow-lg chat-box">
          
          <div className="text-center text-lg font-semibold  py-2 rounded-md text-gray-100">
              Chat with {recipientUser?.username}
          </div>

          
          <div className="flex flex-col gap-4 p-4 overflow-y-auto rounded-md messages">
              {messages &&
                  messages.map((message, index) => (
                      <div
                          key={index}
                          className={`p-3 rounded-lg text-sm shadow-md ${
                              message?.senderId === user?.id
                                  ? 'bg-blue-500 text-white self-end'
                                  : 'bg-gray-300 text-black self-start'
                          }`}
                      >
                          <span>{message.text}</span>
                          <span className="text-xs text-black mt-1 block text-right">
                              {moment(message.createdAt).calendar()}
                          </span>
                      </div>
                  ))}
          </div>

          
          <div className="flex items-center gap-4 p-3 rounded-md">
              <InputEmoji
                  value={textMessage}
                  onChange={setTextMessage}
                  fontFamily="Nunito"
                  borderColor="rgba(72,112,223,0.2)"
                  placeholder="Type a message..."
                  className="flex-1"
              />
              <button
                  className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full shadow-md"
                  onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}
              >
                  <IoSend size={20} className="text-white" />
              </button>
          </div>
      </div>
  );
}

export default ChatBox;
