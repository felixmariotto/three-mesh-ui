/*
	Job: set dimension of this component according to parent's dimension
	Knows: parent dimensions
*/

import MeshUIComponent from '../core/MeshUIComponent';

function InlineComponent() {

	const inlineComponent = Object.create( MeshUIComponent() );

	inlineComponent.type = 'InlineComponent'

	inlineComponent.isInline = true;

	inlineComponent.setPosFromParentRecords = function setPosFromParentRecords() {

		// console.log('set from parent records : ', this.parent.inlinesInfo );

	};

	return inlineComponent

};

export default InlineComponent