/*
	Job: Handle everything related to a BoxComponent element dimensioning and positioning
	Knows: Parents and children dimensions and positions
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
				return this.getChildrenWidthSum();
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

	boxComponent.getChildrenWidthSum = function GetChildrenWidthSum() {

		return this.children.reduce((accu, child)=> {

			return accu + (child.width || getHighestChildWidth( child )) + (child.margin * 2);

		}, 0 );

	};

	// Look in parent record what is the instructed position for this component, then set its position

	boxComponent.setPosFromParentRecords = function SetPosFromParentRecords() {
		
		if ( this.parent && this.parent.childrenPos[ this.id ] ) {

			this.threeOBJ.position.x = ( this.parent.childrenPos[ this.id ].x );

		};
		

	};

	//

	boxComponent.computeChildrenPosition = function computeChildrenPosition() {

		if ( this.children.length > 0 ) {

			const DIRECTION = this.getContentDirection();
			const JUSTIFICATION = this.getJustifyContent();

			switch ( DIRECTION ) {

				case 'row' :

					this.children.reduce( (accu, child, i)=> {

						const CHILD_WIDTH = child.width || child.getInnerWidth();
						const CHILD_ID = child.id;
						const CHILD_MARGIN = child.margin || 0;
						const ADDI_OFFSET = i ? ((CHILD_WIDTH / 2) + CHILD_MARGIN) : 0;

						this.childrenPos[ CHILD_ID ] = {
							x: accu + ADDI_OFFSET
						};

						return accu + (CHILD_WIDTH / 2) + CHILD_MARGIN;

					}, 0 );

					break;

				case 'row-reverse' :
					console.log('direction row reverse');
					break;

				case 'column' :
					console.log('direction column');
					break;

				case 'column-reverse' :
					console.log('direction column-reverse');
					break;

			};

		};

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