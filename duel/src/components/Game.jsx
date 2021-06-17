import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import Card from './Card';
import { useState } from 'react';
import { removeAICard, removePlayerCard, resetRound, setAiPoints, setPlayerPoints, setRound } from '../redux/game-reducer';
import { useEffect } from 'react';
import AI from './AI';

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
    
    const [firstRoundPl, setFLP] = useState(null);
    const [plChoosenCard, setPlCard] = useState(null);
    const [aiChoosenCard, setAiCard] = useState(null);
    const [show, setShow] = useState(false);

    //first player in round:
    useEffect(() => {

        if (props.round === 0) {
            setShow(false);
            setFLP(null);
            setPlCard(null);
            setAiCard(null);
        }

        if (props.round > 0 && props.round < 13) {

            let roundStarter;
            if(props.gameStarter === 'ai') {
                roundStarter = props.round % 2 === 1 ? 'ai' : 'pl';
            }
            if(props.gameStarter === 'player') {
                roundStarter = props.round % 2 === 1 ? 'pl' : 'ai';
            }

            setFLP(roundStarter);
        }
        
    }, [props.round])

    //if ai first call choose of ai card
    useEffect(() => {
        
        if (firstRoundPl==='ai')
        setTimeout(() => setAiCard(AI(props.playerCards, props.aiCards, 'attack')), 300);

    }, [firstRoundPl])
    
    //if ai card has been choosen
    useEffect(() => {
        
        setTimeout(() => removeAICard(aiChoosenCard), 300);
       
    }, [aiChoosenCard])

    //if pl card has been choosen
    useEffect(() => {
        debugger;
        if (firstRoundPl==='pl')
        setTimeout(() => setAiCard(AI(props.playerCards, props.aiCards, 'defense')), 300);
       
    }, [plChoosenCard])

    //if both of cards have been choosen
    useEffect(() => {
        
        if (plChoosenCard && aiChoosenCard) {
            setShow(true);
            setTimeout(() => {
                if (firstRoundPl==='pl') {
                    let add = plChoosenCard - aiChoosenCard <= 0 ? 0 : plChoosenCard - aiChoosenCard;
                    props.setAiPoints(props.aiPoints + add);
                } 
                if (firstRoundPl==='ai') {
                    let add = aiChoosenCard - plChoosenCard <= 0 ? 0 : aiChoosenCard - plChoosenCard;
                    props.setPlPoints(props.aiPoints + add);
                } 
                setShow(false);
                setFLP(null);
                setPlCard(null);
                setAiCard(null);
            }, 500)
        }
       
    }, [plChoosenCard, aiChoosenCard])

    const handlePlChoose = (num) => {
        props.removePlCard(num);
        setPlCard(num);
    }

    ///////Mount of cards array
    
    const aiC = props.aiCards.map((item,ind) => {
        return (
            <Card
            key={ind}
            show={false}
            style={{gridArea: `1/${ind+1}/2/${ind+2}`}}
        />
        )   
    })

    const plC = props.playerCards.map((item,ind) => {
        return (
            <div onDoubleClick={() => handlePlChoose(item)} key={ind}>
                <Card
                    show={true}
                    number={item}
                    style={{gridArea: `4/${ind+1}/5/${ind+2}`}}
                />
            </div>
        )   
    })

    /////
    return (
        <Paper elevation={5} className={classes.paper}  >
            {aiC}
            <div style={{gridArea: '2/6/3/7'}}>
                {
                    aiChoosenCard !== null
                    ? 
                        <Card
                            show={show}
                            number={aiChoosenCard}
                        />
                    : 
                        ''
                }
                
            </div>
            <div style={{gridArea: '3/6/4/7'}}>
                {
                    plChoosenCard !== null
                    ? 
                        <Card
                            show={show}
                            number={plChoosenCard}
                        />
                    : 
                        ''
                }
            </div>
            <div style={{gridArea: '2/1/4/6'}}></div>
            <div style={{gridArea: '2/7/4/13'}}></div>
            {plC}
        </Paper>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        removePlCard: (num) => {
            dispatch(removePlayerCard(num));
        },
        removeAiCard: (num) => {
            dispatch(removeAICard(num));
        },
        setRound: (round) => {
            dispatch(setRound(round));
        },
        setAiPoints: (points) => {
            dispatch(setAiPoints(points));
        },
        setPlPoints: (points) => {
            dispatch(setPlayerPoints(points));
        },
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      aiCards: state.game.aiCards,
      playerCards: state.game.playerCards,
      round: state.game.currentRound,
      gameStarter: state.game.firstPlayer,
      aiPoints: state.game.aiPoints,
      plPoints: state.game.playerPoints
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Game);