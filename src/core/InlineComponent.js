/*
	Job: set dimension of this component according to parent's dimension
	Knows: parent dimensions
*/

import MeshUIComponent from '../core/MeshUIComponent';

function InlineComponent() {

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const inlineComponent = Object.create( MeshUIComponent() );

	inlineComponent.type = 'InlineComponent'

	return inlineComponent

};

export default InlineComponent