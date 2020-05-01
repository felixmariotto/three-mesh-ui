/*
	Job: Hold this component text, and update it
	Knows: This text, its geometries and meshes
*/

import InlineComponent from '../core/InlineComponent';

function Text( options ) {

	const text = Object.create( InlineComponent() );

	text.parseParams = function parseParams( resolve, reject ) {

		resolve();

	};

	text.updateLayout = function updateLayout() {

		console.log('update text layout');

	};

	text.updateInner = function updateInner() {

		console.log('update text inner content');

	};

	return text

};

export default Text
