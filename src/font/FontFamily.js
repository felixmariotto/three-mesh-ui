import { EventDispatcher } from 'three';
import MSDFFontVariant from './msdf/MSDFFontVariant';
//JSDoc related imports

/* eslint-disable no-unused-vars */
import FontVariant from './FontVariant';
import { Texture } from 'three';
import { uniformizeFontWeight } from './utils/FontUtils';
/* eslint-enable no-unused-vars */

export default class FontFamily extends EventDispatcher {

	/**
	 *
	 * @param {string} name
	 */
	constructor( name ) {

		super();

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._name = name;

		/**
		 *
		 * @type {Array.<FontVariant>}
		 * @private
		 */
		this._variants = [];

		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._isReady = false;

	}

	get isReady() { return this._isReady; }

	/**
	 *
	 * @param {string|number} weight
	 * @param {string} style
	 * @param {string|Object} json
	 * @param {string|Texture} texture
	 * @param {boolean} [override=false]
	 */
	addVariant( weight, style, json, texture, override = false){

		if( override || !this.getVariant( weight, style) ){

			this._isReady = false;

			const newVariant = new MSDFFontVariant( weight, style, json, texture);

			this._variants.push( newVariant );

			if( !newVariant.isReady ){

				newVariant.addEventListener( "ready", this._checkReadiness )

			} else {

				this._checkReadiness();

			}

		} else {

			console.warn(`FontFamily('${this._name}')::addVariant() - Variant(${weight}, ${style}) already exists.`);

		}

		return this;

	}

	/**
	 *
	 * @param {FontVariant} variantImplementation
	 * @param {boolean} [override=false]
	 */
	addCustomImplementationVariant( variantImplementation, override = false){

		if( override || !this.getVariant( variantImplementation.weight, variantImplementation.style) ){

			this._isReady = false;

			this._variants.push( variantImplementation );

			if( !variantImplementation.isReady ){

				variantImplementation.addEventListener( "ready", this._checkReadiness )

			} else {

				this._checkReadiness();

			}

		} else {

			console.warn(`FontFamily('${this._name}')::addCustomImplementationVariant() - Variant(${variantImplementation.weight}, ${variantImplementation.style}) already exists.`);

		}

		return this;

	}

	/**
	 *
	 * @param {string|number} weight
	 * @param {string} style
	 * @returns {FontVariant|null}
	 */
	getVariant( weight, style ){

		weight = uniformizeFontWeight(weight);

		return this._variants.find( fontVariant => fontVariant.weight === weight && fontVariant.style === style );

	}

	/**
	 *
	 * @return {string}
	 */
	get name(){ return this._name; }

	_checkReadiness = () => {

		if( this._variants.every( v => v.isReady ) ) {

			_setReady( this );

		}

	}

}

const _readyEvent = { type: 'ready' };

/**
 * Set the ready status of a fontVariant
 * @param {FontFamily} fontFamily
 * @private
 */
function _setReady( fontFamily ) {

	fontFamily._isReady = true;
	fontFamily.dispatchEvent( _readyEvent );

}


