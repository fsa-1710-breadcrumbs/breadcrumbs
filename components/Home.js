// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'ghostwhite'
//   }
// });

// export default class Home extends Component {
//   constructor(props){
//     super(props);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Welcome to Breadcrumbs</Text>
//       </View>
//     );
//   }
// }

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
  const camera = new THREE.PerspectiveCamera(
    75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    gl.endFrameEXP()
  }

cube.rotation.x += 0.07;
cube.rotation.y += 0.04;

animate();
  scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)

  }
}
