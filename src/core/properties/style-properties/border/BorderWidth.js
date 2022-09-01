import * as Units from '../../../../utils/Units';
import StyleVector4Property from '../StyleVector4Property';

export default class BorderWidth extends StyleVector4Property{

	/**
	 *
	 * @param defaultValue
	 */
	constructor( defaultValue ) {

		super ( 'borderWidth', defaultValue, false );


		this._valueUV = this._value.clone();

		// configure
		this.output = this._outputValue;

		this._units = Units.WORLD_UNITS;

	}

	/**
	 *
	 * @param {string} units
	 */
	set units( units ) {

		this._units = Units.validateUnits( units );

		this._needsUpdate = true;

	}

	/**
	 *
	 * @returns {string}
	 */
	get units() { return this._units; }

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	computeOutputValue( element) { /* eslint-enable no-unused-vars */

		this._vector4ValueSetter( this._value, this._input );

		this._needsProcess = true;

		element._bounds._needsUpdate = true;
		element._layouter._needsUpdate = true;

		// for ( let i = 0; i < element._children._uis.length; i++ ) {
		// 	const child = element._children._uis[ i ];
		// 	element._bounds._needsUpdate = true;
		// }

	}

	_outputValue( out ) {
		out[this._id] = this._valueUV;
	}

	/**
	 *
	 * @override
	 */
	process( element ) {
		this._needsRender = true;
		element._borderRadius._needsRender = true;
	}

	/**
	 * @override
	 */
	render( element ) {

		this._valueUV.copy( this._value );

		const offsetWidth = element._bounds._offsetWidth;
		const offsetHeight = element._bounds._offsetHeight;

		// @TODO: Units process could be strategies
		if( this._units === Units.PERCENT ){

			console.log( "Percent" );
			// this._valueUV.divideScalar( 100 );
			console.log( this._valueUV );

		}

		// @TODO: Units process could be strategies
		if( this._units === Units.WORLD_UNITS ) {

			if( offsetWidth !== 0) {
				this._valueUV.w /= offsetWidth;
				this._valueUV.y /= offsetWidth;
			}


			if( offsetHeight !== 0 ) {
				this._valueUV.x /= offsetHeight;
				this._valueUV.z /= offsetHeight;
			}


		} else if( this._units === Units.UV ) {

			// @TODO: Units process could be strategies

			if( offsetWidth !== 0 ) {
				const sX = offsetWidth > offsetHeight ? offsetHeight/offsetWidth : 1;
				this._valueUV.y *= sX;
				this._valueUV.w *= sX;
			}

			if( offsetHeight !== 0 ) {
				const sY = offsetWidth < offsetHeight ? offsetWidth/offsetHeight : 1;

				this._valueUV.x *= sY;
				this._valueUV.z *= sY;
			}

		}

	}

}
