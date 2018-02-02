import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
import { SphereGeometry } from 'three';
import { addTrail } from '../redux/trails';
console.disableYellowBox = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite'
  }
});

class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      breadcrumbs: [],
      stopInterval: null,
      origin: null,
      destination: null,
      userId: null
    }
    this.relativeLocation = [];
    this._onGLContextCreate = this._onGLContextCreate.bind(this);
  }

  componentWillUnmount(){
    clearInterval(this.state.stopInterval);
    this.props.createTrail({
      breadcrumbs: this.relativeLocation,
      userId: this.props.currentUser.id
    });
  }

  render() {
    return (
      <Expo.GLView
      ref={(ref)=> this._glView = ref}
      style={{ flex:1 }}
      onContextCreate={this._onGLContextCreate}
      />
    );
  }

_onGLContextCreate = async (gl) => {
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(
    arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

  const geometry = new THREE.SphereGeometry(0.1, 30, 30);
  const material = new THREE.MeshBasicMaterial({ color: 0x2F5CFF, wireframe: true });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.z = -1;
  scene.add(sphere);

  const start = setInterval(() => {
    let vectorPosition = camera.getWorldPosition();
    let newState = {
      x: vectorPosition.x,
      y: vectorPosition.y,
      z: vectorPosition.z,
    };
   this.relativeLocation.push(newState)
  }, 2000);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    gl.endFrameEXP();
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

  }
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
    dispatch(addTrail(newTrail))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
