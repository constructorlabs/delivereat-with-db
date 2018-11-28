import React from 'react';
import renderer from 'react-test-renderer';
import Menu from '../../src/components/Menu';

const stage = 'basket';
const order = { id: 10, items: [[1, 1], [2, 3]] };
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

describe('Menu', () => {
  test('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Menu
          stage={stage}
          order={order}
          menu={menu}
          addToOrder={mockAddToOrder}
          removeFromOrder={mockRemoveFromOrder}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
