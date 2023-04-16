import SubStyleProperty from '../SubStyleProperty';
//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Texture, Vector2 } from 'three';
/* eslint-enable no-unused-vars */


export default class BackgroundImage extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'backgroundImage', defaultValue, true );


		this._input = null;

		// configure
		this._allowsInherit = false;

		/**
		 *
		 * @type {Vector2}
		 * @internal
		 */
		this._textureSize = new Vector2( 1,1 );

		this.isValidValue = _isValid;

	}

	/**
	 * @override
	 * @return {any|Texture|null}
	 */
	get value() {

		return this._value;

	}

	output( out ) {

		out[this._id] = this._value;

		out['tSize'] = this._textureSize;

	}


	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : URL
		this._value = this._inheritedInput;

		// ?
		// out[this.id] = this._value;

		if( this._value instanceof Texture && !this._value.image ) {
			console.warn( `ThreeMeshUI - .backgroundImage :: Please provide preloaded texture in order to have accurate sizing.`);
			return;
		}

		this._needsProcess = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	process( element ) { /* eslint-enable no-unused-vars */

		if( this._value ) {

			this._textureSize.set( this._value.image.width, this._value.image.height );

		} else {

			this._textureSize.set( 1 , 1 );

		}

	}

}

/* eslint-disable no-unused-vars */
/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) { /* eslint-enable no-unused-vars */

	// @TODO : Texture or URL() or String or ID ?
	//console.log( "todo, validate image value", value);

	return true;

}
