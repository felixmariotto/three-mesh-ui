import SubStyleProperty from '../SubStyleProperty';
import { Plane, Vector3 } from 'three';


export default class Overflow extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'overflow', defaultValue, true );

		this.isValidValue = _isValid;

		/**
		 *
		 * @type {Array.<Plane>|null}
		 * @internal
		 */
		this._clippingPlanes = null;

		this._renderStrategy = this._emptyRender;
	}

	/**
	 * Update of overflow is a bit different, as parent may trigger changes on it
	 * @override
	 */
	update( element, out ) {

		// in any case, it will compute value. It doesn't have updateRequire evaluation
		// let updateRequired = true;

		// Inline has priority if set
		if ( this._inline !== undefined && this._inline !== 'unset' ) {

			this._input = this._inline;

		}
		// or fallback on computed
		else if ( this._computed !== undefined ) {

			this._input = this._computed;

		}

		if ( !this._allowsInherit ) {

			this._inheritedInput = this.getInheritedInput( element );

		}

		this.computeOutputValue( element );

		// rebuild same properties on children 'inheritance'
		for ( const childUIElement of element._children._uis ) {
			childUIElement[ `_overflow` ]._needsUpdate = true;
		}

		this.output( out );

	}

	output( out ) {

		out['clippingPlanes'] = this._clippingPlanes;

	}

	computeOutputValue( element ) {

		// update self --------------------
		super.computeOutputValue( element );

		if( this._value === 'hidden' ) {

			this._renderStrategy = this._propagateRender;

		}else{

			this._renderStrategy = this._emptyRender;
			this._clippingPlanes = null;
		}


		const parent = element._parent._value;
		if( parent !== null ) {

			// Check that parent is hiddenOverflow or has clippingPlanes
			const overflowParent = parent._overflow;
			if ( ( overflowParent._value === 'hidden' || overflowParent._clippingPlanes !== null ) && !this._clippingPlanes ) {

				// add planes and render
				this._clippingPlanes =  [
					// top
					new Plane( new Vector3( 0, -1, 0 ), 1 ),
					// right
					new Plane( new Vector3( -1, 0, 0 ), 1 ),
					// bottom
					new Plane( new Vector3( 0, 1, 0 ), 1 ),
					// left
					new Plane( new Vector3( 1, 0, 0 ), 1 ),
				];

				// bind the parent to the clipping plane in a custom property
				for ( let i = 0; i < this._clippingPlanes.length; i++ ) {
					this._clippingPlanes[ i ].parent = parent;
				}

				// Also add parent clipping planes if isset
				if( overflowParent._clippingPlanes !== null ) {
					this._clippingPlanes.push( ...overflowParent._clippingPlanes );
				}

				this._renderStrategy = this._hiddenRender;
				this._needsRender = true;

			} else if ( ( overflowParent._value === 'visible' || overflowParent._clippingPlanes === null ) && this._clippingPlanes !== null ){

				// remove planes and render
				this._clippingPlanes = null;
				this._renderStrategy = this._emptyRender;
				this._needsRender = true;

			}

		}

	}

	render( element) {

		this._renderStrategy( element );

	}

	/* eslint-disable no-unused-vars */	_emptyRender( element ) { /* eslint-enable no-unused-vars */ }

	_hiddenRender( element ) {


		const parentUI = element._parent._value;

		const yLimit = parentUI._bounds._offsetHeight;
		const xLimit = parentUI._bounds._offsetWidth;
		const padding = parentUI._padding._value;
		const border = parentUI._borderWidth._value;

		for ( let i = 0; i < 4 && i < this._clippingPlanes.length ; i++ ) {
			const clippingPlane = this._clippingPlanes[ i ];

			switch ( i % 4 ) {
				// top
				case 0:
					clippingPlane.constant = yLimit / 2 - ( padding.x + border.x );
					break;

				// right
				case 1:
					clippingPlane.constant = xLimit / 2 - ( padding.y + border.y );
					break;

				// bottom
				case 2:
					clippingPlane.constant = yLimit / 2 - ( padding.z + border.z );
					break;

				// left
				case 3:
					clippingPlane.constant = xLimit / 2 - ( padding.w + border.w );
					break;
			}

			clippingPlane.applyMatrix4( parentUI.matrixWorld )

		}

		for ( let i = 0; i < element._children._uis.length; i++ ) {
			const ui = element._children._uis[ i ];
			ui._overflow._needsRender = true;
		}

	}

	_propagateRender( element ) {

		for ( let i = 0; i < element._children._uis.length; i++ ) {
			const ui = element._children._uis[ i ];
			ui._overflow._needsRender = true;
		}

	}

}

const AVAILABLE_VALUES = ['visible', 'hidden'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) overflow value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
