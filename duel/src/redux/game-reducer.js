

const SET_AI_POINTS = 'SET_AI_POINTS'
const SET_PLAYER_POINTS = 'SET_PLAYER_POINTS';
const REMOVE_AI_CARD = 'REMOVE_AI_CARD';
const REMOVE_PLAYER_CARD = 'REMOVE_PLAYER_CARD';
const SET_ROUND = 'SET_ROUND';
const RESET_GAME = 'RESET_GAME';
const START_GAME = 'START_GAME';

let initialState = {
    aiCards: [0,1,2,3,4,5,6,7,8,9,10,11],
    playerCards: [0,1,2,3,4,5,6,7,8,9,10,11],
    currentRound: 0,
    playerPoints: 0,
    aiPoints: 0,
    firstPlayer: null
}

export const setRound = (round) => {
    return {
        type: SET_ROUND,
        round,
    }
}

export const startGame = () => {

    let fp = Math.round(Math.random()) === 1 ? 'player' : 'ai'; 

    return {
        type: START_GAME,
        round: 1,
        firstPlayer: fp
    }
}

export const setAiPoints = (points) => {
    return {
        type: SET_AI_POINTS,
        points,
    }
}

export const setPlayerPoints = (points) => {
    return {
        type: SET_PLAYER_POINTS,
        points,
    }
}

export const removeAICard = (cardNumber) => {
    return {
        type: REMOVE_AI_CARD,
        cardNumber,
    }
}

export const removePlayerCard = (cardNumber) => {
    return {
        type: REMOVE_PLAYER_CARD,
        cardNumber,
    }
}

export const resetGame = () => {
    return {
        type: RESET_GAME
    }
}

export const gameReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_AI_POINTS:
            return {
                ...state,
                aiPoints: action.points
            }

        case SET_PLAYER_POINTS:
            return {
                ...state,
                playerPoints: action.points
            }

        case SET_ROUND:
            return {
                ...state,
                currentRound: action.round
            }

        case REMOVE_AI_CARD:
            const delAiInd = state.aiCards.findIndex(i => i === action.cardNumber);
            return {
                ...state,
                aiCards: delAiInd === 0 
                ? [...state.aiCards.slice(1)] 
                : [...state.aiCards.slice(0, delAiInd), ...state.aiCards.slice(delAiInd + 1)]
            }

        case REMOVE_PLAYER_CARD:
            const delPlInd = state.playerCards.findIndex(i => i === action.cardNumber);
            return {
                ...state,
                playerCards: delPlInd === 0 
                ? [...state.playerCards.slice(1)] 
                : [...state.playerCards.slice(0, delPlInd), ...state.playerCards.slice(delPlInd + 1)]
            }

        case RESET_GAME:

            return {
                ...initialState
            }

        case START_GAME:

            return {
                ...state,
                currentRound: action.round,
                firstPlayer: action.firstPlayer
            }

        default:
            return state;
    }
}

