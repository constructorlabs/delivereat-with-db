import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Basket from '../../src/components/Basket';

const total = 12;
const stage = 'menu';
const menu = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Single shot, 30ml',
    price: '2.00',
  },
  {
    id: 2,
    name: 'Ristretto',
    description: 'Concentrated espresso, 22ml',
    price: '2.00',
  },
  {
    id: 3,
    name: 'Macchiato',
    description: '60ml espresso + a dab of milk foam',
    price: '2.20',
  },
];
const mockChangeStage = jest.fn();
const order = { id: 10, items: [[1, 5]] };
const mockAddToOrder = jest.fn();
const mockRemoveFromOrder = jest.fn();
const mockGetInput = jest.fn();
const mockCheckout = jest.fn();
const readyToCheckout = false;

describe('Basket', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Basket
        total={total}
        stage={stage}
        menu={menu}
        changeStage={mockChangeStage}
        order={order}
        addToOrder={mockAddToOrder}
        removeFromOrder={mockRemoveFromOrder}
        checkout={mockCheckout}
        getInput={mockGetInput}
        readyToCheckout={readyToCheckout}
      />,
    );
  });
  afterEach(() => {
    wrapper = null;
  });
  test('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Basket
          total={total}
          stage={stage}
          menu={menu}
          changeStage={mockChangeStage}
          order={order}
          addToOrder={mockAddToOrder}
          removeFromOrder={mockRemoveFromOrder}
          checkout={mockCheckout}
          getInput={mockGetInput}
          readyToCheckout={readyToCheckout}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('click changes stage', () => {
    wrapper.find('.basket-details__close').simulate('click');
    expect(mockChangeStage.mock.calls).toEqual([['menu']]);
  });
  test('enter phone number', () => {
    wrapper
      .find('.basket-details__phone-input')
      .simulate('change', { target: { value: '7777777777' } });
    expect(mockGetInput.mock.calls).toEqual([['7777777777']]);
  });
  test('checkout', () => {
    wrapper.find('.basket-checkout').simulate('click');
    expect(mockCheckout).toHaveBeenCalled();
  });
  test('free delivery over £10', () => {
    const deliveryCharge = wrapper.find('.basket-details__delivery-price').text();
    expect(deliveryCharge).toEqual('£0.00');
  });
});
