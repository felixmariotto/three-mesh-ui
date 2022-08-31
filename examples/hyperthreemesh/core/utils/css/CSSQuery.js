import { CSS_COMBINATORS_MATCH_REGEX, STRING_SEGMENTS_REGEX } from './CSSRegex';
import CSSQuerySegment from './CSSQuerySegment';


export default class CSSQuery extends Array {

	/**
	 *
	 * @param {CSSQuerySegment} items
	 */
	constructor( ...items ){
		super( ...items );
	}


	/**
	 *
	 * @param {MeshUIComponent} tmElement
	 * @returns {boolean}
	 */
	match( tmElement ) {

		//check that last segment could be this element

		/**
		 * @type {CSSQuerySegment}
		 */
		const lastQuery = this[this.length-1];

		// if the last segment query doesn't match the element, it doesn't match
		if( !lastQuery.match(tmElement) ) return false;

		// so, the last segment matched, now try to match any previous segment with element parents
		// if it was only one segment, the element matched the query
		if( this.length === 1 ) return true;

		const parentsList = [];

		let childElement = tmElement;
		while ( childElement.parentUI ){
			parentsList.push( childElement.parentUI );
			childElement = childElement.parentUI;
		}

		// if no parent and more segments to check
		if( parentsList.length === 0 ) return false;



		/**
		 *
		 * @type {MeshUIComponent}
		 */
		let lastMatchedElement = tmElement;

		/**
		 *
		 * @type {MeshUIComponent}
		 */
		let elementToMatch = null;

		// check previous segments
		for ( let i = this.length - 2; i >= 0; i-- ) {

			const querySegment = this[ i ];

			if( parentsList.length === 0) return false;

			elementToMatch = parentsList.shift();

			if ( !lastQuery.combinator || lastQuery.combinator === '' ) {

				while ( !querySegment.match( elementToMatch ) ){

					// if no more parent to check
					if( parentsList.length === 0 ) return false;

					// if the number of parent is less than the required segment to check
					if( parentsList.length < i+1 ) return false;

					elementToMatch = parentsList.shift();

				}

				lastMatchedElement = elementToMatch;


				// look in any parents
			}
			else if (lastQuery.combinator === '>' ) {

				// only look in first parent
				if( !querySegment.match( elementToMatch) ) return false;
				lastMatchedElement = elementToMatch;

			}

			// siblings combinator
			else if (  lastQuery.combinator === '~' || lastQuery.combinator === '+' ) {

				// retrieve the childIndex of the current target
				const currentIndex = elementToMatch.childrenUIs.indexOf( lastMatchedElement );

				// build the siblings list to check
				let adjacentSiblings;

				// General sibling, next query segments apply on any further children
				if ( lastQuery.combinator === '~' ) {
					adjacentSiblings = elementToMatch.childrenUIs.slice( currentIndex + 1 );
				} else {
					// adjacent sibling, next query segment apply only to next sibling
					adjacentSiblings = elementToMatch.childrenUIs.slice( currentIndex + 1, currentIndex + 2 );
				}

				// Looks to siblings, not recursively
				for ( let i = 0; i < adjacentSiblings.length; i++ ) {

					if( querySegment.match( adjacentSiblings[i]) ) {

						lastMatchedElement = elementToMatch;
						break;

					}

				}

			}

		}

		return true;
	}

	/**
	 * Build a CSSQuery from a queryString
	 * @param {string} queryString
	 * @returns {CSSQuery}
	 */
	static build( queryString ) {

		// Match all strings segments to be ignored
		const stringSegmentsMatch = queryString.matchAll( STRING_SEGMENTS_REGEX );

		// Replace all string segments by "_" without loosing the length of the queryString
		// this will allow to ignore specials chars contained in string segments
		const queryStringAsArray = queryString.split("");
		for ( const stringSegmentMatch of stringSegmentsMatch ) {

			for ( let i = 0; i < stringSegmentMatch[1].length; i++ ) {
				queryStringAsArray[(stringSegmentMatch.index+i)] = "_";
			}

		}

		const queryLevelsMatches = queryStringAsArray.join("").matchAll(CSS_COMBINATORS_MATCH_REGEX);
		if( !queryLevelsMatches ) return [];

		// Retrieve all index where query levels starts
		const indexes = []
		for ( const match of queryLevelsMatches ) {

			indexes.push( match.index );

		}

		// complete indexes
		indexes.push( queryString.length );

		// Now all levels can be retrieve on the provided string from computed indexes
		const query = new CSSQuery();

		for ( let i = 0; i < indexes.length-1; i++ ) {

			query.push( new CSSQuerySegment( queryString.substring(indexes[i],indexes[i+1]) ) );

		}

		return query;

	}


}
