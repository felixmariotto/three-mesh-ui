export default class Line extends Array {

	constructor(...args) {
		super(...args);

		/**
		 *
		 * @type {number}
		 */
		this.width = 0;

		/**
		 *
		 * @type {number}
		 */
		this.lineBase = 0;

		/**
		 *
		 * @type {number}
		 */
		this.lineHeight = 0;

		/**
		 *
		 * @type {number}
		 */
		this.y = 0;

	}

}
