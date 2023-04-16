//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../core/elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */


export default class Behavior {

	/**
	 *
	 * @param {MeshUIBaseElement} subject
	 */
	constructor( subject ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 * @protected
		 */
		this._subject = subject;

	}

	/**
	 * @abstract
	 */
	attach() {

		console.error(`Behavior::attach() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

	/**
	 * @abstract
	 * @returns {void}
	 */
	act() {

		throw new Error(`Behavior::act() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

	/**
	 * @abstract
	 */
	detach() {

		console.error(`Behavior::detach() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

	/**
	 *
	 */
	clear() {

	}

}
