import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Button} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import axios from 'axios';


const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));


const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});


const context = new AudioContext()
let audioBuffer;

export default function MusicPlayerSlider() {
  const theme = useTheme();
  const duration=2; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(true);
  let started= React.useRef(false)
  const [audioFile, setAudioFile]=React.useState(null)
  const [uploadErr, setuploadErr]=React.useState("")

  function uploadAudio(event){
    const formData = new FormData();
    formData.append('input', event.target.files[0]);

    axios.post("http://127.0.0.1:8001", formData, { 'Content-Type': 'multipart/form-data'})
    .then((response) => {
      const waveform= response.data.waveform
      audioBuffer = context.createBuffer(1, waveform[0].length, 16000);
      const nowBuffering = audioBuffer.getChannelData(0);
      nowBuffering.set(waveform[0]);

    })
    .catch((error) => {
      setuploadErr(error)
  });
  }
 

  React.useEffect(()=>{
    
    let source = context.createBufferSource()
    if(!paused){
      if(!started.current){
      started.current=true
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
      context.resume()
      }
      
    }
    else{
      if(started.current && source){
        started.current=false
        source.start();
        source.stop()
      }
    }
    console.log(started);
  },[paused])




  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  

  return (
    <Box sx={{mx:"auto"}}>

    <form onSubmit={uploadAudio}>
      <label htmlFor="audio-upload">
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


    <Box sx={{ width: '80%', overflow: 'hidden', m:2}}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography noWrap>
              <b>Playing</b> 
              <Typography color="textSecondary" display="inline">
                {audioFile ? audioFile.name : " select audio"}
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>0</TinyText>
          <TinyText>2</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&:before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
    </Box>
  );
}
