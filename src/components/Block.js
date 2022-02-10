import { Object3D, Vector2 } from 'three';

import BoxComponent from './core/BoxComponent.js';
import InlineManager from './core/InlineManager.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import MaterialManager from './core/MaterialManager.js';

import Frame from '../content/Frame.js';
import { mix } from '../utils/mix.js';

/**

Job:
- Update a Block component
- Calls BoxComponent's API to position its children box components
- Calls InlineManager's API to position its children inline components
- Call creation and update functions of its background planes

 */
export default class Block extends mix.withBase( Object3D )(
	BoxComponent,
	InlineManager,
	MaterialManager,
	MeshUIComponent
) {

	constructor( options ) {

		super( options );

		this.isBlock = true;

		//

		this.size = new Vector2( 1, 1 );

		this.frame = new Frame( this.getBackgroundMaterial() );

		// This is for hiddenOverflow to work
		this.frame.onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

		};

		this.add( this.frame );

		// Lastly set the options parameters to this object, which will trigger an update

		this.set( options );

	}

	////////////
	//  UPDATE
	////////////

	parseParams() {

		const bestFit = this.getBestFit();

		if ( bestFit != 'none' && ( this.children.find( child => child.isText ) ) ) {

			this.calculateBestFit( bestFit );

		} else {

			this.children.filter( child => {

				return child.isText;

			} ).forEach( child => {

				child._fitFontSize = undefined;

			} );
		}
	}

	updateLayout() {

		// Get temporary dimension

		const WIDTH = this.getWidth();

		const HEIGHT = this.getHeight();

		if ( !WIDTH || !HEIGHT ) {

			console.warn( 'Block got no dimension from its parameters or from children parameters' );
			return;

		}

		this.size.set( WIDTH, HEIGHT );
		this.frame.scale.set( WIDTH, HEIGHT, 1 );

		if ( this.frame ) this.updateBackgroundMaterial();

		this.frame.renderOrder = this.getParentsNumber();

		// Position this element according to earlier parent computation.
		// Delegate to BoxComponent.

		if ( this.autoLayout ) {

			this.setPosFromParentRecords();

		}

		// Position inner elements according to dimensions and layout parameters.
		// Delegate to BoxComponent.

		if ( this.children.find( child => child.isInline ) ) {

			this.computeInlinesPosition();

		}

		this.computeChildrenPosition();

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( this.getUIParent() ) {

			this.position.z = this.getOffset();

		}

	}

	//

	updateInner() {

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( this.getUIParent() ) {

			this.position.z = this.getOffset();

		}

		if ( this.frame ) this.updateBackgroundMaterial();

	}

}
