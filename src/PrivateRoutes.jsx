import { Outlet,useNavigate } from 'react-router-dom';
import { useUser} from './UserContextProvider'


export default function PrivateRoutes(){

    const navigate=useNavigate()
    return useUser()? <Outlet/> : navigate("/login")
    
}