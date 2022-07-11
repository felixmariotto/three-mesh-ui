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
