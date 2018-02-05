import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, AlertIOS } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      origin: '',
      destination: ''
    };
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.vectorConversions = this.vectorConversions.bind(this);
    this.generateReverse = this.generateReverse.bind(this);
  }

  handleChangeOrigin(value) {
    this.setState({origin: value});
  }

  handleChangeDestination(value) {
    this.setState({destination: value});
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
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}>
        <Card
          style={{ marginTop: 20, marginBottom: 10 }}
        >
          <FormLabel>Origin</FormLabel>
          <FormInput
            placeholder="Starting origin and FACING..."
            onChangeText={(origin) => this.handleChangeOrigin(origin)}
            value={this.state.origin}
          />
          <FormLabel>Destination</FormLabel>
          <FormInput
            placeholder="Destination..."
            onChangeText={(destination) => this.handleChangeDestination(destination)}
            value={this.state.destination}
          />
          <Button
            style={{ marginTop: 10 }}
            backgroundColor="#EF6F42"
            title="CREATE Trail"
            onPress={() => {
              AlertIOS.alert(
               'You may begin your journey when the camera starts',
               'To end your trip, press the back button',
               [
                 {
                   text: 'Cancel',
                   onPress: () => {
                     console.log('User pressed Cancel');
                   }
                 },
                 {
                   text: 'OK',
                   onPress: () => {
                     navigate('Create', { origin: this.state.origin, destination: this.state.destination });
                     this.setState({ origin: '', destination: ''});
                   }
                 }
               ]
              )
            }}
          />
        </Card>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.props.trails.map(({ id, origin, photoUrl, userId, destination, breadcrumbs }) => (
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
                backgroundColor="#03A9F4"
                title="FOLLOW Trail To Destination"
                onPress={() => navigate('SingleTrail', { breadcrumbs })}
              />
            </Card>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
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
