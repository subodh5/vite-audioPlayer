import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import { Delete as DeleteIcon, GetApp as DownloadIcon } from '@mui/icons-material';
import Player from "./Player"

const Dashboard = () => {
  const musicData = [
    { id: 1, title: 'Song A', artist: 'Artist A' },
    { id: 2, title: 'Song B', artist: 'Artist B' },
    { id: 3, title: 'Song C', artist: 'Artist C' },
  ];
  function selectAudio(event){
    console.log("audio selected");
  }

  function downloadAudio(event){
    console.log("download");
  }
  function deleteAudio(event){
    console.log("delete");
  }


  return (
    <Box display="flex" sx={{flexDirection:{xs:"column", md: "row",}}}>
    <List sx={{flex:1}}>
      {musicData.map((music) => (
        <ListItem 
          onClick={selectAudio} 
          key={music.id} 
          sx={{backgroundColor:"#cad9d9", borderRadius:2, m:1, cursor:"pointer"}}>
            
          <ListItemText primary={music.title} secondary={music.artist}/>
          <ListItemSecondaryAction>
            <IconButton onClick={downloadAudio}>
              <DownloadIcon />
            </IconButton>
            <IconButton onClick={deleteAudio}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>

    <Player/>

    </Box>
  );
};

export default Dashboard;
