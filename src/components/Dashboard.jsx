import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import axios from 'axios';
import Player from "./Player"

const Dashboard = () => {
  const [audioFile, setAudioFile] = React.useState(null);
  const [uploadErr, setUploadErr] = React.useState("");

  const [audioBuffer, setAudioBuffer] = React.useState(null); // Added state for audioBuffer

  function uploadAudio(event) {
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('input', event.target.files[0]);

    // for backend
    formData.append("title", `${event.target.files[0].name}`);
    formData.append("audio_file",event.target.files[0]);


    let config = {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    };

    axios.post("http://127.0.0.1:8000/api/audios/uploads/", formData, config)
        .then(response => {
  
        })
        .catch(error => {
            console.log(error);
        });

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
      setUploadErr(error)
    });
  }

  return (
    <Box sx={{mx:[1, 20, "30%", "35%","40%"]}}>
      <form onSubmit={uploadAudio} >
        <label htmlFor="audio-upload" >
          <Button
            variant="contained"
            component="span"
            endIcon={<MusicNoteIcon />}
            sx={{
              color: "#000",
              backgroundColor: "#1fdf64",
              borderRadius: "20px",
              fontWeight: 900,
              "&:hover": {
                color: "#000",
                backgroundColor: "#1bcb5a",
              },
            }}
          >
            Upload
          </Button>
        </label>
        <input
          id="audio-upload"
          hidden
          type="file"
          onChange={(event) => {
            event.preventDefault();
            setAudioFile(event.target.files[0]);
            uploadAudio(event);
          }}
        />
        <Typography variant="body1" color="textSecondary" display="inline">
          {uploadErr}
        </Typography>
        <Typography>{audioFile ? audioFile.name : ""}</Typography>
      </form>
      
      <Player audioBuffer={audioBuffer} audioName={audioFile ? audioFile.name : " <select audio>"}/>
     

    </Box>
  );
};

export default Dashboard;
