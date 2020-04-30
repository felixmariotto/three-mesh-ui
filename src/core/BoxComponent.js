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

		return getHighestChildWidth( boxComponent );

	};

	boxComponent.getInnerHeight = function GetInnerHeight() {

		return getHighestChildHeight( boxComponent );

	};

	// recursive functions that return the highest linear dimension among all the children of the passed component

	function getHighestChildWidth( component ) {

		return component.children.reduce((accu, child)=> {

			if ( child.children.length < 0 ) {

				return Math.max(accu, getHighestChildWidth( child ));

			} else {

				let maxWidth = child.width;

				return Math.max(accu, maxWidth)

			};

		}, 0 );

	};

	//

	function getHighestChildHeight( component ) {

		return component.children.reduce((accu, child)=> {

			if ( child.children.length < 0 ) {

				return Math.max(accu, getHighestChildHeight( child ));

			} else {

				let maxHeight = child.height;

				return Math.max(accu, maxHeight)

			};

		}, 0 );

	};

	//

	return boxComponent

};

export default BoxComponent