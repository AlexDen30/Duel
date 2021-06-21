import { red, green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Game from './components/Game';
import Header from './components/Header';
import InfoPanel from './components/InfoPanel';
import style from './App.module.css';

const theme = createMuiTheme({  
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: red[400],
    },
  }
})

const App = () => {

  return (
    <ThemeProvider theme = {theme}>
      <div className={style.grid}>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.game}>
          <Game />
        </div>
        <div className={style.panel}>
          <InfoPanel />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
