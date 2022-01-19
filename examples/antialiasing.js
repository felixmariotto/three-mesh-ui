
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls ;

const textContent = "The males of this species grow to maximum total length of 73 cm (29 in): body 58 cm (23 in), tail 15 cm (5.9 in). Females grow to a maximum total length of 58 cm (23 in). The males are surprisingly long and slender compared to the females.\nThe head has a short snout, more so in males than in females.\nThe eyes are large and surrounded by 9–16 circumorbital scales. The orbits (eyes) are separated by 7–9 scales.";

window.addEventListener('load', init );
window.addEventListener('resize', onWindowResize );

//

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x505050 );

  camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( WIDTH, HEIGHT );
  renderer.xr.enabled = true;
  document.body.appendChild(VRButton.createButton(renderer));
  document.body.appendChild( renderer.domElement );

  controls = new OrbitControls( camera, renderer.domElement );
  camera.position.set( 0, 1.0, 0 );
  controls.target = new THREE.Vector3( 0, 1, -1.8 );
  controls.update();

  // ROOM

  const room = new THREE.LineSegments(
    new BoxLineGeometry( 20, 20, 20, 10, 10, 10 ).translate( 0, 3, 0 ),
    new THREE.LineBasicMaterial( { color: 0x808080 } )
  );

  scene.add( room );

  // TEXT PANEL

  makeTextPanel(0,0,-2,0,0,0);
  makeTextPanel(0,0,-3,0,0,0);
  makeTextPanel(0,0,-5,0,0,0);
  makeTextPanel(0,0,-7,0,0,0);
  makeTextPanel(0,0,-9,0,0,0);
  
  makeTextPanel(-1.5,0.5,-4,0,0.9,0);
  makeTextPanel(-1.5,1.1,-4,0,1.3,0);
  makeTextPanel(-1.5,1.7,-4,0,1.6,0);
  makeTextPanel(2.0,0,-3,-1,0,0);
  makeTextPanel(2.0,0,-5,-1,0,0);
  makeTextPanel(2.4,0.1,-7,-1,0,0);
  makeTextPanel(1.5,1,-8,-0.55,-0.9,0);
  makeTextPanel(0,1.2,-8,-0.55,0,-0.9);
  makeTextPanel(0,1.75,-5,-0.55,0,-0.9);
  makeTextPanel(0,2.0,-3,-0.55,0,-0.9);

  //

  renderer.setAnimationLoop( loop );

};

//

function makeTextPanel(x,y,z,rotX, rotY, rotZ) {

  const container = new ThreeMeshUI.Block({
    width: 1.8,
    height: 0.5,
    padding: 0.05,
    justifyContent: 'center',
    alignContent: 'left',
    fontFamily: FontJSON,
    fontTexture: FontImage
  });

  scene.add( container );
  container.position.set(x,y,z);
  container.rotation.set(rotX, rotY, rotZ);

  container.add(
    new ThreeMeshUI.Text({
      content: textContent,
      fontKerning: "normal"
    }),
  );

  return container;
};

// handles resizing the renderer when the viewport is resized

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};

//
var clock = new THREE.Clock(true);
clock.start();

function loop() {

  // Don't forget, ThreeMeshUI must be updated manually.
  // This has been introduced in version 3.0.0 in order
  // to improve performance
  ThreeMeshUI.update();

  // swinging motion to see motion aliasing better
  let time = clock.getElapsedTime();
  controls.target.set(Math.sin(time * 20) * 0.001, 1, -1.8 );
  controls.update();
  renderer.render( scene, camera );
};
