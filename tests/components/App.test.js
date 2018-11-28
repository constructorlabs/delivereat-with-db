import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/App';

global.fetch = require('jest-fetch-mock');

const order = { items: [[1, 1], [2, 3]] };
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

describe('App', () => {
  test('change stage', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.changeStage('menu');
    const stageState = wrapper.state('stage');
    expect(stageState).toEqual('menu');
  });
  test('calculate total', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.setState({ menu });
    expect(instance.calculateTotal(order.items)).toEqual(8);
  });
  test('add to order', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.setState({ menu });
    instance.setState({ order });
    instance.addToOrder(1);
    expect(instance.state.order.items).toEqual([[1, 2], [2, 3]]);
  });
  test('remove from order', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.setState({ menu });
    instance.setState({ order });
    instance.removeFromOrder(2);
    expect(instance.state.order.items).toEqual([[1, 1], [2, 2]]);
  });
});
