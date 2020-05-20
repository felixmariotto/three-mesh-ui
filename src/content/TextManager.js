
/*

Job:
 - From a given container, create glyphs
 - Call the right glyph creation/update functions from the './core' directory 

*/

import { Mesh, MeshNormalMaterial } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import GeometryGlyph from './glyphs/GeometryGlyph';

export default function TextContent() {

	return {
		create,
		getGlyphDimensions
	};

	//

	function getGlyphDimensions( options ) {

		const FONT = options.font;
		const FONT_SIZE = options.fontSize; 
		const GLYPH = options.glyph;

		const width = FONT.data.glyphs[ GLYPH ] ? FONT.data.glyphs[ GLYPH ].ha * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

		const height = FONT.data.glyphs[ GLYPH ] ? FONT.data.lineHeight * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

		const ascender = FONT.data.glyphs[ GLYPH ] ? FONT.data.ascender * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

		const anchor = height - ascender;

		return {
			width,
			height,
			anchor
		};

	};

	//

	function create( options ) {

		switch ( options.textType ) {

			case 'geometry' :
				return buildGeometryText( options );

		};

	};

	//

	function buildGeometryText( options ) {

		const translatedGeom = [];

		options.inlines.forEach( (inline, i)=> {

			translatedGeom[ i ] = GeometryGlyph( inline.glyph, inline.fontSize, options.fontFamily );

			translatedGeom[ i ].translate( inline.offsetX, inline.offsetY, 0 );

		});

		const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

		return new Mesh( mergedGeom, options.fontMaterial );

	};

};
