/*
	Job: Keeping track of a component's InlineComponents, their position, split, etc..
	Knows: Component Dimension, and the list of children InlineComponent
*/

import MeshUIComponent from './MeshUIComponent';

function InlineManager( boxComponent ) {

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const inlineManager = Object.create( MeshUIComponent() );

	inlineManager.type = 'inlineManager'

	inlineManager.inlineComponents = [];

	return inlineManager

};

export default InlineManager
