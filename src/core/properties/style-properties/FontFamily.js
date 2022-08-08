import SubStyleProperty from './SubStyleProperty';
import FontLibrary from '../../../font/FontLibrary';


export default class FontFamily extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'fontFamily', defaultValue );

	}

	buildOutput( vrElement, out ) {

		if( this._input instanceof FontFamily ) {

			this._output = this._input;

		} else if ( typeof this._input === 'string' ) {

			// string - family
			let fontFamily = FontLibrary.getFontFamily(this._output);

			if( fontFamily ) {

				this._output = fontFamily;

			} else {

				console.warn( `(.style) fontFamily, the font '${this._input}' is not registered. Aborted.`)

			}

		} else {

			console.warn( `(.style) fontFamily requires a registered fontFamily instance, or the id of a registered fontFamily.`);
			console.warn( `If you want to set a specific font, please use .font property instead.`);

		}

	}

	/**
	 *
	 * @return {FontFamily|null}
	 */
	get output() { return this._output; }

}
