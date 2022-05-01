import { Color, Object3D, Vector2 } from 'three';

import InlineComponent from './core/InlineComponent.js';
import BoxComponent from './core/BoxComponent.js';
import InlineManager from './core/InlineManager.js';
import MeshUIComponent from './core/MeshUIComponent.js';

import Frame from '../frame/Frame.js';
import { mix } from '../utils/mix.js';
import FrameMaterial from '../frame/materials/FrameMaterial';
import FrameMaterialUtils from '../frame/utils/FrameMaterialUtils';

/**
 * Job:
 * - computing its own size according to user measurements or content measurement
 * - creating an 'inlines' object with info, so that the parent component can organise it along with other inlines
 *
 * Knows:
 * - Its measurements parameter
 * - Parent block
 */
export default class InlineBlock extends mix.withBase( Object3D )(
	InlineComponent,
	BoxComponent,
	InlineManager,
	MeshUIComponent
) {

	constructor( options ) {

		super( options );

		this.isInlineBlock = true;

		//

		this.size = new Vector2( 1, 1 );

		this._material = new FrameMaterial();
		this._main = new Frame( this._material );

		this._materialProperties = { ...FrameMaterialUtils.frameMaterialProperties };

		// This is for hiddenOverflow to work
		this._main.onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

		};

		this.add( this._main );

		// Lastly set the options parameters to this object, which will trigger an update

		if( options.backgroundOpacity === undefined ){

			options.backgroundOpacity = 1.0

		}

		if( options.backgroundColor === undefined && options.backgroundTexture ) {

			options.backgroundColor = new Color(0xffffff);

		}

		this.set( options );

		// console.log(this.position.z);
		// this.position.z = this.getOffset();
		// console.log(this.position.z);

		this._transferToMaterial();

	}

	///////////
	// UPDATES
	///////////

	parseParams() {

		// Get image dimensions

		if ( !this.width ) console.warn( 'inlineBlock has no width. Set to 0.3 by default' );
		if ( !this.height ) console.warn( 'inlineBlock has no height. Set to 0.3 by default' );


		// Add an object that can be seen and CharacterInline
		this.inlines = [ {
			lineBreak : 'possible',
			kerning : 0,
      offsetX : 0,
			offsetY : 0,
			width: this.width || 0.3,
			height: this.height || 0.3,
			anchor: 0, // @TODO: Could be useful
			xadvance: this.width || 0.3,
			xoffset: 0,
			yoffset: 0,
			lineHeight : this.height || 0.3,
			lineBase: this.height || 0.3
		}];

	}

	//


	/**
	 * Create text content
	 *
	 * At this point, text.inlines should have been modified by the parent
	 * component, to add xOffset and yOffset properties to each inlines.
	 * This way, TextContent knows were to position each character.
	 *
	 */
	updateLayout() {

		const WIDTH = this.getWidth();
		const HEIGHT = this.getHeight();

		if ( this.inlines ) {

			const options = this.inlines[ 0 ];

			// basic translation to put the plane's left bottom corner at the center of its space
			this.position.set( options.width / 2, options.height / 2, 0 );

			// translation required by inlineManager to position this component inline
			this.position.x += options.offsetX;
			this.position.y += options.offsetY;

			this.position.y += options.anchor;

		}

		this.size.set( WIDTH, HEIGHT );
		this._main.scale.set( WIDTH, HEIGHT, 1 );

		// if ( this.frame ) this.updateBackgroundMaterial();

		this._main.renderOrder = this.getParentsNumber();

		// console.log( this.position.z );
		this.position.z = this.getOffset();
		// console.log( this.position.z );
	}

	//

	updateInner() {

		// this.position.z = this.getOffset();

		// if ( this.frame ) this.updateBackgroundMaterial();

	}

}
