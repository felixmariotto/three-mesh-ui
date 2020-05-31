
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

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

	const container = ThreeMeshUI.Block({
		width: 1.7,
		height: 1.3,
		padding: 0.05,
		justifyContent: 'center',
		alignContent: 'left',
		fontFamily: './assets/Roboto-msdf.json',
		fontTexture: './assets/Roboto-msdf.png',
		fontSize: 0.055,
		interLine: 0.05
	});

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	container.add(

		ThreeMeshUI.Text({
			fontSize: 0.09,
			content: "three-mesh-ui supports inline images :\n"
		}),

		ThreeMeshUI.Text({
			content: "This is a PNG : ",
			fontColor: new THREE.Color(0xffc654)
		}),

		ThreeMeshUI.InlineImage({
			src: "./assets/threejs.png",
			height: 0.2,
			width: 0.42
		}),

		ThreeMeshUI.Text({
			content: "\nThis is a JPG : ",
			fontColor: new THREE.Color(0x5999ff)
		}),

		ThreeMeshUI.InlineImage({
			src: "./assets/threejs.jpg",
			height: 0.2,
			width: 0.42,
			borderRadius: 0.04
		}),

		ThreeMeshUI.Text({ content: `\nYou can use the 'borderRadius' and 'backgroundSize' attributes on this component. Note the rounded corners of the JPG image. Here the images are 512x512 pixels, but our components are manually sized and not square. What keeps the texture from stretching is the 'backgroundSize' attribute, which by default is set to 'cover'.` })

	);

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
