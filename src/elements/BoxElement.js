import ElementVR from '../core/elements/ElementVR';
import Frame from '../frame/Frame';
import FrameMaterial from '../frame/materials/FrameMaterial';
import FrameMaterialUtils from '../frame/utils/FrameMaterialUtils';

export default class BoxElement extends ElementVR {

	constructor() {

		super();

		this.isBox = true;

		// bounds box

		// main = frame;
		this._material = new FrameMaterial();

		/**
		 *
		 * @type {Frame}
		 * @protected
		 */
		this._main = new Frame( this );

		this._materialMediation = { ...FrameMaterialUtils.mediation };

		// This is for hiddenOverflow to work
		// this._main.onBeforeRender = () => {
		//
		// 	if ( this.updateClippingPlanes ) {
		//
		// 		this.updateClippingPlanes();
		//
		// 	}
		//
		// };

		this.add( this._main );

		this.forceOutput();

	}

	/**
	 * A Text Element can only contains box elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) {

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if( argument.isUI && argument.isBox ) {

				validChildren.push( argument )

			}

			validChildren.push( argument );

		}

		return super.add( ...validChildren );

	}

}
