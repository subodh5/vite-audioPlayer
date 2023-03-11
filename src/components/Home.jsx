import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Home as HomeIcon, LibraryMusic } from '@mui/icons-material';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';
import { Outlet } from 'react-router-dom';
import { useUser} from '../UserContextProvider'

const drawerWidth = 240;
const settings = ['Settings', 'Profile', 'Logout'];
const listItems = ['Dashboard', 'Library'];
const iconMap = {
  'Dashboard': <HomeIcon />,
  'Library': <LibraryMusic />,
};


export default function Home() {

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar display="flex" position="fixed" 
        sx={{backgroundColor:"#141414", flexDirection:"row-reverse", width: `calc(100% - ${drawerWidth}px)`}}
      >
        <Toolbar disableGutters>
        <Divider/>
          {!useUser() &&
            <Button component={RouterLink} to="signup" variant="text" 
            sx={{color:"#F0F0F0 ", textTransform: 'none', fontWeight:900,}} >
                  Sign Up
            </Button>
          }

        {!useUser() &&
            <Button component={RouterLink} to="login" variant="outlined" size="large"
            sx={{color:"#000", backgroundColor:"#1fdf64", borderRadius:"20px" , fontWeight:900,
            '&:hover': {color:"#000", backgroundColor:"#1bcb5a"}, mx:3, textTransform: 'none'
        }} >
                  Log in
            </Button>
          }

          {useUser() &&
          <Box sx={{ flexGrow: 0, mr:2}}>
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
                  <Link component={RouterLink} textAlign="center" to={setting} underline='none' 
                  sx={{color:"#28b440"}}>
                    {setting}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>}

        </Toolbar>
      </AppBar>

      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#080808",
            color: "#fff",
          }
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          }

        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar >
            <Typography
                variant="h6"
                noWrap
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                CodeAud
            </Typography>
        </Toolbar>

        <List >
          {listItems.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={RouterLink} to={text}>
                {iconMap[text]}
                <ListItemText primary={text} sx={{ml:1}}/>
              </ListItemButton>
            </ListItem>
          
          ))}
        </List>

      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
            <Outlet/>
      </Box>
    </Box>
  );
}
