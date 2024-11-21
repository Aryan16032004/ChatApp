import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest,baseUrl,postRequest } from "../utils/service";
import {io} from 'socket.io-client'

export const ChatContext = createContext()

export const ChatContextProvider = ({children,user})=>{
    const [userChats,setUserChats] = useState(null)
    const [isUserChatsLoading,setIsUserChatsLoading] = useState(false)
    const [userChatsError,setUserChatsError] = useState(null)
    const [potentialChats,setPotentialChats] = useState(null)
    const [currentChat,setCurrentChat] = useState(null)
    const [messages,setMessages] = useState(null)
    const [isMessagesLoading,setIsMessagesLoading] = useState(false)
    const [messagesError,setMessagesError] = useState(null)
    const [sendTextMessageError,setSendTextMessageError] = useState(null)
    const [newMessage,setNewMessage] = useState(null)
    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState(null)

    // console.log("currentChat",currentChat);
    // console.log("messages",messages);
    // console.log("OnlineUsers",onlineUsers);
    
    
    useEffect(()=>{
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        return()=>{
            newSocket.disconnect()
        }
    },[user])

    //add user
    useEffect(()=>{
        if(socket === null) return
        socket.emit("addNewUser",user?.id)

        socket.on("getOnlineUsers",(res)=>{
            setOnlineUsers(res)
        })

        return ()=>{
            socket.off("getOnlineUsers")
        }
    },[socket])

    //send message
    useEffect(()=>{
        if(socket === null) return;
        const recipientId  = currentChat?.members.find((id)=>id!==user.id)
        socket.emit("sendMessage",{...newMessage,recipientId})
       
    },[newMessage])

    //recieve message
    useEffect(()=>{
        if(socket === null) return;

        socket.on("getMessage",(res)=>{
            if(currentChat?.id !== res.chatId) return

            setMessages((prev)=> [...prev,res])
        })
       return ()=>{
              socket.off("getMessage")
       }
    },[socket,currentChat])

    useEffect(()=>{
        const getusers= async()=>{
            const response = await getRequest(`${baseUrl}/users`)
            // console.log("users", response);
            
            if(response.error){
                console.log(response.error)
            }
            // console.log("user Id",user.id);
            
            const pChats = response.filter((u)=>{
                let isChatCreated= false
                if(user?.id===u._id){
                    return false
                }
                // console.log("userChats",userChats);
                
                if(userChats){
                    isChatCreated= userChats?.some((chat)=>{
                        return chat.members[0]===u._id || chat.members[1]===u._id
                    })
                }
                return !isChatCreated
            })
            setPotentialChats(pChats)
        }
    getusers()
    },[userChats])

    useEffect(()=>{
        const getUserChats = async()=>{
            if(user?.id){
                setIsUserChatsLoading(true)
                setUserChatsError(null)

                const response = await getRequest(`${baseUrl}/chat/${user.id}`)
                setIsUserChatsLoading(false)

                if(response.error){
                    setUserChatsError(response)
                }

                setUserChats(response)
            }
        }
        getUserChats()
    },[user])

    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat)
    },[])

    const createChat = useCallback(async(firstId,secondId)=>{
        const response = await postRequest(`${baseUrl}/chat`,JSON.stringify(
            {
                firstId,
                secondId
            }
        ))

        if(response.error){
            console.log(response)
        }
        setUserChats((prev)=>[...prev,response])
    },[])

    useEffect(()=>{
        const getMessages = async()=>{
            if(user?.id){
                setIsMessagesLoading(true)
                setMessagesError(null)
                // console.log("currentChat",currentChat);
                
                const response = await getRequest(`${baseUrl}/message/${currentChat?._id}`)
                setIsMessagesLoading(false)

                // console.log("response",response);
                
                if(response.error){
                    setMessagesError(response)
                }

                setMessages(response)
            }
        }
        getMessages()
    },[currentChat])

    const sendTextMessage = useCallback(async(textMessage,sender,currentChatId,setTextMessage)=>{
        if(!textMessage) return console.log("You must write something ...");

        const response =await postRequest(`${baseUrl}/message`,JSON.stringify({
            text:textMessage,
            senderId:sender?.id,
            chatId:currentChatId
        }))
        if(response.error){
           return  sendTextMessageError(response)
        }
        setNewMessage(response)
        setMessages((prev=>[...prev,response]))
        setTextMessage('')
    },[])
    
    return <ChatContext.Provider value={
        {
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            messages,
            isMessagesLoading,
            messagesError,
            currentChat,
            sendTextMessage,
            onlineUsers
        }
    }>{children}</ChatContext.Provider>
}
