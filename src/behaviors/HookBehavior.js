import Behavior from './Behavior';


export default class HookBehavior extends Behavior{

	constructor(type, priority) {

		super();

		this._hookType = type;
		this._hookPriority = priority;

	}

	/**
	 *
	 * @returns {Behavior}
	 */
	attach() {

		this._subject.hook( this._hookType, this, this._hookPriority );
		return this;

	}

	/**
	 * @abstract
	 */
	// act( alterable = null ) {
	//
	// 	throw new Error(`Behavior::act() - Is abstract and therefore should be overridden in ${this.constructor.name}`);
	//
	// }

	/**
	 *
	 * @returns {Behavior}
	 */
	detach() {

		this._subject.unhook( this._hookType, this );
		return this;
	}


}
