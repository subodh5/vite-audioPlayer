import { useEffect, useState } from 'react';
import { useUser} from '../UserContextProvider'
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Avatar,
} from '@mui/material';

const Profile = () => {
    const [currentUser, setCurrentUser]=useState({
        first_name:useUser().first_name,
        last_name:useUser().last_name,
        email:useUser().email,
        profile_img:null
    })
    
    const [profilePicture, setProfilePicture] = useState(null);

    const imgsrc = useUser().profile_img

    const handleProfilePictureChange = (event) => {
      setCurrentUser((prevUser)=>{
        return {...prevUser, profile_img:event.target.files[0]}
    })
    };

    function changeDetail(event){
        setCurrentUser((prevUser)=>{
            return {...prevUser, [event.target.name]:event.target.value}
        })
    }


  const [editing, setEditing] = useState(false);


  const handleEditClick = () => {
    setEditing(true);
  };


  const handleSaveClick = (event) => {
    event.preventDefault();
    setEditing(false);
    let formData = new FormData();
    if (currentUser.profile_img) {
      formData.append('profile_picture', currentUser.profile_img);
    }
    formData.append('first_name', currentUser.first_name);
    formData.append('last_name', currentUser.last_name);
    formData.append('email', currentUser.email);
    axios.patch('http://127.0.0.1:8000/api/user/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response)=>{
      console.log(response)
    })
    .catch((err)=>console.log(err))
    
    // TODO: Save changes to server
  };
    

  return (
    <Card sx={{ maxWidth: 345, mx:[1, 20, "25%", "30%","35%"] }}>
      <CardContent>
        {editing ? (
          <div>
            <input type="file" onChange={handleProfilePictureChange} />
            <TextField
              label="First Name"
              name='first_name'
              value={currentUser.first_name}
              onChange={changeDetail}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Last Name"
              name='last_name'
              value={currentUser.last_name}
              onChange={changeDetail}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Email"
              name='email'
              value={currentUser.email}
              onChange={changeDetail}
              margin="normal"
              fullWidth
            />
          </div>
        ) : (
          <div>
            <Avatar src={useUser().profile_img} sx={{ width: 128, height: 128 }} />
            <Typography variant="h5" component="h2">
              {useUser().first_name} {useUser().last_name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {useUser().email}
            </Typography>
          </div>
        )}

      </CardContent>
      {editing && (
        <CardActions>
          <Button onClick={handleSaveClick}>Save</Button>
        </CardActions>
      )}
      {!editing && (
        <CardActions>
          <Button onClick={handleEditClick}>Edit</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default Profile;
