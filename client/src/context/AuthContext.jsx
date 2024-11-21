import {useState, createContext, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/service";

export const AuthContext =createContext() 

export const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState()
    const [registerError,setRegisterError] = useState(null)
    const [isRegisterLoading,setIsRegisterLoading] = useState(false)
    const [registerInfo,setRegisterInfo] = useState({
        username:"",
        email:"",
        password:""
    })
    
    useEffect(()=>{
        const user = localStorage.getItem("user")
        if(user){
            setUser(JSON.parse(user))
        }
    },[])

    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info)
    },[])

    const registerUser = useCallback(async(e)=>{
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)
       const response =  await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo))

       setIsRegisterLoading(false)
       if(response.error){
           setRegisterError(response)
       }
       localStorage.setItem("user",JSON.stringify(response.user))
       setUser(response.user)
    },[registerInfo])

    const logoutUser = useCallback(()=>{
        localStorage.removeItem("user")
        setUser(null)
    },[])


    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })
    const [loginError,setLoginError] = useState(null)
    const [isLoginLoading,setIsLoginLoading] = useState(false)

    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info)
    },[])

    const loginUser = useCallback(async(e)=>{
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo))

        setIsLoginLoading(false)

        if(response.error){
           return setLoginError(response)
        }
        localStorage.setItem("user",JSON.stringify(response.user))
        setUser(response.user)
    },[loginInfo])




    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        isLoginLoading,
        updateLoginInfo,
        loginInfo
    }}>
        {children}
    </AuthContext.Provider>
}