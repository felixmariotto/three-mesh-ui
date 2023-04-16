import CSSCondition from './CSSCondition';

export default class CSSConditionToken extends CSSCondition {

	/**
	 *
	 * @param {string} type
	 * @param {Array.<string>} tokenMatches
	 */
	constructor( type, tokenMatches) {

		super(type);

		/**
		 *
		 * @type {Array.<string>}
		 * @private
		 */
		this._value = [];

		for ( let i = 0; i < tokenMatches.length; i++ ) {

			// do not take first char into account
			this._value.push( tokenMatches[ i ].substring(1) );

		}

	}

	/**
	 * @override
	 * @returns {Array.<string>}
	 */
	get value(){ return this._value; }


}
