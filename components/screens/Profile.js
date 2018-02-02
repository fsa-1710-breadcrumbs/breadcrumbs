import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
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
        <Card
          title="Leaving so soon?!"
          image={this.props.currentUser.photoUrl && this.props.currentUser.photoUrl[0] !== '.'
            ? { uri: this.props.currentUser.photoUrl}
            : require('../../assets/defaultPanda.jpg')}
        >
          <View
            style={{
              backgroundColor: '#bcbec1',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: 40,
              alignSelf: 'center',
              marginBottom: 20
            }}
          >
            <Text style={{ color: 'white', fontSize: 28 }}>
            {this.props.currentUser.name && this.props.currentUser.name.indexOf(' ') !== -1
              ? this.props.currentUser.name.split(' ')[0][0] + this.props.currentUser.name.split(' ')[1][0]
              : 'Bye Bye'}
            </Text>
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

            <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
              {this.props.trails.map(({ id, origin, photoUrl, userId, destination, breadcrumbs }) => {
                if (userId === this.props.currentUser.id) {
                  return (
                  <Card
                    title={'TRAIL'}
                    image={photoUrl[0] !== '.'
                      ? { uri: photoUrl}
                      : require('../../assets/defaultTrail.png')}
                    key={id}
                  >
                    <Text style={{ marginBottom: 10 }}>
                      Trail by {this.props.users && this.props.users.filter(user => user.id === userId)[0].name}.
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Origin: {origin}.
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Destination: {destination}.
                    </Text>
                    <Button
                      backgroundColor="#03A9F4"
                      title="FOLLOW TRAIL"
                      onPress={() => navigate('SingleTrail', { breadcrumbs })}
                    />
                  </Card>
                  )}})}
            </ScrollView>

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
