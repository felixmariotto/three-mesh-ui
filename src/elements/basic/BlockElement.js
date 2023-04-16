import BoxElement from './BoxElement';
import BoxLayouter from '../../core/properties/BoxLayouter';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from './../../core/elements/MeshUIBaseElement';
import { Object3D } from 'three';
/* eslint-enable no-unused-vars */


export default class BlockElement extends BoxElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 */
	constructor( values = {} ) {

		const properties = {};
		BlockElement.definePropertiesValues( properties, values );

		super( properties , values );

		BlockElement.init( this );


	}

	/* eslint-disable no-unused-vars */
	/**
	 * A Block Element can only contains box elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) {
		/* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI || argument.isBox ) {

				validChildren.push( argument );

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {  /* eslint-enable no-unused-vars */

		properties.layouter = BoxLayouter;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init ( element ) {

		Object.defineProperties( element , {
				isBlock: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

	}

}
