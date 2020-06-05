
/*

Job: Create and return a plane mesh according to dimensions and style parameters

Knows: Dimension and style of the plane to create

*/

import { ShapeBufferGeometry } from 'three/src/geometries/ShapeGeometry.js';
import { Mesh } from 'three/src/objects/Mesh.js';
import { Vector2 } from 'three/src/math/Vector2.js';
import { Shape } from 'three/src/extras/core/Shape.js';

//

export default function Frame( width, height, borderRadius, backgroundSize, material ) {

	var shape = RoundedRectShape( width, height, borderRadius );

	const geometry = new ShapeBufferGeometry( shape );

	const mesh = new Mesh(
		geometry,
		material
	);

	mesh.castShadow = true;
	mesh.receiveShadow = true;
	
	mesh.name = "MeshUI-Frame";

	mesh.width = width;
	mesh.height = height;

	mesh.updateUVs = updateUVs;
	mesh.updateUVs( backgroundSize ); // cover, contain, or stretch

	return mesh;

};

// Returns a THREE.Shape of rounded rectangle

function RoundedRectShape( width, height, radius ) {

	const ctx = new Shape();

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

	return ctx

};

// Call the right function to update the geometry UVs depending on the backgroundSize param

function updateUVs( backgroundSize ) {

	const texture = this.material.uniforms.u_texture ?
						this.material.uniforms.u_texture.value :
						null;

	switch( backgroundSize ) {

		case 'stretch' :
			mapStretchUVs( this.width, this.height, this.geometry );
			break

		case 'contain' :
			if ( texture ) mapFitUVs( backgroundSize, this.width, this.height, this.geometry, texture );
			else mapStretchUVs( this.width, this.height, this.geometry );
			break

		case 'cover' :
			if ( texture ) mapFitUVs( backgroundSize, this.width, this.height, this.geometry, texture );
			else mapStretchUVs( this.width, this.height, this.geometry );
			break

		default :
			console.warn(`'${ backgroundSize }' is an unknown value for the backgroundSize attribute`)

	};

	this.geometry.attributes.uv.needsUpdate = true;

};

// Update the UVs of the passed geometry so that the
// left-most point will be u = 0 and the right-most
// point will be u = 1. Same for V direction.

function mapStretchUVs( width, height, geometry ) {

	const uvAttribute = geometry.attributes.uv;
	const posAttribute = geometry.attributes.position;

	const dummyVec = new Vector2();
	const offset = new Vector2( width / 2, height / 2 );
		
	for ( var i = 0; i < posAttribute.count; i ++ ) {
			
	    dummyVec.x = posAttribute.getX( i );
	    dummyVec.y = posAttribute.getY( i );

	    dummyVec.add( offset );

	    // Stretch the texture to make it size like the geometry
	    dummyVec.x /= width;
	    dummyVec.y /= height;

	    uvAttribute.setXY( i, dummyVec.x, dummyVec.y );

	};

};

// Update the UVs of the passed geometry so that the passed texture
// is not deformed and is fit to the geometry's border.
// Depending on the backgroundSize parameter, the texture will
// overflow in the smallest axis of the geometry and fit the widest,
// or the reverse.

function mapFitUVs( backgroundSize, width, height, geometry, texture ) {

	const imageHeight = texture.image.height;
	const imageWidth = texture.image.width;

	// get the dimension of the texture that fit the Y direction of the geometry
	const yFitDimensions = new Vector2(
		(height * imageWidth) / imageHeight,
		height
	);

	// get the dimension of the texture that fit the X direction of the geometry
	const xFitDimensions = new Vector2(
		width,
		(width * imageHeight) / imageWidth
	);

	// Depending on the backgroundSize attribute, we keep either yFitDimensions or xFitDimensions

	let fitDimensions;

	if ( backgroundSize === "contain" ) {

		fitDimensions = xFitDimensions.length() < yFitDimensions.length() ? xFitDimensions : yFitDimensions;
	
	} else {

		fitDimensions = xFitDimensions.length() > yFitDimensions.length() ? xFitDimensions : yFitDimensions;

	};

	// Update UVs

	const uvAttribute = geometry.attributes.uv;
	const posAttribute = geometry.attributes.position;

	const dummyVec = new Vector2();
	const offset = new Vector2( width / 2, height / 2 );
		
	for ( var i = 0; i < posAttribute.count; i ++ ) {
			
	    dummyVec.x = posAttribute.getX( i );
	    dummyVec.y = posAttribute.getY( i );

	    dummyVec.add( offset );

	    // resize the texture so it does not stretch
	    dummyVec.x /= fitDimensions.x;
	    dummyVec.y /= fitDimensions.y;

	    // center the texture
	    dummyVec.x -= (( width / fitDimensions.x ) / 2) - 0.5;
	    dummyVec.y -= (( height / fitDimensions.y ) / 2) - 0.5;

	    uvAttribute.setXY( i, dummyVec.x, dummyVec.y );

	};

};
