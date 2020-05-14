/*
	Job: Creating gylphs geometries (and UVs), and merging them. ( it does not lay them out, it's InlineManager's job )
	Knows: This text, its geometries and resulting mesh
*/

import { ShapeBufferGeometry, Mesh, Object3D } from 'three';

import InlineComponent from '../core/InlineComponent';
import DeepDelete from '../utils/DeepDelete';

function MSDFText( options ) {

	const text = Object.create( InlineComponent() );

	text.type = "MSDFText";

	text.threeOBJ = new Object3D();

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

		if ( FONT.fontType !== 'MSDF' ) return

		//

		let chars = Array.from ? Array.from( this.content ) : String( this.content ).split( '' );

		text.chars = chars.map( (glyph)=> {

			console.log( createTextMesh( FONT, glyph ) );

		});

		//

		function createTextMesh( font, char ) {

			var geometry = new THREE.PlaneBufferGeometry( FONT_SIZE, FONT_SIZE );

			mapUVs( geometry, font, char );

			transformGeometry( geometry, font, char );

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

		/*

		// Make array of objects containing each character and its length, for later concatenation

		let chars = Array.from ? Array.from( this.content ) : String( this.content ).split( '' );

		text.chars = chars.map( (glyph)=> {

			const shape = FONT.generateShapes( glyph, FONT_SIZE );

			const width = FONT.data.glyphs[ glyph ] ? FONT.data.glyphs[ glyph ].ha * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

			const height = FONT.data.glyphs[ glyph ] ? FONT.data.lineHeight * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

			const ascender = FONT.data.glyphs[ glyph ] ? FONT.data.ascender * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

			return {
				geometry: new ShapeBufferGeometry( shape ),
				height,
				ascender,
				width,
				glyph
			};

		});

		//
		*/

		resolve();

	};

	text.updateLayout = function updateLayout() {

		// DELETE PREVIOUS MESH + CREATE NEW ONE

		if ( !this.parent ) return

		const INFO = this.parent.inlinesInfo[ this.id ];

		if ( !INFO ) return

		const MATERIAL = this.getFontMaterial();

		const textMesh = new Mesh( INFO.geometry, MATERIAL );

		DeepDelete( text.threeOBJ );

		text.threeOBJ.add( textMesh );

	};

	text.updateInner = function updateInner() {

		text.threeOBJ.position.z = text.getOffset();

	};

	text.set( options );

	return text

};

export default MSDFText