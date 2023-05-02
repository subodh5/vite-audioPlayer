import {useState} from "react"
import axios from 'axios';
import { TextField, Button, Box} from '@mui/material';

export default function () {

    const [email, setEmail] = useState()

    function sendReset(event){
        event.preventDefault()
        let formData = new FormData();
        formData.append('email', currentUser.first_name);
        axios.post("http://127.0.0.1:8000/api/user/send-reset-password-email/",formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        .then(()=>{})
    }

  return (
    <form className="login-form" onSubmit={sendReset}>
        <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                mx: [1, 20, "25%", "30%","35%"],
                borderRadius: 1,
                
                }}
                >
            <TextField
                name="username"
                variant="outlined"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                margin="normal"
                sx={{mt:0,mb:2}}
                placeholder="Enter your email"

            />
            
            <Button type="submit" variant="contained"
            sx={{color:"#000", backgroundColor:"#1fdf64", borderRadius:"20px" , fontWeight:900,
            '&:hover': {color:"#000", backgroundColor:"#1bcb5a"}
            }}>
                Send reset link
            </Button>
        </Box>
            
        </form>
  )
}
