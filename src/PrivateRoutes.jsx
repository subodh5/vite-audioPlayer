import { Outlet,useNavigate } from 'react-router-dom';
import { useUser} from './UserContextProvider'
import { useEffect } from 'react';

export default function PrivateRoutes(){

    const navigate=useNavigate()
    // const userExists= useUser()
    // useEffect(()=>{
    //     {!userExists && navigate("/login")}
    // },[])

    // return <Outlet/>

    return useUser()? <Outlet/> : navigate("/login")
    
}