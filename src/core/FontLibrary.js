
/*
	Job: Keeping record of all the loaded fonts, which component use which font, and load new fonts if necessary
	Knows: Which component use which font, loaded fonts
*/

import { FontLoader } from 'three';

const loader = new FontLoader();
const requiredFonts = [];
const fonts = {};
const records = {};

function setFont( component, url ) {
	
	// if this font was never asked for, we load it
	if ( requiredFonts.indexOf( url ) === -1 ) {

		requiredFonts.push( url );

		loader.load( url, ( font )=> {

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
	var record = records[ component.id ];

	return record ? fonts[ record.url ] : null ;

};

//

const FontLibrary = {
	setFont,
	getFontOf
};

export default FontLibrary