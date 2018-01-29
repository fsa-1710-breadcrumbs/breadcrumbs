import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Button } from 'react-native';

import Home from './components/Home';
import LoginForm from './components/LoginForm';

const RootNavigator = StackNavigator({
    Main: {
        screen: Home,
        navigationOptions: {
          headerTitle: 'Breadcrumbs',
        }
    },
    LoginForm: {
      screen: LoginForm,
      navigationOptions: {
        headerTitle: 'Sign-Up / Login'
      }
    }
});

export default class App extends React.Component {
  render () {
    return (
      <View>
        <RootNavigator />
      </View>
    );
  }
}
