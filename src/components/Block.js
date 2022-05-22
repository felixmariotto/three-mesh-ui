import { Vector2 } from 'three';

import BoxComponent from './core/BoxComponent.js';

import Frame from '../frame/Frame.js';
import FrameMaterial from '../frame/materials/FrameMaterial';
import FrameMaterialUtils from '../frame/utils/FrameMaterialUtils';

/**

Job:
- Update a Block component
- Calls BoxComponent's API to position its children box components
- Calls InlineManager's API to position its children inline components
- Call creation and update functions of its background planes
 */



export default class Block extends BoxComponent {

	constructor( options ) {

		super( options );

		this.isBlock = true;

		//

		this.size = new Vector2( 1, 1 );

		// this._main = new Frame( this.getBackgroundMaterial() );
		this._material = new FrameMaterial();

		/**
		 *
		 * @type {Frame}
		 * @protected
		 */
		this._main = new Frame( this._material );

		this._materialMediation = { ...FrameMaterialUtils.mediation };

		// This is for hiddenOverflow to work
		this._main.onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

		};

		this.add( this._main );

		// Lastly set the options parameters to this object, which will trigger an update

		this.set( options );

		this._transferToMaterial();

	}

	get frame() { return this._main; }
	////////////
	//  UPDATE
	////////////

	parseParams() {}

	updateLayout() {

		// Get temporary dimension

		const WIDTH = this.getWidth();

		const HEIGHT = this.getHeight();

		if ( !WIDTH || !HEIGHT ) {

			console.warn( 'Block got no dimension from its parameters or from children parameters' );
			return;

		}

		this.size.set( WIDTH, HEIGHT );
		this._main.scale.set( WIDTH, HEIGHT, 1 );

		// if ( this._main ) this.updateBackgroundMaterial();

		this._main.renderOrder = this.getParentsNumber();

		// Position this element according to earlier parent computation.
		// Delegate to BoxComponent.

		if ( this.autoLayout ) {

			this.setPosFromParentRecords();

		}

		// Position inner elements according to dimensions and layout parameters.
		// Delegate to BoxComponent.

		if ( this.childrenInlines.length ) {

			this.computeInlinesPosition();

		}

		this.computeChildrenPosition();

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( this.parentUI ) {

			this.position.z = this.getOffset();

		}

	}

	//

	updateInner() {

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( this.parentUI ) {

			this.position.z = this.getOffset();

		}

		// if ( this._main ) this.updateBackgroundMaterial();

	}

}
