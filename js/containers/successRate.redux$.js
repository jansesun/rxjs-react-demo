import Rx from 'rxjs/Rx';
import { createActions } from '../state/RxState';

// Actions
export const successRateActions = createActions(['succeed$', 'fail$', 'reset$']);

// Reducers
const initialState = {
  successCount: 0,
  failCount: 0
};
const successRateReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    successRateActions.succeed$.map(()=> state => ({
      ...state,
      successCount: state.successCount + 1
    })),
    successRateActions.fail$.map(() => state => ({
      ...state,
      failCount: state.failCount + 1
    })),
    successRateActions.reset$.map(() => state => initialState)
  );
export default successRateReducer$;
