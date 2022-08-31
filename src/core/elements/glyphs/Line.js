//JSDoc related imports
/* eslint-disable no-unused-vars */
import Inline from './Inline';
/* eslint-enable no-unused-vars */


/**
 * Line represents an horizontal combination of positioned inlines with additional properties
 */
export default class Line extends Array {

	/**
	 *
	 * @param {Inline[]} items
	 */
	constructor(...items) {
		super(...items);

		/**
		 * The width of this line
		 * @type {number}
		 */
		this.width = 0;

		/**
		 * The maximum lineBase of this line of inlines
		 * @type {number}
		 */
		this.lineBase = 0;

		/**
		 * The maximum lineHeight of this line of inlines
		 * @type {number}
		 */
		this.lineHeight = 0;

		/**
		 * The vertical position of this line
		 * @type {number}
		 */
		this.y = 0;

	}

}
