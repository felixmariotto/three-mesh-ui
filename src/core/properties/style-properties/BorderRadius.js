import { Vector2, Vector4 } from 'three';
import * as Units from '../../../utils/Units';
import StyleVector4Property from './StyleVector4Property';

export default class BorderRadius extends StyleVector4Property {

	/**
	 *
	 * @param {Vector4} defaultValue
	 */
	constructor( defaultValue ) {

		super( 'borderRadius', defaultValue );

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

		const mediationTop = new BorderRadiusMediator( this._output, [ 'x', 'y' ] ); // bottom
		const mediationBottom = new BorderRadiusMediator( this._output, [ 'z', 'w'] ); // top
		const mediationLeft = new BorderRadiusMediator( this._output, [ 'x', 'w'] ); // right
		const mediationRight = new BorderRadiusMediator( this._output, [ 'y', 'z'] ); // left

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

		this._needsUpdate = true;

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
	 * @param {ElementVR} vrElement
	 * @param {Object.<string,any>} out
	 */
	buildOutput( vrElement, out ) {

		out[this._id] = this;

		this._needsProcess = true;
	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 */
	process( vrElement ){

		console.log( "borderRadius process");

		this._vector4ValueSetter( this._output, this._input );

		const elementWidth = vrElement.offsetWidth;
		const elementHeight = vrElement.offsetHeight;

		// @TODO: Units process could be strategies
		if( this._units === Units.PERCENT ) {
			this._output.divideScalar(100);
		}

		// @TODO: Units process could be strategies
		if( this._units === Units.WORLD_UNITS ) {
			this._output.divideScalar( Math.min(elementWidth , elementHeight) );
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

		this._cornerTL.x = this._output.x * sX;
		this._cornerTL.y = 1 - (this._output.x * sY );

		this._cornerTR.x = 1 - (this._output.y * sX );
		this._cornerTR.y = 1 - (this._output.y * sY );

		this._cornerBR.x = 1 - (this._output.z * sX );
		this._cornerBR.y = this._output.z * sY;

		this._cornerBL.x = this._output.w * sX;
		this._cornerBL.y = this._output.w * sY;

		console.log( this._cornerTL, this._cornerTR, this._cornerBR, this._cornerBL);
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

		if( this._inline.x === v ) return;

		this._inline.x = v;
		this._needsUpdate = true;

	}

	/**
	 *
	 * @returns {number}
	 */
	get topLeft() { return this._inline.x; }

	/**
	 *
	 * @param {Number} v
	 */
	set topRight( v ) {

		if( this._inline.y === v ) return;

		this._inline.y = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get topRight() { return this._inline.y; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottomRight( v ) {
		if( this._inline.z === v ) return;

		this._inline.z = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottomRight() { return this._inline.z; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottomLeft( v ) {

		if( this._inline.w === v ) return;

		this._inline.w = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottomLeft() { return this._inline.w; }


	/**
	 * @override
	 * @param {Number} v
	 */
	set top( v ) {

		if( this._inline.x === v && this._inline.y === v ) return;

		this._inline.x = this._inline.y = v;
		this._needsUpdate = true;

	}

	/**
	 * @override
	 * @returns {number}
	 */
	get top() { return (this._inline.x + this._inline.y) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set right( v ) {

		if( this._inline.y === v && this._inline.z === v ) return;

		this._inline.y = this._inline.z = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get right() { return (this._inline.y + this._inline.z) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set bottom( v ) {
		if( this._inline.z === v && this._inline.w === v ) return;

		this._inline.z = this._inline.w = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get bottom() { return (this._inline.z + this._inline.w) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set left( v ) {

		if( this._inline.w === v && this._inline.x === v ) return;

		this._inline.w = this._inline.x = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get left() { return (this._inline.w + this._inline.x) / 2; }

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
