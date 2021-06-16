import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    
    paper: {
      width: '100%',
      height: '100%',
      borderRadius: '10px'
    },
    
   

  }));

const Game = (props) => {

    const classes = useStyles();

    return (
        <Paper elevation={5} className={classes.paper}>
                
                
        </Paper>
    );
}

export default Game;