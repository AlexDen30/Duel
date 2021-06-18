import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import Card from './Card';
import { useState } from 'react';
import { removeAICard, removePlayerCard, setAiPoints, setPlayerPoints, setRound } from '../redux/game-reducer';
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
    const [allowClick, setAllow] = useState(false);
    const [PlKnownCards, setPlKnownCards] = useState([]);

    //first player in round selection:
    useEffect(() => {

        if (props.round === 0) {
            setShow(false);
            setFLP(null);
            setPlCard(null);
            setAiCard(null);
            setAllow(false);
            setPlKnownCards([...props.playerCards]);
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

    //first move after round starting
    useEffect(() => {
        
        if (firstRoundPl==='ai') 
            setTimeout(() => {
                setAiCard(AI(PlKnownCards, props.aiCards, 'attack', props.round));
                setAllow(true);
            } , 300);
        if (firstRoundPl==='pl')
            setAllow(true);

    }, [firstRoundPl])
    
    //if ai card has been choosen
    useEffect(() => {
        
        if(aiChoosenCard !== null)
            props.removeAiCard(aiChoosenCard);
       
    }, [aiChoosenCard])

    //if pl card has been choosen
    useEffect(() => {
        
        if (firstRoundPl==='pl')
        
            setTimeout(() => {
                setAiCard(AI(PlKnownCards, props.aiCards, 'defense', props.round))
            } , 300);
       
    }, [plChoosenCard])

    //if both of cards have been choosen
    useEffect(() => {
        if (plChoosenCard !== null && aiChoosenCard !== null) {
            setShow(true);
            setTimeout(() => {
                if (firstRoundPl==='pl') {
                    let add = plChoosenCard - aiChoosenCard <= 0 ? 0 : plChoosenCard - aiChoosenCard;
                    props.setAiPoints(props.aiPoints + add);
                } 
                if (firstRoundPl==='ai') {
                    let add = aiChoosenCard - plChoosenCard <= 0 ? 0 : aiChoosenCard - plChoosenCard;
                    props.setPlPoints(props.plPoints + add);
                } 
                const ind = PlKnownCards.findIndex((i) => i === plChoosenCard)
                setPlKnownCards([...PlKnownCards.slice(0,ind), ...PlKnownCards.slice(ind+1)]);
                setShow(false);
                setFLP(null);
                setPlCard(null);
                setAiCard(null);
                props.setRound(props.round+1);
            }, 1500)
        }
       
    }, [plChoosenCard, aiChoosenCard])

    const handlePlChoose = (num) => {
        props.removePlCard(num);
        setPlCard(num);
        setAllow(false);
    }

    ///////Mount of cards array
    
    const aiC = props.aiCards.map((item,ind) => {
        return (
            <div style={{gridArea: `1/${ind+1}/2/${ind+2}`}} key={ind}>
                <Card
                    
                    show={false}
                />
            </div>
            
        )   
    })

    const plC = props.playerCards.map((item,ind) => {
        return (
            <div 
                onDoubleClick={allowClick ? () => handlePlChoose(item) : ()=>{}} 
                key={ind}  
                style={{gridArea: `4/${ind+1}/5/${ind+2}`}}
            >
                <Card
                    show={true}
                    number={item}
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