
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';
import VRControl from './utils/VRControl.js';

var scene, camera, renderer, controls, raycaster, control, buttonsState;
var targets = [];
var objsToTest = [];

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

	scene.add( new THREE.HemisphereLight( 0x808080, 0x606060 ) );

	scene.add( new THREE.DirectionalLight( 0xffffff, 0.5 ) );

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

	buttonsState = ButtonsState();

	makePanel();

	//

	renderer.setAnimationLoop( loop );

};

//

function makePanel() {

	const sphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 0.2, 16, 16 ),
		new THREE.MeshLambertMaterial()
	);

	sphere.position.set( 0, 1, -1.5 )

	scene.add( sphere );

	objsToTest.push( sphere );

	buttonsState.add( sphere );

};

//

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};

//

function ButtonsState() {

	function add( threeOBJ ) {
		this.buttons[ threeOBJ.uuid ] = {
			obj: threeOBJ,
			state: null
		};
	};

	function isButton( threeOBJ ) {
		return this.buttons[ threeOBJ.uuid ] !== undefined
	};

	function updateState( newState ) {

		for ( let uuid of Object.keys(this.buttons) ) {

			if ( newState.hovered.indexOf( uuid ) > -1 ) {

				if ( this.buttons[uuid].state === 'hovered' ) continue

				this.buttons[uuid].state = "hovered";

				setHoveredStyle( this.buttons[uuid].obj );

			} else if ( newState.selected.indexOf( uuid ) > -1 ) {

				if ( this.buttons[uuid].state === 'selected' ) continue

				this.buttons[uuid].state = "selected";

				setSelectedStyle( this.buttons[uuid].obj );

			} else {

				if ( !this.buttons[uuid].state ) continue

				this.buttons[uuid].state = null;

				setIdleStyle( this.buttons[uuid].obj );

			};

		};

	};

	function setIdleStyle( object ) {
		object.material.emissive = new THREE.Color( 0x000000 );
	};

	function setHoveredStyle( object ) {
		object.material.emissive = new THREE.Color( 0x9c009c );
	};

	function setSelectedStyle( object ) {
		object.material.emissive = new THREE.Color( 0x0000ff );
	};

	return {
		buttons: {},
		add,
		isButton,
		updateState
	};

};

//

function loop() {

	controls.update();
	renderer.render( scene, camera );

	raycast();

};

//

function raycast() {

	targets = control.intersect( objsToTest );

	// Compare targeted objects with HOVERED buttons

	buttonsState.updateState( targets.reduce( (newState, target)=> {

		if ( buttonsState.isButton(target.object) ) {

			if ( (target.caster === undefined && control.mouseControlSelected) ||
				 (target.caster === 'controller-right' && control.rightControlSelected) ||
				 (target.caster === 'controller-left' && control.leftControlSelected) ) {

				newState.selected.push( target.object.uuid );

			} else {

				newState.hovered.push( target.object.uuid );

			};

		};

		return newState

	}, { hovered: [], selected: [] } ));

};
