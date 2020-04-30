
/*
	Job: Create and return a plane mesh according to dimensions and style parameters
	Knows: Dimension and style of the plane to create
*/

import { Mesh, PlaneBufferGeometry, MeshLambertMaterial } from 'three';
import MaterialLibrary from '../core/MaterialLibrary'

function Frame( width, height, material ) {

	const mesh = new Mesh(
		new PlaneBufferGeometry( width, height ),
		material ? material : MaterialLibrary.DEFAULTS.frameMaterial
	);
	mesh.name = "MeshUI-Frame"

	return mesh;

};

export default Frame
