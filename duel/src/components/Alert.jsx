import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useState } from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    dialog: {
        display: 'grid',
        gridTemplate: '1fr 2fr 1fr /1fr 1fr 2fr 1fr 1fr',
        fontFamily: 'cursive',
        fontSize: 20,
    },
    
    button: {
        gridArea: '3/1/4/6',
        fontFamily: 'cursive',
        fontSize: 15,
    },

    text: {
        gridArea: '2/2/3/5'
    }

  }));

const Alert = (props) => {

  const classes = useStyles();

  const [open, setOpen] = useState(false); 
  const [text, setText] = useState('');

  useEffect(() => {
    switch (props.round) {
      case 1:
        if (props.firstPlayer === 'player') setText('Your turn is first!');
        if (props.firstPlayer === 'ai') setText('AI is making his first turn...');
        break;
      case 13:
        if (props.plPoints - props.aiPoints > 0) setText(`Lose! Player:${props.plPoints} AI:${props.aiPoints}`); 
        if (props.plPoints - props.aiPoints < 0) setText(`Win! Player:${props.plPoints} AI:${props.aiPoints}`); 
        if (props.plPoints - props.aiPoints === 0) setText(`Drow! Player:${props.plPoints} AI:${props.aiPoints}`); 
        props.resetGame();
        break;
      case -1:
        setText(`Lose! You have been concede.`); 
        props.resetGame();
        break;
      default:
        break;
    }
  }, [props.round])

  useEffect(() => {
    if (text !== '') setOpen(true);
  }, [text])

  const handleClose = () => {
    setOpen(false);
    setText('');
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <div className={classes.dialog}>
            <div className={classes.text}>
                {text}
            </div>
            <Button onClick={handleClose} color={text==='Lose!' ? 'secondary' : 'primary'}  className={classes.button}>
                OK
            </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default Alert;