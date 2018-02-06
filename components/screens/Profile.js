import React, { Component } from 'react';
import { View, ScrollView, AlertIOS } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
// import {IconButton} from 'react-native-icon-button';
import { connect } from 'react-redux';
import { logout } from '../redux/auth';
import { removeTrail } from '../redux/trails';

class Profile extends Component {
  constructor(props){
    super(props);
    this.vectorConversions = this.vectorConversions.bind(this);
    this.generateReverse = this.generateReverse.bind(this);
  }

  vectorConversions(input){
    let vectors = [];
    for (var i = 0; i < input.length - 1; i++){
      let p1 = input[i];
      let p2 = input[i + 1];
      let vector = {
        x: -1 * (p2.x - p1.x),
        y: -1 * (p2.y - p1.y),
        z: -1 * (p2.z - p1.z)
      };
      vectors.push(vector);
    }
    return vectors.reverse();
  }

  generateReverse(vectors) {
    let current = {x: 0, y: 0, z: 0};
    let result = [];
    result.push(current);

    for (let vector of vectors) {
      current = {
        x: current.x + vector.x,
        y: current.y + vector.y,
        z: current.z + vector.z
      };
      result.push(current);
    }
    return result;
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
            onPress={() => {
              AlertIOS.alert(
                'Are you sure you want to sign out?',
                'Press Cancel to stay signed in',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      console.log('User pressed Cancel');
                    }
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      this.props.logout(this.props.navigation);
                    }
                  }
                ]
              )
            }}
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
                        style={{ marginBottom: 10 }}
                        backgroundColor="#03A9F4"
                        title="FOLLOW Trail To Origin"
                        onPress={() => navigate('SingleTrail', { breadcrumbs: this.generateReverse(this.vectorConversions(breadcrumbs))})}
                      />
                      <Button
                        style={{ marginBottom: 10 }}
                        backgroundColor="#03A9F4"
                        title="FOLLOW Trail To Destination"
                        onPress={() => navigate('SingleTrail', { breadcrumbs })}
                      />
                      <Button
                        style={{ marginBottom: 10 }}
                        backgroundColor="#03A9F4"
                        title = "EDIT Trail"
                        onPress={() => navigate('EditTrail', { trailId: id })}
                      />
                      <Button
                        style={{
                          shadowColor: '#000000',
                          shadowOffset: {
                          width: 1,
                          height: 3
                        },
                        shadowRadius: 10,
                        shadowOpacity: 0.5
                        }}
                        backgroundColor="#EF6F42"
                        title="DELETE Trail"
                        onPress={() => {
                          AlertIOS.alert(
                            'Are you sure you want to delete this trail?',
                            'Press Cancel to keep this trail',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => {
                                  console.log('User pressed Cancel');
                                }
                              },
                              {
                                text: 'Yes',
                                onPress: () => {
                                  this.props.removeTrail(id);
                                }
                              }
                            ]
                          );
                        }}
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
