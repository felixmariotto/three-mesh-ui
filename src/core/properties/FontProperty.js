import BaseProperty from './BaseProperty';
import FontVariant from '../../font/FontVariant';

export default class FontProperty extends BaseProperty{

	/**
	 *
	 * @param {fontVariant} [value=null]
	 */
	constructor( value = null ) {

		super( 'font', value);

		/**
		 *
		 * @type {FontVariant|null}
		 * @private
		 */
		this._fontVariant = null;

		/**
		 *
		 * @type { ()=> void|null }
		 * @private
		 */
		this._handleFontReadyClosure = null;

		/**
		 * @override
		 */
		this.isValid = _isValid;

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @param out
	 */
	update( vrElement, out ) {

		// if a previous font isset, be sure no event remains
		if ( this._fontVariant && !this._fontVariant.isReady ) {

			this._fontVariant.removeEventListener( 'ready', this._handleFontReadyClosure );

		}

		// obtain font from value or from style combinaison
		if( this._value && this._value instanceof FontVariant ) {

			this._fontVariant = this._value;

		} else {


			const fontFamily = vrElement.style._fontFamily.output;
			if( fontFamily ) {

				this._fontVariant = fontFamily.getVariant(
					vrElement.style._fontWeight.output,
					vrElement.style._fontStyle.output,
				);

			}

		}

		if( !this._fontVariant ) return;

		this._handleFontReadyClosure = _readyClosure( vrElement, this );

		// new font, means rebuild inlines, now or soon
		if ( !this._fontVariant.isReady ) {

			// @TODO : clear inlines components
			// this.inlines = null;

			this._fontVariant.addEventListener( 'ready', this._handleFontReadyClosure );

		} else {

			this._handleFontReadyClosure();

		}

		// @TODO : Material Property
		// update font material according to font variant
		if( !this._material ) {

			this.material = new this._font.fontMaterial();

		} else {



			// @TODO :	Only recreate a material instance if needed,
			//  				prevent user that its custom material may no longer be compatible with update fontVariant implementation
			const isDefaultMaterial = this._material.isDefault && this._material.isDefault();
			if( isDefaultMaterial && !(this._material instanceof this._font.fontMaterial) ) {

				this.material = new this._font.fontMaterial();

			} else {

				this._transferToMaterial();

			}

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
 * @param {ElementVR} vrElement
 * @param {FontProperty} fontProperty
 * @return {() => void}
 * @private
 */
function _readyClosure( vrElement, fontProperty ) {
	return function () {

		// this._transferToMaterial();

		// request parse update and parent layout
		// this.update( true, true, false );
		// this.getHighestParent().update( false, true, false );

		// remove the listener
		fontProperty._fontVariant.removeEventListener( 'ready', fontProperty._handleFontReadyClosure );
		fontProperty._handleFontReadyClosure = null;

	}
}
