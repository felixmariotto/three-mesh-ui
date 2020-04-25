
/*
	Job: Parse user text into Lines objects, trim them according to container width, and position them in height
	Knows: Container dimensions, user text, letters geometry and bounding boxes
*/

import { ShapeBufferGeometry } from 'three';

import MeshUIComponent from '../core/MeshUIComponent';
import FontLibrary from '../core/FontLibrary';
import Line from './Line';

function ParagraphModule( options ) {

	options = options || {};

	// if a property is not found in paragraph, it will delegate to MeshUIComponent
	const paragraph = Object.create( MeshUIComponent() );

	paragraph.text = options.text;
	paragraph.interLine = options.interLine || 0.1 ;
	paragraph.verticalCenter = true ;
	paragraph.lines = [];
	paragraph.type = "paragraph";

	paragraph.update = function() {

		// Abort condition

		if ( !options.text || options.text.length === 0 ) return

		// Get font style

		const font = paragraph.getFontFamily();
		if ( !font ) return

		const fontSize = paragraph.getFontSize();

		const WIDTH = this.parent.width;

		// Make array of objects containing each character and its length, for later concatenation

		const chars = Array.from ? Array.from( paragraph.text ) : String( paragraph.text ).split( '' );
		
		const expression = chars.map( (glyph)=> {

			let shape = font.generateShapes( glyph, fontSize );

			let width = font.data.glyphs[ glyph ] ? font.data.glyphs[ glyph ].ha * ( fontSize / font.data.resolution ) : 0 ;

			return {
				shapeGeom: new ShapeBufferGeometry( shape ),
				height: font.data.lineHeight * ( fontSize / font.data.resolution ),
				width,
				glyph
			};

		});

		// Make array of objects containing each line content and max height

		const linesContent = expression.reduce( (accu, value)=> {

			let lastLine = accu[ accu.length -1 ];

			// create new line if necessary
			if ( value.width + lastLine.width > WIDTH ) {

				accu.push({ height: 0, width: 0, chars: [] });
				lastLine = accu[ accu.length -1 ];

			};

			// update highest point of the line
			if ( value.height > lastLine.height ) lastLine.height = value.height;

			lastLine.width = lastLine.width + value.width;

			lastLine.chars.push( value );

			return accu;

		}, [{ height: 0, width: 0, chars: [] }] );

		// Compute position of each line

		const totalHeight = linesContent.reduce( (accu, value, idx, arr)=> {

			let interLine = idx < ( arr.length - 1 ) ? paragraph.interLine : 0;

			return accu + value.height + interLine;

		}, 0 );

		const yOffsets = [];

		linesContent.reduce( (accu, value)=> {

			yOffsets.push( accu - ( paragraph.verticalCenter ? totalHeight / 2 : 0 ) );

			return value.height + paragraph.interLine;

		}, 0 );

		linesContent.forEach( (content, i)=> {

			const line = Line({
				height: content.height,
				width: content.width,
				chars: content.chars,
				yPos: yOffsets[ i ]
			});

		});

	};

	paragraph.update();

	return paragraph

};

export default ParagraphModule