import SubStyleProperty from '../SubStyleProperty';
import FontLibrary from '../../../../font/FontLibrary';
import { default as RegisteredFontFamily } from '../../../../font/FontFamily';


export default class FontFamilyProperty extends SubStyleProperty {

	constructor( ) {

		super( 'fontFamily', 'inherit' , true );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		let abstractedInput = this._input;

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
	 * @return {any|FontFamilyProperty|null}
	 */
	get value() { return this._value; }

}
