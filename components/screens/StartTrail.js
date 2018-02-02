import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo, {Location, Permissions, Platform} from 'expo';
import { SphereGeometry } from 'three';
import { addTrail, create } from '../redux/trails';
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

class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      breadcrumbs: [],
      stopInterval: null,
      origin: '',
      destination: '',
      userId: null
    }
    this.x = [];
    this._onGLContextCreate = this._onGLContextCreate.bind(this);
  }

  // componentWillMount() {
  //   this._getGeoLocation();
  // }
  componentDidMount(){
    console.log('this mounted on the dom');
    //logic for running interval.
    // this.setState({
    //   stopInterval:
    // })
  }


  componentWillUnmount(){
    clearInterval(this.state.stopInterval);
    // console.log("this is breadcrumbs before state: ", this.state.breadcrumbs);
    // console.log("this is breadcrumbs before x thing: ", this.x);

    // this.setState({
    //   breadcrumbs: this.x,
    //   origin: 'ORIGIN DEFAULT',
    //   destination: 'DESTINATION DEFAULT',
    //   userId: 5
    // });

    // console.log("this is breadcrumbs after state: ", this.state.breadcrumbs);
    // console.log("this is breadcrumbs after x thing: ", this.x);

    this.props.createTrail({
      breadcrumbs: this.x,
      origin: 'DEFAULT',
      destination: 'DEFAULT',
      userId: this.props.currentUser.id
    });
  }



  render() {
    console.log('we should only see this once');
    // console.log('this is the changing state: ', this.state.relativeLocation);
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
  const arSession = await this._glView.startARSessionAsync();
  const scene = new THREE.Scene();
  const camera = ExpoTHREE.createARCamera(
    arSession, gl.drawingBufferWidth , gl.drawingBufferHeight, 0.01, 1000);
  const renderer = ExpoTHREE.createRenderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

  const geometry = new THREE.SphereGeometry(0.15, 20, 20);
  const material = new THREE.MeshBasicMaterial({ color: 0xee82ee, wireframe: true });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.z = -1;
  scene.add(sphere);

  const start = setInterval(() => {
    let vectorPosition = camera.getWorldPosition()
    let newState = {
      x: vectorPosition.x,
      y: vectorPosition.y,
      z: vectorPosition.z,
    };
   this.x.push(newState)
  }, 2000);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    gl.endFrameEXP()
  }
  animate();

  this.setState({
    stopInterval: start
  })

  scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)
  }
}

const mapStateToProps = storeState => {
  return {
    currentUser: storeState.currentUser
  };
};
const mapDispatchToProps = (dispatch) => ({
  createTrail: (newTrail) => {
    dispatch(addTrail(newTrail))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
