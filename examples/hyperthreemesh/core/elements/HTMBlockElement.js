import HTMBoxElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMBoxElement';
import BlockElement from '../../../../src/elements/basic/BlockElement';

/**
 * @extends {MeshUIBaseElement}
 */
export default class HTMBlockElement extends HTMBoxElement {

	/**
	 *
	 * @param {Object.<string,any>} [values=null]
	 */
	constructor( values= {}) {

		const properties = {};
		BlockElement.definePropertiesValues( properties, values );
		super( properties, values );
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

}
