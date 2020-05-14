
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls ;

let bigText = '';

for (let i = 0 ; i < 20 ; i++) {
	bigText += 'MSDFText is very performant when rendering big text because the glyphs are textures on simple planes geometries, all merged together. ';
};

window.addEventListener('load', ()=> {
	init();
});

window.addEventListener('resize', ()=> {
	onWindowResize();
});

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.02, 100 );

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

	const fontMaterial = new THREE.MeshBasicMaterial();
	const transparentMaterial = new THREE.MeshBasicMaterial({
		transparent: true,
		opacity: 0
	});

	//

	const container = ThreeMeshUI.Block({
		padding: 0.05,
		fontFamily: './assets/roboto-msdf.json',
		fontTexture: './assets/roboto-msdf.png',
		fontMaterial: fontMaterial
	});

	uiContainer.add( container.threeOBJ );

	//

	const bigTextContainer = ThreeMeshUI.Block({
		padding: 0.03,
		margin: 0.03,
		width: 1.5,
		height: 1.2,
		justifyContent: 'center',
		alignContent: 'left',
		backgroundMaterial: transparentMaterial
	});

	bigTextContainer.appendChild(

		ThreeMeshUI.MSDFText({
			content: bigText,
			fontSize: 0.034
		})

	);

	//

	const titleContainer = ThreeMeshUI.Block({
		width: 0.9,
		height: 0.25,
		padding: 0.04,
		margin: 0.03,
		backgroundMaterial: transparentMaterial
	}).appendChild(

		ThreeMeshUI.MSDFText({
			content: "Do you need to render a big text ?",
			fontSize: 0.07
		})

	);

	//

	container.appendChild( titleContainer, bigTextContainer );

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
