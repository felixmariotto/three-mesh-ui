import SubStyleProperty from '../SubStyleProperty';
import FontLibrary from '../../../../font/FontLibrary';
import FontFamily from '../../../../font/FontFamily';


export default class FontFamilyDefault extends SubStyleProperty {

	constructor( ) {

		super( 'fontFamily', 'inherit' , true );

	}


	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input instanceof FontFamily ) {

			this._value = this._input;

		} else if ( this._input === 'inherit' ) {

			// do nothing

		} else if ( typeof this._input === 'string' ) {

			// string - family
			const fontFamily = FontLibrary.getFontFamily( this._input );

			if( fontFamily ) {

				this._value = fontFamily;
				// element._font._needsUpdate = true;

			} else {

				console.warn( `(.style) fontFamily, the font '${this._input}' is not registered. Aborted.`)

			}

		} else {

			console.warn( `(.style) fontFamily requires a registered fontFamily instance, or the id of a registered fontFamily.`);
			console.warn( `If you want to set a specific font, please use .font property instead.`);

		}

	}

	/**
	 * @override
	 * @return {any|FontFamily|null}
	 */
	get value() { return this._value; }

}
