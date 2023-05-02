import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser} from './UserContextProvider'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function PrivateRoutes(){
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const user = useUser();
    useEffect(()=>{
        setTimeout(() => setIsAuthChecked(true), 500);
    },[])

    if(!isAuthChecked){
        return (
            <Box sx={{ textAlign:'center' }}>
                <Box>Checking for authentication...</Box>
                <CircularProgress />
            </Box>
        )
    }

    return user ? <Outlet/> : <Navigate to="/login"/>
}