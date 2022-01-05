import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { BoxLineGeometry } from "three/examples/jsm/geometries/BoxLineGeometry.js";

import ThreeMeshUI from "../src/three-mesh-ui.js";

import SnakeImage from "./assets/spiny_bush_viper.jpg";
import FontJSON from "./assets/Roboto-msdf.json";
import FontImage from "./assets/Roboto-msdf.png";

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

  makeTextPanel();

  //

  renderer.setAnimationLoop(loop);
}

//

function makeTextPanel() {
  const container = new ThreeMeshUI.Block({
    ref: "container",
    padding: 0.025,
    fontFamily: FontJSON,
    fontTexture: FontImage,
    fontColor: new THREE.Color(0xffffff),
    backgroundOpacity: 0,
  });

  container.position.set(0, 1.2, -1);
  container.rotation.x = -0.55;
  scene.add(container);

  //

  const rightSubBlock = new ThreeMeshUI.Block({
    margin: 0.025,
  });

  const subSubBlock1 = new ThreeMeshUI.Block({
    height: 0.3,
    width: 0.5,
    margin: 0.025,
    padding: 0.02,
    fontSize: 0.04,
    justifyContent: "center",
    backgroundOpacity: 0,
  }).add(

    new ThreeMeshUI.Text({
      content: "oooo\noooo\noooo\nooffggoo\n((()))\n((((\noooo",
      // content: "Known for its extremely keeled dorsal scales that give it a bristly appearance.",
    })

    /*
    new ThreeMeshUI.InlineBlock({
      height: 0.1,
      width: 0.2,
      // backgroundTexture: texture,
      backgroundColor: new THREE.Color( 0x00ff00 ),
      backgroundOpacity: 0.3,
    }),

    new ThreeMeshUI.Text({
      content: "\n"
    }),

    new ThreeMeshUI.InlineBlock({
      height: 0.1,
      width: 0.2,
      // backgroundTexture: texture,
      backgroundColor: new THREE.Color( 0x00ff00 ),
      backgroundOpacity: 0.3,
    }),

    new ThreeMeshUI.Text({
      content: "\n"
    }),

    new ThreeMeshUI.InlineBlock({
      height: 0.1,
      width: 0.2,
      // backgroundTexture: texture,
      backgroundColor: new THREE.Color( 0x00ff00 ),
      backgroundOpacity: 0.3,
    })
    */

  );

  rightSubBlock.add(subSubBlock1);

  //

  const contentContainer = new ThreeMeshUI.Block({
    contentDirection: "row",
    padding: 0.02,
    margin: 0.025,
    backgroundOpacity: 0,
  });

  contentContainer.add(rightSubBlock);
  container.add(contentContainer);

}

//

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function loop() {
  // Don't forget, ThreeMeshUI must be updated manually.
  // This has been introduced in version 3.0.0 in order
  // to improve performance
  ThreeMeshUI.update();

  controls.update();
  renderer.render(scene, camera);
}
