
/*

Job: 
Keeping record of all the loaded fonts, which component use which font,
and load new fonts if necessary

Knows: Which component use which font, loaded fonts

This is one of the only modules in the 'component' folder that is not used
for composition (Object.assign). MeshUIComponent is the only module with
a reference to it, it uses FontLibrary for recording fonts accross components.
This way, if a component uses the same font as another, FontLibrary will skip
loading it twice, even if the two component are not in the same parent/child hierarchy

*/

import { FileLoader } from 'three/src/loaders/FileLoader.js' ;
import { TextureLoader } from 'three/src/loaders/TextureLoader.js' ;

const fileLoader = new FileLoader();
const requiredFontFamilies = [];
const fontFamilies = {};

const textureLoader = new TextureLoader();
const requiredFontTextures = [];
const fontTextures = {};

const records = {};

/**

Called by MeshUIComponent after fontFamily was set
When done, it calls MeshUIComponent.update, to actually display
the text with the loaded font.

*/
function setFontFamily( component, fontFamily ) {

	if ( typeof fontFamily === 'string' ) {

		loadFontJSON( component, fontFamily );

	} else {

		// keep record of the font that this component use
		if ( !records[ component.id ] ) records[ component.id ] = {component};

		records[ component.id ].json = fontFamily;

		setFontType( fontFamily );

		component._updateFontFamily( fontFamily );

	}

}

/**

Called by MeshUIComponent after fontTexture was set
When done, it calls MeshUIComponent.update, to actually display
the text with the loaded font.

*/
function setFontTexture( component, url ) {

	// if this font was never asked for, we load it
	if ( requiredFontTextures.indexOf( url ) === -1 ) {

		requiredFontTextures.push( url );

		textureLoader.load( url, ( texture )=> {

			fontTextures[ url ] = texture;

			for ( const recordID of Object.keys(records) ) {

				if ( url === records[ recordID ].textureURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontTexture( texture );

				}

			}

		});

	}

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = {component};
	
	records[ component.id ].textureURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontTextures[ url ] ) {
		component._updateFontTexture( fontTextures[ url ] );
	}

}

/** used by Text to know if a warning must be thrown */
function getFontOf( component ) {

	const record = records[ component.id ];

	if ( !record && component.getUIParent() ) {

		return getFontOf( component.getUIParent() );

	} 

	return record

	;

}

/** Load JSON file at the url provided by the user at the component attribute 'fontFamily' */
function loadFontJSON( component, url ) {

	// if this font was never asked for, we load it
	if ( requiredFontFamilies.indexOf( url ) === -1 ) {

		requiredFontFamilies.push( url );

		fileLoader.load( url, ( text )=> {

			// FileLoader import as  a JSON string
			const font = JSON.parse( text );

			setFontType( font );

			fontFamilies[ url ] = font;

			for ( const recordID of Object.keys(records) ) {

				if ( url === records[ recordID ].jsonURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontFamily( font );

				}

			}

		});

	}

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = {component};

	records[ component.id ].jsonURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontFamilies[ url ] ) {
		component._updateFontFamily( fontFamilies[ url ] );
	}

}

/** Add a 'fontType' property to the font object */
function setFontType( fontObject ) {

	// We test the type of font
	if (
		fontObject.chars !== undefined,
		fontObject.common !== undefined,
		fontObject.info !== undefined,
		fontObject.kernings !== undefined,
		fontObject.pages !== undefined
	) {

		fontObject.fontType = "MSDF";

	}

}

//

const FontLibrary = {
	setFontFamily,
	setFontTexture,
	getFontOf
};

export default FontLibrary
