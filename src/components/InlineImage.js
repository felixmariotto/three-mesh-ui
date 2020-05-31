/*

Job:
	- computing its own size according to user measurements or content measurement
	- creating 'inlines' object with info, so that the parent component can organise it along with other inlines

Knows:
	- Its content parameter (what to render)
	- Parent block

*/

import InlineComponent from './core/InlineComponent.js';
import ImageManager from '../content/ImageManager.js';
import DeepDelete from '../utils/DeepDelete.js';

function InlineImage( options ) {

	const inlineImage = Object.create( InlineComponent() );

	inlineImage.type = "InlineImage";

	inlineImage.imageManager = ImageManager();

	inlineImage.parseParams = function parseParams( resolve, reject ) {

		///////////////////////
		// GET IMAGE DIMENSION
		///////////////////////

		if ( !this.width ) console.warn('inlineImage has no width. Set to 0.3 by default');
		if ( !this.height ) console.warn('inlineImage has no height. Set to 0.3 by default');

		const WIDTH = this.width || 0.3;
		const HEIGHT = this.height || 0.3;

		inlineImage.inlines = [{
			height: HEIGHT,
			width: WIDTH,
			anchor: 0,
			lineBreak: "possible"
		}];

		resolve();

	};

	//

	inlineImage.updateLayout = function updateLayout() {

		DeepDelete( inlineImage );

		if ( !this.src ) {
			console.warn('inlineImage has no src, it cannot be rendered');
			return
		};

		if ( inlineImage.inlines ) {

			const options = inlineImage.inlines[0];
			options.src = this.src;
			options.borderRadius = this.getBorderRadius();
			options.backgroundSize = this.getBackgroundSize();

			// create image mesh
			const mesh = inlineImage.imageManager.create( options );

			inlineImage.add( mesh );

		};

		inlineImage.position.z = inlineImage.getOffset();

	};

	//

	inlineImage.updateInner = function updateInner() {

		inlineImage.position.z = inlineImage.getOffset();

	};

	inlineImage.set( options );

	return inlineImage

};

export default InlineImage
