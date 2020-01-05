import test from 'ava';
import React from 'react';
import render from 'react-test-renderer';
import HelloWorld from '../src/index';

test('HelloWorld component', t => {
  const tree = render.create(<HelloWorld />).toJSON();
  t.snapshot(tree);
});