
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';
import VRControl from './utils/VRControl.js';

var scene, camera, renderer, controls, raycaster, control, hovered;
var objects = [];

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

	objects.push( planeFront, planeBack, planeLeft, planeRight, planeCeil, planeFloor );

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

	control.handleSelectStart = function() {
		if ( hovered ) hovered.material.emissive = new THREE.Color( 0xff00ff ) ;
	};

	control.handleSelectEnd = function() {
		if ( hovered ) hovered.material.emissive = new THREE.Color( 0x000000 ) ;
	};
 	
 	//////////
	// Panel
	//////////

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

	objects.push( sphere );

};

//

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};

//

let target;

function loop() {

	controls.update();
	renderer.render( scene, camera );

	target = control.intersect( objects );

	if ( target && target.object ) {
		hovered = target.object;
	} else {
		hovered = undefined;
	};

};
