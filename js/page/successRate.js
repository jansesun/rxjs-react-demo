import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { RxStateProvider, createState } from '../state/RxState';
import successRateReducer$ from '../containers/successRate.redux$';
import SuccessRate from '../containers/SuccessRate';
render(
  <RxStateProvider state$={createState(successRateReducer$)}>
    <SuccessRate />
  </RxStateProvider>,
  document.getElementById('root')
);
