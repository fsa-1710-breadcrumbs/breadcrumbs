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
  // constructor() {
  //   super();
  //   this.state = {
      // location: {
      //   latitude: 40.70486772125275,
      //   longitude: -74.00894022098937
      // }
    // }
  // }

  // componentWillMount() {
  //   this._getGeoLocation();
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
  // let { status } = await Permissions.askAsync(Permissions.LOCATION);
  // if (status === 'granted') {
  //   let location = await Location.getCurrentPositionAsync( { enableHighAccuracy: true } );
    // Location.watchHeadingAsync(obj => console.log("this is obj: ", obj));

    // Location.watchPositionAsync({enableHighAccuracy: true}, obj => console.log("this is postionAsync obj: ", obj));
    // console.log("this is X: ", )
    // this.setState( { location } );
    // console.log("this is my geo location: ", this.state.location)
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

  // const geometry = new THREE.SphereGeometry(50, 100, 100); // giant moon-sized sphere
  const geometry = new THREE.SphereGeometry(0.15, 20, 20);
  const material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
  const sphere = new THREE.Mesh(geometry, material);

  sphere.position.z = -1;
  // sphere.position.x = -10;
  // let { status } = await Permissions.askAsync(Permissions.LOCATION);
  // const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

  // const stateLat = location.coords.latitude;
  // const stateLon = location.coords.longitude;

  // const hallLat = 40.70480335751015;
  // const hallLon = -74.00931626986272;

  // const hallLat = 40.7028307
  // const hallLon = -74.0186519

  // const diffLat = stateLat - hallLat;
  // const diffLon = stateLon - hallLon;

  // const xCoord = diffLat * 110900;
  // const zCoord = diffLon * 110900;


  // const position = new THREE.Vector3(xCoord, 0, zCoord);
  // let headings = await Location.getHeadingAsync();
  // let trueHeading = headings.trueHeading;
  // console.log('???????', position);
  // position.applyAxisAngle(new THREE.Vector3(0, 1, 0),(trueHeading * 0.01745329))
  // position.applyAxisAngle(new THREE.Vector3(0, 1, 0), ((-Math.atan(xCoord / zCoord)) - (trueHeading * 0.01745329)))
  // console.log("after ????????", position);
  // console.log("this is xz: ", xCoord, zCoord)

  // sphere.translateX(xCoord);
  // sphere.translateZ(-zCoord);
  // sphere.translateX(position.x);
  // sphere.translateZ(position.z);

  // let headings = await Location.getHeadingAsync();
  // let trueHeading = headings.trueHeading;
  // console.log("this is trueheading: ", trueHeading);
  // sphere.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0),trueHeading * 0.01745329);

  scene.add(sphere);
  // console.log('sphere x z', sphere.position.x, sphere.position.z)
  camera.getWorldPosition();
  setInterval(() => console.log("world position: ", camera.getWorldPosition()), 1000)


  // const newSphereGeometry = new THREE.SphereGeometry(0.15, 20, 20);
  // const newSphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7fffd4, wireframe: true });
  // const newSphere = new THREE.Mesh(newSphereGeometry, newSphereMaterial);
  // scene.add(newSphere);
  // newSphere.position.z = -0.5;

  // this.setTimeout(() => {
  //   newSphere.position.z--;
  // }, 3000);

  // sphere.position.z = 0;
  // console.log("this is scene: ", scene)

  const animate = () => {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    // newSphere.rotation.x += 0.01
    // newSphere.rotation.y += 0.01

    renderer.render(scene, camera);
    gl.endFrameEXP()
  }

  animate();
  scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)
  }
}