import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Box} from '@mui/material';

export default function Settings() {
    const [deleteAcc, setDeleteAcc] = useState(false)
    const navigate = useNavigate()

    function deleteAccount(){
        axios.delete('http://127.0.0.1:8000/api/user/profile/',{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(()=>{
            localStorage.clear();
            navigate("/")
        })
    }

  return (
    <Box
    sx={{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    mx: [1, 20, "25%", "30%","35%"],
    borderRadius: 1,
    
    }}
    >
        <Button type="submit" variant="contained" onClick={()=>setDeleteAcc(true)} 
        sx={{mt:1, color:"#000", backgroundColor:"#1fdf64", borderRadius:"20px" , fontWeight:900,
        '&:hover': {color:"#000", backgroundColor:"#1bcb5a"}}} >
            Delete your account
        </Button>
        {
            deleteAcc &&
            (<>
                <Button type="submit" variant="contained" onClick={deleteAccount} 
                sx={{mt:1, color:"#000", backgroundColor:"#e01c1c", borderRadius:"20px" , fontWeight:900,
                '&:hover': {color:"#000", backgroundColor:"#e06666"}}} >
                    Confirm delete?
                </Button>
                        <Button type="submit" variant="contained" onClick={()=>setDeleteAcc(false)} 
                        sx={{mt:1, color:"#000", backgroundColor:"#1fdf64", borderRadius:"20px" , fontWeight:900,
                        '&:hover': {color:"#000", backgroundColor:"#1bcb5a"}}} >
                            Cancel
                </Button>
            </>
            )
        }
    </Box>
  )
}
