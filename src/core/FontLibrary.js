
/*
	Job: Keeping record of all the loaded fonts, which component use which font, and load new fonts if necessary
	Knows: Which component use which font, loaded fonts
*/

import { Font } from 'three/src/extras/core/Font.js';
import { FileLoader } from 'three';

const loader = new FileLoader();
const requiredFonts = [];
const fonts = {};
const records = {};

function setFont( component, url ) {
	
	// if this font was never asked for, we load it
	if ( requiredFonts.indexOf( url ) === -1 ) {

		requiredFonts.push( url );

		loader.load( url, ( text )=> {

			// FileLoader import as a JSON string
			let font = JSON.parse( text );

			// We test the type of font
			if (
				font.chars !== undefined,
				font.common !== undefined,
				font.info !== undefined,
				font.kernings !== undefined,
				font.pages !== undefined
			) {

				font.fontType = "MSDF";

			} else {

				// If the font is a typeface font, we want to create a THREE.Font
				// instance to access methods like Font.generateShapes
				font.fontType = "Typeface";
				font = new Font( font );

			};

			fonts[ url ] = font;

			for ( let recordID of Object.keys(records) ) {

				if ( url === records[ recordID ].url ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFont( url );

				};

			};

		});

	};

	// keep record of the font that this component use
	records[ component.id ] = {
		component,
		url
	};

	// update the component, only if the font is already requested and loaded
	if ( fonts[ url ] ) {
		component._updateFont( url );
	};

};

//

function getFontOf( component ) {

	// return the record associated with this component, or undefined
	const record = records[ component.id ];

	return record ? fonts[ record.url ] : null ;

};

//

const FontLibrary = {
	setFont,
	getFontOf
};

export default FontLibrary