import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

export default class Camera extends React.Component {
  constructor(){
    super()
    this.state = {
      image: null,
    };
  }

  render() {

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
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
    })
      .then (returnedBase64 => thunkThatSendsToServertoSendtoS3(returnedBase64))
      .then(console.console.error());
      ;

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}