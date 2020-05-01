/*
	Job: Handle everything related to a BoxComponent element dimensioning and positioning
	Knows: Parents and children dimensions and positions
*/

import MeshUIComponent from '../core/MeshUIComponent';

function BoxComponent() {

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const boxComponent = Object.create( MeshUIComponent() );

	boxComponent.type = 'BoxComponent'

	// Get size of this component inside padding

	boxComponent.getInnerWidth = function GetInnerWidth() {

		const DIRECTION = this.getContentDirection();

		switch ( DIRECTION ) {

			case 'row' :
			case 'row-reverse' :
				return this.width - (this.padding * 2) || this.getChildrenDimensionSum( 'width' );
				break;

			case 'column' :
			case 'column-reverse' :
				return this.getHighestChildDirection( 'width' )
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
				return this.height - (this.padding * 2) || this.getChildrenDimensionSum( 'height' );
				break;

			default :
				console.error(`Invalid contentDirection : ${ DIRECTION }`);
				break;

		};

	};

	// Return the sum of all this component's children sides + their margin

	boxComponent.getChildrenDimensionSum = function GetChildrenDimensionSum( dimension ) {

		const prout =  this.children.reduce((accu, child)=> {

			let CHILD_SIZE = (dimension === "width") ?
				(child.getWidth() + (child.margin * 2)) :
				(child.getHeight() + (child.margin * 2));

			return accu + ((CHILD_SIZE || this.getHighestChildDirection( dimension )) || 0);

		}, 0 );

		console.log(prout)

		return prout

	};

	// Look in parent record what is the instructed position for this component, then set its position

	boxComponent.setPosFromParentRecords = function SetPosFromParentRecords() {
		
		if ( this.parent && this.parent.childrenPos[ this.id ] ) {

			this.threeOBJ.position.x = ( this.parent.childrenPos[ this.id ].x );
			this.threeOBJ.position.y = ( this.parent.childrenPos[ this.id ].y );

		};
		

	};

	// Position inner elements according to dimensions and layout parameters.

	boxComponent.computeChildrenPosition = function computeChildrenPosition() {

		if ( this.children.length > 0 ) {

			const DIRECTION = this.getContentDirection();
			let X_START, Y_START;

			switch ( DIRECTION ) {

				case 'row' :

					// start position of the children positioning inside this component
					X_START = this.getInnerWidth() / 2;

					this.setChildrenXPos( -X_START );

					this.alignChildrenOnY();

					break;

				case 'row-reverse' :
					
					// start position of the children positioning inside this component
					X_START = this.getInnerWidth() / 2;

					this.setChildrenXPos( X_START );

					this.alignChildrenOnY();

					break;

				case 'column' :
					
					// start position of the children positioning inside this component
					Y_START = this.getInnerHeight() / 2;

					this.setChildrenYPos( Y_START );

					this.alignChildrenOnX();

					break;

				case 'column-reverse' :
					
					// start position of the children positioning inside this component
					Y_START = this.getInnerHeight() / 2;

					this.setChildrenYPos( -Y_START );

					this.alignChildrenOnX();

					break;

			};

		};

	};

	// Set children positions according to this component dimension and attributes

	boxComponent.setChildrenXPos = function setChildrenXPos( startPos ) {

		const JUSTIFICATION = this.getJustifyContent();

		if ( JUSTIFICATION !== 'center' && JUSTIFICATION !== 'start' && JUSTIFICATION !== 'end' ) {
			console.warn(`justifiyContent === '${ JUSTIFICATION }' is not supported`);
		};

		this.children.reduce( (accu, child, i)=> {

			const CHILD_ID = child.id;
			const CHILD_WIDTH = child.width || child.getInnerWidth();
			const CHILD_MARGIN = child.margin || 0;

			// Initial offset. For subsequent items, this is done in the return statement
			if ( !i ) accu += CHILD_MARGIN * -Math.sign( startPos );

			this.childrenPos[ CHILD_ID ] = {
				x: accu + ((CHILD_WIDTH / 2) * -Math.sign( startPos )),
				y: 0
			};

			return accu + (-Math.sign( startPos ) * (CHILD_WIDTH + (CHILD_MARGIN * 2)))

		}, startPos );

		//

		if ( JUSTIFICATION === "end" || JUSTIFICATION === "center" ) {

			let offset = (startPos * 2) - (this.getChildrenDimensionSum('width') * Math.sign(startPos));

			if ( JUSTIFICATION === "center" ) offset /= 2;
			
			this.children.forEach( (child)=> {

				this.childrenPos[ child.id ].x -= offset

			});

		};

	};

	//

	boxComponent.setChildrenYPos = function setChildrenYPos( startPos ) {

		const JUSTIFICATION = this.getJustifyContent();

		this.children.reduce( (accu, child, i)=> {

			const CHILD_ID = child.id;
			const CHILD_HEIGHT = child.height || child.getInnerHeight();
			const CHILD_MARGIN = child.margin || 0;

			// Initial offset. For subsequent items, this is done in the return statement
			if ( !i ) accu += CHILD_MARGIN * -Math.sign( startPos );

			this.childrenPos[ CHILD_ID ] = {
				x: 0,
				y: accu + ((CHILD_HEIGHT / 2) * -Math.sign( startPos ))
			};

			return accu + (-Math.sign( startPos ) * (CHILD_HEIGHT + (CHILD_MARGIN * 2)))

		}, startPos );

		//

		if ( JUSTIFICATION === "end" || JUSTIFICATION === "center" ) {

			let offset = (startPos * 2) - (this.getChildrenDimensionSum('height') * Math.sign(startPos));
			
			if ( JUSTIFICATION === "center" ) offset /= 2;

			this.children.forEach( (child)=> {

				this.childrenPos[ child.id ].y -= offset

			});

		};

	};

	//

	boxComponent.alignChildrenOnX = function alignChildrenOnX() {

		const ALIGNMENT = this.getContentAlign();
		const X_TARGET = (this.getWidth() / 2) - (this.padding || 0);

		if ( ALIGNMENT !== "center" && ALIGNMENT !== "right" && ALIGNMENT !== "left" ) {
			console.warn(`contentAlign === '${ ALIGNMENT }' is not supported on this direction.`)
		};

		this.children.forEach( (child)=> {

			if ( ALIGNMENT === "right" ) {

				var offset = X_TARGET - (child.getWidth() / 2) - (child.margin || 0) ;

			} else if ( ALIGNMENT === "left" ) {

				var offset = -X_TARGET + (child.getWidth() / 2) + (child.margin || 0) ;

			};

			this.childrenPos[ child.id ].x = offset || 0;

		});

	};

	//

	boxComponent.alignChildrenOnY = function alignChildrenOnY() {

		const ALIGNMENT = this.getContentAlign();
		const Y_TARGET = (this.getHeight() / 2) - (this.padding || 0);

		if ( ALIGNMENT !== "center" && ALIGNMENT !== "top" && ALIGNMENT !== "bottom" ) {
			console.warn(`contentAlign === '${ ALIGNMENT }' is not supported on this direction.`)
		};

		this.children.forEach( (child)=> {

			if ( ALIGNMENT === "top" ) {

				var offset = Y_TARGET - (child.getHeight() / 2) - (child.margin || 0) ;

			} else if ( ALIGNMENT === "bottom" ) {

				var offset = -Y_TARGET + (child.getHeight() / 2) + (child.margin || 0) ;

			};

			this.childrenPos[ child.id ].y = offset || 0;

		});

	};

	// Recursive functions that returns the highest linear dimension among all the children of the passed component
	// MARGIN INCLUDED

	boxComponent.getHighestChildDirection = function getHighestChildDirection( direction ) {

		return this.children.reduce((accu, child)=> {

			if ( child.children.length < 0 ) {

				return Math.max( accu, child.getHighestChildDirection( direction ) );

			} else {

				const margin = child.margin || 0;
				let maxSize = direction === "width" ?
					child.getWidth() + (margin * 2) :
					child.getHeight() + (margin * 2) ;

				return Math.max(accu, maxSize)

			};

		}, 0 );

	};

	// Get dimensions of this element

	boxComponent.getWidth = function getWidth() {
		return this.width || this.getInnerWidth() + (this.padding * 2 || 0);
	};

	boxComponent.getHeight = function getHeight() {
		return this.height || this.getInnerHeight() + (this.padding * 2 || 0);
	};

	//

	return boxComponent

};

export default BoxComponent