import { useState } from "react"
import {Link } from "react-router-dom"
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function SignUp(){

    const [formData, setFormData]=useState({
        firstname:"",
        lastname:"",
        email:"",
        dob:"",
        password:"",
        password2:""
    })
   
    const [regStatus, setRegStatus]=useState(null)

    function changeFormData(event){
        setFormData((prevState)=>{
            return {...prevState, [event.target.name]:event.target.value}
        })
    }


    function submitForm(event){
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/user/register/', {
            email: formData.email,
            first_name: formData.firstname,
            last_name: formData.lastname,
            dob: formData.dob,
            password: formData.password,
            password2: formData.password2
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
        .then((response)=>{
            setFormData({
                firstname:"",
                lastname:"",
                email:"",
                dob:"",
                password:"",
                password2:""
            })
            if (response.status===201){
                setRegStatus("Registration successful")
            }
        })
        .catch(()=>{setRegStatus("Registration Failed")})
    }

    return(
    
        <form className="signup-form" action="#">
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
                    First Name
                </Typography>
                <TextField
                    label="First Name"
                    name="firstname"
                    variant="standard"
                    required
                    value={formData.firstname}
                    onChange={changeFormData}
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    name="lastname"
                    variant="standard"
                    required
                    value={formData.lastname}
                    onChange={changeFormData}
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    variant="standard"
                    required
                    value={formData.email}
                    onChange={changeFormData}
                    margin="normal"
                />


                <TextField
                    label="Date of Birth"
                    name="dob"
                    variant="standard"
                    type="date"
                    required
                    value={formData.dob}
                    onChange={changeFormData}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                <TextField
                    label="Confirm Password"
                    name="password2"
                    variant="standard"
                    type="password"
                    required
                    value={formData.password2}
                    onChange={changeFormData}
                    margin="normal"
                />

                <Button type="submit" variant="contained" onClick={submitForm} 
                sx={{mt:1, color:"#000", backgroundColor:"#1fdf64", borderRadius:"20px" , fontWeight:900,
                '&:hover': {color:"#000", backgroundColor:"#1bcb5a"}}}>
                    Sign up
                </Button>
                <div style={{color:"red"}}>{regStatus}</div>
                
                <Box sx={{mt:2, color:"#503e23"}}>
                    Already have account? 
                    <Link to="/login" style={{color:"#1db954"}}> Log in</Link>
                </Box>

            </Box>
        </form>
    )
}