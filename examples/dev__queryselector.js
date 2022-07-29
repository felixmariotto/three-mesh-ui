import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { BoxLineGeometry } from "three/examples/jsm/geometries/BoxLineGeometry.js";

import ThreeMeshUI from "three-mesh-ui";

import SnakeImage from "./assets/spiny_bush_viper.jpg";

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';
import Stats from 'three/examples/jsm/libs/stats.module';
import CSSQuery from '../src/utils/dom/css/CSSQuery';
import { _applyRules, computeStyle } from '../src/utils/dom/VRDocument';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

const vrStyleSheet = document.createElement('style');
vrStyleSheet.setAttribute('media','vr');
vrStyleSheet.innerText = `

div{
	background-color: blue;
}

`;
document.head.appendChild( vrStyleSheet );

window.addEventListener("load", init);
window.addEventListener("resize", onWindowResize);

let container, stats;
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

	stats = new Stats();
	document.body.appendChild( stats.dom );

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
  container = new ThreeMeshUI.Block({
    ref: "container",
    padding: 0.025,
    fontFamily: FontJSON,
    fontTexture: FontImage,
    fontColor: new THREE.Color(0xffffff),
    backgroundOpacity: 1,
  });

	container.set( {'backgroundColor': new THREE.Color(0x00ff99) });
  container.position.set(0, 1, -1.8);
  container.rotation.x = -0.55;
  scene.add(container);

  //

  const title = new ThreeMeshUI.Block({
    height: 0.2,
    width: 1.5,
    margin: 0.025,
    justifyContent: "center",
    fontSize: 0.09,
  });
	title.pasteAttributes("h1.title")

  title.add(
    new ThreeMeshUI.Text({
      content: "spiny bush viper",
    })
  );

  container.add(title);

  //

  const leftSubBlock = new ThreeMeshUI.Block({
    height: 0.95,
    width: 1.0,
    margin: 0.025,
    padding: 0.025,
    textAlign: "left",
    justifyContent: "end",
		backgroundOpacity: 1
	});

  const caption = new ThreeMeshUI.Block({
    height: 0.07,
    width: 0.37,
    textAlign: "center",
    justifyContent: "center",
  });

  caption.add(
    new ThreeMeshUI.Text({
      content: "Mind your fingers",
      fontSize: 0.04,
    })
  );

  leftSubBlock.add(caption);

  //

  const rightSubBlock = new ThreeMeshUI.Block({
    margin: 0.025,
		alphaTest : 0.9,
		backgroundOpacity: 0.8
  });
	rightSubBlock.pasteAttributes("div#bob.--right");

  const subSubBlock1 = new ThreeMeshUI.Block({
    height: 0.35,
    width: 0.5,
    margin: 0.025,
    padding: 0.02,
    fontSize: 0.04,
    justifyContent: "center",
    backgroundOpacity: 0,
  }).add(
    new ThreeMeshUI.Text({
      content: "Known for its extremely keeled dorsal scales that give it a ",
    }).pasteAttributes('.title.blob[src="http://bob.com/img.jpg"][alt="une super desciprtion"][disabled]:hover:active'),

    new ThreeMeshUI.Text({
      content: "bristly",
      fontColor: new THREE.Color(0x92e66c),
    }),

    new ThreeMeshUI.Text({
      content: " appearance.",
    })
  );

  const subSubBlock2 = new ThreeMeshUI.Block({
    height: 0.53,
    width: 0.5,
    margin: 0.01,
    padding: 0.02,
    fontSize: 0.025,
    alignItems: "start",
    textAlign: 'justify',
    backgroundOpacity: 0,
  }).add(
    new ThreeMeshUI.Text({
      content:
        "The males of this species grow to maximum total length of 73 cm (29 in): body 58 cm (23 in), tail 15 cm (5.9 in). Females grow to a maximum total length of 58 cm (23 in). The males are surprisingly long and slender compared to the females.\n",
    }).pasteAttributes('p'),

  ).pasteAttributes('div');

	var lastP = new ThreeMeshUI.Text({
		content: "The head has a short snout, more so in males than in females.\nThe eyes are large and surrounded by 9–16 circumorbital scales. The orbits (eyes) are separated by 7–9 scales."
	}).pasteAttributes('p');

	subSubBlock2.add( lastP );

  rightSubBlock.add(subSubBlock1, subSubBlock2);

  //

  const contentContainer = new ThreeMeshUI.Block({
    contentDirection: "row",
    padding: 0.02,
    margin: 0.025,
    backgroundOpacity: 0,
  }).pasteAttributes(".inner");

  contentContainer.add(leftSubBlock, rightSubBlock);
  container.add(contentContainer);

  //

  new THREE.TextureLoader().load(SnakeImage, (texture) => {
    leftSubBlock.set({
      backgroundTexture: texture,
    });
  });


	setTimeout( ()=>{
		ThreeMeshUI.loadSheets(true);

		// console.log( ThreeMeshUI.querySelectorAll( 'div p[foo][bar*="foo > is bar & nice"]' ) );
		// console.log( ThreeMeshUI.querySelectorAll( 'div > p' ) );
		// console.log( ThreeMeshUI.querySelectorAll( 'p ~ p' ) );
		// console.log( ThreeMeshUI.querySelectorAll( 'p + p' ) );
		// console.log( ThreeMeshUI.querySelectorAll( '#bob p + p' ) );
		const result = ThreeMeshUI.querySelectorAll( 'div.--right .title.blob[disabled]:hover:active' );
		// const result = ThreeMeshUI.querySelectorAll( 'div > p' );
		// const result = ThreeMeshUI.querySelectorAll( '.title' );
		for ( let i = 0; i < result.length; i++ ) {
			const resultElement = result[ i ];
			resultElement.rotation.z = 0.25;

			// resultElement.set({ content: Math.random() + " new text "});
		}

		//container :root
			//rightSubBlock div#bob.--right
				//div
					//p
					//lastP p

		// const cssQ = CSSQuery.build('div > p');
		// console.warn( cssQ.match(lastP) );


		let startTime = Date.now();
		for ( let i = 0; i < 1000; i++ ) {
			_applyRules();
		}
		console.log( "computeStyle avg: ~" + ( ( Date.now() - startTime) / 1000 ) + " ms");

		startTime = Date.now();
		for ( let i = 0; i < 1000; i++ ) {
			computeStyle( container );
		}
		console.log( "_applyRules avg: ~" + ( ( Date.now() - startTime) / 1000 ) + " ms");

		// container.pasteAttributes(`#myId.myclass.myClass-2[attrName="attrValue"][disabled]:hover:disabled`);
		// console.log( container.copyAttributes() );


		// console.log( ThreeMeshUI.querySelectorAll( '#bob.class [table] + input[type="radio"]:checked' ) );

	}, 1500)
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

	stats.update();
}
