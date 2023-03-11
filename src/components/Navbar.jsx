import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';
import { useUser} from '../UserContextProvider'

const settings = ['Settings', 'Profile', 'Logout'];

function Navbar() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate()


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseUserMenu = (setting) => {
    if(setting==="Logout"){
      localStorage.clear();
      navigate("/")
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar display="flex" position="static" sx={{backgroundColor:"#28b440", flexDirection:"row-reverse"}}>
 
        <Toolbar disableGutters>

          {!useUser() &&
            <Button component={RouterLink} to="login" variant="contained" size="small"
            sx={{ backgroundColor:"#1f707c"}} >
                  Login
            </Button>
          }
          {!useUser() &&
            <Button component={RouterLink} to="signup" variant="outlined" size="small"
            sx={{color:"#fff", mx:1}} >
                  SignUp
            </Button>
          }
          {useUser() &&
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                  <Link component={RouterLink} textAlign="center" to={setting} underline='none'>{setting}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          }
        </Toolbar>
    </AppBar>
  );
}
export default Navbar;