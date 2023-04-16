// xfg:title 			Interactive Button HTM
// xfg:category		extend
// xfg:group			hypermesh

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from 'three-mesh-ui';
import * as HyperThreeMesh from 'three-mesh-ui/examples/hyperthreemesh/HyperThreeMesh';
import ShadowedLight from './utils/ShadowedLight.js';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';
import InteractiveRaycaster from 'three-mesh-ui/examples/interactive/InteractiveRaycaster';
import { _injectCSS } from 'three-mesh-ui/examples/_setup/Html';
import InteractiveCursor from 'three-mesh-ui/examples/interactive/listeners/InteractiveCursor';
import VRControl from 'three-mesh-ui/examples/controls/VRControl';

let scene, camera, renderer, controls, vrControl, interactiveRaycaster;
let meshContainer, meshes, currentMesh;
const objsToTest = [];

_injectCSS( `

:root{

	background-color : rgba(0,0,0,0.75);
	padding: 0.05rem 0.125rem;
	border-radius: 0.2rem 0.02rem 0.2rem 0.02rem;

}

button{

	width : auto;
	padding: 0.02rem 0.15rem;
	margin: 0.01rem;

	text-align: center;
	background-color: rgba(255,255,255,0.5);
	border-radius : 0.08rem;
	rx: 0.005rem;
	border-bottom-width : 0.01rem;
	border-bottom-color : rgba(64,64,64,.5);
	border-top-width : 0;

}

button:hover {

	background-color: rgba(255,255,255,0.7);
	rx : 0.025rem;

}

button:disabled {

	background-color: rgba(255,255,255,0.3);
	color: rgba( 255,255,255,0.5);

}

button:disabled:hover {

	rx : 0.015rem;

}

button:active {

	rx : 0.01rem;
	border-top : rgba(103,103,103,0.8) 0.005rem solid;
	border-bottom-width : 0.005rem;
	border-bottom-color : #000;
	background-color: rgba(128,128,128,0.8);
}

`)

window.addEventListener( 'load', init );
window.addEventListener( 'resize', onWindowResize );

//

function init() {

	////////////////////////
	//  Basic Three Setup
	////////////////////////

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	// Orbit controls for no-vr

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );

	/////////
	// Room
	/////////

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	const roomMesh = new THREE.Mesh(
		new THREE.BoxGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.MeshBasicMaterial( { side: THREE.BackSide } )
	);

	scene.add( room );
	objsToTest.push( roomMesh );

	//////////
	// Light
	//////////

	const light = ShadowedLight( {
		z: 10,
		width: 6,
		bias: -0.0001
	} );

	const hemLight = new THREE.HemisphereLight( 0x808080, 0x606060 );

	scene.add( light, hemLight );

	////////////////
	// Controllers
	////////////////

	vrControl = VRControl( renderer );

	scene.add( vrControl.controllerGrips[ 0 ], vrControl.controllers[ 0 ] );

	interactiveRaycaster = new InteractiveRaycaster( camera, scene, renderer, vrControl );
	interactiveRaycaster.start();

	const interactiveCursor = new InteractiveCursor( renderer.domElement, 'pointer' );
	interactiveRaycaster.addListener( interactiveCursor );

	////////////////////
	// Primitive Meshes
	////////////////////

	meshContainer = new THREE.Group();
	meshContainer.position.set( 0, 1, -1.9 );
	scene.add( meshContainer );

	//

	const sphere = new THREE.Mesh(
		new THREE.IcosahedronGeometry( 0.3, 1 ),
		new THREE.MeshStandardMaterial( { color: 0x3de364, flatShading: true } )
	);

	const box = new THREE.Mesh(
		new THREE.BoxGeometry( 0.45, 0.45, 0.45 ),
		new THREE.MeshStandardMaterial( { color: 0x643de3, flatShading: true } )
	);

	const cone = new THREE.Mesh(
		new THREE.ConeGeometry( 0.28, 0.5, 10 ),
		new THREE.MeshStandardMaterial( { color: 0xe33d4e, flatShading: true } )
	);

	//

	sphere.visible = box.visible = cone.visible = false;

	meshContainer.add( sphere, box, cone );

	meshes = [ sphere, box, cone ];
	currentMesh = 0;

	showMesh( currentMesh );

	//////////
	// Panel
	//////////

	makePanel();

	//

	HyperThreeMesh.loadSheets();

	renderer.setAnimationLoop( loop );

}

// Shows the primitive mesh with the passed ID and hide the others

function showMesh( id ) {

	meshes.forEach( ( mesh, i ) => {

		mesh.visible = i === id;

	} );

}

///////////////////
// UI contruction
///////////////////

function makePanel() {


	const container = HyperThreeMesh.createElement( 'div' )
	container.style.borderRadius = 0.11;
	container.style.justifyContent = "center";
	container.style.flexDirection = 'row-reverse';
	container.style.padding = '0.02 0.05';

	// or go by standard way
	container.set( {
		fontFamily: FontJSON,
		fontTexture: FontImage,
		fontSize: 0.07,
	} );

	container.position.set( 0, 0.6, -1.2 );
	container.rotation.x = -0.55;
	scene.add( container );

	const buttonNext = HyperThreeMesh.createElement('button');
	buttonNext.set({width: 'auto', name: 'next'});
	buttonNext.name = 'nextBtn';
	// buttonNext.textContent = "next";

	const inl = HyperThreeMesh.createElement('span');
	inl.textContent = "next";
	buttonNext.add( inl );

	buttonNext.addEventListener( 'click' , (event) => {

		console.log( event.target.name );

		console.log( "catched event on buttonNext", event );

		currentMesh = ( currentMesh + 1 ) % 3;
		showMesh( currentMesh );

	});

	const disabledButton = HyperThreeMesh.createElement('button');
	disabledButton.set({width: 'auto', name: 'next'});
	disabledButton.disabled = true;
	disabledButton.textContent = 'Disabled'

	console.log( disabledButton.copyAttributes() );


	const buttonPrevious = HyperThreeMesh.createElement('button');
	buttonPrevious.set({width: 'auto', name: 'prev'});
	buttonPrevious.textContent = "previous";

	buttonPrevious.addEventListener( 'click' , (event) => {

		console.log( "catched event on buttonPrevious", event );

		currentMesh -= 1;
		if ( currentMesh < 0 ) currentMesh = 2;
		showMesh( currentMesh );

	});

	container.add( buttonNext, disabledButton, buttonPrevious );

	interactiveRaycaster.addObject( buttonNext, disabledButton, buttonPrevious );


}

// Handle resizing the viewport

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function loop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();
	controls.update();
	interactiveRaycaster.update();
	HyperThreeMesh.update();


	meshContainer.rotation.z += 0.01;
	meshContainer.rotation.y += 0.01;

	renderer.render( scene, camera );

}

