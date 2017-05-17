import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { RxStateProvider, createState, combineReducers } from '../state/RxState';
import successRateReducer$ from '../containers/successRate.redux$';
import SuccessRate from '../containers/SuccessRate';
const rootReducer$ = combineReducers({
  successRate: successRateReducer$
});
render(
  <RxStateProvider state$={createState(rootReducer$)}>
    <SuccessRate />
  </RxStateProvider>,
  document.getElementById('root')
);
