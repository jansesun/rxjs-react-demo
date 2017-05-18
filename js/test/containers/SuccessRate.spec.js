import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { SuccessRate } from '../../containers/SuccessRate';

describe('SuccessRate', () => {
  it('should correctly display successRate', () => {
    const tree = shallow(
      <SuccessRate
        successCount={0}
        failCount={0}
        fail={expect.createSpy()}
        succeed={expect.createSpy()}
        reset={expect.createSpy()}
      />
    );
    expect(tree.find('.text-info').text()).toBe('0%');
  });
  it('should call passed actions', () => {
    const fail = expect.createSpy();
    const succeed = expect.createSpy();
    const reset = expect.createSpy();
    const tree = shallow(
      <SuccessRate
        successCount={0}
        failCount={0}
        fail={fail}
        succeed={succeed}
        reset={reset}
      />
    );
    tree.find('.btn-success').simulate('click');
    expect(succeed).toHaveBeenCalled();
    tree.find('.btn-danger').simulate('click');
    expect(fail).toHaveBeenCalled();
    tree.find('.btn-info').simulate('click');
    expect(reset).toHaveBeenCalled();
  });
});