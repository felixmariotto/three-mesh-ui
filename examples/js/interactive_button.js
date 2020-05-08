
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';
import VRControl from './utils/VRControl.js';
import ShadowedLight from './utils/ShadowedLight.js';

var scene, camera, renderer, controls, raycaster, control;
var targets = [];
var objsToTest = [];
var componentsToTest = [];

window.addEventListener('load', ()=> {
	init();
});

window.addEventListener('resize', ()=> {
	onWindowResize();
});

function init() {

	////////////////////////
	//  BASIC THREE SETUP
	////////////////////////

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.xr.enabled = true;
	document.body.appendChild(VRButton.createButton(renderer));
	document.body.appendChild( renderer.domElement );
	renderer.shadowMap.enabled = true ;

	// Orbit controls for no-vr

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	/////////
	// Room
	/////////

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// Planes for intersections with the controller pointers

	var planeFront = new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 3 );
	var planeBack = new THREE.Plane( new THREE.Vector3( 0, 0, -1 ), 3 );
	var planeLeft = new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), 3 );
	var planeRight = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 3 );
	var planeCeil = new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 6 );
	var planeFloor = new  THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );

	objsToTest.push( planeFront, planeBack, planeLeft, planeRight, planeCeil, planeFloor );

	//////////
	// Light
	//////////

	const light = ShadowedLight({
		z: 10,
		width: 6,
		bias: -0.0001
	});

	const hemLight = new THREE.HemisphereLight( 0x808080, 0x606060 );

	scene.add( light, hemLight );

	////////////////
	// Controllers
	////////////////

	control = VRControl( renderer, camera );

	control.controllers.forEach( (controller)=> {
		scene.add( controller );
	});

	control.controllerGrips.forEach( (controllerGrip)=> {
		scene.add( controllerGrip );
	});
 	
 	//////////
	// Panel
	//////////

	makePanel();

	//

	renderer.setAnimationLoop( loop );

};

//

function makePanel() {

	const uiContainer = new THREE.Group();
	uiContainer.position.set( 0, 1, -1.8 );
	uiContainer.rotation.x = -0.55;
	scene.add( uiContainer );

	const material = new THREE.MeshLambertMaterial({
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.5
	});

	// CONTAINER

	const container = ThreeMeshUI.Block({
		padding: 0.2,
		justifyContent: 'center',
		alignContent: 'center',
		fontFamily: './assets/helvetiker_regular.typeface.json',
		backgroundMaterial: material
	});

	// BUTTON

	const button = ThreeMeshUI.Block({
		width: 0.5,
		height: 0.2,
		padding: 0.05,
		justifyContent: 'center',
		alignContent: 'center',
		offset: 0.05
	});

	button.appendChild(
		ThreeMeshUI.Text({
			content: "click me",
			fontSize: 0.07
		})
	);

	button.setupState({
		state: "selected",
		attributes: {
			offset: 0.02
		},
		onSet: ()=> { console.log('I get called when button is set selected') }
	});

	button.setupState({
		state: "hovered",
		attributes: {
			offset: 0.04
		},
		onSet: ()=> { console.log('I get called when button is set hovered') }
	});

	button.setupState({
		state: "idle",
		attributes: {
			offset: 0.05
		},
		onSet: ()=> { console.log('I get called when button is set idle') }
	});

	container.appendChild( button );

	componentsToTest.push( button );

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

	raycast();

};

//

function raycast() {

	control.intersectObjects( objsToTest );

	targets = control.intersectUI( componentsToTest );

	targets.forEach( (target)=> {

		if ( (target.caster === undefined && control.mouseControlSelected) ||
			 (target.caster === 'controller-right' && control.rightControlSelected) ||
			 (target.caster === 'controller-left' && control.leftControlSelected) ) {

			target.object.setState( 'selected' );

		} else {

			target.object.setState( 'hovered' );

		};

	});

	componentsToTest.forEach( (component)=> {

		const found = targets.find( (target)=> {
			return target.object === component
		});

		if ( !found ) component.setState( 'idle' );

	});

};
