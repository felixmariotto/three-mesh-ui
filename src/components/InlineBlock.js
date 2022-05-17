import { Color, Vector2 } from 'three';

import Frame from '../frame/Frame.js';
import FrameMaterial from '../frame/materials/FrameMaterial';
import FrameMaterialUtils from '../frame/utils/FrameMaterialUtils';
import Inline from './core/Inline';
import MeshUIComponent from './core/MeshUIComponent';

/**
 * Job:
 * - computing its own size according to user measurements or content measurement
 * - creating an 'inlines' object with info, so that the parent component can organise it along with other inlines
 *
 * Knows:
 * - Its measurements parameter
 * - Parent block
 */
export default class InlineBlock extends MeshUIComponent {

	constructor( options ) {

		super( options );

		this.isInline = true;
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

		// Add an object that can be seen and CharacterInline
		this.inline = new InlineBlockInline(this);
		this.inlines = [ this.inline ];

		this.set( options );

		this._transferToMaterial();

	}

	///////////
	// UPDATES
	///////////

	parseParams(){

	}

	/**
	 * Create text content
	 *
	 * At this point, text.inlines should have been modified by the parent
	 * component, to add xOffset and yOffset properties to each inlines.
	 * This way, TextContent knows were to position each character.
	 *
	 */
	updateLayout() {

		const PADDING = this.padding || 0;
		const WIDTH = this.inlineWidth;
		const HEIGHT = this.inlineHeight;


		// basic translation to put the plane's left bottom corner at the center of its space
		// this.position.set( WIDTH / 2 , HEIGHT / 2, 0 );
		this.position.set( (WIDTH + PADDING)/2, HEIGHT / 2, 0 );

		// translation required by inlineManager to position this component inline
		this.position.x += this.inline.offsetX;
		this.position.y += this.inline.offsetY;

		this.position.y += this.inline.anchor;

		this.size.set( WIDTH, HEIGHT );
		this._main.scale.set( WIDTH, HEIGHT, 1 );

		this._main.renderOrder = this.getParentsNumber();

		this.position.z = this.getOffset();

	}

	//

	updateInner() {

	}

	/*********************************************************************************************************************
	 * POVIDES INLINE SIZING
	 ********************************************************************************************************************/

	/**
	 *
	 * @return {number}
	 */
	get inlineXAdvance(){

		const pad = this.padding || 0;
		return (this.width || 0.3) + pad;

	}

	/**
	 *
	 * @return {number}
	 */
	get inlineWidth() {

		return this.width || 0.3;

	}

	/**
	 *
	 * @return {number}
	 */
	get inlineHeight() {

		return this.height || 0.3;

	}

}

/**
 * InlineBlock has its own Inline implementation
 */
class InlineBlockInline extends Inline {

	/**
	 *
	 * @param {InlineBlock} parent
	 */
	constructor( parent ) {

		super();

		/**
		 * @TODO: This currently make a circular reference that should ideally be removed
		 * @type {InlineBlock}
		 * @private
		 */
		this._parent = parent;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get xadvance() { return this._parent.inlineXAdvance; }

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get width() { return this._parent.inlineWidth; }

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get height() { return this._parent.inlineHeight; }


	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineHeight() { return this._parent.inlineHeight; }

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineBase() { return this._parent.inlineHeight; }

}
