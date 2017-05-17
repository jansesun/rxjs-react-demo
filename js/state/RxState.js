import Rx from 'rxjs/Rx';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
export const createState = function(reducer$, initialState$ = Rx.Observable.of({})) {
  return initialState$
    .merge(reducer$)
    .scan((state, reducer) => {
      return {
        ...reducer(state)
      };
    })
    .shareReplay();
};
export const createActions = actions => {
  const result = {};
  actions.forEach(action => {
    result[action] = new Rx.Subject;
  });
  return result;
};
export const connect = function(selector = state => state) {
  return function(WrappedComponent) {
    return class Connect extends Component {
      static contextTypes = {
        state$: PropTypes.object.isRequired
      };
      componentWillMount() {
        this.subscription = this.context.state$.map(selector).subscribe(::this.setState);
      }
      componentWillUnmount() {
        this.subscription.unsubscribe();
      }
      render() {
        return (
          <WrappedComponent {...this.state} {...this.props} />
        );
      }
    };
  };
};
export class RxStateProvider extends Component {
  static propTypes = {
    state$: PropTypes.object.isRequired
  };
  static childContextTypes = {
    state$: PropTypes.object.isRequired
  };
  getChildContext() {
    return {
      state$: this.props.state$
    };
  }
  render() {
    return this.props.children;
  }
};
