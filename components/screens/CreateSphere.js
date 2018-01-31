import React from "react";
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo, {Location, Permissions, Platform} from 'expo';
import { SphereGeometry } from 'three';
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

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
     location: null,
     errorMessage: null,
     trails: [],
     number: 0
    }
  }

  render() {
    console.log("WE ARE IN THE SPHERE!!!!!");
    return (
      //full screen view via expo
        <Expo.GLView
        ref={(ref)=> this._glView = ref}
        style={{ flex:1 }}
        //onContextCreate takes a callback which recieves a gl object
        onContextCreate={ this._onGLContextCreate }
        />
    );
  }

_onGLContextCreate = async (gl) => {
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

  let geometry = new THREE.SphereGeometry(0.15, 20, 20);
  let material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
  let xPos = 0;

  for(let i = 0; i < 10; i++){
    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.z = xPos;
    scene.add(sphere);
    xPos -= .90;
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