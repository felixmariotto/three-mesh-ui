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

	/**
	 * @abstract
	 */
	act( alterable = null ) {

		throw new Error(`Behavior::act() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

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
