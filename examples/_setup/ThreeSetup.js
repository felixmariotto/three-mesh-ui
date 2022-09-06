import Stats from 'three/examples/jsm/libs/stats.module';
import * as ThreeMeshUI from 'three-mesh-ui';
import { Color, Scene, Vector3, WebGLRenderer } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const _updater = [];
const _resizer = [];

let scene, renderer, controls, stats;
let _camera;

export const exampleThreeSetup = function ( camera ) {

	_camera = camera;

	const WIDTH = window.innerWidth;
	const HEIGHT = window.innerHeight;

	scene = new Scene();
	scene.background = new Color( 0x505050 );

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
	controls.target = new Vector3( 0, 1, -1.8 );
	controls.update();

	controls.addEventListener( 'change', ()=>{
		exampleRender();
	} );

	window.addEventListener('resize', onWindowResize );

	renderer.setAnimationLoop( exampleRender );

	return {scene, renderer, controls, stats};

}

export const controlsUpdate = function() {

	controls.update();
	requestAnimationFrame( controlsUpdate );

}


export const exampleAddUpdate = function ( fct ) {

	_updater.push( fct );

}

export const exampleManualRender = function () {

	requestAnimationFrame( exampleRender );

}

export const exampleManualRenderThreeOnly = function( ) {

	renderer.render( scene, _camera );

}

export const exampleRender = function (){

	// console.log( "RENDER ---------------------------------- ");

	for ( let i = 0; i < _updater.length; i++ ) {
		_updater[ i ]();
	}

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	// controls.update();
	renderer.render( scene, _camera );
	stats.update()

}

export const exampleNoRenderLoop = function () {
	renderer.setAnimationLoop( ()=>{ } );
}

export const exampleAddResizer = function ( fct ) {

	_resizer.push( fct );

}

// handles resizing the renderer when the viewport is resized
function onWindowResize() {

	renderer.setSize( window.innerWidth, window.innerHeight );

	for ( let i = 0; i < _resizer.length; i++ ) {
		_resizer[ i ]();
	}

}


