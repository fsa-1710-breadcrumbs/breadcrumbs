import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';
import { addPictures } from './image';

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
    console.log("before axios call",result)
    this.props.uploadImage(result.base64)
    console.log("after axios call",result);

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

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (image) =>{
    dispatch(addImage(image))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
