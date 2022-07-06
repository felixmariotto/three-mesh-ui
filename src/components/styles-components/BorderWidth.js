import { Vector4 } from 'three';
import * as Units from '../../utils/Units';

export default class BorderWidth {

	/**
	 *
	 * @param defaultValue
	 */
	constructor( defaultValue ) {

		this._units = Units.WORLD_UNITS;

		this._inputValue = new Vector4().copy( defaultValue );

		this._borderWidthUV = new Vector4().copy( this._inputValue );

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

	updateValue( target = null, offsetWidth = 1.0, offsetHeight = 1.0 ){

		if( target ){
			this._inputValue.copy( target );
		}else{
			target = this._inputValue;
		}

		this._borderWidthUV.copy( target );


		// @TODO: Units process could be strategies
		if( this._units === Units.PERCENT ){

			this._borderWidthUV.divideScalar( 100 );

		}

		// @TODO: Units process could be strategies
		if( this._units === Units.WORLD_UNITS ) {

			this._borderWidthUV.w /= offsetWidth;
			this._borderWidthUV.y /= offsetWidth;

			this._borderWidthUV.x /= offsetHeight;
			this._borderWidthUV.z /= offsetHeight;

		}

		// @TODO: Units process could be strategies
		if( this._units === Units.UV ) {

			const sX = offsetWidth > offsetHeight ? offsetHeight/offsetWidth : 1;
			const sY = offsetWidth < offsetHeight ? offsetWidth/offsetHeight : 1;

			this._borderWidthUV.x *= sY;
			this._borderWidthUV.y *= sX;
			this._borderWidthUV.z *= sY;
			this._borderWidthUV.w *= sX;

		}

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get output() { return this._borderWidthUV; }

}
