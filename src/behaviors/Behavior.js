export default class Behavior {

	constructor() {

		this._subject = null;

	}

	setSubject( subject ) {

		this._subject = subject;
		return this;

	}

	/**
	 *
	 * @returns {Behavior}
	 */
	attach() {

		console.error(`Behavior::attach() - Is abstract and therefore should be overridden in ${this.constructor.name}`);
		return this;

	}

	/* eslint-disable no-unused-vars */
	/**
	 * @param {any|null} [alterable=null]
	 * @abstract
	 */
	act( alterable = null ) {

		throw new Error(`Behavior::act() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}
	/* eslint-enable no-unused-vars */

	/**
	 *
	 * @returns {Behavior}
	 */
	detach() {

		console.error(`Behavior::detach() - Is abstract and therefore should be overridden in ${this.constructor.name}`);
		return this;
	}

	/**
	 *
	 */
	dispose() {

		this.detach();
		this.clear();

	}

	/**
	 *
	 */
	clear() {

	}

}
