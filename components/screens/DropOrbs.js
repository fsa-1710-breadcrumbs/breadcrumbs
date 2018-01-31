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
         {
           "x": 0,
           "y": 0,
           "z": 0,
         },
         {
           "x": 0.00045998164637406217,
           "y": 0.05394339303353542,
           "z": -0.0464993622851026,
         },
         {
           "x": 1.5723265051949307,
           "y": 0.1546692372969397,
           "z": -0.3793032640736101,
         },
         {
           "x": 3.04024696345025,
           "y": 0.1652479707888437,
           "z": -1.578439183203696,
         },
         {
           "x": 3.523158424540035,
           "y": 0.1863570642250761,
           "z": -3.792648354035474,
         },
         {
           "x": 3.0610343754591587,
           "y": 0.1828051321523292,
           "z": -5.660594407252982,
         },
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
