import SegmentsProperty from './SegmentsProperty';

export default class SegmentsPropertyText extends SegmentsProperty {

	constructor() {

		super( 'segments', 1, false );

		this._notInheritedValue = undefined;

	}


	/* eslint-disable no-unused-vars */	update( element, out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;
		if ( this._notInheritedValue === 'inherit' ) {

			this._notInheritedValue = this.getInheritedInput( element );

		}

		element._layouter._needsUpdate = true;

	}

	/**
	 *
	 * @param {number|"inherit"} v
	 */
	set value( v ) {

		if ( this._value === v ) return;

		this._value = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @override
	 * @return {number}
	 */
	get value() {

		if ( this._value === 'inherit' ) return this._notInheritedValue;

		return this._value;

	}

}
