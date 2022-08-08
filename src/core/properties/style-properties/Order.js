import SubStyleProperty from './SubStyleProperty';

export default class Order extends SubStyleProperty {

	/**
	 *
	 * @param {number} defaultValue
	 */
	constructor( defaultValue ) {

		super( 'order', defaultValue );

	}

	buildOutput( vrElement, out ) {

		// require parent chilren (order) update, which will require layout update
		if( vrElement._parent.value ) {

			vrElement._parent.value._children._needsUpdate = true;

		}

	}

}


