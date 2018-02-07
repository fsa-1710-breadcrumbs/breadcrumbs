import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';

class Camera extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      image: null,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Take a picture for your trail"
          onPress={this._pickImage}
        />
        {this.state.image &&
          <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    const { navigate } = this.props.navigation;
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
    })
    navigate('Home', { photoUrl: result.base64, origin: this.props.navigation.state.params.origin, destination: this.props.navigation.state.params.destination })
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const mapStateToProps = storeState => {
  return {
    users: storeState.users,
    currentUser: storeState.currentUser,
    trails: storeState.trails
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
