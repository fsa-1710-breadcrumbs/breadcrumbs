import React from "react";
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo, {Location, Permissions, Platform} from 'expo';
import { SphereGeometry } from 'three';
import { connect } from 'react-redux'
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

export default class SingleTrail extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTrail: this.props.trails.filter(trail => trail.id === this.props.navigation.state.params.id),
      errorMessage: null
    }
  }

  render() {
    let trailToDisplay = this.state.currentTrail
    return (
      <Expo.GLView
      ref={(ref)=> this._glView = ref}
      style={{ flex:1 }}
      onContextCreate={ this._onGLContextCreate }
      />
    );
  }

  _onGLContextCreate = async (gl) => {
    // if we hook up to store
    // const { trails } = this.props.trails
    const arSession = await this._glView.startARSessionAsync();
    const scene = new THREE.Scene();
    const camera = ExpoTHREE.createARCamera(arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    let geometry = new THREE.SphereGeometry(0.15, 20, 20);
    let material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });

    for(let i = 0; i < trailToDisplay.length; i++){
      let sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = trailToDisplay[i].x;
      sphere.position.y = trailToDisplay[i].y;
      sphere.position.z = trailToDisplay[i].z;
      scene.add(sphere);

    }

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP()
    }

    animate();

    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)
  }
}


const mapStateToProps = storeState => {
  return {
    users: storeState.users,
    trails: storeState.trails
  };
};

export default connect(mapStateToProps)(SingleTrails)
