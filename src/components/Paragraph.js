
/*
	Job: Parse user text into Lines objects, trim them according to container width, and position them in height
	Knows: Container dimensions, texts, letters geometry and bounding boxes
*/

import { ShapeBufferGeometry } from 'three';

import MeshUIComponent from '../core/MeshUIComponent';
import FontLibrary from '../core/FontLibrary';
import Line from './Line';

function ParagraphModule( options ) {

	// Defaults
	if ( options.interLine === undefined ) options.interLine = 0;
	if ( options.verticalCenter === undefined ) options.verticalCenter = true;
	if ( options.wrapGlyphs === undefined ) options.wrapGlyphs = " -";
	if ( options.setLayoutHeight === undefined ) options.setLayoutHeight = true;
	if ( options.setLayoutWidth === undefined ) options.setLayoutWidth = true;

	// if a property is not found in paragraph, it will delegate to MeshUIComponent
	const paragraph = Object.create( MeshUIComponent() );

	paragraph.lines = [];

	/////////////
	//  UPDATE
	/////////////

	paragraph.update = function() {

		// Abort condition

		if ( !options.texts || options.texts.length === 0 ) return

		// Get font style

		const FONT = paragraph.getFontFamily();
		if ( !FONT ) return

		const FONT_SIZE = paragraph.getFontSize();

		const WIDTH = this.parent.width;

		// Make array of objects containing each character and its length, for later concatenation

		const expression = paragraph.texts.reduce( (accu, textOBJ)=> {

			const chars = Array.from ? Array.from( textOBJ.text ) : String( textOBJ.text ).split( '' );

			// check if the user defined a font size for this text segment, otherwise keep the paragraph fontSize
			const fontSize = textOBJ.fontSize || FONT_SIZE;

			return accu.concat( chars.map( (glyph)=> {

				const shape = FONT.generateShapes( glyph, fontSize );

				const width = FONT.data.glyphs[ glyph ] ? FONT.data.glyphs[ glyph ].ha * ( fontSize / FONT.data.resolution ) : 0 ;

				const height = FONT.data.glyphs[ glyph ] ? FONT.data.lineHeight * ( fontSize / FONT.data.resolution ) : 0 ;

				const ascender = FONT.data.glyphs[ glyph ] ? FONT.data.ascender * ( fontSize / FONT.data.resolution ) : 0 ;

				return {
					shapeGeom: new ShapeBufferGeometry( shape ),
					height,
					ascender,
					width,
					glyph
				};

			}));

		}, [] );

		// Make array of objects containing each line content and max height

		const linesContent = expression.reduce( (accu, value, idx, arr)=> {

			let lastLine = accu[ accu.length -1 ];

			let previousChar = arr[ idx - 1 ];

			// If previous character was a good fit for wrapping, we set the variable lengthToNextWrap
			// with the length remaining before next good character for wrapping
			if ( previousChar && paragraph.wrapGlyphs.indexOf( previousChar.glyph ) > -1 ) {

				var lengthToNextWrap = 0;

				for ( let i = idx ; i < arr.length - 1 ; i++ ) {

					if ( arr[ i ].glyph === ' ' || arr[ i ].glyph === '-' ) break ;

					lengthToNextWrap += arr[ i ].width;

				};

			};

			// Create new line if necessary because text will overflow OR previous character was
			// a better fit for wrapping than remaining characters before overflow
			if ( value.width + lastLine.width > WIDTH ||
				 lengthToNextWrap + lastLine.width > WIDTH ||
				 value.glyph === '\n' ) {

				// Delete the current line last character if white space before to add a neew line
				trimWhiteSpace( lastLine );

				// Create new line
				accu.push({ height: 0, ascender: 0, width: 0, chars: [] });
				lastLine = accu[ accu.length -1 ];

				// Skip starting the new line with a white space
				if ( value.glyph === " " ) return accu;

			};

			if ( value.glyph === '\n' ) {
				return accu;
			};

			if ( value.glyph !== " " ) {

				// update highest point of the line
				if ( value.height > lastLine.height ) lastLine.height = value.height;

				// update highest ascender of the line
				if ( value.ascender > lastLine.ascender ) lastLine.ascender = value.ascender;

			};

			lastLine.width = lastLine.width + value.width;

			lastLine.chars.push( value );

			return accu;

		}, [{ height: 0, ascender: 0, width: 0, chars: [] }] );

		// Get total height of this paragraph

		const totalHeight = linesContent.reduce( (accu, value, idx, arr)=> {

			let interLine = idx < ( arr.length - 1 ) ? paragraph.interLine : 0;

			return accu + value.height + interLine;

		}, 0 );

		// Update parent layout size according to this paragraph size (optional)

		const paragraphSize = {};

		if ( paragraph.setLayoutHeight ) paragraphSize.height = totalHeight;

		if ( paragraph.setLayoutWidth ) paragraphSize.width = linesContent.reduce((accu, line)=> {
			return Math.max( accu, line.width );
		}, 0 );

		paragraph.parent.set( paragraphSize, true );

		// Compute position of each line

		const yOffsets = [];

		linesContent.reduce( (accu, value)=> {

			yOffsets.push( accu - value.ascender );

			return accu - value.height - paragraph.interLine;

		}, paragraph.verticalCenter ? totalHeight / 2 : 0 );

		// Create new Lines

		linesContent.forEach( (content, i)=> {

			Line({
				width: content.width,
				chars: content.chars,
				yPos: yOffsets[ i ],
				containerWidth: paragraphSize.width ? paragraphSize.width : WIDTH
			}, this );

		});

	};

	// Delete the current line last character if white space
	function trimWhiteSpace( line ) {

		if ( line.chars[ line.chars.length -1 ].glyph === " " ) {

			line.width -= line.chars.pop().width;

			trimWhiteSpace( line );

		};

	};

	// Lastly set the options parameters to this object, which will trigger an update
	paragraph.set( options );

	return paragraph

};

export default ParagraphModule
