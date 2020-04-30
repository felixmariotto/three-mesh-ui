/*
	Job: set dimension of this component according to parent's dimension
	Knows: parent dimensions
*/

import MeshUIComponent from '../core/MeshUIComponent';

function BoxComponent() {

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const boxComponent = Object.create( MeshUIComponent() );

	boxComponent.type = 'BoxComponent'

	boxComponent.getInnerWidth = function GetInnerWidth() {

		return 1.3

	};

	boxComponent.getInnerHeight = function GetInnerHeight() {

		return 1.3

	};

	return boxComponent

};

export default BoxComponent