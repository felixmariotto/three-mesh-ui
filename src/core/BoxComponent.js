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

		const DIRECTION = this.getContentDirection();
		let width;

		switch ( DIRECTION ) {

			case 'row' :
			case 'row-reverse' :
				return getChildrenWidthSum();
				break;

			case 'column' :
			case 'column-reverse' :
				return getHighestChildWidth( boxComponent );
				break;

			default :
				console.error(`Invalid contentDirection : ${ DIRECTION }`);
				break;

		};

	};

	boxComponent.getInnerHeight = function GetInnerHeight() {

		return getHighestChildHeight( boxComponent );

	};

	// Return the sum of all the children of this component + their margin

	function getChildrenWidthSum() {

		return boxComponent.children.reduce((accu, child)=> {

			return accu + (child.width || getHighestChildWidth( child )) + (child.margin * 2);

		}, 0 );

	};

	// Recursive functions that return the highest linear dimension among all the children of the passed component

	function getHighestChildWidth( component ) {

		return component.children.reduce((accu, child)=> {

			if ( child.children.length < 0 ) {

				return Math.max(accu, getHighestChildWidth( child ));

			} else {

				const margin = child.margin || 0;
				let maxWidth = child.width + (margin * 2);

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