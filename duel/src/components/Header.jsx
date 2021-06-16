import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ic from '../Pics/logo.png';

const useStyles = makeStyles((theme) => ({
    // root: {
    //   flexGrow: 0,
    // },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    // title: {
    //   flexGrow: 1,
    // },
    tool: {
        display: 'grid',
        gridTemplate: '1fr / 47% 2% 5% 39% 5% 2%',
        gap: '2px'
    }
  }));

const Header = (props) => {

   
    const classes = useStyles();

    return (
      
        <AppBar position="static">
          <Toolbar className={classes.tool}>
              
              <div style={{gridColumn: '2/3'}}>
                <img src={ic} style={{width:'30px', height: '30px'}}/>
              </div>
              <div style={{gridColumn: '3/4'}}>
                <Typography variant="h6" className={classes.title}>
                    News
                </Typography>
              </div>
              <div style={{gridColumn: '5/6'}}>
                <Button color="inherit">Login</Button>
              </div>
            
          </Toolbar>
        </AppBar>
      
    );
    // return (      
    // <AppBar >
    //     <Toolbar>
            
    //     <img src={ic} className={style.im}/>
    //         <div className={style.text}>
    //             <Typography variant="h6" >
    //                 Duel
    //             </Typography>
    //         </div>
    //         <div className={style.help}>
    //             <Button color="inherit" variant="h6">Help</Button> 
    //         </div>
            
    //     </Toolbar>
    // </AppBar>

    // );
}

export default Header;