import { PerspectiveCamera } from 'three';

let camera;

export const exampleCameraPerspective = function () {

	camera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.set( 0, 1.6, 1.5 );

	return {camera};

}

export const exampleCameraPerspectiveResize = function () {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

}
