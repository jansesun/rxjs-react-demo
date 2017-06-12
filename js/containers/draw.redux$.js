import Rx from 'rxjs/Rx';
import { createActions, combineReducers } from 'redux-react-rxjs';
import util from '../lib/util';
// Actions
export const playerActions = createActions(['updateField$', 'reset$']);
export const indexActions = createActions(['add$', 'draw$', 'remove$']);
const TIMESTAMP = util.formatDate(Date.now(), 'yyyyMMdd');
// Reducers
const playerInitialState = {
  name: '',
  gender: 1,
  seedIndex: ''
};
const playerReducer$ = Rx.Observable.of(() => playerInitialState)
  .merge(
    playerActions.updateField$.map((action) => state => ({
        ...state,
        [action.field]: action.value
    })),
    playerActions.reset$.map(() => state => playerInitialState)
  );
const initialState = {
  playerList: JSON.parse(localStorage.getItem(`playerList_${TIMESTAMP}`)) || [],
  drawResult: JSON.parse(localStorage.getItem(`drawResult_${TIMESTAMP}`)) || []
};
const indexReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    indexActions.add$.map((player) => state => {
      const playerList = [...state.playerList, player];
      localStorage.setItem(`playerList_${TIMESTAMP}`, JSON.stringify(playerList));
      return {
        ...state,
        playerList: playerList
      };
    }),
    indexActions.remove$.map(index => state => {
      const playerList = [...state.playerList.slice(0, index), ...state.playerList.slice(index + 1)];
      localStorage.setItem(`playerList_${TIMESTAMP}`, JSON.stringify(playerList));
      return {
        ...state,
        playerList: playerList
      };
    }),
    indexActions.draw$.map((drawResult) => state => {
      localStorage.setItem(`drawResult_${TIMESTAMP}`, JSON.stringify(drawResult));
      return {
        ...state,
        drawResult: drawResult
      };
    })
  );
export default combineReducers({
  player: playerReducer$,
  data: indexReducer$
});
