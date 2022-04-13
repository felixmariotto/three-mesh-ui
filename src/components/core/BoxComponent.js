/**

Job: Handle everything related to a BoxComponent element dimensioning and positioning

Knows: Parents and children dimensions and positions

It's worth noting that in three-mesh-ui, it's the parent Block that computes
its children position. A Block can only have either only box components (Block)
as children, or only inline components (Text, InlineBlock).

 */

// @TODO : Fix the camelcase issue by refactoring
/* eslint-disable camelcase */

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

		/**
		 * Place child end to end and accumulate (ROW)
		 * @param accu
		 * @param child
		 * @returns {*}
		 */
		direction__rowEndToEndChildren = ( accu, child ) => {

			const CHILD_ID = child.id;
			const CHILD_WIDTH = child.getWidth();
			const CHILD_MARGIN = child.margin || 0;
			const INVERTER = this.signInvertor;

			accu += CHILD_MARGIN * INVERTER;

			this.childrenPos[ CHILD_ID ] = {
				x: accu + ( ( CHILD_WIDTH / 2 ) * INVERTER ),
				y: 0
			};

			return accu + ( INVERTER * ( CHILD_WIDTH + CHILD_MARGIN ) );

		}

		/**
		 * Place child end to end and accumulate (COLUMN)
		 * @param accu
		 * @param child
		 * @returns {*}
		 */
		direction__columnEndToEndChildren = ( accu, child ) => {

			const CHILD_ID = child.id;
			const CHILD_HEIGHT = child.getHeight();
			const CHILD_MARGIN = child.margin || 0;
			const INVERTER = this.signInvertor;

			accu += CHILD_MARGIN * INVERTER;

			this.childrenPos[ CHILD_ID ] = {
				x: 0,
				y: accu + ( ( CHILD_HEIGHT / 2 ) * INVERTER )
			};

			return accu + ( INVERTER * ( CHILD_HEIGHT + CHILD_MARGIN ) );

		}

		/**
		 *
		 * @param {string} justification
		 * @param {number} axisOffset
		 * @returns {number}
		 */
		justification__getJustificationOffset( justification, axisOffset ){

			// Only end and center have justification offset
			switch ( justification ){

				case "end":
					return axisOffset;

				case "center":
					return axisOffset / 2;
			}

			return 0;
		}

		/**
		 *
		 * @param items
		 * @param spaceToDistribute
		 * @param justification
		 * @returns {any[]}
		 */
		justification__getJustificationMargin( items, spaceToDistribute, justification ){
			const justificationMargins = Array( items.length ).fill( 0 );

			if ( spaceToDistribute > 0 ) {

				// Only space-*  have justification margin betweem items
				switch ( justification ) {

					case "space-between":
						// only one children would act as start
						if ( items.length > 1 ) {

							const margin = spaceToDistribute / ( items.length - 1 ) * this.signInvertor;
							// set this margin for any children

							// except for first child
							justificationMargins[ 0 ] = 0;

							for ( let i = 1; i < items.length; i++ ) {

								justificationMargins[ i ] = margin * i;

							}

						}

						break;

					case "space-evenly":
						// only one children would act as start
						if ( items.length > 1 ) {

							const margin = spaceToDistribute / ( items.length + 1 ) * this.signInvertor;

							// set this margin for any children
							for ( let i = 0; i < items.length; i++ ) {

								justificationMargins[ i ] = margin * ( i + 1 );

							}

						}

						break;

					case "space-around":
						// only one children would act as start
						if ( items.length > 1 ) {

							const margin = spaceToDistribute / ( items.length ) * this.signInvertor;

							const start = margin / 2;
							justificationMargins[ 0 ] = start;

							// set this margin for any children
							for ( let i = 1; i < items.length; i++ ) {

								justificationMargins[ i ] = start + margin * i;

							}

						}

						break;

				}

			}

			return justificationMargins;

		}

		/** Set children X position according to this component dimension and attributes */
		setChildrenXPos( startPos ) {

			const JUSTIFICATION = this.getJustifyContent();
			if ( AVAILABLE_JUSTIFICATIONS.indexOf( JUSTIFICATION ) === -1 ) {

				console.warn( `justifyContent === '${ JUSTIFICATION }' is not supported` );

			}

			// only work on boxChildren
			const boxChildren = this.children.filter( _boxChildrenFilter );

			// end to end children
			this.signInvertor = - Math.sign( startPos );
			boxChildren.reduce( this.direction__rowEndToEndChildren , startPos );


			const usedDirectionSpace = this.getChildrenSideSum( 'width' );
			const remainingSpace = this.getInnerWidth() - usedDirectionSpace;

			// Items Offset
			const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
			const justificationOffset = this.justification__getJustificationOffset( JUSTIFICATION, axisOffset );

			// Items margin
			const justificationMargins = this.justification__getJustificationMargin( boxChildren, remainingSpace, JUSTIFICATION );

			// Apply
			boxChildren.forEach( ( child , childIndex ) => {

				this.childrenPos[ child.id ].x -= justificationOffset - justificationMargins[childIndex];

			} );

		}

		/** Set children Y position according to this component dimension and attributes */
		setChildrenYPos( startPos ) {

			const JUSTIFICATION = this.getJustifyContent();
			if ( AVAILABLE_JUSTIFICATIONS.indexOf(JUSTIFICATION) === -1 ){

				console.warn( `justifyContent === '${ JUSTIFICATION }' is not supported` );

			}

			// only process on boxChildren
			const boxChildren = this.children.filter( _boxChildrenFilter );

			// end to end children
			this.signInvertor = - Math.sign( startPos );
			boxChildren.reduce( this.direction__columnEndToEndChildren , startPos );

			//
			const usedDirectionSpace = this.getChildrenSideSum( 'height' );
			const remainingSpace = this.getInnerHeight() - usedDirectionSpace;

			// Items Offset
			const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
			const justificationOffset = this.justification__getJustificationOffset( JUSTIFICATION, axisOffset);

			// Items margin
			const justificationMargins = this.justification__getJustificationMargin( boxChildren, remainingSpace, JUSTIFICATION);

			// Apply
			boxChildren.forEach( ( child, childIndex ) => {

				this.childrenPos[ child.id ].y -= justificationOffset - justificationMargins[childIndex];

			} );

		}

		/** called if justifyContent is 'column' or 'column-reverse', it align the content horizontally */
		alignChildrenOnX() {

			const ALIGNMENT = this.getAlignItems();
			const X_TARGET = ( this.getWidth() / 2 ) - ( this.padding || 0 );

			if( AVAILABLE_ALIGN_ITEMS.indexOf(ALIGNMENT) === -1 ){

				console.warn( `alignItems === '${ALIGNMENT}' is not supported` );

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

			const ALIGNMENT = this.getAlignItems();
			const Y_TARGET = ( this.getHeight() / 2 ) - ( this.padding || 0 );

			if( AVAILABLE_ALIGN_ITEMS.indexOf(ALIGNMENT) === -1 ){

				console.warn( `alignItems === '${ALIGNMENT}' is not supported` );

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


			// This is for stretch alignment
			// @TODO : Conceive a better performant way
			if( this.parent && this.parent.isUI && this.parent.getAlignItems() === 'stretch' ){

				if( this.parent.getContentDirection().indexOf('column') !== -1 ){

					return this.parent.getWidth() -  ( this.parent.padding * 2 || 0 );

				}

			}


			return this.width || this.getInnerWidth() + ( this.padding * 2 || 0 );

		}

		/**
		 * Get height of this element
		 * With padding, without margin
		 */
		getHeight() {

			// This is for stretch alignment
			// @TODO : Conceive a better performant way
			if( this.parent && this.parent.isUI && this.parent.getAlignItems() === 'stretch' ){

				if( this.parent.getContentDirection().indexOf('row') !== -1 ){

					return this.parent.getHeight() - ( this.parent.padding * 2 || 0 );

				}

			}

			return this.height || this.getInnerHeight() + ( this.padding * 2 || 0 );

		}

	};

}


const AVAILABLE_JUSTIFICATIONS = [
	'start',
	'center',
	'end',
	'space-around',
	'space-between',
	'space-evenly'
];

const AVAILABLE_ALIGN_ITEMS = [
	'start',
	'center',
	'end',
	'stretch',
	'top', // @TODO: Be remove upon 7.x.x
	'right', // @TODO: Be remove upon 7.x.x
	'bottom', // @TODO: Be remove upon 7.x.x
	'left' // @TODO: Be remove upon 7.x.x
];

const _boxChildrenFilter = c => c.isBoxComponent;

/* eslint-enable camelcase */
