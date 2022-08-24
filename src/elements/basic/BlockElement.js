import BoxElement from './BoxElement';
import BoxLayouter from '../../core/properties/BoxLayouter';

export default class BlockElement extends BoxElement {

	/**
	 *
	 * @param {Object.<string,any>} values
	 */
	constructor( values = null ) {

		super( {layouter:BoxLayouter}, values );

		Object.defineProperties( this, {
				isBlock: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);


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

				// @TODO: Offset Property
				if( argument.isUI ) { argument.position.z = 0.005; }

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}

}
