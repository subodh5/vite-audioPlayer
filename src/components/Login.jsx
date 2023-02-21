import {useState} from "react"
import axios from 'axios';
import { useNavigate} from "react-router-dom"
import { TextField, Button, Box } from '@mui/material';

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
            navigate("/dashboard")
        })
       
    }

    return(
        
        <form className="login-form" action="#">
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                p: 3,
                mx: [1, 20, "25%", "30%","35%"],
                bgcolor: '#f0f0f1',
                borderRadius: 1,
                
                }}
                >
            <TextField
                label="Username/Email"
                name="username"
                variant="standard"
                required
                value={formData.username}
                onChange={changeFormData}
                margin="normal"
            />
            <TextField
                label="Password"
                name="password"
                variant="standard"
                type="password"
                required
                value={formData.password}
                onChange={changeFormData}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" onClick={loginUser}>
                Login
            </Button>
            <Button variant="outlined" color="secondary" sx={{mt:2}}>
                Forgot Password?
            </Button>
            <span sx={{mt:1, color:'error.main'}}>{err}</span> 
        </Box>
            
        </form>
 
    )
}