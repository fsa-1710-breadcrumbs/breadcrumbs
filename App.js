import React from 'react';
import { StackNavigator } from 'react-navigation';

import home from './components/home';

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


