import React from "react";
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo, {Location, Permissions, Platform} from 'expo';
import { SphereGeometry } from 'three';
console.disableYellowBox = true;
// //if we want to hook up to store
// import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite'
  }
});

export default class DropOrbs extends React.Component {
  constructor() {
    super();
    this.state = {
     location: null,
     errorMessage: null,
     trails: [
       {x: 0, y: 0, z: 0},
       {x: 0, y: 0, z: -0.5},
       {x: 0, y: 0, z: -1},
       {x: 0.5, y: 0, z: -1},
       {x: 1, y: 0, z: -1},
       {x: 1, y: 0.5, z: -1},
       {x: 1, y: 1, z: -1}
      ]
    }
  }

  render() {
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

    for(let i = 0; i < this.state.trails.length; i++){
      let sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = this.state.trails[i].x;
      sphere.position.y = this.state.trails[i].y;
      sphere.position.z = this.state.trails[i].z;
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


// assuming a store
// function mapStateToProps(state) {
//   return {
//     trails: trails
//   }
// }

// export default connect(mapStateToProps)(DropOrbs)
