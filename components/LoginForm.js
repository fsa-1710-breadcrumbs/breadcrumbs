import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { isLoggedIn, addUser } from '../store';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite'
  }
});

export default class LoginForm extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>LOGIN FORM</Text>
      </View>
    );
  }
}
