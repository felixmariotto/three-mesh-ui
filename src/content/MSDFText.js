import { Mesh } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import MSDFGlyph from './MSDFGlyph.js';

/**

Job:
- Computing glyphs dimensions according to this component's font and content
- Create the text Mesh (call MSDFGlyph for each letter)

Knows:
- The Text component for which it creates Meshes
- The parameters of the text mesh it must return

 */

function getGlyphDimensions( options ) {

	const FONT = options.font;

	const FONT_SIZE = options.fontSize;

	const GLYPH = options.glyph;

	const SCALE_MULT = FONT_SIZE / FONT.info.size;

	//

	const charOBJ = FONT.chars.find( charOBJ => charOBJ.char === GLYPH );

	let width = charOBJ ? charOBJ.width * SCALE_MULT : FONT_SIZE / 3;

	let height = charOBJ ? charOBJ.height * SCALE_MULT : 0;

	// handle exported whitespaces
	if ( width === 0 ) {

		// if this whitespaces in is the charset, use its xadvance value
		// or fallback to fontSize
		width = charOBJ ? charOBJ.xadvance * SCALE_MULT : FONT_SIZE;

	}


	if ( height === 0 ) height = FONT_SIZE * 0.7;

	if ( GLYPH === '\n' ) width = 0;

	const xadvance = charOBJ ? charOBJ.xadvance * SCALE_MULT : width;
	const xoffset = charOBJ ? charOBJ.xoffset * SCALE_MULT : 0;

	// world-space length between lowest point and the text cursor position
	// const anchor = charOBJ ? ( ( charOBJ.yoffset + charOBJ.height - FONT.common.base ) * FONT_SIZE ) / FONT.common.lineHeight : 0;

	const anchor = charOBJ ? charOBJ.yoffset * SCALE_MULT : 0;

	// console.log( lineHeight )

	return {
		// lineHeight,
		width,
		height,
		anchor,
		xadvance,
		xoffset
	};

}


/**
 * Try to find the kerning amount of a
 * @param font
 * @param {string} glyphPair
 * @returns {number}
 */
function getGlyphPairKerning( font, glyphPair ) {

	const KERNINGS = font._kernings;
	return KERNINGS[ glyphPair ] ? KERNINGS[ glyphPair ] : 0;

}


//

/**
 * Creates a THREE.Plane geometry, with UVs carefully positioned to map a particular
 * glyph on the MSDF texture. Then creates a shaderMaterial with the MSDF shaders,
 * creates a THREE.Mesh, returns it.
 * @private
 */
function buildText() {

	const translatedGeom = [];

	this.inlines.forEach( ( inline, i ) => {

		translatedGeom[ i ] = new MSDFGlyph( inline, this.getFontFamily() );

		translatedGeom[ i ].translate( inline.offsetX, inline.offsetY, 0 );

	} );

	const mergedGeom = mergeGeometries( translatedGeom );

	const mesh = new Mesh( mergedGeom, this.getFontMaterial() );

	return mesh;

}

//

export default {
	getGlyphDimensions,
	getGlyphPairKerning,
	buildText
};
