
/*
	Job: Parse user text into Lines objects, trim them according to container width, and position them in height
	Knows: Container dimensions, texts, letters geometry and bounding boxes
*/

import { ShapeBufferGeometry } from 'three';

import MeshUIComponent from '../core/MeshUIComponent';
import FontLibrary from '../core/FontLibrary';
import Line from './Line';

function ParagraphModule( options ) {

	options = options || {};

	// if a property is not found in paragraph, it will delegate to MeshUIComponent
	const paragraph = Object.create( MeshUIComponent() );

	paragraph.texts = options.texts;
	paragraph.interLine = options.interLine || 0.0;
	paragraph.verticalCenter = true;
	paragraph.lines = [];
	paragraph.type = "paragraph";
	paragraph.wrapGlyphs = "- ";
	paragraph.setLayoutHeight = true;

	paragraph.update = function() {

		// Abort condition

		if ( !options.texts || options.texts.length === 0 ) return

		// Get font style

		const font = paragraph.getFontFamily();
		if ( !font ) return

		const FONT_SIZE = paragraph.getFontSize();

		const WIDTH = this.parent.width;

		// Make array of objects containing each character and its length, for later concatenation

		const expression = paragraph.texts.reduce( (accu, textOBJ)=> {

			const chars = Array.from ? Array.from( textOBJ.text ) : String( textOBJ.text ).split( '' );

			// check if the user defined a font size for this text segment, otherwise keep the paragraph fontSize
			const fontSize = textOBJ.fontSize || FONT_SIZE;

			return accu.concat( chars.map( (glyph)=> {

				let shape = font.generateShapes( glyph, fontSize );

				let width = font.data.glyphs[ glyph ] ? font.data.glyphs[ glyph ].ha * ( fontSize / font.data.resolution ) : 0 ;

				return {
					shapeGeom: new ShapeBufferGeometry( shape ),
					height: font.data.lineHeight * ( fontSize / font.data.resolution ),
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

			// Create new line if necessary becase text will overflow OR previous character was
			// a better fit for wrapping than remaining characters before overflow
			if ( value.width + lastLine.width > WIDTH || lengthToNextWrap + lastLine.width > WIDTH ) {

				// delete the previous line last character if white space + reduce line width
				if ( lastLine.chars[ lastLine.chars.length -1 ].glyph === " " ) {
					lastLine.width -= lastLine.chars.pop().width;
				};

				// create new line
				accu.push({ height: 0, width: 0, chars: [] });
				lastLine = accu[ accu.length -1 ];

				// skip starting the new line with a white space
				if ( value.glyph === " " ) return accu;

			};

			// update highest point of the line
			if ( value.height > lastLine.height ) lastLine.height = value.height;

			lastLine.width = lastLine.width + value.width;

			lastLine.chars.push( value );

			return accu;

		}, [{ height: 0, width: 0, chars: [] }] );

		// Get total height of this paragraph

		const totalHeight = linesContent.reduce( (accu, value, idx, arr)=> {

			let interLine = idx < ( arr.length - 1 ) ? paragraph.interLine : 0;

			return accu + value.height + interLine;

		}, 0 );

		// Update parent layout to the height of this paragraph

		if ( paragraph.setLayoutHeight ) {

			paragraph.parent.setHeight( totalHeight, true );
			
		};

		// Compute position of each line

		const yOffsets = [];

		linesContent.reduce( (accu, value)=> {

			yOffsets.push( accu + ( paragraph.verticalCenter ? totalHeight / 2 : 0 ) );

			return accu - value.height - paragraph.interLine;

		}, 0 );

		// Create new Lines

		linesContent.forEach( (content, i)=> {

			paragraph.appendChild(
				Line({
					height: content.height,
					width: content.width,
					chars: content.chars,
					yPos: yOffsets[ i ],
					containerWidth: WIDTH
				})
			);

		});

	};

	paragraph.update();

	return paragraph

};

export default ParagraphModule