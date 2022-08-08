import SubStyleProperty from './SubStyleProperty';

export default class JustifyContent extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'justifyContent', defaultValue );

		// strategies
		this._inverter = 1;
		this._computeOffset = null;
		this._computeMargin = null;

		/**
		 *
		 * @override
		 */
		this.isValidValue = _isValid;

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @param {Object.<string, any>} out
	 */
	update( vrElement, out ) {

		this._inverter = 1;

		switch ( vrElement.style._flexDirection.output ) {

			case 'column-reverse':
				this._inverter = -1;
				// fallthrough
			case 'column':
				this.process = _column.bind(this);
				break;


			case 'row-reverse':
				this._inverter = -1;
				// fallthrough
			case 'row':
				this.process = _row.bind(this);
				break;

		}

		switch ( this._output ) {
			case 'end':
				this._computeOffset = _justificationOffset__END;
				this._computeMargin = _justificationMargin;
				break;

			case 'center':
				this._computeOffset = _justificationOffset__CENTER;
				this._computeMargin = _justificationMargin;
				break;

			case 'start':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMargin;
				break;

			case 'space-between':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMargin__SPACE_BETWEEN;
				break;

			case 'space-around':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMargin__SPACE_AROUND;
				break;

			case 'space-evenly':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMargin__SPACE_EVENLY;
				break;
		}

	}

	process( vrElement ) {
		// this will be defined from strategy
	}

}

function _row( vrElement ) {

	const startPos = vrElement.style._flexDirection.anchor;

	const { usedDirectionSpace, remainingSpace } = _rowRemainingSpace( vrElement );

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	const justificationOffset = this._computeOffset( axisOffset );

	// Items margin
	// const justificationMargins = _getJustificationMargin( boxComponent.childrenBoxes, remainingSpace, JUSTIFICATION, REVERSE );
	const justificationMargins = this._computeMargin( vrElement, remainingSpace, this._inverter );

	// Apply
	vrElement._children.childrenBoxes.forEach( ( child , childIndex ) => {

		vrElement._boxManager._childrenPos[ child.id ].x -= justificationOffset - justificationMargins[childIndex];

	} );

}

function _column( vrElement ) {


	const startPos = vrElement.style._flexDirection.anchor;

	const { usedDirectionSpace, remainingSpace } = _columnRemainingSpace( vrElement );

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	const justificationOffset = this._computeOffset( axisOffset );

	// Items margin
	// const justificationMargins = _getJustificationMargin( boxComponent.childrenBoxes, remainingSpace, JUSTIFICATION, REVERSE );
	const justificationMargins = this._computeMargin( vrElement, remainingSpace, this._inverter );

	// Apply
	vrElement._children.childrenBoxes.forEach( ( child , childIndex ) => {

		vrElement._boxManager._childrenPos[ child.id ].y -= justificationOffset - justificationMargins[childIndex];

	} );

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/
function _rowRemainingSpace( vrElement ) {

	const usedDirectionSpace = vrElement.getChildrenSideWidth();
	return { usedDirectionSpace, remainingSpace: vrElement.innerWidth - usedDirectionSpace };

}

function _columnRemainingSpace( vrElement ) {

	const usedDirectionSpace = vrElement.getChildrenSideHeight();
	return { usedDirectionSpace, remainingSpace: vrElement.innerHeight - usedDirectionSpace };

}


function _justificationOffset ( axisOffset ){

	return 0;

}

function _justificationOffset__END( axisOffset ) {

	return axisOffset;

}

function _justificationOffset__CENTER( axisOffset ) {

	return axisOffset / 2;

}

function _justificationMargin( vrElement, availableSpace = 0, reverse = 1 ) {

	return Array( vrElement.childrenBoxes.length ).fill( 0 );

}

function _justificationMargin__SPACE_BETWEEN( vrElement , availableSpace = 0, reverse = 1 ) {

	const boxes = vrElement.childrenBoxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {

		// only one children would act as start
		if ( length > 1 ) {

			const margin = availableSpace / ( length - 1 ) * reverse;
			// set this margin for any children

			// except for first child
			justificationMargins[ 0 ] = 0;

			for ( let i = 1; i < length; i++ ) {

				justificationMargins[ i ] = margin * i;

			}

		}

	}

}

function _justificationMargin__SPACE_EVENLY( vrElement , availableSpace = 0, reverse = 1 ) {

	const boxes = vrElement.childrenBoxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {

		if ( length > 1 ) {

			const margin = availableSpace / ( length + 1 ) * reverse;

			// set this margin for any children
			for ( let i = 0; i < length; i++ ) {

				justificationMargins[ i ] = margin * ( i + 1 );

			}

		}

	}

}

function _justificationMargin__SPACE_AROUND( vrElement , availableSpace = 0, reverse = 1 ) {

	const boxes = vrElement.childrenBoxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {

		if ( length > 1 ) {

			const margin = availableSpace / ( length ) * reverse;

			const start = margin / 2;
			justificationMargins[ 0 ] = start;

			// set this margin for any children
			for ( let i = 1; i < length; i++ ) {

				justificationMargins[ i ] = start + margin * i;

			}

		}

	}

}

const AVAILABLE_VALUES = ['start','center','end','space-between','space-around','space-evenly'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) justifyContent value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

