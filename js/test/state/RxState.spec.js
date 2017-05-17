import expect from 'expect';
import Rx from 'rxjs/Rx';
import { combineReducers, createActions, createState } from '../../state/RxState';
import successRateReducer$, { successRateActions } from '../../containers/successRate.redux$';

describe('RxState', () => {
  describe('combineReducers', () => {
    it('should combine reducers as expected', () => {
      const counterActions = createActions(['increment$', 'decrement$', 'reset$']);
      const initialState = 0;
      const CounterReducer$ = Rx.Observable.of(() => initialState)
        .merge(
          counterActions.increment$.map(payload => state => state + payload),
          counterActions.decrement$.map(payload => state => state - payload),
          counterActions.reset$.map(payload => state => initialState)
        );
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
  describe('createState', () => {
    it('should create reactive state without initialState$', () => {
      const add$ = new Rx.Subject();
      const CounterReducer$ = Rx.Observable.of(state => ({ counter: 10 }))
        .merge(
          add$.map(payload => state => ({
            ...state,
            counter: state.counter + payload
          }))
        );
      const state$ = createState(CounterReducer$);
      state$.toArray().subscribe(results => {
        expect(results).toEqual([{}, { counter: 10 }, { counter: 12 }]);
      });
      add$.next(2);
      add$.complete();
    });
    it('should create reactive state using no-scoped reducers', () => {
      const add$ = new Rx.Subject();
      const CounterReducer$ = add$.map(payload => state => ({
        ...state,
        counter: state.counter + payload
      }));
      const state$ = createState(CounterReducer$, Rx.Observable.of({ counter: 10 }));
      state$.toArray().subscribe(results => {
        expect(results).toEqual([{ counter: 10 }, { counter: 12 }]);
      });
      add$.next(2);
      add$.complete();
    });
    it('should create reactive state using scoped reducers', () => {
      const add$ = new Rx.Subject();
      const CounterReducer$ = add$.map(payload => state => state + payload);
      const rootReducer$ = combineReducers({
        counter: CounterReducer$
      });
      const state$ = createState(rootReducer$, Rx.Observable.of({ counter: 10 }));
      state$.toArray().subscribe(results => {
        expect(results).toEqual([{ counter: 10 }, { counter: 12 }]);
      });
      add$.next(2);
      add$.complete();
    });
  });
});
