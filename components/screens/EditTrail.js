import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../redux/auth';
import { fetchUsers } from '../redux/users';
import { fetchTrails, updateTrail } from '../redux/trails';

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

class EditTrail extends Component {
  constructor(props){
    super(props);
    this.state = {
      origin: '',
      destination: '',
      photoUrl: ''
    };
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.handleChangePhotoUrl = this.handleChangePhotoUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchInitialData();
  }

  handleChangeOrigin(value) {
    this.setState({origin: value});
  }

  handleChangeDestination(value) {
    this.setState({destination: value});
  }

  handleChangePhotoUrl(value) {
    this.setState({photoUrl: value});
  }

  handleSubmit(trailId) {
    const origin = this.state.origin;
    const destination = this.state.destination;
    const photoUrl = this.state.photoUrl;
    this.props.editTrail(trailId, {
      origin,
      destination,
      photoUrl
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={{ paddingVertical: 20 }}>
        <Card>
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
          <FormLabel>PhotoUrl</FormLabel>
          <FormInput
            secureTextEntry placeholder="Add a photo URL"
            onChangeText={(photoUrl) => this.handleChangePhotoUrl(photoUrl)}
            value={this.state.photoUrl}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="Update Current Trail Information"
            onPress={() => {
              this.handleSubmit(this.props.navigation.state.params.trailId);
              navigate('Profile');
              }
            }
          />
        </Card>
        <View style={styles.container}>
          <Text style={styles.text1}>{this.props.navigation.state.params && this.props.navigation.state.params.error}</Text>
        </View>
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
const mapDispatchToProps = (dispatch) => ({
  editTrail: (id, trailInfo) => dispatch(updateTrail(id, trailInfo)),
  fetchInitialData: () => {
      dispatch(fetchUsers());
      dispatch(fetchCurrentUser());
      dispatch(fetchTrails());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTrail);
