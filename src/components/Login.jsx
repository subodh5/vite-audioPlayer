import {useState} from "react"
import axios from 'axios';
import { useNavigate} from "react-router-dom"
import { TextField, Button, Box, Typography } from '@mui/material';

export default function Login(){

    const [formData, setFormData]=useState({
        username:"",
        password:""
    })
    const [err, setErr]=useState(null)
    const navigate=useNavigate()

    function changeFormData(event){
        setFormData((prevState)=>{
            return {...prevState, [event.target.name]:event.target.value}
        })
    }
    async function fetchToken(){
    await axios.post('http://127.0.0.1:8000/api/user/login/', {
        email: formData.username,
        password: formData.password
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then((response)=>localStorage.setItem('token', response.data.token.access))
        .catch(()=>{setErr("Failed to fetch token")})
    }

    function loginUser(event){
        event.preventDefault()
        fetchToken().then(()=>{
            navigate("/Dashboard")
        })
       
    }

    return(
        
        <form className="login-form" action="#">
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                mx: [1, 20, "25%", "30%","35%"],
                borderRadius: 1,
                
                }}
                >
            <Typography  variant="span" sx={{fontWeight:900, fontSize: 14}}>
                Email Address or Username
            </Typography>
            <TextField
                name="username"
                variant="outlined"
                required
                value={formData.username}
                onChange={changeFormData}
                margin="normal"
                sx={{mt:0,mb:2}}

            />
            <Typography variant="span" sx={{fontWeight:900,fontSize: 14}}>
                Password
            </Typography>
            <TextField
                name="password"
                variant="outlined"
                type="password"
                required
                value={formData.password}
                onChange={changeFormData}
                margin="normal"
                sx={{mt:0}}
            />
            <Button type="submit" variant="contained"  onClick={loginUser}
            sx={{color:"#000", backgroundColor:"#1fdf64", borderRadius:"20px" , fontWeight:900,
            '&:hover': {color:"#000", backgroundColor:"#1bcb5a"}
            }}>
                Login
            </Button>
            <Typography sx={{mt:3,color:"000",'&:hover': {color:"#1bcb5a"}}}>
                Forgot Password?
            </Typography>
            <span sx={{mt:1, color:'error.main'}}>{err}</span> 
        </Box>
            
        </form>
 
    )
}