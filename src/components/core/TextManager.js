
/*

Job: Takes glyphs (strings), positions, and text types, returns meshes to Text

Knows:
	- The Text component for which it creates Meshes
	- The parameters of the text mesh it must return

To learn more about the differences between Text types :
https://github.com/felixmariotto/three-mesh-ui/wiki/Choosing-a-Text-type

*/

import { Mesh } from 'three/src/objects/Mesh.js';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import GeometryGlyph from '../../content/GeometryGlyph.js';
import MSDFGlyph from '../../content/MSDFGlyph.js';

export default function TextManager() {

	return {
		createText,
		getGlyphDimensions
	};

};

//

function getGlyphDimensions( options ) {

	// Constants common to all types of font

	const FONT = options.font;

	const FONT_SIZE = options.fontSize; 

	const GLYPH = options.glyph;

	let width, height, ascender, anchor;

	// Depending on the type of font, the way to compute a glyph dimensions vary

	switch ( options.textType ) {

		case 'geometry' :

			width = FONT.data.glyphs[ GLYPH ] ? FONT.data.glyphs[ GLYPH ].ha * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

			height = FONT.data.glyphs[ GLYPH ] ? FONT.data.lineHeight * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

			ascender = FONT.data.glyphs[ GLYPH ] ? FONT.data.ascender * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

			// world-space length between lowest point and the text cursor position
			anchor = height - ascender;

			if ( GLYPH.match(/\s/) ) height = 0;

			return {
				width,
				height,
				anchor
			};

		//

		case 'MSDF' :

			const charOBJ = FONT.chars.find( charOBJ => charOBJ.char === GLYPH );

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

};

//

function createText( options ) {

	switch ( this.getTextType() ) {

		case 'geometry' :
			return buildGeometryText.call( this );

		case 'MSDF' :
			return buildMSDFText.call( this );

	};

};

// Create a THREE.BufferGeometry with the shape of the required glyph,
// then returns a mesh made of this geometry and the passed fontMaterial.
// Called only when the Text is created with 'textType: "geometry"'

function buildGeometryText() {

	const translatedGeom = [];

	this.inlines.forEach( (inline, i)=> {

		translatedGeom[ i ] = GeometryGlyph( inline.glyph, inline.fontSize, this.getFontFamily() );

		translatedGeom[ i ].translate( inline.offsetX, inline.offsetY, 0 );

	});

	const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

	return new Mesh( mergedGeom, this.getFontMaterial() );

};

// Creates a THREE.Plane geometry, with UVs carefully positioned to map a particular
// glyph on the MSDF texture. Then creates a shaderMaterial with the MSDF shaders,
// creates a THREE.Mesh, returns it.
// Called only when the Text is created with 'textType: "MSDF"' (the default)

function buildMSDFText() {

	const translatedGeom = [];

	this.inlines.forEach( (inline, i)=> {

		translatedGeom[ i ] = MSDFGlyph( inline, this.getFontFamily() );

		translatedGeom[ i ].translate( inline.offsetX, inline.offsetY, 0 );

	});

	const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

	//

	const MATERIAL = new ShaderMaterial({
		uniforms: { u_texture: { value: this.getFontTexture() }},
		transparent: true,
		vertexShader: VertexShader(),
		fragmentShader: FragmentShader( this.getFontColor(), this.getFontOpacity() ),
	});

	//

	const mesh = new Mesh( mergedGeom, MATERIAL );

	mesh.renderOrder = Infinity;

	return mesh

};

////////////////
// MSDF shaders
////////////////

function VertexShader() {

	return `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * mvPosition;
			gl_Position.z-= 0.005;
		}
	`

};

// returns an MSDF fragment shader with the right font color and opacity

function FragmentShader( color, opacity ) {

	opacity = String( opacity );

	if ( !opacity.includes('.') ) {

		if ( opacity.includes(',') ) {

			opacity = opacity.replace( ',', '.' )

		} else {

			opacity = opacity + '.0';

		};

	};

	return `
		#ifdef GL_OES_standard_derivatives
		#extension GL_OES_standard_derivatives : enable
		#endif

		uniform sampler2D u_texture;

		varying vec2 vUv;

		float median(float r, float g, float b) {
			return max(min(r, g), min(max(r, g), b));
		}

		void main() {
			vec3 sample = texture2D( u_texture, vUv ).rgb;
			float sigDist = median( sample.r, sample.g, sample.b ) - 0.5;
			float alpha = clamp( sigDist / fwidth( sigDist ) + 0.5, 0.0, 1.0 );
			gl_FragColor = vec4( vec3(${ color.r + ',' + color.g + ',' + color.b }), min( alpha, ${ opacity } ) );
		}
	`

};
