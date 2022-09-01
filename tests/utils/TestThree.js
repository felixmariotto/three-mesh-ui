/* global THREE, ThreeMeshUI */

export const buildThreeSetup = function (){

	const scene = new THREE.Scene();

	const WIDTH = window.innerWidth;
	const HEIGHT = window._innerHeight;
	const camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	const renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );

	document.body.appendChild( renderer.domElement );

	camera.position.set( 0, 1.6, 0 );

	const render = () => {
		ThreeMeshUI.update();
		// renderer.render( scene, camera );
	}

	return { renderer, scene, camera, render };

}
