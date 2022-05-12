
function loadSheets(){

	if( document && document.styleSheets ){

		for ( let i = 0; i < document.styleSheets.length; i++ ) {
			const styleSheet = document.styleSheets[ i ];

			if( styleSheet.media.mediaText === 'vr') {

				console.log( "vr stylesheet found", styleSheet);

			}

		}

	}

}

/**
 * Retrieve the specificity of a query
 * @param {Array.<CSSQuery>|string}query
 * @return {number}
 */
function specificity( query ) {

	if( !Array.isArray(query) ){

		query = queryList( query );

	}

	let specificity = 0;

	// Traverse each depth of the query
	for ( let i = 0; i < query.length; i++ ) {

		// to process each conditions on them
		const querySegment = query[ i ];


		// id is 10k => 100 classes
		if( querySegment.conditions.find( c => c.type === 'id') ){
			specificity += 10000;
		}

		// classes, attributes and pseudo are 100 => 100 tags
		const classCondition = querySegment.conditions.find( c => c.type === 'class' );
		if( classCondition ){
			specificity += classCondition.value.length * 100;
		}

		const attributeCondition = querySegment.conditions.find( c => c.type === 'attribute' );
		if( attributeCondition ){
			specificity += attributeCondition.value.length * 100;
		}

		const stateCondition = querySegment.conditions.find( c => c.type === 'state' );
		if( stateCondition ){
			specificity += stateCondition.value.length * 100;
		}

		// tag is one
		if( querySegment.conditions.find(c => c.type === 'tag')){
			specificity += 1;
		}

	}

	return specificity;

}

/**
 * Parse a flat css query, to obtain its list of conditions
 * @param {string} queryString
 * @return {*[]}
 */
function queryConditions( queryString ) {

	const conditions = [];
	let idMatches = queryString.match(CSS_ID_MATCH_REGEX);
	if( idMatches ){
		conditions.push({type:'id', value: idMatches[2] });
	}

	let classMatches = queryString.match(CSS_CLASSES_MATCH_REGEX);
	if( classMatches ) {

		const classes = [];
		for ( let i = 0; i < classMatches.length; i++ ) {

			classes.push( classMatches[ i ].substring(1) );

		}
		conditions.push( {type: 'class', value:classes });

	}

	let statesMatches = queryString.match(CSS_PSEUDO_ELEMENTS_MATCH_REGEX);
	if( statesMatches ) {

		const states = [];
		for ( let i = 0; i < statesMatches.length; i++ ) {

			states.push(  statesMatches[ i ].substring(2) );

		}
		conditions.push( { type: 'state', value: states} );

	}

	const requestedTagName = queryString
		.replace(CSS_COMBINATORS_REPLACE_REGEX, '' )
		.match(CSS_TAGNAME_MATCH_REGEX,"");

	if( requestedTagName && requestedTagName[0] ) {

		conditions.push({type: 'tag', value : requestedTagName[0] })

	}

	const attributesMatches = queryString.match(CSS_ATTRIBUTES_MATCH_REGEX);
	if( attributesMatches ) {

		const attributes = [];

		for ( let i = 0; i < attributesMatches.length; i++ ) {
			// remove brackets
			const attributeMatch = attributesMatches[ i ].substring(1, attributesMatches[ i ].length - 1);
			const attributeDefinition = attributeMatch.match(CSS_ATTRIBUTE_COMPONENTS_MATCH_REGEX);

			attributes.push({
				attribute: attributeDefinition[1],
				operator: attributeDefinition[3] || "!==",
				value: attributeDefinition[4] ? _cleanAttributeValue( attributeDefinition[4] ) : undefined
			})

		}

		conditions.push( { type:'attribute', value: attributes } );

	}

	return conditions;

}

function queryLevels( queryString ) {

		// Match all strings segments to be ignored
		const stringSegmentsMatch = queryString.matchAll( STRING_SEGMENTS_REGEX );

		// Replace all string segments by "_" without loosing the length of the queryString
		// this will allow to ignore specials chars contained in string segments
		var queryStringAsArray = queryString.split("");
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
		const segments = [];
		for ( let i = 0; i < indexes.length-1; i++ ) {

			segments.push( queryString.substring(indexes[i],indexes[i+1]))

		}

		return segments;


}

/**
 * Convert a css query(string) to a queryList(Array)
 * @param {string} queryString
 */
function queryList( queryString ) {

	const queryStringLevels = queryLevels( queryString );

	const queryList = [];
	for (const match of queryStringLevels) {

		// const operator = match.match(CSS_COMBINATORS_MATCH_REGEX);
		const operator = match.match(CSS_COMBINATORS_REPLACE_REGEX);

		queryList.push({
			query: match,
			operator: operator ? operator[0].trim() : null,
			conditions: queryConditions(
				// css combinator should not be processed as condition
				match.replace(CSS_COMBINATORS_REPLACE_REGEX, "")
			)
		});
	}

}
