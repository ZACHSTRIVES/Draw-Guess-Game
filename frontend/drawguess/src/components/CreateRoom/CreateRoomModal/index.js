import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

import './CreateRoomModal.css';



export default function CreateRoomModal({socket,handleCreateRoom}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

  const players_marks = [
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },
  ];

  const rounds_marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    
  ];
  function valuetext(value) {
    return `${value}`;
  }


  const [type, setType] = React.useState('Public');

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [room_name,setRoomName]= React.useState('')
  const [password,setPassword]= React.useState('')
  const [max_players,setMaxPlayers] = React.useState(5)
  const [rounds,setRounds] = React.useState(3)

  function handleMaxPlayersChange(value,newValue){
    setMaxPlayers(newValue)
  }
  function handleRoundsChange(value,newValue){
    setRounds(newValue)
  }


  function handleSubmit(){
    const room={
      "roomName":room_name,
      "roomType":type,
      "passowrd":password,
      "maxPlayers":max_players,
      "rounds":rounds}
    handleCreateRoom(room)

    
  }


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Room
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a room and invite your friends to play!
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Room Name"
            type="string"
            variant="filled"
            fullWidth
            onChange={e=>setRoomName(e.target.value)}
          />

          <FormLabel component="legend" className="margin_top" >Room Type</FormLabel>
          <RadioGroup aria-label="Room Type" name="room_type" value={type} onChange={handleChange}>
            <FormControlLabel value="Public" control={<Radio />} label="Public" />
            <FormControlLabel value="Private" control={<Radio />} label="Private" />
          </RadioGroup>

          {type==='Private'?<TextField autoFocus margin="dense" id="password" label="Password" type="string" variant="filled" fullWidth onChange={e=>setPassword(e.target.value)}/>:<a></a>}

          <FormLabel component="legend" className="margin_top" >Max Players</FormLabel>
          <Slider
            value={max_players}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-always"
            step={1}
            marks={players_marks}
            valueLabelDisplay="on"
            min={2}
            max={10}
            className="scroll_bar_margin"
            onChange={handleMaxPlayersChange}
          />

          <FormLabel component="legend" className="margin_top" >Rounds</FormLabel>
          <Slider
            value={rounds}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-always"
            step={1}
            marks={rounds_marks}
            valueLabelDisplay="on"
            min={1}
            max={5}
            className="scroll_bar_margin"
            onChange={handleRoundsChange}
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}