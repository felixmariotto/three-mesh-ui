import BaseProperty from './BaseProperty';
import FontVariant from '../../font/FontVariant';

export default class FontProperty extends BaseProperty{

	/**
	 *
	 * @param {FontVariant} [value=null]
	 */
	constructor( value = null ) {

		super( 'font', value, false);

		this._needsUpdate = false;

		/**
		 *
		 * @type {FontVariant|null}
		 * @internal
		 */
		this._fontVariant = null;


		/**
		 * @typedef ReadyClosure
		 * @type { ()=> void|null }
		 */

		/**
		 *
		 * @type {ReadyClosure}
		 * @private
		 */
		this._handleFontReadyClosure = null;

		/**
		 * @override
		 */
		this.isValid = _isValid;

	}

	output( out ) {

		out[this._id] = this._fontVariant;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	update( element, out ) { 	/* eslint-enable no-unused-vars */

		// if a previous font isset, be sure no event remains
		if ( this._fontVariant && !this._fontVariant.isReady ) {

			this._fontVariant.removeEventListener( 'ready', this._handleFontReadyClosure );

		}

		// obtain font from value or from style combinaison
		if( this._value && this._value instanceof FontVariant ) {

			this._fontVariant = this._value;

		} else {


			const fontFamily = element._fontFamily._value;
			if( fontFamily ) {

				this._fontVariant = fontFamily.getVariant(
					element._fontWeight._value,
					element._fontStyle._value,
				);

			}

		}

		if( !this._fontVariant ) return;

		this._fontVariant._alterElementProperties( element );

		this._handleFontReadyClosure = _readyClosure( element, this );

		// new font, means rebuild inlines, now or soon
		if ( !this._fontVariant.isReady ) {

			// @TODO : clear inlines components
			// this.inlines = null;

			this._fontVariant.addEventListener( 'ready', this._handleFontReadyClosure );

		} else {

			this._handleFontReadyClosure();

		}

		// Set the default material
		if( !element._fontMaterial._defaultMaterial || !(element._fontMaterial._defaultMaterial instanceof this._fontVariant.fontMaterial) ) {

			element._fontMaterial._defaultMaterial = new this._fontVariant.fontMaterial();
			element._fontMaterial._needsUpdate = true;

		}

	}

	/**
	 * @override
	 * @param {FontVariant} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @return {FontVariant}
	 */
	get value() { return this._value; }


	/**
	 *
	 * @return {FontVariant|null}
	 */
	get fontVariant() { return this._fontVariant; }

	/**
	 *
	 */
	dispose () {

		if( this._handleFontReadyClosure ) {

			this._fontVariant.removeEventListener( 'ready', this._handleFontReadyClosure );
			this._handleFontReadyClosure = null;

		}

		this._value = null;
		this._fontVariant = null;

	}

}


/**
 *
 * @param {number} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if( ! ( value instanceof FontVariant )  ) {

		console.warn(`.font value '${value}' is not valid. It requires a FontVariant instance. Aborted`);
		return false;

	}

	return true;

}

/**
 *
 * @param {MeshUIBaseElement} element
 * @param {FontProperty} fontProperty
 * @return {() => void}
 * @private
 */
function _readyClosure( element, fontProperty ) {
	return function () {

		fontProperty._needsUpdate = true;// ? update itself?
		element._glyphs._needsProcess = true;

		// this._transferToMaterial();

		// request parse update and parent layout
		// this.update( true, true, false );
		// this.getHighestParent().update( false, true, false );

		// remove the listener
		fontProperty._fontVariant.removeEventListener( 'ready', fontProperty._handleFontReadyClosure );
		fontProperty._handleFontReadyClosure = null;

	}
}
