import * as THREE from 'three';
import {VRButton} from 'three/examples/jsm/webxr/VRButton.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {BoxLineGeometry} from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

window.addEventListener('load', init);
window.addEventListener('resize', onWindowResize);

//

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x505050);

  camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);
  renderer.xr.enabled = true;
  document.body.appendChild(VRButton.createButton(renderer));
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 1.6, 0);
  controls.target = new THREE.Vector3(0, 1, -1.8);
  controls.update();

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
    width: 2.35,
    height: 0.5,
    padding: 0.05,
    justifyContent: 'center',
    alignContent: 'left',
    fontSize: 0.055,
    fontFamily: FontJSON,
    fontTexture: FontImage
  });

  container.position.set(0, 1, -1.8);
  container.rotation.x = -0.55;
  scene.add(container);

  //

  const textContent = "LYON F. to ATLANTA GA. Via ALTOONA PA.";
  container.add(
    new ThreeMeshUI.Text({
      content: textContent + "\n",
      fontKerning: true
    }),
    new ThreeMeshUI.Text({
      content: textContent + "\n\n",
    }),
    new ThreeMeshUI.Text({
      content: textContent + "\n",
      fontKerning: true,
      letterSpacing: 0.25,
    }),

    new ThreeMeshUI.Text({
      content: textContent + "\n\n",
      letterSpacing: 0.25,
    }),
    new ThreeMeshUI.Text({
      content: textContent + "\n",
      fontKerning: true,
      letterSpacing: 0.55,
    }),

    new ThreeMeshUI.Text({
      content: textContent,
      letterSpacing: 0.55,
    }),
  );



  container.onAfterUpdate = function () {
    console.log(container.getFontFamily());
  }



  let _overlap = false;
  Object.defineProperty(window, 'overlap', {
    get() {
      _overlap = !_overlap;

      for (let i = 0; i < container.children.length; i++) {
        const child = container.children[i];

        if( child.isText ){
          child.fontMaterial.depthWrite = _overlap;
        }
      }

      // and return a value as it is a getter
      return "Toggle Overlap"
    },
    set(newValue) {
    },
    enumerable: false,
    configurable: false
  });

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

  controls.update();
  renderer.render(scene, camera);
};
