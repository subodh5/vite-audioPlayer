import {  Box } from '@mui/material';
import Player from "./Player"

const Dashboard = () => {

  return (
    <Box display="flex" sx={{flexDirection:{xs:"column", md: "row",}}}>

    <Player/>

    </Box>
  );
};

export default Dashboard;
