import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import MenuItem from '../../src/components/MenuItem';

const stage = 'basket';
const order = { id: 10, items: [[1, 1], [2, 3]] };
const itemToAdd = { id: 1, name: 'Espresso', description: 'Single shot, 30ml', price: '2.00' };
const itemToRemove = {
  id: 3,
  name: 'Macchiato',
  description: '60ml espresso + a dab of milk foam',
  price: '2.20',
};
const mockAddToOrder = jest.fn();
const mockRemoveFromOrder = jest.fn();

describe('Menu Item', () => {
  test('matches the snapshot', () => {
    const tree = renderer
      .create(
        <MenuItem
          stage={stage}
          order={order}
          addToOrder={mockAddToOrder}
          removeFromOrder={mockRemoveFromOrder}
          menuItem={itemToAdd}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('click adds item', () => {
    const wrapper = shallow(
      <MenuItem
        stage={stage}
        order={order}
        addToOrder={mockAddToOrder}
        removeFromOrder={mockRemoveFromOrder}
        menuItem={itemToAdd}
      />,
    );
    wrapper.find('.menu-item__add-button').simulate('click');
    expect(mockAddToOrder.mock.calls).toEqual([[1]]);
  });
  test('click removes item', () => {
    const wrapper = shallow(
      <MenuItem
        stage={stage}
        order={order}
        addToOrder={mockAddToOrder}
        removeFromOrder={mockRemoveFromOrder}
        menuItem={itemToRemove}
      />,
    );
    wrapper.find('.menu-item__remove-button').simulate('click');
    expect(mockRemoveFromOrder.mock.calls).toEqual([[3]]);
  });
});
