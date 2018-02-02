import React from "react";
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo, {Location, Permissions, Platform} from 'expo';
import { SphereGeometry } from 'three';
import { connect } from 'react-redux'

console.disableYellowBox = true;

class SingleTrail extends React.Component {
  constructor(props) {
    super(props);
  }

  _onGLContextCreate = async (gl) => {
    const arSession = await this._glView.startARSessionAsync();
    const scene = new THREE.Scene();
    const camera = ExpoTHREE.createARCamera(arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
    const renderer = ExpoTHREE.createRenderer({ gl });
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP()
    }

    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // trail array prop passed from Home component
    let trailToDisplay = this.props.navigation.state.params.breadcrumbs;

    //first object rendered from trailToDisplay
    let geometry = new THREE.SphereGeometry(0.2, 20, 20);
    let material = new THREE.MeshBasicMaterial({ color: 0x2F5CFF, wireframe: true });
    let sphere = new THREE.Mesh(geometry, material);
    //xyz for first orb
    sphere.position.x = trailToDisplay[0].x
    sphere.position.y = trailToDisplay[0].y
    sphere.position.z = trailToDisplay[0].z
    scene.add(sphere)

    // creates a sphere for each object in trailToDisplay array except first && last
    let geometry2 = new THREE.SphereGeometry(0.1, 10, 10);
    let material2 = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
    //create xyz of each orb
    for(let i = 1; i <= trailToDisplay.length - 2; i++){
      let sphereMid = new THREE.Mesh(geometry2, material2);
      sphereMid.position.x = trailToDisplay[i].x;
      sphereMid.position.y = trailToDisplay[i].y;
      sphereMid.position.z = trailToDisplay[i].z;
      scene.add(sphereMid);
      }

    //last object rendered from trailToDisplay
    let geometry3 = new THREE.SphereGeometry(0.2, 20, 20);
    let material3 = new THREE.MeshBasicMaterial({ color: 0x2F5CFF, wireframe: true });
    let sphere3 = new THREE.Mesh(geometry3, material3);
    //xyz for last orb
    sphere3.position.x = trailToDisplay[trailToDisplay.length - 1].x
    sphere3.position.y = trailToDisplay[trailToDisplay.length - 1].y
    sphere3.position.z = trailToDisplay[trailToDisplay.length - 1].z
    scene.add(sphere3)

    animate();
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)
  }

  render() {
    return (
      <Expo.GLView
        ref={ (ref) => this._glView = ref }
        style={{ flex:1 }}
        onContextCreate={ this._onGLContextCreate }
      />
    );
  }
}

const mapStateToProps = storeState => {
  return {
    users: storeState.users,
    trails: storeState.trails
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, null)(SingleTrail);
