
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo, {Location, Permissions, Platform} from 'expo';
import { SphereGeometry } from 'three';
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
  // this.createCrumbs = this.createCrumbs.bind(this);
}

  // componentWillMount() {
  //     this._getGeoLocation();
  //     // let length = this.state.trails.length
  //     // let trails = this.state.trails
  //     // if (length > 1){
  //     //   trails.forEach(crumb =>{
  //     //   createCrumbs(crumb.coords.latitude, crumb.coords.longitude)
  //     //   })
  //     // }

  // }

  // _getGeoLocation = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status === 'granted') {
  //     let location = await Location.getCurrentPositionAsync( { enableHighAccuracy: true } );
  //     this.setState( { location } );
  //     console.log("this is my geo location: ", this.state.location)
  //   }
  // }

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

<<<<<<< HEAD
=======

>>>>>>> 6994ce9c25a8d8d0a0cf4aea5ce6eb4beafa9f1b
_onGLContextCreate = async (gl) => {
  //all scene stuff is via 3js
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(
    arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

<<<<<<< HEAD
    let lat = 40.70451178337314;
    // this.state.location.coords.latitude
      let long = -74.00933836718033;
=======
    let lat = 40.70530671622756;
    // this.state.location.coords.latitude
    let long = -74.00938760726542;
>>>>>>> 6994ce9c25a8d8d0a0cf4aea5ce6eb4beafa9f1b
      // this.state.location.coords.longitude
    console.log('latitude', lat)
    console.log('longitude', long)

const maths = (la,lon) => {
    let cosLat = Math.cos(la * Math.PI / 180.0);
    let sinLat = Math.sin(la * Math.PI / 180.0);
    let cosLon = Math.cos(lon * Math.PI / 180.0);
    let sinLon = Math.sin(lon * Math.PI / 180.0);
    sphere.position.x =  cosLat * cosLon;
    sphere.position.y =  cosLat * sinLon;
    sphere.position.z =  -sinLat;
    }

let geometry = new THREE.SphereGeometry(0.15, 20, 20);
let material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
let sphere = new THREE.Mesh(geometry, material);
maths(lat,long)
<<<<<<< HEAD
scene.add(sphere);
// sphere.position.x ;
console.log('sphere.position.x', sphere.position.x)
// sphere.position.y ;
console.log('sphere.position.y', sphere.position.y)
// sphere.position.z ;
console.log('sphere.position.z', sphere.position.z)

// createCrumbs(la,lo){
// let geometry = new THREE.SphereGeometry(0.15, 20, 20);
// let material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
// let sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);
// maths(la,lo)
// sphere.position.x
// console.log('sphere.position.x', sphere.position.x)
// sphere.position.y
// console.log('sphere.position.y', sphere.position.y)
// sphere.position.z + 5
// console.log('sphere.position.z', sphere.position.z)
// }


=======

console.log('sphere.position.x', sphere.position.x)
console.log('sphere.position.y', sphere.position.y)
console.log('sphere.position.z', sphere.position.z)

// createCrumbs(la,lo){
let la2 = 40.70499719400394;
let lo2 = -74.00868363151993;
console.log('latitude2', la2)
console.log('longitude2', lo2)
let geometry2 = new THREE.SphereGeometry(0.15, 20, 20);
let material2 = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
let sphere2 = new THREE.Mesh(geometry2, material2);
scene.add(sphere2);
maths(la2,lo2)
sphere2.position.x
console.log('sphere2.position.x', sphere2.position.x)
sphere2.position.y
console.log('sphere2.position.y', sphere2.position.y)
sphere2.position.z
console.log('sphere2.position.z', sphere2.position.z)
// }


// let la3 = 40.70496100586784;
// let lo3 = -74.00935287303429;
// let geometry3 = new THREE.SphereGeometry(0.15, 20, 20);
// let material3 = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
// let sphere3 = new THREE.Mesh(geometry3, material3);
// scene.add(sphere3);
// maths(la3,lo3)
// sphere3.position.x
// console.log('sphere3.position.x', sphere3.position.x)
// sphere3.position.y
// console.log('sphere3.position.y', sphere3.position.y)
// sphere3.position.z
// console.log('sphere3.position.z', sphere3.position.z)

>>>>>>> 6994ce9c25a8d8d0a0cf4aea5ce6eb4beafa9f1b
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
