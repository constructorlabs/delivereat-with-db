import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BasketItem from '../../src/components/BasketItem';

const basketItem = [1, 2];
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

const mockAddToOrder = jest.fn();
const mockRemoveFromOrder = jest.fn();

describe('Basket Item', () => {
  test('matches the snapshot', () => {
    const tree = renderer
      .create(
        <BasketItem
          menu={menu}
          basketItem={basketItem}
          addToOrder={mockAddToOrder}
          removeFromOrder={mockRemoveFromOrder}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('click removes item', () => {
    const wrapper = shallow(
      <BasketItem
        menu={menu}
        basketItem={basketItem}
        addToOrder={mockAddToOrder}
        removeFromOrder={mockRemoveFromOrder}
      />,
    );
    wrapper.find('.basket-item__remove-button').simulate('click');
    expect(mockRemoveFromOrder.mock.calls).toEqual([[1]]);
  });
  test('click adds item', () => {
    const wrapper = shallow(
      <BasketItem
        menu={menu}
        basketItem={basketItem}
        addToOrder={mockAddToOrder}
        removeFromOrder={mockRemoveFromOrder}
      />,
    );
    wrapper.find('.basket-item__add-button').simulate('click');
    expect(mockAddToOrder.mock.calls).toEqual([[1]]);
  });
});
