
/*
	Job: Create and return a plane mesh according to dimensions and style parameters
	Knows: Dimension and style of the plane to create
*/

import { Mesh, ShapeBufferGeometry, MeshLambertMaterial } from 'three';

//

export default function Frame( width, height, borderRadius, material ) {

	var shape = new THREE.Shape();

	roundedRect( shape, width, height, borderRadius );

	const geometry = new ShapeBufferGeometry( shape );

	//

	const mesh = new Mesh(
		geometry,
		material
	);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	mesh.name = "MeshUI-Frame"

	return mesh;

};

//

function roundedRect( ctx, width, height, radius ) {

	const x = - width / 2 ;
	const y = - height / 2 ;

	ctx.moveTo( x, y + radius );
	ctx.lineTo( x, y + height - radius );
	ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
	ctx.lineTo( x + width - radius, y + height );
	ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
	ctx.lineTo( x + width, y + radius );
	ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
	ctx.lineTo( x + radius, y );
	ctx.quadraticCurveTo( x, y, x, y + radius );

};
