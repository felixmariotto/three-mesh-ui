
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls ;

window.addEventListener('load', ()=> {
	init();
});

window.addEventListener('resize', ()=> {
	onWindowResize();
});

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf2f2f2 );

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
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// TEXT PANEL

	makeTextPanel();

	//

	renderer.setAnimationLoop( loop );

};

//

function makeTextPanel() {

	const uiContainer = new THREE.Group();
	uiContainer.position.set( 0, 1, -1.8 );
	uiContainer.rotation.x = -0.55;
	scene.add( uiContainer );

	//

	const container = ThreeMeshUI.Block({
		width: 1.2,
		height: 0.8,
		padding: 0.2,
		justifyContent: 'center',
		alignContent: 'left',
		fontFamily: './assets/helvetiker_regular.typeface.json'
	});

	// When setting a 
	const characterPool = {
		'0': 6,
		'1': 6,
		'2': 6,
		'3': 6,
		'4': 6,
		'5': 6,
		'6': 6,
		'7': 6,
		'8': 6,
		'9': 6
	};

	container.appendChild(

		ThreeMeshUI.InstancedText({
			characterPool: characterPool, // cannot be set on parent
			content: "00.00.00",
			fontSize: 0.07
		})

	);

	//

	uiContainer.add( container.threeOBJ );

};

//

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};

//

function loop() {
	controls.update();
	renderer.render( scene, camera );
	// console.log( renderer.info.render );
};
