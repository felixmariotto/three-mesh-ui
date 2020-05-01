/*
	Job: Hold this component text, and update it
	Knows: This text, its geometries and meshes
*/

import InlineComponent from '../core/InlineComponent';

function Text( options ) {

	const text = Object.create( InlineComponent() );

	text.type = "Text";

	text.parseParams = function parseParams( resolve, reject ) {

		console.log('build text geometries');

		resolve();

	};

	text.updateLayout = function updateLayout() {

		console.log('update text layout');

		text.setPosFromParentRecords();

	};

	text.updateInner = function updateInner() {

		// console.log('update text inner content');

	};

	return text

};

export default Text
