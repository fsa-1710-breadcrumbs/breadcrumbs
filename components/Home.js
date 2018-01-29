import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite'
  }
});

export default class Home extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Breadcrumbs</Text>
        {/* <Button
          onPress={() => this.props.navigation.navigate('LoginForm')}
          title="Sign-Up / Login"
        /> */}
      </View>
    );
  }
}
