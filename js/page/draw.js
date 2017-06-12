import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { RxStateProvider, createState } from 'redux-react-rxjs';
import drawReducer$ from '../containers/draw.redux$';
import Draw from '../containers/Draw';
render(
  <RxStateProvider state$={createState(drawReducer$)}>
    <Draw />
  </RxStateProvider>,
  document.getElementById('root')
);