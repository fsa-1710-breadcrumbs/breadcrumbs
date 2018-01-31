import 'react-native';
import React from 'react';
import DropOrbs from '../DropOrbs';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<DropOrbs />).toJSON();
  expect(tree).toMatchSnapshot();
});
