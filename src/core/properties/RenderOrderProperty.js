import BaseProperty from './BaseProperty';

export default class RenderOrderProperty extends BaseProperty{

	constructor() {

		super( 'renderOrder', 'auto', true);

		this.output = this._outputValue;

		this._actualValue = 0;
	}

	/**
	 *
	 * @param {number} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		this._value = value;

		this._needsUpdate = true;

	}

	update( element, out ) {

		if( this._value !== 'auto' ) {

			this._actualValue = this._value;

		} else {

			const parent = element._parent._value;
			if( parent !== null ) {

				const parentIndex = parent._renderOrder._actualValue;
				const positionInParent = 1 + parent._children._uis.indexOf( element );

				this._actualValue = parentIndex + positionInParent;

			}

		}

		// update any children
		for ( const childUIElement of element._children._uis ) {

			const property = childUIElement[`_renderOrder`];
			if( property._value === 'auto' ) childUIElement[`_renderOrder`]._needsUpdate = true;

		}

		this._outputValue( out );

	}

	_outputValue( out ) {

		out[this._id] = this._actualValue;

	}


	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}
