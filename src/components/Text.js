/*
	Job: Hold this component text, and update it
	Knows: This text, its geometries and meshes
*/

import { ShapeBufferGeometry } from 'three';
import InlineComponent from '../core/InlineComponent';

function Text( options ) {

	const text = Object.create( InlineComponent() );

	text.type = "Text";

	text.parseParams = function parseParams( resolve, reject ) {

		///////////////////////////
		/// GET CHARS GEOMETRIES
		///////////////////////////

		// Abort condition

		if ( !this.content || this.content.length === 0 ) return

		// Get font style

		const FONT = this.getFontFamily();
		if ( !FONT ) return

		const FONT_SIZE = this.getFontSize();

		// Make array of objects containing each character and its length, for later concatenation

		let chars = Array.from ? Array.from( this.content ) : String( this.content ).split( '' );

		chars = chars.map( (glyph)=> {

			const shape = FONT.generateShapes( glyph, FONT_SIZE );

			const width = FONT.data.glyphs[ glyph ] ? FONT.data.glyphs[ glyph ].ha * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

			const height = FONT.data.glyphs[ glyph ] ? FONT.data.lineHeight * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

			const ascender = FONT.data.glyphs[ glyph ] ? FONT.data.ascender * ( FONT_SIZE / FONT.data.resolution ) : 0 ;

			return {
				shapeGeom: new ShapeBufferGeometry( shape ),
				height,
				ascender,
				width,
				glyph
			};

		});

		console.log( chars );

		//

		resolve();

	};

	text.updateLayout = function updateLayout() {

		// console.log('update text layout');

		text.setPosFromParentRecords();

	};

	text.updateInner = function updateInner() {

		// console.log('update text inner content');

	};

	text.set( options );

	return text

};

export default Text
