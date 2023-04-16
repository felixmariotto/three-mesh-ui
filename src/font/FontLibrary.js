import FontFamily from './FontFamily';

// JSDoc related imports
/* eslint-disable no-unused-vars */
import FontVariant from './FontVariant';
/* eslint-enable no-unused-vars */


const _fontFamilies = {};

/* eslint-disable no-unused-vars */

/**
 *
 * @param {FontFamily} fontFamily
 * @returns {Promise<unknown>}
 */
const prepare = function ( fontFamily ) {

	/**
	 *
	 * @type {FontFamily[]}
	 */
	const families = [ ...arguments ];

	// Check all family are right instance
	families.forEach( f => {

		if( !(f instanceof FontFamily) ) {

			throw new Error(`FontLibrary::prepare() - One of the provided parameter is not a FontFamily. Instead ${typeof f} given.`);

		}

	})

	/**
	 * Check that all provided families are loaded
	 * @returns {boolean}
	 */
	const areAllLoaded = function() {

		return families.every( f => f.isReady );

	}

	// @TODO: Should handle possible rejection
	return new Promise((resolve,reject)=>{

		// Direct resolve if all loaded
		if ( areAllLoaded() ){

			resolve();

		} else {

			// Add listener on each family not ready
			for ( let i = 0; i < families.length; i++ ) {

				const family = families[ i ];
				if( !family.isReady ){

					family.addEventListener( "ready" , ()=> {

						// Resolve if all other families are loaded
						if( areAllLoaded() ) {

							resolve();

						}

					});

				}

			}

		}

	});

}

/* eslint-enable no-unused-vars */


/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
const addFontFamily = function ( name ) {

	if ( _fontFamilies[ name ] ) {
		console.error( `FontLibrary::addFontFamily - Font('${name}') is already registered` );
	}

	_fontFamilies[ name ] = new FontFamily( name );

	return _fontFamilies[ name ];

}

/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
const getFontFamily = function( name ) {

	return _fontFamilies[ name ];

}


/**
 *
 * @param { (fontVariant:FontVariant, character:string ) => string|null } handler
 */
const setMissingCharacterHandler = function ( handler ) {

	_missingCharacterHandler = handler;

}

/**
 *
 * @type { (fontVariant:FontVariant, character:string ) => string|null }
 * @private
 */
let _missingCharacterHandler = function ( fontVariant, character ) {

	console.error( `The character '${character}' is not included in the font characters set.` );

	// return a glyph has fallback
	return " ";

};

/**
 *
 * @param {FontVariant} fontVariant
 * @param {string} character
 *
 * @returns {string}
 */
function missingCharacter( fontVariant, character ) {

	// Execute the user defined handled
	return _missingCharacterHandler( fontVariant, character );

}


//

const FontLibrary = {
	addFontFamily,
	getFontFamily,
	prepare,
	setMissingCharacterHandler,
	missingCharacter
};

export default FontLibrary;
