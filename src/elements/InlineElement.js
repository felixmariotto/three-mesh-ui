import ElementVR from '../core/elements/ElementVR';

export default class InlineElement extends ElementVR {

	constructor() {

		super();

		this.isInline = true;

		// main = none; => merged to TextElements

		// layouter => none(empty)



	}


	/**
	 * An inline element can only contains other inline elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) {

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if( argument.isUI && argument.isInline ) {

				validChildren.push( argument )

			}

			validChildren.push( argument );

		}

		return super.add( ...validChildren );

	}

}
