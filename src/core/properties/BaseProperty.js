import * as DefaultValues from '../DefaultValues';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from './../../core/elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 * @param primitive
	 */
	constructor( propertyId, value = null, primitive = true ) {

		/**
		 *
		 * @type {string}
		 * @internal
		 */
		this._id = propertyId;

		/**
		 *
		 * @type {any}
		 * @internal
		 */
		this._value = value;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._needsUpdate = true;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._needsProcess = false;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._needsRender = false;

		/**
		 *
		 * @type {boolean}
		 * @protected
		 */
		this._isPrimitive = primitive;

	}

	/**
	 *
	 * @return {string}
	 */
	get id() { return this._id; }

	/**
	 *
	 * @return {any}
	 */
	get value() { return this._value; }

	/**
	 *
	 * @param {any} value
	 */
	set value( value ) {

		if ( !this.isValid( value ) ) return;

		if ( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @param {Object.<string,any>} out
	 */
	update( element, out ) { 	/* eslint-enable no-unused-vars */

		// the value has been updated from setter
		// if there is no additional logic
		// then just output it
		// => out[this._id] = this._value;
		this.output( out );


		// ??
		//this.computeOutputValue( element );
		// if( this._isPrimitive ) this.output( out );

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Output this property in a dictionnary
	 * @param {Object.<string,any>} out
	 */
	output( out ) { 	/* eslint-enable no-unused-vars */

		// ie:
		// out['borderRadius'] = this;
		// out[this._id] = this._value;

	}


	/**
	 *
	 * @param {Out} out
	 */
	_outputValue( out ) {

		out[ this._id ] = this._value;

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Execute additional process after all properties have been updated
	 * @param {MeshUIBaseElement} element
	 */
	process( element ) { /* eslint-enable no-unused-vars */ }

	/* eslint-disable no-unused-vars */
	/**
	 * Execute additional process after all properties have been updated
	 * @param {MeshUIBaseElement} element
	 */
	render( element ) { /* eslint-enable no-unused-vars */ }

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	getInheritedInput( element ) {

		if ( this._value !== 'inherit' ) return this._value;

		const parent = element._parent._value;
		if ( parent && parent[ `_${this._id}` ] ) {

			return parent[ `_${this._id}` ].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

	/**
	 *
	 * @return {any}
	 */
	getDefaultValue() {

		return DefaultValues.get( this._id );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {any} value
	 * @return {boolean}
	 */
	isValid( value ) { 	/* eslint-enable no-unused-vars */

		return true;

	}

	/**
	 *
	 */
	emptyStrategyLogic() {

		throw new Error( `ThreeMeshUI::${this.constructor.name} has empty strategy. Update has not been processed.` );

	}

	requestUpdate() {
		this._needsUpdate = true;
	}

	requestProcess() {
		this._needsProcess = false;
	}

	requestRender() {
		this._needsRender = false;
	}

}


/**
 * @typedef Out
 * @type {Object & Object.<string,any>}
 */
