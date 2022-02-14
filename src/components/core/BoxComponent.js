/**

Job: Handle everything related to a BoxComponent element dimensioning and positioning

Knows: Parents and children dimensions and positions

It's worth noting that in three-mesh-ui, it's the parent Block that computes
its children position. A Block can only have either only box components (Block)
as children, or only inline components (Text, InlineBlock).

 */
export default function BoxComponent( Base ) {

	return class BoxComponent extends Base {

		constructor( options ) {

			super( options );

			this.isBoxComponent = true;
			this.childrenPos = {};

		}


		/** Get width of this component minus its padding */
		getInnerWidth() {

			const DIRECTION = this.getContentDirection();

			switch ( DIRECTION ) {

				case 'row' :
				case 'row-reverse' :
					return this.width - ( this.padding * 2 || 0 ) || this.getChildrenSideSum( 'width' );

				case 'column' :
				case 'column-reverse' :
					return this.getHighestChildSizeOn( 'width' );

				default :
					console.error( `Invalid contentDirection : ${DIRECTION}` );
					break;

			}

		}

		/** Get height of this component minus its padding */
		getInnerHeight() {

			const DIRECTION = this.getContentDirection();

			switch ( DIRECTION ) {

				case 'row' :
				case 'row-reverse' :
					return this.getHighestChildSizeOn( 'height' );

				case 'column' :
				case 'column-reverse' :
					return this.height - ( this.padding * 2 || 0 ) || this.getChildrenSideSum( 'height' );

				default :
					console.error( `Invalid contentDirection : ${DIRECTION}` );
					break;

			}

		}

		/** Return the sum of all this component's children sides + their margin */
		getChildrenSideSum( dimension ) {

			return this.children.reduce( ( accu, child ) => {

				if ( !child.isBoxComponent ) return accu;

				const margin = ( child.margin * 2 ) || 0;

				const CHILD_SIZE = ( dimension === 'width' ) ?
					( child.getWidth() + margin ) :
					( child.getHeight() + margin );

				return accu + CHILD_SIZE;

			}, 0 );

		}

		/** Look in parent record what is the instructed position for this component, then set its position */
		setPosFromParentRecords() {

			if ( this.getUIParent() && this.getUIParent().childrenPos[ this.id ] ) {

				this.position.x = ( this.getUIParent().childrenPos[ this.id ].x );
				this.position.y = ( this.getUIParent().childrenPos[ this.id ].y );

			}

		}

		/** Position inner elements according to dimensions and layout parameters. */
		computeChildrenPosition() {

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

				}

			}

		}

		/** Set children X position according to this component dimension and attributes */
		setChildrenXPos( startPos ) {

			const JUSTIFICATION = this.getJustifyContent();

			const availableJustification = [
				'start',
				'center',
				'end',
				'space-around',
				'space-between',
				'space-evenly'
			];

			if ( availableJustification.indexOf( JUSTIFICATION ) === -1 ) {

				console.warn( `justifyContent === '${ JUSTIFICATION }' is not supported` );

			}

			// only work on boxChildren
			const boxChildren = this.children.filter( c => c.isBoxComponent );

			boxChildren.reduce( ( accu, child ) => {

				const CHILD_ID = child.id;
				const CHILD_WIDTH = child.getWidth();
				const CHILD_MARGIN = child.margin || 0;

				accu += CHILD_MARGIN * -Math.sign( startPos );

				this.childrenPos[ CHILD_ID ] = {
					x: accu + ( ( CHILD_WIDTH / 2 ) * -Math.sign( startPos ) ),
					y: 0
				};

				return accu + ( -Math.sign( startPos ) * ( CHILD_WIDTH + CHILD_MARGIN ) );

			}, startPos );

			//

			const usedWidth = this.getChildrenSideSum( 'width' );
			const innerWidth = this.getInnerWidth();

			const remainingSpace = innerWidth - usedWidth;

			const axisOffset = ( startPos * 2 ) - ( this.getChildrenSideSum( 'width' ) * Math.sign( startPos ) );
			let justificationOffset = 0;

			switch ( JUSTIFICATION ){

				case "end":
					justificationOffset = axisOffset;
					break;

				case "center":
					justificationOffset = axisOffset / 2;
					break;

				// stays with an offset of 0
				case "space-between":
				case "space-around":
				case "space-evenly":
				case "start":
				default:

			}

			const justificationMargins = Array( boxChildren.length ).fill( 0 );

			if ( remainingSpace > 0 ) {

				switch ( JUSTIFICATION ) {

					case "space-between":
						// only one children would act as start
						if ( boxChildren.length > 1 ) {

							const margin = remainingSpace / ( boxChildren.length - 1 ) * -Math.sign( startPos );
							// set this margin for any children

							// except for first child
							justificationMargins[ 0 ] = 0;

							for ( let i = 1; i < boxChildren.length; i++ ) {

								justificationMargins[ i ] = margin * i;

							}

						}

						break;

					case "space-evenly":
						// only one children would act as start
						if ( boxChildren.length > 1 ) {

							const margin = remainingSpace / ( boxChildren.length + 1 ) * -Math.sign( startPos );

							// set this margin for any children
							for ( let i = 0; i < boxChildren.length; i++ ) {

								justificationMargins[ i ] = margin * ( i + 1 );

							}

						}

						break;

					case "space-around":
						// only one children would act as start
						if ( boxChildren.length > 1 ) {

							const margin = remainingSpace / ( boxChildren.length ) * -Math.sign( startPos );

							const start = margin / 2;
							justificationMargins[ 0 ] = start;

							// set this margin for any children
							for ( let i = 1; i < boxChildren.length; i++ ) {

								justificationMargins[ i ] = start + margin * i;

							}

						}

						break;

					// those cases doesn't involve additional margins
					case "end":
					case "center":
					case "start":

				}

			}

			// Apply
			boxChildren.forEach( ( child , childIndex ) => {

				this.childrenPos[ child.id ].x -= justificationOffset - justificationMargins[childIndex];

			} );

		}

		/** Set children Y position according to this component dimension and attributes */
		setChildrenYPos( startPos ) {

			const JUSTIFICATION = this.getJustifyContent();

			const availableJustification = [
				'start',
				'center',
				'end',
				'space-around',
				'space-between',
				'space-evenly'
			];

			if ( availableJustification.indexOf(JUSTIFICATION) === -1 ){

				console.warn( `justifyContent === '${ JUSTIFICATION }' is not supported` );

			}

			// only work on boxChildren
			const boxChildren = this.children.filter( c => c.isBoxComponent );
			boxChildren.reduce( ( accu, child ) => {

				const CHILD_ID = child.id;
				const CHILD_HEIGHT = child.getHeight();
				const CHILD_MARGIN = child.margin || 0;

				accu += CHILD_MARGIN * -Math.sign( startPos );

				this.childrenPos[ CHILD_ID ] = {
					x: 0,
					y: accu + ( ( CHILD_HEIGHT / 2 ) * -Math.sign( startPos ) )
				};

				return accu + ( -Math.sign( startPos ) * ( CHILD_HEIGHT + CHILD_MARGIN ) );

			}, startPos );

			//

			const usedWidth = this.getChildrenSideSum( 'height' );
			const innerWidth = this.getInnerHeight();

			const remainingSpace = innerWidth - usedWidth;

			const axisOffset = ( startPos * 2 ) - ( this.getChildrenSideSum( 'height' ) * Math.sign( startPos ) );
			let justificationOffset = 0;

			switch ( JUSTIFICATION ){

				case "end":
					justificationOffset = axisOffset;
					break;

				case "center":
					justificationOffset = axisOffset / 2;
					break;

				// stays with an offset of 0
				case "space-between":
				case "space-around":
				case "space-evenly":
				case "start":
				default:

			}

			const justificationMargins = Array( boxChildren.length ).fill( 0 );

			if ( remainingSpace > 0 ) {

				switch ( JUSTIFICATION ) {

					case "space-between":
						// only one children would act as start
						if ( boxChildren.length > 1 ) {

							const margin = remainingSpace / ( boxChildren.length - 1 ) * -Math.sign( startPos );
							// set this margin for any children

							// except for first child
							justificationMargins[ 0 ] = 0;

							for ( let i = 1; i < boxChildren.length; i++ ) {

								justificationMargins[ i ] = margin * i;

							}

						}

						break;

					case "space-evenly":
						// only one children would act as start
						if ( boxChildren.length > 1 ) {

							const margin = remainingSpace / ( boxChildren.length + 1 ) * -Math.sign( startPos );

							// set this margin for any children
							for ( let i = 0; i < boxChildren.length; i++ ) {

								justificationMargins[ i ] = margin * ( i + 1 );

							}

						}

						break;

					case "space-around":
						// only one children would act as start
						if ( boxChildren.length > 1 ) {

							const margin = remainingSpace / ( boxChildren.length ) * -Math.sign( startPos );

							const start = margin / 2;
							justificationMargins[ 0 ] = start;

							// set this margin for any children
							for ( let i = 1; i < boxChildren.length; i++ ) {

								justificationMargins[ i ] = start + margin * i;

							}

						}

						break;

					// those cases doesn't involve additional margins
					case "end":
					case "center":
					case "start":
					default:

				}
			}

			boxChildren.forEach( ( child, childIndex ) => {

				this.childrenPos[ child.id ].y -= justificationOffset - justificationMargins[childIndex];

			} );

		}

		/** called if justifyContent is 'column' or 'column-reverse', it align the content horizontally */
		alignChildrenOnX() {

			const ALIGNMENT = this.getAlignContent();
			const X_TARGET = ( this.getWidth() / 2 ) - ( this.padding || 0 );

			const availableAlignments = ['start','center','end','left','right'];
			if( availableAlignments.indexOf(ALIGNMENT) === -1 ){

				console.warn( `alignContent === '${ALIGNMENT}' is not supported` );

			}

			this.children.forEach( ( child ) => {

				if ( !child.isBoxComponent ) return;

				let offset;

				if ( ALIGNMENT === 'right' || ALIGNMENT === 'end' ) {

					offset = X_TARGET - ( child.getWidth() / 2 ) - ( child.margin || 0 );

				} else if ( ALIGNMENT === 'left' || ALIGNMENT === 'start' ) {

					offset = -X_TARGET + ( child.getWidth() / 2 ) + ( child.margin || 0 );

				}

				this.childrenPos[ child.id ].x = offset || 0;

			} );

		}

		/** called if justifyContent is 'row' or 'row-reverse', it align the content vertically */
		alignChildrenOnY() {

			const ALIGNMENT = this.getAlignContent();
			const Y_TARGET = ( this.getHeight() / 2 ) - ( this.padding || 0 );

			const availableAlignments = ['start','center','end','top','bottom'];
			if( availableAlignments.indexOf(ALIGNMENT) === -1 ){

				console.warn( `alignContent === '${ALIGNMENT}' is not supported` );

			}

			this.children.forEach( ( child ) => {

				if ( !child.isBoxComponent ) return;

				let offset;

				if ( ALIGNMENT === 'top' || ALIGNMENT === 'start' ) {

					offset = Y_TARGET - ( child.getHeight() / 2 ) - ( child.margin || 0 );

				} else if ( ALIGNMENT === 'bottom' || ALIGNMENT === 'end' ) {

					offset = -Y_TARGET + ( child.getHeight() / 2 ) + ( child.margin || 0 );

				}

				this.childrenPos[ child.id ].y = offset || 0;

			} );

		}

		/**
		 * Returns the highest linear dimension among all the children of the passed component
		 * MARGIN INCLUDED
		 */
		getHighestChildSizeOn( direction ) {

			return this.children.reduce( ( accu, child ) => {

				if ( !child.isBoxComponent ) return accu;

				const margin = child.margin || 0;
				const maxSize = direction === 'width' ?
					child.getWidth() + ( margin * 2 ) :
					child.getHeight() + ( margin * 2 );

				return Math.max( accu, maxSize );

			}, 0 );

		}

		/**
		 * Get width of this element
		 * With padding, without margin
		 */
		getWidth() {

			return this.width || this.getInnerWidth() + ( this.padding * 2 || 0 );

		}

		/**
		 * Get height of this element
		 * With padding, without margin
		 */
		getHeight() {

			return this.height || this.getInnerHeight() + ( this.padding * 2 || 0 );

		}

	};

}
