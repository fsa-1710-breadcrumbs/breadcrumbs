import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
import { SphereGeometry } from 'three';
import maths from './maths'
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
        onContextCreate={ this._onGLContextCreate }
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

  maths = (40.70502730103653,-74.00893461209553) => {
    var cosLat = Math.cos(lat * Math.PI / 180.0);
    var sinLat = Math.sin(lat * Math.PI / 180.0);
    var cosLon = Math.cos(lon * Math.PI / 180.0);
    var sinLon = Math.sin(lon * Math.PI / 180.0);
    var rad = 500.0;
    marker_mesh.position.x = rad * cosLat * cosLon;
    marker_mesh.position.y = rad * cosLat * sinLon;
    marker_mesh.position.z = rad * sinLat;
    }

const geometry = new THREE.SphereGeometry(0.15, 20, 20);
const material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
sphere.position.x = marker_mesh.position.x;
sphere.position.y = marker_mesh.position.y;
sphere.position.z = marker_mesh.position.z;


  const animate = () => {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.07;
    // cube.rotation.y += 0.04;
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
