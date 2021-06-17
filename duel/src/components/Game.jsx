import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import Card from './Card';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    
    paper: {
      display: 'grid',
      gridTemplate: 'repeat(4, 1fr) / repeat(12, 1fr)',
      gap: '5px',
      padding: '5px',
      width: '100%',
      height: '100%',
      borderRadius: '10px'
    },
    
   

  }));

const Game = (props) => {

    const classes = useStyles();
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    const aiC = props.aiCards.map((item,ind) => {
        return (
            <Card
            key={ind.toString()}
            show={false}
            style={{gridArea: `1/${ind+1}/2/${ind+2}`}}
        />
        )   
    })

    const plC = props.aiCards.map((item,ind) => {
        return (
            <Card
            key={ind.toString()}
            show={true}
            number={item}
            style={{gridArea: `4/${ind+1}/5/${ind+2}`}}
        />
        )   
    })

    return (
        <Paper elevation={5} className={classes.paper}>
            {aiC}
            <div style={{gridArea: '2/6/4/7'}}>
                Play area
            </div>
            <div style={{gridArea: '2/1/4/6'}}></div>
            <div style={{gridArea: '2/7/4/13'}}></div>
            {plC}
        </Paper>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      aiCards: state.game.aiCards,
      playerCards: state.game.playerCards,
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Game);