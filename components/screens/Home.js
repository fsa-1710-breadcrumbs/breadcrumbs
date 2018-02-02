import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.props.trails.map(({ id, origin, photoUrl, userId, destination, breadcrumbs }) => (
            <Card
              title={`TRAIL ${id}`}
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
                onPress={() => {
                  navigate('SingleTrail', { breadcrumbs });
                }}
              />
            </Card>
          ))}
        </ScrollView>
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

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
