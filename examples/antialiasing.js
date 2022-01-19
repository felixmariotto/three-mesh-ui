
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
  camera.position.set( 0, 1.6, 0 );
  controls.target = new THREE.Vector3( 0, 1, -1.8 );
  controls.update();

  // ROOM

  const room = new THREE.LineSegments(
    new BoxLineGeometry( 20, 20, 20, 10, 10, 10 ).translate( 0, 3, 0 ),
    new THREE.LineBasicMaterial( { color: 0x808080 } )
  );

  scene.add( room );

  // TEXT PANEL

  const text01 = makeTextPanel();
  text01.position.set(-1,0.5,-4);
  text01.rotation.y = 0.9;

  const text02 = makeTextPanel();
  text02.position.set(1.5,0,-6);
  text02.rotation.x = -0.55;

  const text03 = makeTextPanel();
  text03.position.set(0,0,-3);
  text03.rotation.x = -0.55;

  const text04 = makeTextPanel();
  text04.position.set(1.5,1,-8);
  text04.rotation.x = -0.55;
  text04.rotation.y = -0.9;

  const text05 = makeTextPanel();
  text05.position.set(0,2,-8);
  text05.rotation.x = -0.55;
  text05.rotation.z = -0.9;

  //

  renderer.setAnimationLoop( loop );

};

//

function makeTextPanel() {

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

function loop() {

  // Don't forget, ThreeMeshUI must be updated manually.
  // This has been introduced in version 3.0.0 in order
  // to improve performance
  ThreeMeshUI.update();

  controls.update();
  renderer.render( scene, camera );
};
