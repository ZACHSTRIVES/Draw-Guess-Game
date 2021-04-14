import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Canvas from './canvas';
import Chat from './chat';

export default function GameRoom() {
  const dense = false;
  const secondary = false;

  const players = [
    {
      'id': 0,
      'playerName': 'Alan',
      'score': 10,
    },
    {
      'id': 1,
      'playerName': 'Eden',
      'score': 20,
    },
    {
      'id': 2,
      'playerName': 'Ted',
      'score': 15,
    }
  ];

  return (
    <div className="root container">
      <div className="title border">
        <h5 className="title">TITLE</h5>
      </div>
      <div className="canvas border">
        <Canvas />
      </div>
      <div className="round border">
        <h5 className="title">ROUND</h5>
        <ul>
          {players.map((player, index) =>
            <li key={index} alignItems="flex-start">
              <div className="player">
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
      <div className="message border">
        <h5 className="title">MESSAGE</h5>
        <Chat/>
      </div>
    </div>
  );
}