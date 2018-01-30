import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { login as loginFromReducer } from '../redux/auth';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(value) {
    this.setState({email: value});
  }

  handleChangePassword(value) {
    this.setState({password: value});
  }

  handleSubmit(navigation) {
    const email = this.state.email;
    const password = this.state.password;
    this.props.login({
      email,
      password
    }, navigation);
  }

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
      <Card>
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
          title="SIGN IN"
          onPress={() => this.handleSubmit(this.props.navigation)}
        />
      </Card>
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
  login: (credentials, navigation) => dispatch(loginFromReducer(credentials, navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
