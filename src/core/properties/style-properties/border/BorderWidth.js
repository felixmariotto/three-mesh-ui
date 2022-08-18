import StyleVector4Property from '../StyleVector4Property';
import * as Units from '../../../../utils/Units';

export default class BorderWidth extends StyleVector4Property{

	/**
	 *
	 * @param defaultValue
	 */
	constructor( defaultValue ) {

		super ( 'borderWidth', defaultValue, false );

		this.output = this._outputValue;

		this._units = Units.WORLD_UNITS;

	}

	/**
	 *
	 * @param {string} units
	 */
	set units( units ) {

		this._units = Units.validateUnits( units );

		this._needsProcess = true;

	}

	/**
	 *
	 * @returns {string}
	 */
	get units() { return this._units; }

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element) { /* eslint-enable no-unused-vars */

		this._needsProcess = true;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	process( element ) {

		this._vector4ValueSetter( this._value, this._input );

		const offsetWidth = element._bounds._offsetWidth;
		const offsetHeight = element._bounds._offsetHeight;

		// @TODO: Units process could be strategies
		if( this._units === Units.PERCENT ){

			this._value.divideScalar( 100 );

		}

		// @TODO: Units process could be strategies
		if( this._units === Units.WORLD_UNITS ) {

			if( offsetWidth !== 0) {
				this._value.w /= offsetWidth;
				this._value.y /= offsetWidth;
			}


			if( offsetHeight !== 0 ) {
				this._value.x /= offsetHeight;
				this._value.z /= offsetHeight;
			}


		} else if( this._units === Units.UV ) {

			// @TODO: Units process could be strategies

			if( offsetWidth !== 0 ) {
				const sX = offsetWidth > offsetHeight ? offsetHeight/offsetWidth : 1;
				this._value.y *= sX;
				this._value.w *= sX;
			}

			if( offsetHeight !== 0 ) {
				const sY = offsetWidth < offsetHeight ? offsetWidth/offsetHeight : 1;

				this._value.x *= sY;
				this._value.z *= sY;
			}

		}

	}

}
