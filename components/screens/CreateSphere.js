import React from "react";
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo, {Location, Permissions, Platform} from 'expo';
import { SphereGeometry } from 'three';
import TimerMixin from 'react-timer-mixin';
// import {maths, sphereX, sphereY, sphereZ } from './maths'
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
     trails: []
    }

    mixins: [TimerMixin],
    componentDidMount: function() {
      this.setInterval(() => {
        console.log('I do not leak!');
      }, 1500);
    },
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



  createSphere = () => {
    let geometry = new THREE.SphereGeometry(0.15, 20, 20);
    let material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
    let sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  }

_onGLContextCreate = async (gl) => {
  //all scene stuff is via 3js
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);





// let geometry = new THREE.SphereGeometry(0.15, 20, 20);
// let material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
// let sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

  createSphere();

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





