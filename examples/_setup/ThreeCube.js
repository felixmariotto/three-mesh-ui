import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three';

let cube;

export const exampleThreeCube = function( scene, material = null ){

	cube = new Mesh(
		new BoxGeometry(0.5,0.5,0.5),
		material ? material : new MeshLambertMaterial({color:0x99ff00})
	);

	cube.position.set(0,1,-1.5);
	scene.add( cube );

	return cube;

}

export const rollCubeUpdate = function () {

	cube.rotation.y += 1/30;
	cube.rotation.z += 1/30;

}
