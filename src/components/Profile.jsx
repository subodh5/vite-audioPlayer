import { useState } from 'react';
import { useUser} from '../UserContextProvider'
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
        email:useUser().email
    })

    function changeDetail(event){
        setCurrentUser((prevUser)=>{
            return {...prevUser, [event.target.name]:event.target.value}
        })
    }


  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    // TODO: Save changes to server
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Avatar sx={{ width: 128, height: 128 }} />
        {editing ? (
          <div>
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
