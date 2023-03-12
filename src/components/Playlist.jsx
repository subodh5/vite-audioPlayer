import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, IconButton, ListItemText, Box, Typography } from "@mui/material";
import {Delete, Download, PlayArrowRounded, PauseRounded} from '@mui/icons-material';
import { styled } from "@mui/material/styles";
import { useState,useEffect } from "react";
import Player from "./Player";
import axios from 'axios';


const PlaylistWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const PlaylistItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const PlaylistText = styled(ListItemText)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const Playlist = ({ tracks }) => {
  const [audioList, setAudioList]=useState([])
  const [currentAudio, setCurrentAudio]=useState()
  const [render, setRender]=useState(false)
  const [audioBuffer, setAudioBuffer] = useState(null); 


  function handleDelete(id) {
    axios.delete(`http://127.0.0.1:8000/api/audios/uploads/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      setRender(!render)
    })
    .catch((error) => {
      console.log("Unable to Delete");
    });
  }

  function downloadAudio(id,title){
    axios({
      url:`http://127.0.0.1:8000/api/audios/uploads/${id}/download`, 
      method:'GET',
      headers: {
        "content-type": "text/plain",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      responseType:'blob'
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title}`); 
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.log("File Not Found");
    });
  }

  function playAudio(id,title){
    axios.get(`http://127.0.0.1:8000/api/audios/uploads/${id}/download`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        responseType:'blob'
        
    })
    .then(response => {
      const file = new File([response.data], {type: ''});
      setCurrentAudio({...file,id:id,name:title})
      const formData = new FormData();
      formData.append('input', file);
      axios.post("http://127.0.0.1:8001", formData, { 'Content-Type': 'multipart/form-data'})
      .then((response) => {
        const waveform = response.data.waveform
        const context = new AudioContext(); // Added context creation
        const audioBuffer = context.createBuffer(1, waveform[0].length, 16000);
        const nowBuffering = audioBuffer.getChannelData(0);
        nowBuffering.set(waveform[0]);
        setAudioBuffer(audioBuffer); // Set audioBuffer state

      })
      .catch((error) => {
        console.log(Error);
      });

    })
    .catch(error => {
        console.log('File not found');
    });
  }

  useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/audios/uploads/', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        if(response.data && Array.isArray(response.data)) {
          setAudioList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },[render])


  return (
    <Box sx={{mx:[1, 20, "28%", "30%","35%"],position: "relative", minHeight: "100vh"}}>
    <PlaylistWrapper>
      {audioList.length? (<List>
        {audioList.map((track, index) => (
          <PlaylistItem key={index}>
            <ListItemAvatar>
              <IconButton 
              sx={{ color: '#000', bgcolor: '#1fdf64', '&:hover': { color: '#000', backgroundColor: '#1bcb5a' } }}
              onClick={()=>playAudio(track.id,track.title)}
              >
                <PlayArrowRounded />
              </IconButton>
            </ListItemAvatar>
            <PlaylistText primary={track.title} secondary={track.uploaded_at} />
            <ListItemSecondaryAction>
              <IconButton onClick={()=>downloadAudio(track.id,track.title)}>
                <Download />
              </IconButton>
              <IconButton onClick={() => handleDelete(track.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </PlaylistItem>
        ))}
      </List>):
        <Typography>Playlist Empty</Typography>
      }
    </PlaylistWrapper>

    <div style={{ position: "fixed", bottom: 0,left:'50%', transform: 'translate(-50%)'}}>
      {currentAudio && <Player audioBuffer={audioBuffer} audioName={currentAudio.name} />}
    </div>
    </Box>
  );
};

export default Playlist;
