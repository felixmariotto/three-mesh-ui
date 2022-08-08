import StyleVector4Property from './StyleVector4Property';
import * as Units from '../../../utils/Units';

export default class BorderWidth extends StyleVector4Property{

	/**
	 *
	 * @param defaultValue
	 */
	constructor( defaultValue ) {

		super ( 'borderWidth', defaultValue );

		this._units = Units.WORLD_UNITS;

	}

	/**
	 *
	 * @param {string} units
	 */
	set units( units ) {

		this._units = Units.validateUnits( units );
		this.updateValue();

	}

	/**
	 *
	 * @returns {string}
	 */
	get units() { return this._units; }


	/**
	 *
	 * @param {ElementVR} vrElement
	 * @param {Object.<string,any>} out
	 */
	buildOutput( vrElement, out ) {

		out[this.id] = this;
		this._needsProcess = true;

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 */
	process( vrElement ) {

		this._vector4ValueSetter( this._output, this._input );

		const offsetWidth = vrElement.offsetWidth;
		const offsetHeight = vrElement.offsetHeight;

		// @TODO: Units process could be strategies
		if( this._units === Units.PERCENT ){

			this._output.divideScalar( 100 );

		}

		// @TODO: Units process could be strategies
		if( this._units === Units.WORLD_UNITS ) {

			this._output.w /= offsetWidth;
			this._output.y /= offsetWidth;

			this._output.x /= offsetHeight;
			this._output.z /= offsetHeight;

		}

		// @TODO: Units process could be strategies
		if( this._units === Units.UV ) {

			const sX = offsetWidth > offsetHeight ? offsetHeight/offsetWidth : 1;
			const sY = offsetWidth < offsetHeight ? offsetWidth/offsetHeight : 1;

			this._output.x *= sY;
			this._output.y *= sX;
			this._output.z *= sY;
			this._output.w *= sX;

		}

	}

}
