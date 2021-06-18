import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ic from '../Pics/logo.png';
import Dialog from '@material-ui/core/Dialog';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
   
    tool: {
        display: 'grid',
        gridTemplate: '1fr / 47% 2% 5% 39% 5% 2%',
        gap: '5px'
    },

    title: {
        fontFamily: 'cursive',
        fontSize: 20,
    },

    img: {
        width:'30px', 
        height: '30px',
    },

    button: {
        fontFamily: 'cursive',
        fontSize: 17,
    },

    dialog: {
        display: 'grid',
        gridTemplate: '9fr 1fr /1fr 1fr 2fr 1fr 1fr',
        fontFamily: 'cursive',
        fontSize: 20,
    },
    
    buttonDialog: {
        gridArea: '2/1/3/6',
        fontFamily: 'cursive',
        fontSize: 15,
    },

    text: {
        gridArea: '1/2/2/5'
    },

  }));

const Header = (props) => {

   
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleHelp = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const text = 
        <div className={classes.textInside}>
            <h3>Что нужно знать:</h3>
            <ul>
                <li>Для начала игры нажмите "Start"</li>
                <li>Для того чтобы сдаться нажмите "Concide"</li>
                <li>Первый ход выбирается случайным образом</li>
                <li>Игроки ходят по очереди, то атакуя, то защищаясь</li>
                <li>Проиграет тот, у кого больше штрафных очков</li>
                <li>Атакуя, вы наносите урон равный разнице вашей выбранной карты и карты противника</li>
                <li>Защищаясь, вы "гасите" урон противника своей картой</li>
                <li>Если ваша защита превышает атаку противника, то вы не восстановите очки</li>
                <li>Вы можете выбрать карту двойным кликом по ней</li>
                
            </ul>
        </div>
          

    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.tool}>
              
              <div style={{gridColumn: '2/3'}}>
                <img src={ic} className={classes.img} />
              </div>
              <div style={{gridColumn: '3/4'}}>
                <Typography  className={classes.title}>
                    Duel
                </Typography>
              </div>
              <div style={{gridColumn: '5/6'}}>
                <Button 
                    variant="outlined" 
                    color="inherit" 
                    className={classes.button}
                    onClick={handleHelp}
                >
                    Help
                </Button>
              </div>
            
          </Toolbar>
        </AppBar>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <div className={classes.dialog}>
                <div className={classes.text}>
                    {text}
                </div>
                <Button onClick={handleClose} color={text==='Lose!' ? 'secondary' : 'primary'}  className={classes.buttonDialog}>
                    OK
                </Button>
            </div>
        </Dialog>
      </div>
        
      
    );
  
}

export default Header;