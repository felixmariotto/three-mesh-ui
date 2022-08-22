import FontLibrary from '../../../../font/FontLibrary';
import { default as RegisteredFontFamily } from '../../../../font/FontFamily';
import FontFamilyProperty from './FontFamilyProperty';


export default class FontFamilyPropertyInline extends FontFamilyProperty {

	constructor( ) {

		super( 'fontFamily', 'inherit' , true );

		this._input = 'inherit';
		this._needsUpdate = true;

		// configure
		this._allowsInherit = false;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		let abstractedInput = this._inheritedInput;

		if( abstractedInput === 'inherit' ) {
			abstractedInput = this.getInheritedInput( element );
		}

		if( abstractedInput instanceof RegisteredFontFamily ) {

			this._value = abstractedInput;
			element._font._needsUpdate = true;

		} else if ( typeof abstractedInput === 'string' ) {

			// string - family
			const fontFamily = FontLibrary.getFontFamily(abstractedInput);

			if( fontFamily ) {

				this._value = fontFamily;
				element._font._needsUpdate = true;

			} else {

				console.warn( `(.style) fontFamily, the font '${abstractedInput}' is not registered. Aborted.`)

			}

		} else {

			console.warn( `(.style) fontFamily requires a registered fontFamily instance, or the id of a registered fontFamily.`);
			console.warn( `If you want to set a specific font, please use .font property instead.`);

		}

	}

	/**
	 * @override
	 * @return {any|FontFamilyPropertyInline|null}
	 */
	get value() { return this._value; }

}
