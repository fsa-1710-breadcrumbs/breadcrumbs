import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';

const RootNavigator = StackNavigator({
    Main: {
        screen: Home,
        navigationOptions: {
          headerTitle: 'Breadcrumbs',
        }
    }
});

export default class App extends React.Component {
  render () {
    return (
      <RootNavigator />
    );
  }
}
