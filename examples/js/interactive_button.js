
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';
import VRControl from './utils/VRControl.js';
import ShadowedLight from './utils/ShadowedLight.js';

var scene, camera, renderer, controls, raycaster, control;
var meshContainer, meshes, currentMesh;
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

	control = VRControl( renderer, camera, scene );

	control.controllers.forEach( (controller)=> {
		scene.add( controller );
	});

	control.controllerGrips.forEach( (controllerGrip)=> {
		scene.add( controllerGrip );
	});

	//////////
	// Meshes
	//////////

	meshContainer = new THREE.Group();
	meshContainer.position.set( 0, 1, -1.9 );
	scene.add( meshContainer );

	const sphere = new THREE.Mesh(
		new THREE.IcosahedronBufferGeometry( 0.3, 1 ),
		new THREE.MeshStandardMaterial({ color: 0x3de364, flatShading: true })
	);
	sphere.visible = false;

	const box = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 0.45, 0.45, 0.45 ),
		new THREE.MeshStandardMaterial({ color: 0x643de3, flatShading: true })
	);
	box.visible = false;

	const cone = new THREE.Mesh(
		new THREE.ConeBufferGeometry( 0.28, 0.5, 10 ),
		new THREE.MeshStandardMaterial({ color: 0xe33d4e, flatShading: true })
	);
	cone.visible = false;

	meshContainer.add( sphere, box, cone );

	meshes = [ sphere, box, cone ];
	currentMesh = 0;

	showMesh( currentMesh );
 	
 	//////////
	// Panel
	//////////

	makePanel();

	//

	renderer.setAnimationLoop( loop );

};

//

function showMesh( id ) {

	meshes.forEach( (mesh, i)=> {
		mesh.visible = i === id ? true : false;
	});

};

//

function makePanel() {

	const uiContainer = new THREE.Group();
	uiContainer.position.set( 0, 0.6, -1.2 );
	uiContainer.rotation.x = -0.55;
	scene.add( uiContainer );

	const material = new THREE.MeshLambertMaterial({
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.5
	});

	const hoveredMaterial = new THREE.MeshLambertMaterial({
		side: THREE.DoubleSide
	});

	// CONTAINER

	const container = ThreeMeshUI.Block({
		justifyContent: 'center',
		alignContent: 'center',
		contentDirection: "row-reverse",
		fontFamily: './assets/helvetiker_regular.typeface.json',
		backgroundMaterial: material
	});

	componentsToTest.push( container );

	// BUTTON

	const buttonOptions = {
		width: 0.5,
		height: 0.2,
		padding: 0.05,
		justifyContent: 'center',
		alignContent: 'center',
		offset: 0.05,
		fontSize: 0.07,
		margin: 0.05
	};

	const hoveredStateOptions = {
		state: "hovered",
		attributes: {
			offset: 0.05,
			backgroundMaterial: hoveredMaterial
		},
		onSet: ()=> { /* console.log('I get called when button is set hovered') */ }
	};

	const idleStateOptions = {
		state: "idle",
		attributes: {
			offset: 0.05,
			backgroundMaterial: material
		},
		onSet: ()=> { /* console.log('I get called when button is set idle') */ }
	};

	const buttonNext = ThreeMeshUI.Block( buttonOptions );
	const buttonPrevious = ThreeMeshUI.Block( buttonOptions );

	buttonNext.appendChild(
		ThreeMeshUI.Text({
			content: "next",
		})
	);

	buttonPrevious.appendChild(
		ThreeMeshUI.Text({
			content: "previous"
		})
	);

	buttonNext.setupState({
		state: "selected",
		attributes: {
			offset: 0.02,
			backgroundMaterial: hoveredMaterial
		},
		onSet: ()=> {
			currentMesh = (currentMesh + 1) % 3 ;
			showMesh( currentMesh );
		}
	});
	buttonNext.setupState( hoveredStateOptions );
	buttonNext.setupState( idleStateOptions );

	buttonPrevious.setupState({
		state: "selected",
		attributes: {
			offset: 0.02,
			backgroundMaterial: hoveredMaterial
		},
		onSet: ()=> {
			currentMesh -= 1;
			if ( currentMesh < 0 ) currentMesh = 2;
			showMesh( currentMesh );
		}
	});
	buttonPrevious.setupState( hoveredStateOptions );
	buttonPrevious.setupState( idleStateOptions );

	container.appendChild( buttonNext, buttonPrevious );
	componentsToTest.push( buttonNext, buttonPrevious );

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

	meshContainer.rotation.x += 0.01;
	meshContainer.rotation.y += 0.01;

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
