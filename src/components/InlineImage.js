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

		inlineImage.inlines = [{
			height: 0.3,
			width: 0.3,
			anchor: 0,
			lineBreak: "possible"
		}];

		resolve();

	};

	//

	inlineImage.updateLayout = function updateLayout() {

		DeepDelete( inlineImage );

		if ( inlineImage.inlines ) {

			// create image mesh
			const mesh = inlineImage.imageManager.create( inlineImage.inlines[0] );

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
