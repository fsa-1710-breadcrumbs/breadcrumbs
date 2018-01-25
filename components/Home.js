import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
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
  render() {
    return (
      //full screen view via expo
        <Expo.GLView
        ref={(ref)=> this._glView = ref}
        style={{ flex:1 }}
        //onContextCreate takes a callback which recieves a gl object
        onContextCreate={this._onGLContextCreate}
        />
    );
  }

_onGLContextCreate = async (gl) => {
  //all scene stuff is via 3js
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(
    arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

  console.log('arSession', arSession)
  console.log('CAMERA', camera)
  console.log('RENDERER', renderer)

  //next three lines are pure 3js

  const geometry = new THREE.SphereGeometry(0.07, 0.07, 0.07);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  sphere.position.z= -1.2;

  console.log('scene', scene.toJSON)

  const animate = () => {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
    //same from 2js excpet expo requires the end of the frame explicitly
    gl.endFrameEXP()
  }

animate();
  scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)
  }
}
