export default class Behavior {

	/**
	 *
	 * @param {MeshUIComponent} subject
	 */
	constructor( subject ) {

		/**
		 *
		 * @type {MeshUIComponent}
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
