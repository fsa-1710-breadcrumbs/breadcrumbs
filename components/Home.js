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

  componentWillMount() {
      this._getGeoLocation();
      // let length = this.state.trails.length
      // let trails = this.state.trails
      // if (length > 1){
      //   trails.forEach(crumb =>{
      //   createCrumbs(crumb.coords.latitude, crumb.coords.longitude)
      //   })
      // }

  }




  _getGeoLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync( { enableHighAccuracy: true } );
      this.setState( { location } );
      console.log("this is my geo location: ", this.state.location)
    }
  }

  componentDidMount(){

  }

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




//   "coords": Object {
//     "accuracy": 64,
//     "altitude": 10.160222614650596,
//     "altitudeAccuracy": 71.4035873413086,
//     "heading": -1,
//     "latitude": 40.70451178337314,
//     "longitude": -74.00933836718033,
//     "speed": 0,
//   },
//   "timestamp": 1517260113954.231,
// }

_onGLContextCreate = async (gl) => {
  //all scene stuff is via 3js
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(
    arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    let lat = 0.70530671622756;
    // this.state.location.coords.latitude
      let long = -74.00938760726542;
      // this.state.location.coords.longitude
      console.log('latitude', lat)
      console.log('longitude', long)

const maths = (lat,lon) => {
    let cosLat = Math.cos(lat * Math.PI / 180.0);
    let sinLat = Math.sin(lat * Math.PI / 180.0);
    let cosLon = Math.cos(lon * Math.PI / 180.0);
    let sinLon = Math.sin(lon * Math.PI / 180.0);
    sphere.position.x =  cosLat * cosLon;
    sphere.position.y =  cosLat * sinLon;
    sphere.position.z =  -sinLat;
    }

let geometry = new THREE.SphereGeometry(0.15, 20, 20);
let material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
let sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
maths(lat,long)
sphere.position.x ;
console.log('sphere.position.x', sphere.position.x)
sphere.position.y ;
console.log('sphere.position.y', sphere.position.y)
sphere.position.z ;
console.log('sphere.position.z', sphere.position.z)

// createCrumbs(la,lo){
   let la2 = 40.70499719400394,
  let lo2 = -74.00868363151993,
let geometry2 = new THREE.SphereGeometry(0.15, 20, 20);
let material2 = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
let sphere2 = new THREE.Mesh(geometry2, material2);
scene.add(sphere2);
maths(la2,lo2)
sphere2.position.x
console.log('sphere.position.x', sphere2.position.x)
sphere2.position.y
console.log('sphere.position.y', sphere2.position.y)
sphere2.position.z + 5
console.log('sphere.position.z', sphere2.position.z)
// }


let la3 = 40.70496100586784,
let lo3 = -74.00935287303429,
let geometry3 = new THREE.SphereGeometry(0.15, 20, 20);
let material3 = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
let sphere3 = new THREE.Mesh(geometry3, material3);
scene.add(sphere3);
maths(la3,lo3)
sphere3.position.x
console.log('sphere.position.x', sphere3.position.x)
sphere3.position.y
console.log('sphere.position.y', sphere3.position.y)
sphere3.position.z + 5
console.log('sphere.position.z', sphere3.position.z)

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
