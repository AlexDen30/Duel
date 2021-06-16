import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ic from '../Pics/logo.png';

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
    }
  }));

const Header = (props) => {

   
    const classes = useStyles();

    return (
      
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
                <Button variant="outlined" color="inherit" className={classes.button}>Help</Button>
              </div>
            
          </Toolbar>
        </AppBar>
      
    );
  
}

export default Header;