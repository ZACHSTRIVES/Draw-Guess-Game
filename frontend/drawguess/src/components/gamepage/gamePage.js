import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Canvas from '../canvas';
import Chatbox from '../chat';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10
  },
  pos: {
    marginBottom: 12,
  },
  score: {
    textAlign: 'right',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  }
}));  

 export default function GamePage(){
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const question = [
      { 'id': 0,
        'name': 'BMW',
       },
       { 'id': 1,
          'name': 'VW',
       },
       { 'id': 2,
         'name': 'BYD',
        }
  ];

    const rooms = [
        { 'id': 0,
          'name': 'RoomName1',
          'number': 'Room1',
          'player': '2/6',
         },
         { 'id': 1,
            'name': 'RoomName2',
            'number': 'Room2',
            'player': '5/6',
         },
         { 'id': 2,
         
           'name': 'RoomName3',
           'number': 'Room3',
           'player': '4/6',
          }
    ];

    const players = [
        { 'id': 0,
          'playerName': 'Alan',
          'score': 10,
         },
         { 'id': 1,
            'playerName': 'Eden',
            'score': 20,
         },
         { 'id': 2,
           'playerName': 'Ted',
           'score': 15,
          }
    ];

    return (
      <div className={classes.root, "container"}>
        <div className="title">
          <h5 className={classes.title}>TITLE</h5>
          
        </div>
        <div className="canvas">
          <Canvas/>
        </div>
        <div className="round">
          <h5 className={classes.title}>ROUND</h5>
          <ul>
              {players.map((player, index) => 
                <li key={index} alignItems="flex-start">
                  <div className={classes.demo}>
                    <List dense={dense}>
                        <ListItem>
                          <ListItemText
                            primary={player.playerName}
                            secondary={secondary ? 'Secondary text' : null}
                          />
                          <ListItemText 
                            edge="end"
                            primary={player.score}
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                    </List>
                  </div>
                </li>)}
            </ul>
        </div>
        <div className="message">
          <h5 className={classes.title}>MESSAGE</h5>
          <Chatbox/>
        </div>
      </div>
    );

 }