import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
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
  }

  handleChangeOrigin(value) {
    this.setState({origin: value});
  }

  handleChangeDestination(value) {
    this.setState({destination: value});
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
              navigate('Create', { origin: this.state.origin, destination: this.state.destination });
              this.setState({ origin: '', destination: ''});
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
                title="FOLLOW Trail Destination To Origin"
                onPress={() => {
                  let reversed = breadcrumbs.reverse()
                  navigate('SingleTrail', { breadcrumbs:  reversed})}
                 } // <- this doesn't work like we thought?  need to fix
              />
              <Button
                backgroundColor="#03A9F4"
                title="FOLLOW Trail Origin To Destination"
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
