/*

Job:
	- computing its own size according to user measurements or content measurement
	- computing glyphs size and position, acccording to passed attributes 'font' and 'fontSize'

Knows:
	- Its text content (string)
	- Font attributes ('font', 'fontType', 'fontSize')
	- Parent block

*/

import { ShapeBufferGeometry, Mesh, Object3D } from 'three';

import InlineComponent from './core/InlineComponent';
import DeepDelete from '../utils/DeepDelete';
import TextContent from '../content/TextContent';

function Text( options ) {

	const text = Object.create( InlineComponent() );

	text.type = "Text";

	text.threeOBJ = new Object3D();

	text.parseParams = function parseParams( resolve, reject ) {

		//////////////////////////
		/// GET CHARS GEOMETRIES
		//////////////////////////

		const content = this.content ;
		const font = this.getFontFamily();
		const fontSize = this.getFontSize();
		const breakChars = this.getBreakOn(); // characters to prioritize breaking line (eg: white space)

		// Abort condition
		
		if ( !font ) return

		if ( !this.content || this.content.length === 0 ) {
			reject( 'Text component has no text content' );
			return
		};

		if ( font.fontType !== 'Typeface' ) {
			reject( 'Text components only support Typeface fonts. See https://gero3.github.io/facetype.js/' )
			return
		};

		// Compute glyphs sizes

		let chars = Array.from ? Array.from( content ) : String( content ).split( '' );

		const glyphDimensions = chars.map( (glyph)=> {

			const width = font.data.glyphs[ glyph ] ? font.data.glyphs[ glyph ].ha * ( fontSize / font.data.resolution ) : 0 ;

			const height = font.data.glyphs[ glyph ] ? font.data.lineHeight * ( fontSize / font.data.resolution ) : 0 ;

			const ascender = font.data.glyphs[ glyph ] ? font.data.ascender * ( fontSize / font.data.resolution ) : 0 ;

			const anchor = height - ascender;

			//

			let lineBreak = null ;

			if ( breakChars.includes( glyph ) || glyph.match(/\s/g) ) lineBreak = "possible" ;

			if ( glyph.match(/\n/g) ) lineBreak = "mendatory" ;

			//

			return {
				height,
				anchor,
				width,
				lineBreak
			};

		});

		// Update 'inlines' property, so that the parent can compute each glyph position

		text.inlines = glyphDimensions;

		//

		text.chars = createGlyphGeometry( this.content, font, fontSize );

		//

		resolve();

	};

	function createGlyphGeometry( content, font, fontSize ) {

		let chars = Array.from ? Array.from( content ) : String( content ).split( '' );

		return chars.map( (glyph)=> {

			const shape = font.generateShapes( glyph, fontSize );

			const width = font.data.glyphs[ glyph ] ? font.data.glyphs[ glyph ].ha * ( fontSize / font.data.resolution ) : 0 ;

			const height = font.data.glyphs[ glyph ] ? font.data.lineHeight * ( fontSize / font.data.resolution ) : 0 ;

			const ascender = font.data.glyphs[ glyph ] ? font.data.ascender * ( fontSize / font.data.resolution ) : 0 ;

			const geometry = new ShapeBufferGeometry( shape );

			return {
				geometry,
				height,
				ascender,
				width,
				glyph
			};

		});

	};

	text.updateLayout = function updateLayout() {

		// Create text geometry

		TextContent();

		// Delete previous mesh + create new one

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

export default Text
