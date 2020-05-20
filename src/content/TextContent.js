
/*

Job:
 - From a given container, create glyphs
 - Call the right glyph creation/update functions from the './core' directory 

*/

import { Mesh, MeshNormalMaterial } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import GeometryGlyph from './glyphs/GeometryGlyph';

export default function TextContent( options ) {

	switch ( options.textType ) {

		case 'geometry' :
			return buildGeometryText();

	};

	function buildGeometryText() {

		const translatedGeom = [];

		options.inlines.forEach( (inline, i)=> {

			translatedGeom[ i ] = GeometryGlyph( inline.glyph, inline.fontSize, options.fontFamily );

			translatedGeom[ i ].translate( inline.offsetX, inline.offsetY, 0 );

		});

		const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

		return new Mesh( mergedGeom, options.fontMaterial );

	};

};
