import { CSS_ATTRIBUTES_MATCH_REGEX, CSS_CLASSES_MATCH_REGEX, CSS_COMBINATORS_REPLACE_REGEX, CSS_ID_MATCH_REGEX, CSS_PSEUDO_CLASS_MATCH_REGEX, CSS_TAGNAME_MATCH_REGEX } from './CSSRegex';
import CSSConditionAttribute from './CSSConditionAttribute';
import CSSCondition from './CSSCondition';
import CSSConditionToken from './CSSConditionToken';

export default class CSSQuerySegment {

	/**
	 *
	 * @param {string} queryString
	 */
	constructor( queryString ) {

		// find the css combinator of the segment
		const combinator = queryString.match( CSS_COMBINATORS_REPLACE_REGEX );

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._query = queryString;

		/**
		 *
		 * @type {string|null}
		 * @private
		 */
		this._combinator = combinator ? combinator[ 0 ].trim() : null;

		/**
		 *
		 * @type {Array<CSSCondition|CSSConditionToken|CSSConditionAttribute>}
		 * @private
		 */
		this._conditions = _buildConditions(
			// css combinator should not be processed as condition
			queryString.replace( CSS_COMBINATORS_REPLACE_REGEX, '' )
		);

	}

	/**
	 *
	 * @returns {Array<CSSCondition|CSSConditionToken|CSSConditionAttribute>}
	 */
	get conditions() { return this._conditions; }

	/**
	 *
	 * @returns {string|null}
	 */
	get combinator(){ return this._combinator; }

	/**
	 *
	 * @returns {string}
	 */
	get query() { return this._query; }

	/**
	 *
	 * @param {MeshUIComponent} target
	 * @returns {boolean}
	 */
	match( target ) {

		return this._conditions.every( ( condition ) => {

			switch ( condition.type ) {

				case "id":
					return target.elementID === condition.value;

				case "class":
					return target.classList.containsEvery( condition.value );

				case "pseudoClass":
					return target.pseudoClassList.containsEvery( condition.value );

				case "tag":
					return target.tagName === condition.value;

				case "attribute":
					return target.attributes.matchEvery( condition.value );

				default:
					console.warn(`CSSQuerySegment::match() - '${condition.type}' is not implemented!`);
					return true;
			}

		})

	}

}

/**
 * Convert a querySegment to conditions list
 * @param {string} queryString
 * @return {Array.<CSSCondition|CSSConditionToken|CSSConditionAttribute>}
 * @private
 */
function _buildConditions( queryString ) {

	const conditions = [];

	// Starts by processing attributes query
	const attributesMatches = queryString.match( CSS_ATTRIBUTES_MATCH_REGEX );
	if ( attributesMatches ) {

		conditions.push( new CSSConditionAttribute( attributesMatches ) );

	}

	// update the query string to remove attributes which may contains noise for other regexes
	queryString = queryString.replace( CSS_ATTRIBUTES_MATCH_REGEX, '' );

	const idMatches = queryString.match( CSS_ID_MATCH_REGEX );
	if ( idMatches ) {

		conditions.push( new CSSCondition( 'id', idMatches[ 2 ] ) );

	}

	const classMatches = queryString.match( CSS_CLASSES_MATCH_REGEX );
	if ( classMatches ) {

		conditions.push( new CSSConditionToken( 'class', classMatches ) );

	}

	const pseudoClassMatches = queryString.match( CSS_PSEUDO_CLASS_MATCH_REGEX );
	if ( pseudoClassMatches ) {

		conditions.push( new CSSConditionToken( 'pseudoClass', pseudoClassMatches ) );

	}

	const requestedTagName = queryString
		.replace( CSS_COMBINATORS_REPLACE_REGEX, '' )
		.match( CSS_TAGNAME_MATCH_REGEX, '' );

	if ( requestedTagName && requestedTagName[ 0 ] ) {

		conditions.push( new CSSCondition( 'tag', requestedTagName[ 0 ] ) );

	}

	return conditions;

}
