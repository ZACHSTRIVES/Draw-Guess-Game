import React from 'react';
import styles from './room.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles({
    root: {
      Width: 400,
      height: 100,
    },
    title: {
      fontSize: 14,
      textAlign: 'left',
    },
    pos: {
    //   marginBottom: 12,
      textAlign: 'right',
    },
    name: {
        textAlign: 'left',
    },
    icon:{
      display: 'inline-flex',
    }
  });


export default function Public({rooms}) {
    // console.log(rooms);
    const classes = useStyles();
    return (
        // <ul>
        //     {rooms.map((room, index) => 
        //     <li key={index}>
        //         <div class={styles.topColumn}>
        //             {room.name}
        //         </div>
        //         <div class={styles.topColumn}>
        //             {room.number}
        //         </div>
        //         <div class={styles.subColumn}>
        //             {room.player}
        //         </div>
        //     </li>)}
        // </ul>
        //改变一下思路：整个card就是一个li，把它们包含进一个ul里面
        <ul>
            {rooms.map((room, index) => 
            <li key={index}>
                <Card className={classes.root}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {room.number}
                    </Typography>
                    <Typography className={classes.name} variant="h5" component="h2">
                        {room.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {/* <GroupIcon className={classes.icon}/> */}
                        <GroupIcon style={{verticalAlign: 'middle'}}/>
                        {room.player}
                    </Typography>
                    </CardContent>
                </Card>
            </li>)}
        </ul>
        
      );
    }