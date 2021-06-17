import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { resetGame, setPlayerPoints, setRound, startGame } from '../redux/game-reducer';
import Alert from './Alert';

const useStyles = makeStyles((theme) => ({
    
    paper: {
      fontFamily: 'cursive',
      fontSize: 20,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.primary,
      whiteSpace: 'wrap',
      marginBottom: theme.spacing(1),
    },
    
    button: {
        width:'100%',
        fontFamily: 'cursive',
        fontSize: 20,
    },

  }));


const InfoPanel = (props) => {

    const classes = useStyles();

    const handleStartGame = () => {
        props.start();
    }

    const handleConcide = () => {
        props.alertConcide();
        setTimeout(props.resetGame, 0);
    }

    return (
        <div>
        <Grid container direction="column" justify="space-around" spacing={3} padding="40px">
            <Grid item >
            <Paper className={classes.paper}>Round:{props.round}</Paper>
            </Grid>
            <Grid item >
            <Paper className={classes.paper}>Enemy points:{props.aiPoints}</Paper>
            </Grid>
            <Grid item >
            <Paper className={classes.paper}>Your points:{props.plPoints}</Paper>
            </Grid>
            <Grid item >
                <Button 
                    variant="contained" 
                    color='primary' 
                    size="large" 
                    className={classes.button} 
                    onClick={handleStartGame}
                    disabled={props.round > 0 ? true : false}
                >
                    {props.round > 0 ? 'Already started' : 'Start'} 
                </Button>
            </Grid>
            <Grid item >
                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large" 
                    className={classes.button}
                    onClick={handleConcide}
                    disabled={props.round > 0 ? false : true}
                >
                    Concide
                </Button>
            </Grid>
            
        </Grid>
        <Alert 
            round={props.round} 
            firstPlayer={props.firstPlayer} 
            aiPoints={props.aiPoints}
            plPoints={props.plPoints}
        />
    </div>
    );
}

const mapStateToProps = (state) => {

    return {
        round: state.game.currentRound,
        aiPoints: state.game.aiPoints,
        plPoints: state.game.playerPoints,
        firstPlayer: state.game.firstPlayer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        start: () => {
            dispatch(startGame());
        },
        alertConcide: () => {
            dispatch(setRound(13));
            dispatch(setPlayerPoints(999));
        },
        resetGame: () => {
            dispatch(resetGame())
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);
