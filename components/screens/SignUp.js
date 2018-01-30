import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { signup } from '../redux/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text1: {
    fontSize: 20,
    marginTop:  50,
    color: 'purple'
  }
});

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(value) {
    this.setState({name: value});
  }

  handleChangeEmail(value) {
    this.setState({email: value});
  }

  handleChangePassword(value) {
    this.setState({password: value});
  }

  handleSubmit(navigation) {
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    this.props.signup({
      name,
      email,
      password
    }, navigation);
  }

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Image
            source={require('../../assets/breadcrumbs.png')}
          />
          <FormLabel>Name</FormLabel>
          <FormInput
            placeholder="Name..."
            onChangeText={(name) => this.handleChangeName(name)}
            value={this.state.name}
          />
          <FormLabel>Email</FormLabel>
          <FormInput
            autoCapitalize = "none"
            placeholder="Email address..."
            onChangeText={(email) => this.handleChangeEmail(email)}
            value={this.state.email}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            autoCapitalize = "none"
            secureTextEntry placeholder="Password..."
            onChangeText={(password) => this.handleChangePassword(password)}
            value={this.state.password}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={() => this.handleSubmit(this.props.navigation)}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: '#bcbec1' }}
            title="Sign In"
            onPress={() => this.props.navigation.navigate('SignIn')}
          />
        </Card>
        <View style={styles.container}>
          <Text style={styles.text1}>{this.props.navigation.state.params && this.props.navigation.state.params.error}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = storeState => {
  return {
    users: storeState.users,
    currentUser: storeState.currentUser
  };
};
const mapDispatchToProps = (dispatch) => ({
  signup: (credentials, navigation) => dispatch(signup(credentials, navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
