import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    
    paper: {
      display: 'grid',
      gridTemplate: '2fr 2fr 2fr/2fr 2fr 2fr',
      width: '100%',
      height: '100%',
      borderRadius: '10px',
    },

    num: {
        gridArea: '2/2/3/3',
        fontFamily: 'cursive',
        fontSize: 25,
        textAlign: 'center'
    }
    
  }));

const Card = (props) => {

    const classes = useStyles();

    return (
        <Paper elevation={7} className={classes.paper}>
            <div className={classes.num}>{props.show === true ? props.number : '?'}</div>
        </Paper>
    );
}


export default Card;