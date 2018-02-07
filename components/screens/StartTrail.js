import React from 'react';
import { connect } from 'react-redux';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
import { addTrail } from '../redux/trails';
console.disableYellowBox = true;

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbs: [],
      stopInterval: null,
      userId: null
    };
    this.relativeLocation = [];
    this._onGLContextCreate = this._onGLContextCreate.bind(this);
  }

  componentWillUnmount(){
    clearInterval(this.state.stopInterval);
    this.props.createTrail({
      breadcrumbs: this.relativeLocation,
      userId: this.props.currentUser.id,
      origin: this.props.navigation.state.params.origin,
      destination: this.props.navigation.state.params.destination,
      photoUrl: this.props.navigation.state.params.photoUrl
    });
  }

  render() {
    console.log("INSIDE CREARTE AKA START TRAIL")
    console.log("INSIDE PROPS", this.props);
    return (
      <Expo.GLView
      ref={(ref) => this._glView = ref}
      style={{ flex: 1 }}
      onContextCreate={this._onGLContextCreate}
      />
    );
  }

_onGLContextCreate = async (gl) => {
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(
    arSession, gl.drawingBufferWidth, gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

  const start = setInterval(() => {
    let vectorPosition = camera.getWorldPosition();
    let newState = {
      x: vectorPosition.x,
      y: 0,
      z: vectorPosition.z,
    };
   this.relativeLocation.push(newState);
  }, 2000);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  animate();

  this.setState({
    stopInterval: start
  });

  scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);
  }
}

const mapStateToProps = storeState => {
  return {
    currentUser: storeState.currentUser
  };
};
const mapDispatchToProps = (dispatch) => ({
  createTrail: (newTrail) => {
    dispatch(addTrail(newTrail));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
