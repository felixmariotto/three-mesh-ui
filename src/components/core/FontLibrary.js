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

import { FileLoader, TextureLoader, LinearFilter } from 'three';

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
		if ( !records[ component.id ] ) records[ component.id ] = { component };

		// Ensure the font json is processed
		_buildFriendlyKerningValues( fontFamily );

		records[ component.id ].json = fontFamily;

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

		textureLoader.load( url, ( texture ) => {

			texture.generateMipmaps = false;
			texture.minFilter = LinearFilter;
			texture.magFilter = LinearFilter;

			fontTextures[ url ] = texture;

			for ( const recordID of Object.keys( records ) ) {

				if ( url === records[ recordID ].textureURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontTexture( texture );

				}

			}

		} );

	}

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = { component };

	records[ component.id ].textureURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontTextures[ url ] ) {

		component._updateFontTexture( fontTextures[ url ] );

	}

}

/** used by Text to know if a warning must be thrown */
function getFontOf( component ) {

	const record = records[ component.id ];

	if ( !record && component.parentUI ) {

		return getFontOf( component.parentUI );

	}

	return record;

}

/** Load JSON file at the url provided by the user at the component attribute 'fontFamily' */
function loadFontJSON( component, url ) {

	// if this font was never asked for, we load it
	if ( requiredFontFamilies.indexOf( url ) === -1 ) {

		requiredFontFamilies.push( url );

		fileLoader.load( url, ( text ) => {

			// FileLoader import as  a JSON string
			const font = JSON.parse( text );

			// Ensure the font json is processed
			_buildFriendlyKerningValues( font );

			fontFamilies[ url ] = font;

			for ( const recordID of Object.keys( records ) ) {

				if ( url === records[ recordID ].jsonURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontFamily( font );

				}

			}

		} );

	}

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = { component };

	records[ component.id ].jsonURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontFamilies[ url ] ) {

		component._updateFontFamily( fontFamilies[ url ] );

	}

}

/**
 * From the original json font kernings array
 * First  : Reduce the number of values by ignoring any kerning defining an amount of 0
 * Second : Update the data structure of kernings from
 * 			{Array} : [{first: 97, second: 121, amount: 0},{first: 97, second: 122, amount: -1},...]
 * 			to
 * 			{Object}: {"ij":-2,"WA":-3,...}}
 *
 * @private
 */
function _buildFriendlyKerningValues( font ) {

	// As "font registering" can comes from different paths : addFont, loadFontJSON, setFontFamily
	// Be sure we don't repeat this operation
	if ( font._kernings ) return;

	const friendlyKernings = {};

	for ( let i = 0; i < font.kernings.length; i++ ) {

		const kerning = font.kernings[ i ];

		// ignore zero kerned glyph pair
		if ( kerning.amount === 0 ) continue;

		// Build and store the glyph paired characters "ij","WA", ... as keys, referecing their kerning amount
		const glyphPair = String.fromCharCode( kerning.first, kerning.second );
		friendlyKernings[ glyphPair ] = kerning.amount;

	}

	// update the font to keep it
	font._kernings = friendlyKernings;

}

/*

This method is intended for adding manually loaded fonts. Method assumes font hasn't been loaded or requested yet. If it was,
font with specified name will be overwritten, but components using it won't be updated.

*/
function addFont( name, json, texture ) {

	texture.generateMipmaps = false;
	texture.minFilter = LinearFilter;
	texture.magFilter = LinearFilter;

	requiredFontFamilies.push( name );
	fontFamilies[ name ] = json;

	// Ensure the font json is processed
	_buildFriendlyKerningValues( json );

	if ( texture ) {
		requiredFontTextures.push( name );
		fontTextures[ name ] = texture;
	}
}

//

const FontLibrary = {
	setFontFamily,
	setFontTexture,
	getFontOf,
	addFont
};

export default FontLibrary;
