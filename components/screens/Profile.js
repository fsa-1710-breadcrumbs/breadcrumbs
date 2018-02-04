import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { logout } from '../redux/auth';
import { removeTrail } from '../redux/trails';

class Profile extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <Card
          style={{ flex: 1 }}
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
                      <Button
                        backgroundColor='green'
                        title = 'EDIT TRAIL'
                        onPress={() => navigate('EditTrail', {trailId:id})}
                      />
                      <Button
                        backgroundColor="red"
                        title="X"
                        onPress={() => this.props.removeTrail(id)}
                      />
                    </Card>
                  );
                }
              })}
            </Card>
        </ScrollView>
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
  logout: (navigation) => dispatch(logout(navigation)),
  removeTrail: (trailId) => dispatch(removeTrail(trailId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
