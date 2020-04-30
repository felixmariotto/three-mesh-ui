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

		switch ( DIRECTION ) {

			case 'row' :
			case 'row-reverse' :
				return this.getChildrenDimensionSum( 'width' );
				break;

			case 'column' :
			case 'column-reverse' :
				return this.getHighestChildDirection( 'width' );
				break;

			default :
				console.error(`Invalid contentDirection : ${ DIRECTION }`);
				break;

		};

	};

	boxComponent.getInnerHeight = function GetInnerHeight() {

		const DIRECTION = this.getContentDirection();

		switch ( DIRECTION ) {

			case 'row' :
			case 'row-reverse' :
				return this.getHighestChildDirection( 'width' );
				break;

			case 'column' :
			case 'column-reverse' :
				return this.getChildrenDimensionSum( 'height' );
				break;

			default :
				console.error(`Invalid contentDirection : ${ DIRECTION }`);
				break;

		};

	};

	// Return the sum of all this component's children sides + their margin

	boxComponent.getChildrenDimensionSum = function GetChildrenDimensionSum( dimension ) {

		return this.children.reduce((accu, child)=> {

			return accu + ((child[ dimension ] || this.getHighestChildDirection( dimension )) + (child.margin * 2));

		}, 0 );

	};

	// Look in parent record what is the instructed position for this component, then set its position

	boxComponent.setPosFromParentRecords = function SetPosFromParentRecords() {
		
		if ( this.parent && this.parent.childrenPos[ this.id ] ) {

			this.threeOBJ.position.x = ( this.parent.childrenPos[ this.id ].x );

		};
		

	};

	// Position inner elements according to dimensions and layout parameters.

	boxComponent.computeChildrenPosition = function computeChildrenPosition() {

		if ( this.children.length > 0 ) {

			const DIRECTION = this.getContentDirection();
			let X_START;

			switch ( DIRECTION ) {

				case 'row' :

					// start position of the children positioning inside this component
					X_START = this.getInnerWidth() / 2;

					this.setChildrenPosition( -X_START, "width" );

					break;

				case 'row-reverse' :
					
					// start position of the children positioning inside this component
					X_START = this.getInnerWidth() / 2;

					this.setChildrenPosition( X_START, "width" );

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

	// Set children positions according to this 

	boxComponent.setChildrenPosition = function setChildrenPosition( startPos, dimension ) {

		const JUSTIFICATION = this.getJustifyContent();

		this.children.reduce( (accu, child, i)=> {

			const CHILD_ID = child.id;
			const CHILD_WIDTH = child.width || child.getInnerWidth();
			const CHILD_MARGIN = child.margin || 0;

			// Initial offset. For subsequent items, this is done in the return statement
			if ( !i ) accu += CHILD_MARGIN;

			this.childrenPos[ CHILD_ID ] = {
				x: accu + ((CHILD_WIDTH / 2) * -Math.sign( startPos ))
			};

			return accu + (-Math.sign( startPos ) * (CHILD_WIDTH + (CHILD_MARGIN * 2)))

		}, startPos );

	};

	// Recursive functions that return the highest linear dimension among all the children of the passed component

	boxComponent.getHighestChildDirection = function getHighestChildDirection( direction ) {

		return this.children.reduce((accu, child)=> {

			if ( child.children.length < 0 ) {

				return Math.max( accu, child.getHighestChildDirection( direction ) );

			} else {

				const margin = child.margin || 0;
				let maxWidth = child[ direction ] + (margin * 2);

				return Math.max(accu, maxWidth)

			};

		}, 0 );

	};

	//

	return boxComponent

};

export default BoxComponent