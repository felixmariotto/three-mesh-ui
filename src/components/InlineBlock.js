
/*

Job:
	- computing its own size according to user measurements or content measurement
	- creating an 'inlines' object with info, so that the parent component can organise it along with other inlines

Knows:
	- Its measurements parameter
	- Parent block

*/

// temp

import { MeshBasicMaterial, BoxBufferGeometry, Mesh } from 'three';

//

import { Object3D } from 'three/src/core/Object3D.js';

import InlineComponent from './core/InlineComponent.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import MaterialManager from './core/MaterialManager.js';

import Frame from '../content/Frame.js';
import DeepDelete from '../utils/DeepDelete.js';

function InlineBlock( options ) {

	const inlineBlock = Object.assign(
		Object.create( new Object3D ),
		InlineComponent(),
		MaterialManager(),
		MeshUIComponent()
	);

	inlineBlock.isInlineBlock = true;

	//

	inlineBlock.parseParams = function parseParams( resolve, reject ) {

		///////////////////////
		// GET IMAGE DIMENSION
		///////////////////////

		if ( !this.width ) console.warn('inlineBlock has no width. Set to 0.3 by default');
		if ( !this.height ) console.warn('inlineBlock has no height. Set to 0.3 by default');

		const WIDTH = this.width || 0.3;
		const HEIGHT = this.height || 0.3;

		inlineBlock.inlines = [{
			height: HEIGHT,
			width: WIDTH,
			anchor: 0,
			lineBreak: "possible"
		}];

		resolve();

	};

	//

	inlineBlock.updateLayout = function updateLayout() {

		/*
		Create text content

		At this point, text.inlines should have been modified by the parent
		component, to add xOffset and yOffset properties to each inlines.
		This way, TextContent knows were to position each character.

		*/

		// security in case the layout wasn't done yet by the parent
		if ( !this.hasLayoutBeenDone() ) {

			this.parent.update( null, true );

			return

		};

		DeepDelete( inlineBlock );

		if ( inlineBlock.inlines ) {

			const options = this.inlines[0];

			this.frame = Frame(
				options.width,
				options.height,
				this.getBorderRadius(),
				this.getBackgroundSize(),
				this.getBackgroundMaterial()
			);

			// basic translation to put the plane's left bottom corner at the center of its space
			this.frame.position.set( options.width / 2, options.height / 2, 0 );

			// translation required by inlineManager to position this component inline
			this.frame.position.x += options.offsetX;
			this.frame.position.y += options.offsetY;

			this.frame.renderOrder = this.getParentsNumber();

			const component = this;

			this.frame.onBeforeRender = function( renderer, scene, camera, geometry, material, group ) {

				if ( component.updateClippingPlanes ) {

					component.updateClippingPlanes();

				};

			};

			this.add( this.frame );

		};

		inlineBlock.position.z = inlineBlock.getOffset();

	};

	//

	inlineBlock.updateInner = function updateInner() {

		inlineBlock.position.z = inlineBlock.getOffset();

	};

	inlineBlock.set( options );

	return inlineBlock

};

export default InlineBlock
