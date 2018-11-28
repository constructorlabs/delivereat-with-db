import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Splash from '../../src/components/Splash';

const mockChangeStage = jest.fn();

describe('Splash', () => {
  test('matches the snapshot', () => {
    const tree = renderer.create(<Splash changeStage={mockChangeStage} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('click changes state', () => {
    const wrapper = shallow(<Splash changeStage={mockChangeStage} />);
    wrapper.find('.splash').simulate('click');
    expect(mockChangeStage.mock.calls).toEqual([['menu']]);
  });
});
