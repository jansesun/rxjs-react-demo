import expect from 'expect';
import successRateReducer$, { successRateActions } from '../../containers/successRate.redux$';
describe('successRate.redux$', () => {
  it('handles succeed, fail and reset actions', () => {
    successRateReducer$.take(5).toArray().subscribe((fns) => {
      expect(fns.reduce((acc, fn) => fn(acc), {})).toEqual({
        successCount: 1,
        failCount: 1
      });
    });
    successRateActions.succeed$.next();
    successRateActions.reset$.next();
    successRateActions.succeed$.next();
    successRateActions.fail$.next();
  });
});