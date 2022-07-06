import { Vector2, Vector4 } from 'three';
import BorderRadiusMediator from './BorderRadiusMediator';
import * as Units from '../../utils/Units';

export default class BorderRadius {

	/**
	 *
	 * @param {Vector4} target
	 */
	constructor( target ) {

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._units = Units.UV;

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._target = target;

		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._mediation = true;

		/**
		 * The mediated border radius values.
		 * Maximum side sum is 1.
		 * The units is UV ( ALWAYS )
		 * @type {Vector4}
		 * @private
		 */
		this._borderRadiusMediated = new Vector4().copy(target);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerTL = new Vector2(this._borderRadiusMediated.x, 1-this._borderRadiusMediated.x);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerTR = new Vector2(1-this._borderRadiusMediated.y, 1-this._borderRadiusMediated.y);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerBR = new Vector2(1-this._borderRadiusMediated.z, this._borderRadiusMediated.z);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerBL = new Vector2(this._borderRadiusMediated.w, this._borderRadiusMediated.w);

		const mediationTop = new BorderRadiusMediator( this._borderRadiusMediated, [ 'x', 'y' ] ); // bottom
		const mediationBottom = new BorderRadiusMediator( this._borderRadiusMediated, [ 'z', 'w'] ); // top
		const mediationLeft = new BorderRadiusMediator( this._borderRadiusMediated, [ 'x', 'w'] ); // right
		const mediationRight = new BorderRadiusMediator( this._borderRadiusMediated, [ 'y', 'z'] ); // left

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
	 * @param {boolean} v
	 */
	set mediation ( v) {

		if( v !== this._mediation ){

			this._mediation = v;
			this.updateValue();

		}

	}

	/**
	 *
	 * @returns {boolean}
	 */
	get mediation () { return this._mediation; }

	/**
	 *
	 * @param {Number} sX
	 * @param {Number} sY
	 */
	process( sX, sY ){

		// Do not scale pourcentages, allowing ovals
		if( this._units === Units.PERCENT ){
			sX = sY = 1.0;
		}

		this._cornerTL.x = this._borderRadiusMediated.x * sX;
		this._cornerTL.y = 1 - (this._borderRadiusMediated.x * sY );

		this._cornerTR.x = 1 - (this._borderRadiusMediated.y * sX );
		this._cornerTR.y = 1 - (this._borderRadiusMediated.y * sY );

		this._cornerBR.x = 1 - (this._borderRadiusMediated.z * sX );
		this._cornerBR.y = this._borderRadiusMediated.z * sY;

		this._cornerBL.x = this._borderRadiusMediated.w * sX;
		this._cornerBL.y = this._borderRadiusMediated.w * sY;

	}

	/**
	 *
	 * @param target
	 * @param sX
	 * @param sY
	 */
	updateValue( target, sX = 1.0, sY = 1.0 ) {

		if( !target ){
			target = this._target;
		}

		this._borderRadiusMediated.copy( target );

		// @TODO: Units process could be strategies
		if( this._units === Units.PERCENT ) {
			this._borderRadiusMediated.divideScalar(100);
		}

		// @TODO: Units process could be strategies
		if( this._units === Units.WORLD_UNITS ) {
			this._borderRadiusMediated.divideScalar( Math.min(sX , sY) );
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

	}

	/**
	 *
	 */
	dispose() {

		for ( const sideMediator of this._sideMediators ) {

			sideMediator.dispose();

		}

		this._target = null;

		this._sideMediators = null;

		this._borderRadiusMediated = null;
		this._cornerTL = null;
		this._cornerTR = null;
		this._cornerBR = null;
		this._cornerBL = null;

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get output(){ return this._borderRadiusMediated; }

}
