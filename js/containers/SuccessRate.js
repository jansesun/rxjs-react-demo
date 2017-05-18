import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from '../state/RxState';
import { successRateActions } from './successRate.redux$';

export const SuccessRate = props => {
  const { successCount, failCount, fail, succeed, reset } = props;
  const tryCount = successCount + failCount;
  const successRate = tryCount === 0 ? 0 : Math.round(successCount * 1000 / tryCount) / 10;
  return (
    <div>
      <h1>Pot Success: <span className="text-info">{successRate}%</span></h1>
      <hr />
      <button className="btn-success" onClick={() => succeed()}>Succeed</button>
      <button className="btn-danger" onClick={() => fail()}>Fail</button>
      <button className="btn-info" onClick={() => reset()}>Reset</button>
    </div>
  );
};
SuccessRate.propTypes = {
  successCount: PropTypes.number.isRequired,
  failCount: PropTypes.number.isRequired,
  succeed: PropTypes.func.isRequired,
  fail: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};
export default connect(state => ({
  ...state,
  succeed() {
    successRateActions.succeed$.next();
  },
  fail() {
    successRateActions.fail$.next();
  },
  reset() {
    successRateActions.reset$.next();
  }
}))(SuccessRate);
