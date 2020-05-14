/*
	Job: Creating gylphs geometries (and UVs), and merging them. ( it does not lay them out, it's InlineManager's job )
	Knows: This text, its geometries and resulting mesh
*/

import { Mesh, Object3D } from 'three';

import InlineComponent from '../core/InlineComponent';
import DeepDelete from '../utils/DeepDelete';

function MSDFText( options ) {

	const text = Object.create( InlineComponent() );

	text.type = "MSDFText";

	text.threeOBJ = new Object3D();

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
			gl_FragColor = vec4( vec3(1.0), alpha + 0.25 );
		}
	`;

	text.parseParams = function parseParams( resolve, reject ) {

		//////////////////////////
		/// GET CHARS GEOMETRIES
		//////////////////////////

		// Abort condition
		
		if ( !this.content || this.content.length === 0 ) return

		// Get font style (MeshUIComponent's job)

		const FONT = this.getFontFamily();

		if ( !FONT ) return

		const FONT_SIZE = this.getFontSize();

		if ( FONT.fontType !== 'MSDF' ) {
			console.error('Text components only support MSDF fonts. See https://msdf-bmfont.donmccurdy.com')
			return
		};

		//

		let chars = Array.from ? Array.from( this.content ) : String( this.content ).split( '' );

		text.chars = chars.map( (glyph)=> {

			const geometry = createTextMesh( FONT, glyph );

			geometry.computeBoundingBox();

			const box = geometry.boundingBox;

			const charWidth = box.max.x * 2;

			geometry.translate( charWidth / 2, 0, 0 );

			return {
				geometry,
				height: 0.3,
				ascender: 0,
				width: charWidth,
				glyph
			};

		});

		//

		function createTextMesh( font, char ) {

			const geometry = new THREE.PlaneBufferGeometry( FONT_SIZE, FONT_SIZE );

			// We test for line break, tabs, and white space
			if ( char.match(/\s/g) === null ) {

				if ( font.info.charset.indexOf( char ) === -1 ) console.error(`The character '${ char }' is not included in the font characters set.`)

				mapUVs( geometry, font, char );

				transformGeometry( geometry, font, char );

			} else {

				nullifyUVs( geometry );

				geometry.scale( 0.5, 0.5, 0.5 );
				geometry.translate( 0, FONT_SIZE / 2, 0 );

			};

			return geometry

		};

		//

		function mapUVs( geometry, font, char ) {

			const charOBJ = font.chars.find( charOBJ => charOBJ.char === char );

			const common = font.common;

			const xMin = charOBJ.x / common.scaleW;

			const xMax = (charOBJ.x + charOBJ.width ) / common.scaleW;

			const yMin =  1 -((charOBJ.y + charOBJ.height ) / common.scaleH);

			const yMax = 1 - (charOBJ.y / common.scaleH);

			//

			const uvAttribute = geometry.attributes.uv;

			for ( var i = 0; i < uvAttribute.count; i ++ ) {

				var u = uvAttribute.getX( i );
				var v = uvAttribute.getY( i );

				[ u, v ] = (()=> {
					switch ( i ) {
					case 0 : return [ xMin, yMax ]
					case 1 : return [ xMax, yMax ]
					case 2 : return [ xMin, yMin ]
					case 3 : return [ xMax, yMin ]
					};
				})();

				uvAttribute.setXY( i, u, v );

			};

		};

		//

		function nullifyUVs( geometry ) {

			const uvAttribute = geometry.attributes.uv;

			for ( var i = 0; i < uvAttribute.count; i ++ ) {

				uvAttribute.setXY( i, 0, 0 );

			};

		};

		//

		function transformGeometry( geometry, font, char ) {

			const charOBJ = font.chars.find( charOBJ => charOBJ.char === char );

			const common = font.common;

			const newHeight = charOBJ.height / common.lineHeight;
			const newWidth = (charOBJ.width * newHeight) / charOBJ.height;

			geometry.scale(
				newWidth,
				newHeight,
				1
			);

			geometry.translate(
				0,
				( ( ( ( - charOBJ.height - (charOBJ.yoffset * 2) ) / common.lineHeight ) / 2 ) * FONT_SIZE ) + FONT_SIZE,
				0
			);

		};

		resolve();

	};

	text.updateLayout = function updateLayout() {

		// DELETE PREVIOUS MESH + CREATE NEW ONE

		if ( !this.parent ) return

		const INFO = this.parent.inlinesInfo[ this.id ];

		if ( !INFO ) return

		const TEXTURE = this.getFontTexture();

		const MATERIAL = new THREE.ShaderMaterial( {
        uniforms: { u_texture: { value: TEXTURE }},
        transparent: true,
        vertexShader,
        fragmentShader
    });

		const TEXT_MESH = new Mesh( INFO.geometry, MATERIAL );

		DeepDelete( text.threeOBJ );

		text.threeOBJ.add( TEXT_MESH );

	};

	text.updateInner = function updateInner() {

		text.threeOBJ.position.z = text.getOffset();

		//

		const TEXTURE = this.getFontTexture();

		const MATERIAL = new THREE.ShaderMaterial( {
        uniforms: { u_texture: { value: TEXTURE }},
        transparent: true,
        vertexShader,
        fragmentShader
    });

		text.threeOBJ.traverse( (obj)=> {

			if ( obj.material ) obj.material = MATERIAL;

		});

	};

	text.set( options );

	return text

};

export default MSDFText