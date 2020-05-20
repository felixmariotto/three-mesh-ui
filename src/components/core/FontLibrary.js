
/*
	Job: Keeping record of all the loaded fonts, which component use which font, and load new fonts if necessary
	Knows: Which component use which font, loaded fonts
*/

import { Font } from 'three/src/extras/core/Font.js';
import { FileLoader, TextureLoader } from 'three';

const fileLoader = new FileLoader();
const requiredFontFamilies = [];
const fontFamilies = {};

const textureLoader = new TextureLoader();
const requiredFontTextures = [];
const fontTextures = {};

const records = {};

function setFontFamily( component, url ) {
	
	// if this font was never asked for, we load it
	if ( requiredFontFamilies.indexOf( url ) === -1 ) {

		requiredFontFamilies.push( url );

		fileLoader.load( url, ( text )=> {

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
				font = new Font( font );
				font.fontType = "Typeface";

			};

			fontFamilies[ url ] = font;

			for ( let recordID of Object.keys(records) ) {

				if ( url === records[ recordID ].jsonURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontFamily( font );

				};

			};

		});

	};

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = {component};
	records[ component.id ].jsonURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontFamilies[ url ] ) {
		component._updateFontFamily( url );
	};

};

//

function setFontTexture( component, url ) {

	// if this font was never asked for, we load it
	if ( requiredFontTextures.indexOf( url ) === -1 ) {

		requiredFontTextures.push( url );

		textureLoader.load( url, ( texture )=> {

			fontTextures[ url ] = texture;

			for ( let recordID of Object.keys(records) ) {

				if ( url === records[ recordID ].textureURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontTexture( texture );

				};

			};

		});

	};

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = {component};
	records[ component.id ].textureURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontTextures[ url ] ) {
		component._updateFontTexture( texture );
	};

};

//

const FontLibrary = {
	setFontFamily,
	setFontTexture
};

export default FontLibrary