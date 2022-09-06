import { OrthographicCamera } from 'three';

let camera;

export const exampleCameraOrthographic = function () {

	const WIDTH = window.innerWidth;
	const HEIGHT = window.innerHeight;

	// use of orthgraphic camera to increase matching
	camera = new OrthographicCamera( WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, 1, 1000 );
	camera.position.set( 0, 0, 0 );

	camera.zoom = 400;
	camera.updateProjectionMatrix();

	window.camera = camera;

	return {camera};

}

export const exampleCameraOrthographicResize = function () {

	const W = window.innerWidth;
	const H = window.innerHeight;

	camera.left = W / -2;
	camera.right = W / 2;
	camera.top = H / 2;
	camera.bottom = -H / 2;

	camera.updateProjectionMatrix();

}
