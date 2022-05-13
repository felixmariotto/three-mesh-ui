
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/experimental/CameraControls';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import * as ThreeMeshUI from 'three-mesh-ui';
import { Color, LineBasicMaterial, LineSegments, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';


const _updater = [];

let scene, camera, renderer, controls, stats, room;

export const exampleThreeSetup = function () {

	const WIDTH = window.innerWidth;
	const HEIGHT = window.innerHeight;

	scene = new Scene();
	scene.background = new Color( 0x505050 );

	camera = new PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	renderer = new WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;

	document.body.appendChild(VRButton.createButton(renderer));
	document.body.appendChild( renderer.domElement );

	stats = new Stats();
	document.body.appendChild( stats.dom );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 1.5 );
	controls.target = new Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	room = new LineSegments(
		new BoxLineGeometry( 6, 6, 6, 32, 32, 32 ).translate( 0, 3, 0 ),
		new LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	window.addEventListener('resize', onWindowResize );

	renderer.setAnimationLoop( loop );

	return {scene, camera, renderer, controls, stats, room};

}

export const exampleAddUpdate = function ( fct ) {

	_updater.push( fct );

}

function loop(){

	for ( let i = 0; i < _updater.length; i++ ) {
		_updater[ i ]();
	}

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );
	stats.update()

}

// handles resizing the renderer when the viewport is resized
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
