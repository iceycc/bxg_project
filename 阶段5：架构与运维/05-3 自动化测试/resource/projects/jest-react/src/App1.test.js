import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

it('render without crashing', () => {
  const wrapper = shallow(<App />)
  const result = 'Learn React'
  expect(wrapper.contains(result)).toEqual(true)
});