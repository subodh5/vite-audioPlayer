import { createContext, useState, useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import FetchUser from "./FetchUser"

const userContext = createContext()

export function useUser(){
    return useContext(userContext)
}

export default function UserContextProvider({children}){
    const { pathname } = useLocation();
    const [user, setUser]=useState(null)
    useEffect(()=>{
        FetchUser().then((resUser)=>{
            setUser(resUser)
        })
    },[pathname])

    return(
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}