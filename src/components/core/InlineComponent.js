/*
	Job: no job yet
	Knows: parent dimensions
*/

import MeshUIComponent from './MeshUIComponent.js';

export default function InlineComponent() {

	const inlineComponent = {};

	inlineComponent.isInline = true;

	inlineComponent.hasLayoutBeenDone = hasLayoutBeenDone;

	return inlineComponent

};

//

function hasLayoutBeenDone() {

	if ( !this.inlines ) return true

	let layoutIsDone = true;

	this.inlines.forEach( (inline)=> {

		if ( !inline.offsetX || !inline.offsetY ) layoutIsDone = false;

	});

	/*
	if ( !layoutIsDone ) {
		console.log( this.parent )
		debugger
	}
	*/

	return layoutIsDone

};