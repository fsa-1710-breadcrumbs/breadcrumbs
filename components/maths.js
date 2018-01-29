import {lat, lon} from coord

const maths = (lat,lon) => {
var cosLat = Math.cos(lat * Math.PI / 180.0);
var sinLat = Math.sin(lat * Math.PI / 180.0);
var cosLon = Math.cos(lon * Math.PI / 180.0);
var sinLon = Math.sin(lon * Math.PI / 180.0);
var rad = 500.0;
marker_mesh.position.x = rad * cosLat * cosLon;
marker_mesh.position.y = rad * cosLat * sinLon;
marker_mesh.position.z = rad * sinLat;
}

export default maths
