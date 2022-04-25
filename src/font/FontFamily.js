import { EventDispatcher } from 'three';
import MSDFFontVariant from './msdf/MSDFFontVariant';

export default class FontFamily extends EventDispatcher {

	/**
	 *
	 * @param name
	 */
	constructor( name ) {

		super();

		this._name = name;
		this._variants = [];

		this._isReady = false;

	}

	get isReady() { return this._isReady; }

	/**
	 *
	 * @param weight
	 * @param style
	 * @param json
	 * @param texture
	 * @param override
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
	 * @param weight
	 * @param style
	 * @returns {FontVariant}
	 */
	getVariant( weight, style ){

		return this._variants.find( fontVariant => fontVariant.weight === weight && fontVariant.style === style );

	}

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
