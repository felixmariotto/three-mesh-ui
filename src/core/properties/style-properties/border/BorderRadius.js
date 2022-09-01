import { Vector2 } from 'three';
import * as Units from '../../../../utils/Units';
import StyleVector4Property from '../StyleVector4Property';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Vector4 } from 'three';
/* eslint-enable no-unused-vars */

export default class BorderRadius extends StyleVector4Property {

	/**
	 *
	 * @param {Vector4} defaultValue
	 */
	constructor( defaultValue ) {

		super( 'borderRadius', defaultValue );

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._valueUV = this._value.clone();

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._input = new Vector4(0,0,0,0);
		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._mediation = true;

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerTL = new Vector2(0, 1);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerTR = new Vector2(1, 1);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerBR = new Vector2(1, 0);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerBL = new Vector2(0, 0);

		const mediationTop = new BorderRadiusMediator( this._valueUV, [ 'x', 'y' ] ); // bottom
		const mediationBottom = new BorderRadiusMediator( this._valueUV, [ 'z', 'w'] ); // top
		const mediationLeft = new BorderRadiusMediator( this._valueUV, [ 'x', 'w'] ); // right
		const mediationRight = new BorderRadiusMediator( this._valueUV, [ 'y', 'z'] ); // left

		mediationTop.complementaryMediation = mediationBottom;
		mediationBottom.complementaryMediation = mediationTop;
		mediationLeft.complementaryMediation = mediationRight;
		mediationRight.complementaryMediation = mediationLeft;

		/**
		 *
		 * @type {Array.<BorderRadiusMediator>}
		 * @private
		 */
		this._sideMediators = [ mediationTop, mediationBottom, mediationLeft, mediationRight ];

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

	/**
	 *
	 * @param {boolean} v
	 */
	set mediation ( v) {

		if( v !== this._mediation ){

			this._mediation = v;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @returns {boolean}
	 */
	get mediation () { return this._mediation; }


	/**
	 *
	 * @param {Object.<string,any>} out
	 */

	output( out ) {

		out["cornerTL"] = this._cornerTL;
		out["cornerTR"] = this._cornerTR;
		out["cornerBR"] = this._cornerBR;
		out["cornerBL"] = this._cornerBL;

	}

	/**
	 *
	 * @override
	 */
	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._vector4ValueSetter( this._value, this._input );

		this._needsProcess = true;

	}


	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	process( element ){ /* eslint-enable no-unused-vars */

		this._needsRender = true;

	}

	/**
	 *
	 * @override
	 */
	render( element ){

		this._valueUV.copy( this._value );

		const elementWidth = element._bounds._offsetWidth;
		const elementHeight = element._bounds._offsetHeight;

		// @TODO: Units process could be strategies
		if( this._units === Units.PERCENT ) {
			this._valueUV.divideScalar(100);
		}

		// @TODO: Units process could be strategies
		if( this._units === Units.WORLD_UNITS ) {
			this._valueUV.divideScalar( Math.min(elementWidth , elementHeight) );
		}



		/**
		 * mediate
		 * Be sure no side is greater than 1 (uv units)
		 */
		if( this._mediation ) {

			do {

				this._sideMediators.forEach( srm => srm.computeValue() );
				this._sideMediators.sort( ( a, b ) => {
					return a.value < b.value ? 1 : -1
				} );

				if ( this._sideMediators[ 0 ].value > 1.0 ) {
					this._sideMediators[ 0 ].mediate();
				}

			} while ( this._sideMediators[ 0 ].value > 1.0 );

		}


		let sX = elementWidth > elementHeight ? elementHeight/elementWidth : 1;
		let sY = elementWidth < elementHeight ? elementWidth/elementHeight : 1;

		// Do not scale pourcentages, allowing ovals
		if( this._units === Units.PERCENT ){
			sX = sY = 1.0;
		}

		this._cornerTL.x = this._valueUV.x * sX;
		this._cornerTL.y = 1 - (this._valueUV.x * sY );

		this._cornerTR.x = 1 - (this._valueUV.y * sX );
		this._cornerTR.y = 1 - (this._valueUV.y * sY );

		this._cornerBR.x = 1 - (this._valueUV.z * sX );
		this._cornerBR.y = this._valueUV.z * sY;

		this._cornerBL.x = this._valueUV.w * sX;
		this._cornerBL.y = this._valueUV.w * sY;

	}

	/**
	 *
	 */
	dispose() {

		for ( const sideMediator of this._sideMediators ) {

			sideMediator.dispose();

		}

		this._sideMediators = null;

		this._cornerTL = null;
		this._cornerTR = null;
		this._cornerBR = null;
		this._cornerBL = null;

		super.dispose();

	}

	/**
	 *
	 * @param {Number} v
	 */
	set topLeft( v ) {

		if( this._input.x === v ) return;

		this._input.x = v;
		this._needsUpdate = true;

	}

	/**
	 *
	 * @returns {number}
	 */
	get topLeft() { return this._input.x; }

	/**
	 *
	 * @param {Number} v
	 */
	set topRight( v ) {

		if( this._input.y === v ) return;

		this._input.y = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get topRight() { return this._input.y; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottomRight( v ) {
		if( this._input.z === v ) return;

		this._input.z = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottomRight() { return this._input.z; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottomLeft( v ) {

		if( this._input.w === v ) return;

		this._input.w = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottomLeft() { return this._input.w; }


	/**
	 * @override
	 * @param {Number} v
	 */
	set top( v ) {

		if( this._input.x === v && this._input.y === v ) return;

		this._input.x = this._input.y = v;
		this._needsUpdate = true;

	}

	/**
	 * @override
	 * @returns {number}
	 */
	get top() { return (this._input.x + this._input.y) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set right( v ) {

		if( this._input.y === v && this._input.z === v ) return;

		this._input.y = this._input.z = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get right() { return (this._input.y + this._input.z) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set bottom( v ) {
		if( this._input.z === v && this._input.w === v ) return;

		this._input.z = this._input.w = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get bottom() { return (this._input.z + this._input.w) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set left( v ) {

		if( this._input.w === v && this._input.x === v ) return;

		this._input.w = this._input.x = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get left() { return (this._input.w + this._input.x) / 2; }

}

/**
 * Job: Contains two border radiuses values of the same side
 * 			If their sums is greater than 1 (uv units) mediation could occurs
 */
class BorderRadiusMediator {

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
