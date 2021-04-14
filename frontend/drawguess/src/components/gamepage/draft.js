import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  title: {
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
  },
  score: {
    textAlign: 'right',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));  

 export default function GamePage(){
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
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
      <div className={classes.root}>
        
        <Grid container spacing={1}>
        <Grid item xs={12}>
            <Card className={classes.root}>
              <h5 className={classes.title}>CANVAS</h5>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                  belent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            </Grid>
            <Grid item xs={8}>
            <Card>
            <h5 className={classes.title}>MESSAGE</h5>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                  belent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card>
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
            </Card>
            </Grid>
        </Grid>
      </div>
    );

 }