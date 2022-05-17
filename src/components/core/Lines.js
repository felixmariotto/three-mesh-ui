//JSDoc related imports
/* eslint-disable no-unused-vars */
import Line from './Line';
/* eslint-enable no-unused-vars */

/**
 * Lines represents a vertical succession of Line
 */
export default class Lines extends Array {

	/**
	 *
	 * @param {Line} items
	 */
	constructor(...items) {
		super(...items);

		/**
		 * The maximum width of Line items
		 * @type {number}
		 */
		this.width = 0;

		/**
		 * The addition of height of any Line
		 * @type {number}
		 */
		this.height = 0;

	}

}
