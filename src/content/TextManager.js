
/*

Job:
 - From a given container, create glyphs
 - Call the right glyph creation/update functions from the './core' directory 

*/

import { Mesh, MeshNormalMaterial } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import GeometryGlyph from './glyphs/GeometryGlyph';
import MSDFGlyph from './glyphs/MSDFGlyph';

const vertexShader = `
	varying vec2 vUv;

	void main() {
		vUv = uv;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;
	}
`;

const fragmentShader = `
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
		gl_FragColor = vec4( vec3(1.0), alpha );
	}
`;

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

		let width, height, ascender, anchor;

		switch ( options.textType ) {

			case 'geometry' :

				width = FONT.data.glyphs[ GLYPH ] ? FONT.data.glyphs[ GLYPH ].ha * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

				height = FONT.data.glyphs[ GLYPH ] ? FONT.data.lineHeight * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

				ascender = FONT.data.glyphs[ GLYPH ] ? FONT.data.ascender * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

				anchor = height - ascender;

				return {
					width,
					height,
					anchor
				};

			//

			case 'MSDF' :

				const charOBJ = FONT.chars.find( charOBJ => charOBJ.char === GLYPH );

				width = charOBJ ? (charOBJ.width * FONT_SIZE) / FONT.common.lineHeight : FONT_SIZE / 3 ;

				height = charOBJ ? (charOBJ.height * FONT_SIZE) / FONT.common.lineHeight : 0 ;

				anchor = charOBJ ? ((charOBJ.yoffset + charOBJ.height - FONT.common.base) * FONT_SIZE) / FONT.common.lineHeight : 0 ;

				return {
					width,
					height,
					anchor
				};

		};

	};

	//

	function create( options ) {

		switch ( options.textType ) {

			case 'geometry' :
				return buildGeometryText( options );

			case 'MSDF' :
				return buildMSDFText( options );

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

	//

	function buildMSDFText( options ) {

		const translatedGeom = [];

		options.inlines.forEach( (inline, i)=> {

			translatedGeom[ i ] = MSDFGlyph( inline.glyph, inline.fontSize, options.fontFamily );

			translatedGeom[ i ].translate( inline.offsetX, inline.offsetY, 0 );

		});

		const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

		//

		if ( !options.fontTexture ) {
			console.warn('MSDF text needs a fontTexture. See https://github.com/felixmariotto/three-mesh-ui/wiki/Choosing-a-Text-type');
		};

		const passedMaterial = options.fontMaterial;

		const MATERIAL = new THREE.ShaderMaterial( {
			uniforms: { u_texture: { value: options.fontTexture }},
			transparent: true,
			vertexShader,
			fragmentShader
		});

		//

		const mesh = new Mesh( mergedGeom, MATERIAL );

		mesh.renderOrder = Infinity;

		return mesh

	};

};
