
/* Import everything we need from Three.js */

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls ;

window.addEventListener('load', init );
window.addEventListener('resize', onWindowResize );

//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	renderer = new THREE.WebGLRenderer({ antialias: true });
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

	makeUI();

	// 

	renderer.setAnimationLoop( loop );

};

//

function makeUI() {

	const container = ThreeMeshUI.Block({
		height: 1.5,
		width: 1
	});

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	const imageBlock = ThreeMeshUI.Block({
		height: 1,
		width: 1,
		offset: 0.1
	});

	const textBlock = ThreeMeshUI.Block({
		height: 0.4,
		width: 0.8,
		margin: 0.05,
		offset: 0.1
	});

	container.add( imageBlock, textBlock );

	//

	const loader = new THREE.TextureLoader();

	loader.load( './assets/spiny_bush_viper.jpg', (texture)=> {

		const material = new THREE.MeshBasicMaterial({ map: texture });

		imageBlock.set({ backgroundMaterial: material });

	});

	//

	container.set({
		fontFamily: './assets/Roboto-msdf.json',
		fontTexture: './assets/Roboto-msdf.png',
	});

	const text = new ThreeMeshUI.Text({
		content: 'The spiny bush viper is known for its extremely keeled dorsal scales.'
	});

	textBlock.add( text );

	//

	text.set({
		fontColor: new THREE.Color( 0xd2ffbd ),
		fontSize: 0.06
	});

	textBlock.set({
		alignContent: 'right',
		justifyContent: 'end',
		padding: 0.03
	});

	//

	textBlock.add(
		new ThreeMeshUI.Text({
			content: ' Mind your fingers.',
			fontSize: 0.07,
			fontColor: new THREE.Color( 0xefffe8 )
		})
	);

};

// Function that resize the renderer when the browser window is resized

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

// Render loop (called ~60 times/second, or more in VR)

function loop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );
};
