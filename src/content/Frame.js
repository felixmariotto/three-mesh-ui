
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

	var shape = new Shape();

	roundedRect( shape, width, height, borderRadius );

	const geometry = new ShapeBufferGeometry( shape );

	//

	const mesh = new Mesh(
		geometry,
		material
	);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	mesh.name = "MeshUI-Frame";

	mesh.updateUVs = function updateUVs( backgroundSize ) {

		switch( backgroundSize ) {

			case 'stretch' :
				mapStretchUVs( width, height, geometry );
				break

			case 'contain' :
				if ( mesh.material.map ) mapFitUVs( backgroundSize, width, height, geometry, mesh.material.map );
				else mapStretchUVs( width, height, geometry );
				break

			case 'cover' :
				if ( mesh.material.map ) mapFitUVs( backgroundSize, width, height, geometry, mesh.material.map );
				else mapStretchUVs( width, height, geometry );
				break

			default :
				console.warn(`'${ backgroundSize }' is an unknown value for the backgroundSize attribute`)

		};

		geometry.attributes.uv.needsUpdate = true;

	};

	mesh.updateUVs( backgroundSize );

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

//

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

//

function mapFitUVs( backgroundSize, width, height, geometry, texture ) {

	const imageHeight = texture.image.height;
	const imageWidth = texture.image.width;

	const yFitDimensions = new Vector2(
		(height * imageWidth) / imageHeight,
		height
	);

	const xFitDimensions = new Vector2(
		width,
		(width * imageHeight) / imageWidth
	);

	let fitDimensions;

	if ( backgroundSize === "contain" ) {

		fitDimensions = xFitDimensions.length() < yFitDimensions.length() ? xFitDimensions : yFitDimensions;
	
	} else {

		fitDimensions = xFitDimensions.length() > yFitDimensions.length() ? xFitDimensions : yFitDimensions;

	};

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

	    console.log( dummyVec.x )

	    uvAttribute.setXY( i, dummyVec.x, dummyVec.y );

	};

};
