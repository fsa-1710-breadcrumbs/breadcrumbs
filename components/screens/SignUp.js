import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { signup } from '../redux/auth';

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
        <Text style={{ paddingLeft: 130, fontSize: 20 }}>{this.props.navigation.state.params && this.props.navigation.state.params.error}</Text>
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
