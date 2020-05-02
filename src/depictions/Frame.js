
/*
	Job: Create and return a plane mesh according to dimensions and style parameters
	Knows: Dimension and style of the plane to create
*/

import { Mesh, PlaneBufferGeometry, MeshLambertMaterial } from 'three';
import DEFAULTS from '../utils/Defaults';

function Frame( width, height, material ) {

	const mesh = new Mesh(
		new PlaneBufferGeometry( width, height ),
		material ? material : DEFAULTS.frameMaterial
	);
	mesh.name = "MeshUI-Frame"

	return mesh;

};

export default Frame
