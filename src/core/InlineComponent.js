/*
	Job: set dimension of this component according to parent's dimension
	Knows: parent dimensions
*/

import MeshUIComponent from '../core/MeshUIComponent';

function InlineComponent() {

	const inlineComponent = Object.create( MeshUIComponent() );

	inlineComponent.type = 'InlineComponent'

	inlineComponent.isInline = true;

	return inlineComponent

};

export default InlineComponent