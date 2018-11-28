import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Checkout from '../../src/components/Checkout';

const orderId = 10;
const mockChangeStage = jest.fn();

describe('Checkout', () => {
  test('matches the snapshot', () => {
    const tree = renderer
      .create(<Checkout orderId={orderId} changeStage={mockChangeStage} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('click changes stage', () => {
    const wrapper = shallow(<Checkout orderId={orderId} changeStage={mockChangeStage} />);
    wrapper.find('.checkout').simulate('click');
    expect(mockChangeStage.mock.calls).toEqual([['menu']]);
  });
});
