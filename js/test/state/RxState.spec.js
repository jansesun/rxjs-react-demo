import expect from 'expect';
import Rx from 'rxjs/Rx';
import React from 'react';
import { mount } from 'enzyme';
import { combineReducers, createActions, createState, RxStateProvider, connect } from '../../state/RxState';
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
  describe('connect', () => {
    it('should map state to props in RxStateProvider context', () => {
      const add$ = new Rx.Subject();
      const CounterReducer$ = add$.map(payload => state => ({
        ...state,
        counter: state.counter + payload
      }));
      const state$ = createState(CounterReducer$, Rx.Observable.of({ counter: 10 }));
      const Counter = ({ counter, add }) => (
        <div>
          <h1>{counter}</h1>
          <button onClick={add}>add</button>
        </div>
      );
      const ConnectedCounter = connect(state => ({
        ...state,
        add: () => add$.next(1)
      }))(Counter);
      const tree = mount(
        <RxStateProvider state$={state$}>
          <ConnectedCounter />
        </RxStateProvider>
      );
      expect(tree.find('h1').text()).toBe('10');
      tree.find('button').simulate('click');
      expect(tree.find('h1').text()).toBe('11');
    });
  });
});
