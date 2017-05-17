import expect from 'expect';
import Rx from 'rxjs/Rx';
import { combineReducers, createActions } from '../../state/RxState';
import successRateReducer$, { successRateActions } from '../../containers/successRate.redux$';
const counterActions = createActions(['increment$', 'decrement$', 'reset$']);
const initialState = 0;
const CounterReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    counterActions.increment$.map(payload => state => state + payload),
    counterActions.decrement$.map(payload => state => state - payload),
    counterActions.reset$.map(payload => state => initialState)
  );
describe('RxState', () => {
  describe('combineReducers', () => {
    it('should combine reducers as expected', () => {
      combineReducers({
        counter: CounterReducer$,
        successRate: successRateReducer$
      }).take(7).toArray().subscribe((fns) => {
        const combineFunc = function(...args) {
          return fns.reduce((curVal, [scope, reducer]) => ({
            ...curVal,
            [scope]: reducer(curVal[scope])
          }), ...args);
        };
        expect(combineFunc({})).toEqual({
          counter: 9,
          successRate: {
            successCount: 2,
            failCount: 1
          }
        });
      });
      counterActions.increment$.next(10);
      counterActions.decrement$.next(1);
      successRateActions.succeed$.next();
      successRateActions.succeed$.next();
      successRateActions.fail$.next();
    });
  });
});
