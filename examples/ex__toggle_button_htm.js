// xfg:title 			ToggleButton HTM
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
let meshContainer, sphere, box, cone;
const objsToTest = [];

_injectCSS( `

:root{

	background-color : rgba(0,0,0,0.75);
	padding: 0.05rem 0.125rem;
	border-radius: 0.2rem 0.02rem 0.2rem 0.02rem;
	align-items: start;

}

button[type="toggle"]{

	font-size: 0.055rem;

	width : 0.5rem;
	margin: 0.01rem;

	border-radius: 0.02rem;

	text-align: left;
	rx: 0.005rem;

}

button[type="toggle"] ascent {

	rx : 0;
	background-color : rgba(0,0,0,0.05);
	border-width: 0.01rem;
	border-color: rgba(255,255,255,.9);

}

button[type="toggle"]:hover ascent{

	rx : 0.025rem;

}

button[type="toggle"]:disabled {

	color: rgba( 255,255,255,0.5);

}

button[type="toggle"]:disabled ascent {

	border-color: rgba( 128,128,128,0.5);

}

button[type="toggle"]:disabled:hover ascent {

	rx : 0.015rem;

}

button[type="toggle"]:active ascent {

	rx : 0.01rem;

}

button[type="toggle"]:checked ascent {

	background-color : rgba(0,225,128,.85);

}

button[type="toggle"]:checked:hover ascent {

background-color : rgba(0,225,128,.99);

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
		bias: -0.0001,
		intensity: 1.8
	} );

	// const hemLight = new THREE.HemisphereLight( 0x808080, 0x606060 );

	// scene.add( light, hemLight );
	scene.add( light );

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
	meshContainer.position.set( -0.5, 1.25, -1.2 );
	scene.add( meshContainer );

	//

	sphere = new THREE.Mesh(
		new THREE.IcosahedronGeometry( 0.3, 1 ),
		new THREE.MeshStandardMaterial( { color: 0x3de364 } )
	);

	box = new THREE.Mesh(
		new THREE.BoxGeometry( 0.45, 0.45, 0.45 ),
		new THREE.MeshStandardMaterial( { color: 0x643de3 } )
	);

	cone = new THREE.Mesh(
		new THREE.ConeGeometry( 0.22, 0.5, 10 ).translate(0,0.425,0),
		new THREE.MeshStandardMaterial( { color: 0xe33d4e } )
	);

	//

	sphere.visible = box.visible = cone.visible = false;

	meshContainer.add( sphere, box, cone );

	//////////
	// Panel
	//////////

	makePanel();

	//

	HyperThreeMesh.loadSheets();

	renderer.setAnimationLoop( loop );

}

///////////////////
// UI contruction
///////////////////

function makePanel() {


	const container = HyperThreeMesh.createElement( 'div' )
	container.style.borderRadius = 0.11;
	container.style.justifyContent = "center";
	container.style.flexDirection = 'column';
	container.style.padding = '0.02 0.05';

	// or go by standard way
	container.set( {
		fontFamily: FontJSON,
		fontTexture: FontImage,
		fontSize: 0.07,
	} );

	container.position.set( 0.5, 1.25, -1.2 );
	container.rotation.x = -0.55;
	scene.add( container );

	/**
	 *
	 * @type {HTMButtonToggle}
	 */
	const buttonSphere = HyperThreeMesh.createElement('toggle', {name:"sphere",textContent:"Show sphere"});

	buttonSphere.addEventListener( 'change', () => {
		sphere.visible = buttonSphere.checked;
	});

	const disabledButton = HyperThreeMesh.createElement('toggle');
	disabledButton.set({name: 'disabled'});
	disabledButton.disabled = true;
	disabledButton.textContent = 'Disabled toggle'

	const buttonIcosahedron = HyperThreeMesh.createElement('toggle',{name:'Icosahedron',textContent:"Show Icosahedron"});
	buttonIcosahedron.addEventListener( 'change', (event) => {
		cone.visible = event.target.checked;
	});

	const buttonBox = HyperThreeMesh.createElement('toggle',{name:'Icosahedron',textContent:"Show box"});
	buttonBox.addEventListener( 'change', () => {
		box.visible = buttonBox.checked;
	});

	const buttonFlat = HyperThreeMesh.createElement('toggle',{name:'flat',textContent:"Flatshading"});
	buttonFlat.addEventListener( 'change', ( event ) => {
		sphere.material.flatShading = box.material.flatShading = cone.material.flatShading = event.target.checked;
		sphere.material.needsUpdate = box.material.needsUpdate = cone.material.needsUpdate = true;
	})

	const buttonWire = HyperThreeMesh.createElement('toggle',{name:'wire',textContent:"Wireframe"});
	buttonWire.addEventListener( 'change', (event) => {
		sphere.material.wireframe = box.material.wireframe = cone.material.wireframe = event.target.checked;
	});

	container.add( buttonSphere, disabledButton, buttonIcosahedron, buttonBox, buttonFlat, buttonWire );

	interactiveRaycaster.addObject( buttonSphere, disabledButton, buttonIcosahedron, buttonBox, buttonFlat, buttonWire );


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

