/*
	Job: no job yet
	Knows: parent dimensions
*/

import MeshUIComponent from './MeshUIComponent';

function InlineComponent() {

	const inlineComponent = Object.create( MeshUIComponent() );

	inlineComponent.type = 'InlineComponent'

	inlineComponent.isInline = true;

	return inlineComponent

};

export default InlineComponent