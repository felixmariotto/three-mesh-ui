
import { Mesh } from 'three/src/objects/Mesh.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

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

	let width, height, anchor, charOBJ;

	//

	charOBJ = FONT.chars.find( charOBJ => charOBJ.char === GLYPH );

	width = charOBJ ? (charOBJ.width * FONT_SIZE) / FONT.common.lineHeight : FONT_SIZE / 3 ;

	if ( GLYPH === '\n' ) width = 0;

	height = charOBJ ? (charOBJ.height * FONT_SIZE) / FONT.common.lineHeight : 0 ;

	// world-space length between lowest point and the text cursor position
	anchor = charOBJ ? ((charOBJ.yoffset + charOBJ.height - FONT.common.base) * FONT_SIZE) / FONT.common.lineHeight : 0 ;

	return {
		width,
		height,
		anchor
	};

};


//

/**
 * Creates a THREE.Plane geometry, with UVs carefully positioned to map a particular
 * glyph on the MSDF texture. Then creates a shaderMaterial with the MSDF shaders,
 * creates a THREE.Mesh, returns it.
 * @private
 */
function buildText() {

    const component = this;

    const translatedGeom = [];

    this.inlines.forEach( (inline, i)=> {

        translatedGeom[ i ] = new MSDFGlyph( inline, this.getFontFamily() );

        translatedGeom[ i ].translate( inline.offsetX, inline.offsetY, 0 );

    });

    const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

    const mesh = new Mesh( mergedGeom, this.getFontMaterial() );

    mesh.renderOrder = Infinity;

    // This is for hiddenOverflow to work
    mesh.onBeforeRender = function() {

        if ( component.updateClippingPlanes ) {

            component.updateClippingPlanes();

        }

    };

    return mesh

}

//

export default {
	getGlyphDimensions,
	buildText
}