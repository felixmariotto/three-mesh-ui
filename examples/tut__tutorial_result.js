// xfg:title Tutorial result
// xfg:category practice
/* Import everything we need from Three.js */

import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { BoxLineGeometry } from "three/examples/jsm/geometries/BoxLineGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import ThreeMeshUI from "three-mesh-ui";

import SnakeImage from "./assets/spiny_bush_viper.jpg";

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

window.addEventListener("load", init);
window.addEventListener("resize", onWindowResize);

//

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x505050);

  camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);

  renderer = new THREE.WebGLRenderer({ antialias: true });
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
    new THREE.LineBasicMaterial({ color: 0x808080 })
  );

  scene.add(room);

  // TEXT PANEL

  makeUI();

  //

  renderer.setAnimationLoop(loop);
}

//

function makeUI() {
  const container = new ThreeMeshUI.Block({
    height: 1.5,
    width: 1,
    backgroundOpacity: 0,
		alignItems: 'center'
  });

  container.position.set(0, 1, -1.8);
  container.rotation.x = -0.55;
  scene.add(container);

  //

  const imageBlock = new ThreeMeshUI.Block({
    height: 1,
    width: 1,
  });



  //

  const loader = new THREE.TextureLoader();

  loader.load(SnakeImage, (texture) => {
    imageBlock.set({
			backgroundImage: texture,
			backgroundOpacity: 1,
			backgroundColor: new THREE.Color(0xffffff)
		});
  });

  //

  container.set({
    fontFamily: FontJSON,
    fontTexture: FontImage,
  });

	const textBlock = new ThreeMeshUI.Text({
		boxSizing: 'border-box',
		width: 0.8,
		margin: 0.05,
		backgroundColor : 0x000000,
		color: new THREE.Color(0xd2ffbd),
		fontSize: 0.06,
		textAlign: "right",
		justifyContent: "end",
		padding: 0.03,
	});

	textBlock.add( new ThreeMeshUI.Inline({
		textContent : "The spiny bush viper is known for its extremely keeled dorsal scales.",
	}),
		new ThreeMeshUI.Inline({
		textContent: " Mind your fingers.",
		fontSize: 0.07,
		color: new THREE.Color(0xefffe8),
	}) )

	container.add(imageBlock, textBlock);
}

// Function that resize the renderer when the browser window is resized

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Render loop (called ~60 times/second, or more in VR)

function loop() {
  // Don't forget, ThreeMeshUI must be updated manually.
  // This has been introduced in version 3.0.0 in order
  // to improve performance
  ThreeMeshUI.update();

  controls.update();
  renderer.render(scene, camera);
}
