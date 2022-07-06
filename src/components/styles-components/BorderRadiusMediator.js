//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Vector4 } from 'three';
/* eslint-enable no-unused-vars */

/**
 * Job: Contains two border radiuses values of the same side
 * 			If their sums is greater than 1 (uv units) mediation could occurs
 */
export default class BorderRadiusMediator {

	/**
	 *
	 * @param {Vector4} borderRadiuses
	 * @param {Array.<string>} sideProperties
	 */
	constructor( borderRadiuses, sideProperties ) {

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._borderRadiuses = borderRadiuses;

		/**
		 *
		 * @type {Array<string>}
		 * @private
		 */
		this._sideProperties = sideProperties;

		/**
		 *
		 * @type {BorderRadiusMediator|null}
		 * @private
		 */
		this._complementaryMediation = null;

		/**
		 *
		 * @type {number}
		 * @private
		 */
		this._value = 0;
	}

	/**
	 * The sum of the border radius of that side
	 * @returns {number}
	 */
	get value(){ return this._value; }

	/**
	 * A complementary side mediation ie: For top, complementary is bottom
	 * @param {BorderRadiusMediator} brm
	 */
	set complementaryMediation( brm ){

		this._complementaryMediation = brm;

	}

	/**
	 * Adds all side property to compute the value of that side
	 */
	computeValue(){

		let totalRadius = 0;

		for ( const radius of this._sideProperties ) {

			totalRadius += this._borderRadiuses[radius];

		}

		this._value = totalRadius;
	}

	/**
	 *
	 * @param {boolean} [mediateOpposite=true]
	 */
	mediate( mediateOpposite = true ){

		// Mediation only occurs when sum of radius are greater than 1 (uv units)
		if( this._value < 1.0 ) return;

		// Simply divide each component by the sum
		for ( const radius of this._sideProperties ) {

			this._borderRadiuses[radius] /= this._value;

		}

		if( mediateOpposite ) {

			// and also mediate the complementary
			this._complementaryMediation.mediate( false );

		}

	}

	/**
	 *
	 */
	dispose() {

		this._complementaryMediation = null;
		this._borderRadiuses = null;

	}

}
