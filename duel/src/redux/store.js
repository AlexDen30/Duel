import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {compose} from 'redux';
import { gameReducer } from './game-reducer';




let reducers = combineReducers({
    game: gameReducer,
});

export let store = createStore(reducers)//, for extension in chrome (throw an error if it is not installed)
    //compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ));




