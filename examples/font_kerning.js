import * as THREE from 'three';
import {VRButton} from 'three/examples/jsm/webxr/VRButton.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {BoxLineGeometry} from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-Medium-msdf.json';
import FontImage from './assets/Roboto-Medium.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

let font = document.createElement('link');
font.href ="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap";
font.rel = "stylesheet";
document.head.appendChild(font);

window.addEventListener('load', init);
window.addEventListener('resize', onWindowResize);

const textContent = `LYON F. to ATLANTA GA. Via ALTOONA PA.`;
// const textContent = `.................................`;
// const textContent = `Lorem Ipsum Dolore Sit Amet`;
// const textContent = `LYON LIONEL ATLAS`;
//

// font : 42 => Lineheight :"35px
// font : 24 => Lineheight : 20px;
// font : 12 => Lineheight : 10px

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x505050);

  camera = new THREE.OrthographicCamera(WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 0.1, 1000 );

  window.camera = camera;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);
  renderer.xr.enabled = true;
  document.body.appendChild(VRButton.createButton(renderer));
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 0, 0);
  controls.target = new THREE.Vector3(0, 0, -0);
  controls.update();

  const p = document.createElement('p');
  p.style.position = 'absolute';
  p.style.top ="50%";
  p.style.left ="50%";
  p.style.color = 'red';
  p.style.transform = 'translate(0px,-50%)';
  // p.style.transform = 'translate(0px,-50%)';
  p.style.fontFamily = "Roboto";
  p.style.fontSize =  "42px";
  // p.style.fontSize =  "12px";
  // p.style.fontWeight=  "600";
  // p.style.textAlign = "center";
  // p.style.marginLeft = "-31px";
  // p.style.marginLeft = "-266px";
  p.style.marginLeft = "-262px";
  // p.style.marginTop = "-2px";
  p.style.lineHeight = "34px";
  p.style.lineHeight = "35px";
  p.style.whiteSpace = "pre";
  // p.style.marginTop = '-1px';


  const sK = document.createElement('span');
  // sK.textContent = textContent + ` - (fontKerning:"normal")\n`;
  sK.textContent = textContent+"\n";
  sK.style.fontKerning = 'normal';
  const snK = document.createElement('span');
  // snK.textContent = textContent +` - (fontKerning:"none")`;
  snK.textContent = textContent +"\n";
  snK.style.fontKerning = 'none';



  p.appendChild(sK);
  p.appendChild(snK);

  document.body.appendChild( p );

  // ROOM

  const room = new THREE.LineSegments(
    new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0),
    new THREE.LineBasicMaterial({color: 0x808080})
  );

  scene.add(room);

  // TEXT PANEL

  makeTextPanel();

  //

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(),
    new THREE.MeshBasicMaterial({color:0xff9900}),
  );

  scene.add( plane );


  renderer.setAnimationLoop(loop);

};

//

function makeTextPanel() {

  const container = new ThreeMeshUI.Block({
    width: 1556,
    height: 128,
    padding: 0.05,
    justifyContent: 'center',
    alignContent: 'left',
    fontSize: 42,
    fontFamily: FontJSON,
    fontTexture: FontImage
  });

  container.position.set(0, 0, -1);
  // container.rotation.x = -Math.PI/2;
  scene.add(container);

  //


  container.add(
    new ThreeMeshUI.Text({
      // content: textContent + ` - (fontKerning:"normal")\n`,
      content: textContent + `\n`,
      fontKerning: "normal"
    }),
    new ThreeMeshUI.Text({
      content: textContent,
      fontKerning:"none"
    }),

  );

  camera.position.x = -516;




};

// handles resizing the renderer when the viewport is resized

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

//

function loop() {

  // Don't forget, ThreeMeshUI must be updated manually.
  // This has been introduced in version 3.0.0 in order
  // to improve performance
  ThreeMeshUI.update();

  // controls.update();
  renderer.render(scene, camera);
};
