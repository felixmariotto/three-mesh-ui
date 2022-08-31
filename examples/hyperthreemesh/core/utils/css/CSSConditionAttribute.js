import CSSCondition from './CSSCondition';
import { CSS_ATTRIBUTE_COMPONENTS_MATCH_REGEX } from './CSSRegex';

export default class CSSConditionAttribute extends CSSCondition {

	/**
	 *
	 * @param {Array.<string>} attributesMatches
	 */
	constructor( attributesMatches ) {

		super("attribute");

		/**
		 *
		 * @type {Array.<AttributeCondition>}
		 * @private
		 */
		this._value = [];


		for ( let i = 0; i < attributesMatches.length; i++ ) {

			this._value.push( new AttributeCondition(attributesMatches[ i ]) );

		}

	}

	/**
	 *
	 * @returns {Array.<AttributeCondition>}
	 */
	get value(){ return this._value; }

}

class AttributeCondition {

	/**
	 * Parse attribute query string to isolates its components
	 *
	 * 	ie: `[disabled]` 				=> {name:'disabled',value:null,operator:'!=='}
	 * 			`[src="http://"]` 	=> {name:'src',value:"http://",operator:'='}
	 * 			`[src$="http://"]` 	=> {name:'src',value:"http://",operator:'$='}
	 *
	 * @param {string} queryString
	 */
	constructor( queryString ) {

		// remove brackets
		queryString = queryString.substring(1, queryString.length - 1);

		// split string to attributes components
		const components = queryString.match(CSS_ATTRIBUTE_COMPONENTS_MATCH_REGEX);

		this.name = components[1];
		this.operator = components[3] || "!==";
		this.value = components[4] ? _cleanAttributeValue( components[4] ) : undefined

	}

}

/**
 * Check that attribute value isn't delimited by quotes
 * @param {string} value
 * @returns {string}
 * @private
 */
function _cleanAttributeValue ( value ){

	// If the first character is the last character
	// And first is single or double quotes (css quotes)
	if( value[0] === value[value.length-1] && (value[0]==='"' || value[0]==="'")){

		// remove the quotes
		value = value.substring(1,value.length-1);

	}

	return value;

}
