import React from 'react';
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
      // location: null
        location: {
           "coords": {
             "accuracy": 65,
             "altitude": 8.645169258117676,
             "altitudeAccuracy": 12.72334098815918,
             "heading": -1,
             "latitude": 40.70467336127081,
             "longitude": -74.00862513042138,
             "speed": -1,
           },
           "timestamp": 1516994126569.8108,
         }
    }
  }

  // componentWillMount() {
  //   this._getGeoLocation();
    // this.state.location = {
    //            "coords": {
    //              "accuracy": 65,
    //              "altitude": 8.645169258117676,
    //              "altitudeAccuracy": 12.72334098815918,
    //              "heading": -1,
    //              "latitude": 40.70467336127081,
    //              "longitude": -74.00862513042138,
    //              "speed": -1,
    //            },
    //            "timestamp": 1516994126569.8108,
    //          }
  // }

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

// _getGeoLocation = async () => {
//   let { status } = await Permissions.askAsync(Permissions.LOCATION);
//   if (status === 'granted') {
//     let location = await Location.getCurrentPositionAsync( { enableHighAccuracy: true } );
//     this.setState( { location } );
//     console.log("this is my geo location: ", this.state.location)
//   }
// }


_onGLContextCreate = async (gl) => {
  //all scene stuff is via 3js
  // console.log("this is gl: ", gl)
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(
    arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

  const geometry = new THREE.SphereGeometry(0.15, 20, 20);
  const material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const newSphereGeometry = new THREE.SphereGeometry(0.15, 20, 20);
  const newSphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7fffd4, wireframe: true });
  const newSphere = new THREE.Mesh(newSphereGeometry, newSphereMaterial);
  scene.add(newSphere);
  newSphere.position.z = -0.5;
  // this.setTimeout(() => {
  //   newSphere.position.z--;
  // }, 3000);

  sphere.position.z = 0;
  // console.log("this is scene: ", scene)

  const animate = () => {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    newSphere.rotation.x += 0.01
    newSphere.rotation.y += 0.01

    renderer.render(scene, camera);
    gl.endFrameEXP()
  }

  animate();
  scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)
  }
}