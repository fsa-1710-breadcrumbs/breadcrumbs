import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { logout } from '../redux/auth';

class Profile extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title="Leaving so soon?!">
          <View
            style={{
              backgroundColor: '#bcbec1',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: 'center',
              marginBottom: 20
            }}
          >
            <Text style={{ color: 'white', fontSize: 28 }}>{this.props.currentUser.name && this.props.currentUser.name.split(' ')[0]}</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() => this.props.logout(this.props.navigation)}
          />
          <Button
            backgroundColor="#03A9F4"
            title="Start Trail"
            onPress={() => this.props.navigation.navigate('Create')}
          />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = storeState => {
  return {
    users: storeState.users,
    currentUser: storeState.currentUser,
    trails: storeState.trails
  };
};
const mapDispatchToProps = (dispatch) => ({
  logout: (navigation) => dispatch(logout(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
