import BaseProperty from '../BaseProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../../elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export default class SubStyleProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {boolean} [primitive=true]
	 * @param {any} defaultValue
	 */
	constructor( propertyId, defaultValue, primitive = true) {

		super( propertyId, 'unset', primitive );

		/**
		 * @type {any}
		 * @internal
		 */
		this._input = 'inherit';

		/**
		 *
		 * @type {boolean}
		 * @protected
		 */
		this._allowsInherit = true;

		/**
		 * The input value that won't be 'inherit'
		 * @type {any}
		 * @protected
		 */
		this._inheritedInput = undefined;

		/**
		 *
		 * @type {any}
		 * @internal
		 */
		this._inline = undefined;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 * @param {Object.<string,any> } out
	 */
	update( element, out ) {

		if( !this._allowsInherit ) {

			this._inheritedInput = this.getInheritedInput( element );

		}

		this.computeOutputValue( element );

		// rebuild same properties on children 'inheritance'
		for ( const childUIElement of element._children._uis ) {

			const property = childUIElement[`_${this._id}`];
			const target = property._input ? property._input : property._value;

			if( target === 'inherit' ) childUIElement[`_${this._id}`]._needsUpdate = true;

		}

		this.output( out );

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) {

		this._value = this._input;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	_computeFromInherited( element ) {

		this._value = this._inheritedInput;

	}


	/**
	 * @override
	 * @deprecated
	 * @param {any} v
	 */
	set value( v ) {

		console.warn(".(style) sub-property cannot be directly set. It must comes from inline or computed setter.")

	}

	/**
	 *
	 * @param {any} value
	 */
	set inline( value ) {

		if( ! this.isValidValue( value ) ) return;

		if( value === this._inline ) {

			// do nothing no update, the value hasn't changed
			return;

		}

		this._input = this._inline = value;

		this._needsUpdate = true;

	}

	/**
	 *
	 * @return {any}
	 */
	get inline() { return this._inline; }

	/**
	 *
	 * @param {any} value
	 * @return {boolean}
	 */
	isValidValue( value ) {

		return true;

	}

	/**
	 * @param {MeshUIBaseElement} element
	 */
	getInheritedInput ( element ) {

		if( this._input !== 'inherit' ) return this._input;

		const parent = element._parent._value;
		if( parent ) {

			return parent[`_${this._id}`].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

}
/* eslint-enable no-unused-vars */
