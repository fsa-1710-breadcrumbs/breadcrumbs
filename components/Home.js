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
      location: null
    };
  }

  componentWillMount() {
    this._getGeoLocation();
  }

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

_getGeoLocation = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    let location = await Location.getCurrentPositionAsync( { enableHighAccuracy: true } );
    this.setState( { location } );
    console.log("this is my geo location: ", this.state.location)
  }
}


_onGLContextCreate = async (gl) => {
  //all scene stuff is via 3js
  // console.log("this is running inside onGLCONTEXTCREATE: ", gl)
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(
    arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  // console.log("this is running: ", Expo.Location.getCurrentPositionAsync())
  // console.log("this is running inside:")

//next three lines are pure 3js
// const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// cube.position.z= -0.4;

// wire framed sphere code
const geometry = new THREE.SphereGeometry(0.15, 20, 20);
const material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
const mesh = new Physijs.BoxMesh(geometry, material);
scene.add(mesh);

sphere.position.z = 0;

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
