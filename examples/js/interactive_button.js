
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';

var scene, camera, renderer, controls, raycaster, control;

window.addEventListener('load', ()=> {
	init();
});

window.addEventListener('resize', ()=> {
	onWindowResize();
});

function init() {

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

	// Room

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// Light

	scene.add( new THREE.HemisphereLight( 0x808080, 0x606060 ) );

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 0, 6, 0 );
	light.castShadow = true;
	light.shadow.camera.top = 2;
	light.shadow.camera.bottom = - 2;
	light.shadow.camera.right = 2;
	light.shadow.camera.left = - 2;
	light.shadow.mapSize.set( 4096, 4096 );
	scene.add( light );

	//

	const sphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 0.1, 16, 16 ),
		new THREE.MeshLambertMaterial()
	);

	sphere.position.set( 0, 1, -1 )

	scene.add( sphere );

	// Controller

	control = VRControl( renderer );

	control.controllers.forEach( (controller)=> {
		scene.add( controller );
	});

	control.controllerGrips.forEach( (controllerGrip)=> {
		scene.add( controllerGrip );
	});

	//

	renderer.setAnimationLoop( loop );

};

//

function VRControl( renderer ) {

	const controllers = [];
	const controllerGrips = [];

	const controllerModelFactory = new XRControllerModelFactory();

	/*
	const geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

	const line = new THREE.Line( geometry );
	line.name = 'line';
	line.scale.z = 5;
	*/

	const geometry = new THREE.BoxBufferGeometry( 0.004, 0.004, 0.35 );
	geometry.translate( 0, 0, -0.15 );
	const line = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );

	new THREE.TextureLoader().load('./assets/alpha-map.png', (texture)=> {
		line.material.alphaMap = texture;
	});

	//

	const controller1 = renderer.xr.getController( 0 );
	const controller2 = renderer.xr.getController( 1 );
	const controllerGrip1 = renderer.xr.getControllerGrip( 0 );
	const controllerGrip2 = renderer.xr.getControllerGrip( 1 );

	if ( controller1 ) controllers.push( controller1 );
	if ( controller2 ) controllers.push( controller2 );
	if ( controllerGrip1 ) controllerGrips.push( controllerGrip1 );
	if ( controllerGrip2 ) controllerGrips.push( controllerGrip2 );

	// controller2.addEventListener( 'selectstart', onSelectStart );
	// controller2.addEventListener( 'selectend', onSelectEnd );

	controllers.forEach( (controller)=> {
		controller.add( line.clone() );
	});

	controllerGrips.forEach( (controllerGrip)=> {
		controllerGrip.add( controllerModelFactory.createControllerModel( controllerGrip ) );
	});

	//

	raycaster = new THREE.Raycaster();

	return {
		controllers,
		controllerGrips
	};

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
};
