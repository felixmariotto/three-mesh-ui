/**
 * Stores any Block that doesn't have MeshUIComponent parent
 * @type {MeshUIComponent[]}
 * @private
 */
const _roots = [];

/* eslint-disable no-useless-escape */
const STRING_SEGMENTS_REGEX = /((?:")([^"]*)(?:"))/g;
const CSS_COMBINATORS_MATCH_REGEX = /([ >~+]*)([^+>~ ]+)/g;
const CSS_COMBINATORS_REPLACE_REGEX = /^[ >~+]+/;
const CSS_ID_MATCH_REGEX = /(#)([\w_-]+)/;
const CSS_CLASSES_MATCH_REGEX = /(\.)([\w_-]+)/g;
const CSS_PSEUDO_ELEMENTS_MATCH_REGEX = /(::)([A-z0-9\-_]*)/g;
const CSS_TAGNAME_MATCH_REGEX = /^[^#\.:\[]*/g;
const CSS_ATTRIBUTES_MATCH_REGEX = /(\[([^\]]*)\])/g;
const CSS_ATTRIBUTE_COMPONENTS_MATCH_REGEX = /([A-z09_-]+)(([*~$]?={1,2})(.*))?/;
// const CSS_ATTRIBUTE_COMPONENTS_MATCH_REGEX = /([A-z09_-]+)(([*~$]?=)(.*))?/;
/* eslint-enable no-useless-escape */

/**
 * Add a MeshUIComponent has being a root, not having MeshUIComponent parent
 * @param {MeshUIComponent} block
 */
function addRoot( block ){

	if( _roots.indexOf( block) === -1 ){
		_roots.push( block );
	}

}

/**
 * Remove a MeshUIComponent has being a root
 * @param block
 */
function removeRoot( block ){

	const index = _roots.indexOf(block);
	if( index !== -1 ){

		_roots.splice( index, 1);

	}

}

/**
 * @typedef AttributeCondition
 * @property {string} attribute
 * @property {string} operator
 * @property {string} value
 */

/**
 * @typedef QuerySegment
 * @property {string} query
 * @property {string} operator
 * @property {Array.<{type:string,value:string|Array.<AttributeCondition>}>} conditions
 */


/**
 * querySelectorAll is an entrypoint, logic are deviate to internal _querySelectorAll
 * @param queryString
 * @param {MeshUIComponent|Array.<MeshUIComponent>} [context]
 * @return {Array.<MeshUIComponent>}
 */
function querySelectorAll( queryString , context = null ){

	// split the query by segments
	// ie : div#foo .bar > [data-bar="foo"]
	//	0		div#foo
	//	1		.bar
	//	2		>[data-bar="foo"]
	const querySegments = _splitQueryBySegments( queryString );

	const queryList = [];
	for (const segment of querySegments) {

		// find the css combinator of the segment
		const operator = segment.match(CSS_COMBINATORS_REPLACE_REGEX);

		queryList.push({
			query: segment,
			operator: operator ? operator[0].trim() : null,
			conditions: _buildQueryConditions(
				// css combinator should not be processed as condition
				segment.replace(CSS_COMBINATORS_REPLACE_REGEX, "")
			)
		});
	}



	// if no lookup context is provided, use any root MeshUIComponent
	if( !context ) {
		context = _roots;
	}

	// Be sure the provided lookup context is an Array
	if( !Array.isArray(context) ){
		context = [context];
	}


	let results = [];
	// Run the internal logic on any context
	for ( let i = 0; i < context.length; i++ ) {

		results = results.concat( _querySelectorAll( context[ i ], queryList ) );

	}

	// The same MeshUIComponent could be found multiple times, be sure they are only output once
	for ( let i = results.length - 1; i >= 0; i-- ) {

		let firstIndexOf = results.indexOf( results[i] );
		if( firstIndexOf !== i ){

			results.splice(i,1);

		}

	}

	return results;

}

/**
 * Internal logic for querySelectorAll
 * @param {MeshUIComponent} target
 * @param {Array.<QuerySegment>} queryList
 * @param {boolean} [recursive=true] Traverse all children to process query
 * @return {Array.<MeshUIComponent>}
 * @private
 */
function _querySelectorAll( target, queryList, recursive = true ) {

	let results = [];

	// propagate the query selection to any children
	if( recursive ) {

		for ( let i = 0; i < target.childrenUIs.length; i++ ) {

			results = results.concat( _querySelectorAll( target.childrenUIs[ i ], queryList ) );

		}
	}

	// check that the target match the first query segment of the list
	// ie: "div.foo" in "div.foo span.bar > p"
	if( _queryMatch( target, queryList[0]) ) {


		// push the target as result if there is no more segments in the query
		if( queryList.length === 1 ){
			results.push( target );
			return results;
		}


		// Or check children and sibling to complete further segments
		const subQuery = queryList.slice( 1 );

		// check which css combinator to apply
		if ( subQuery && subQuery !== "" ) {

			// Descendant combinator, looks in any children, recursively
			if( !subQuery[0].operator || subQuery[0].operator === "" )
			{
				for ( let i = 0; i < target.childrenUIs.length; i++ ) {

					results = results.concat( _querySelectorAll( target.childrenUIs[ i ], subQuery ) );
				}

			}
			// direct child combinator, only look in direct children, not recursively
			else if( subQuery[0].operator === ">") {

				for ( let i = 0; i < target.childrenUIs.length; i++ ) {

					results = results.concat( _querySelectorAll( target.childrenUIs[ i ], subQuery, false ) );

				}
			}

			// siblings combinator
			else if( target.parentUI && (subQuery[0].operator === "~" || subQuery[0].operator === "+" ) ) {

				// retrieve the childIndex of the current target
				const currentIndex = target.parentUI.childrenUIs.indexOf(target);

				// build the siblings list to check
				let adjacentSiblings;

				// General sibling, next query segments apply on any further children
				if( subQuery[0].operator === '~' ){
					adjacentSiblings = target.parentUI.childrenUIs.slice( currentIndex + 1 );
				}else{
					// adjacent sibling, next query segment apply only to next sibling
					adjacentSiblings = target.parentUI.childrenUIs.slice(currentIndex+1,currentIndex+2);
				}

				// Looks to siblings, not recursively
				for ( let i = 0; i < adjacentSiblings.length; i++ ) {

					results = results.concat( _querySelectorAll( adjacentSiblings[ i ], subQuery, false ) );

				}

			} else {

				throw new Error(`UIDocument::querySelectorAll() - The provided css combinator('${subQuery[0].operator}') is not implemented`);

			}
		}

	}

	return results;

}

function _specificity( queryList ) {

	let specificity = 0;

	for ( let i = 0; i < queryList.length; i++ ) {
		const querySegment = queryList[ i ];

		if( querySegment.conditions.find( c => c.type === 'id') ){
			specificity += 10000;
		}

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

		if( querySegment.conditions.find(c => c.type === 'tag')){
			specificity += 1;
		}

	}

	return specificity;

}

/**
 * Convert a querySegment to conditions list
 * @param queryString
 * @return {Array.<{type:string,value:string|Array.<AttributeCondition>}>}
 * @private
 */
function _buildQueryConditions( queryString ) {

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

function loadSheets(){

	console.log( document.title );
	console.log( document.styleSheets );


	if( document && document.styleSheets ){

		for ( let i = 0; i < document.styleSheets.length; i++ ) {
			const styleSheet = document.styleSheets[ i ];

			if( styleSheet.media.mediaText === 'vr') {

				console.log( "vr stylesheet found", styleSheet);

				for ( let j = 0; j < styleSheet.cssRules.length; j++ ) {
					const cssRule = styleSheet.cssRules[ j ];

					if(  cssRule.constructor.name === 'CSSStyleRule' ) {
						console.log( cssRule.selectorText );

						for ( let k = 0; k < cssRule.style.length; k++ ) {
							const cssRuleElement = cssRule.style[ k ];
							console.log( cssRuleElement, cssRule.style[cssRuleElement]);

						}

						console.log( cssRule.style.getPropertyValue( '--prop-a' ) );
						console.log( cssRule.style.getPropertyValue( '-vr-font-opacity' ) );

					}else {

						console.log( cssRule.constructor.name );

						const mql = window.matchMedia(cssRule.conditionText);
						if (mql.matches) {
							// it matches
							console.log(cssRule.conditionText, " is activated")
						} else {
							// does not match
							console.log(cssRule.conditionText, " is NOT activated")
						}

						mql.addEventListener( 'change',
							function(mq) {
								console.log( mq.media, mq.matches);
								if (mq.matches) {
									// it matches
								} else {
									// does not match
								}
							}
						);

						for ( let k = 0; k < cssRule.cssRules.length; k++ ) {
							const srule = cssRule.cssRules[k];

							for ( let l = 0; l < srule.style.length; l++ ) {
								const cssRuleElement = srule.style[ l ];
								console.log( cssRuleElement, srule.style[cssRuleElement]);

							}

						}


					}

				}

			}

		}

	}

}

export {loadSheets};

function _cleanAttributeValue ( value ){

	if( value[0] === value[value.length-1] && (value[0]==='"' || value[0]==='"')){
		value = value.substring(1,value.length-1);
	}

	return value;

}

/**
 * Check if a UIComponent match a query
 * @param {MeshUIComponent} target
 * @param {QuerySegment} queryLevel
 * @return {boolean}
 * @private
 */
function _queryMatch( target, queryLevel ) {

	return queryLevel.conditions.every( ( condition )=>{

		switch ( condition.type ){

			case "id":
				return target._id === condition.value;

			case "class":
				return condition.value.every((className) => target._classes.indexOf(className) !== -1 );

			case "state":
				return condition.value.every((className) => target._states.indexOf(className) !== -1 );

			case "tag":
				return target._tagName === condition.value;

			default:
				console.warn(condition.type + " is not implemented ");
				return true;
			// case "attributes":
			// 	return condition.value.every((attributeCondition) => {
			// 		target._attributes.indexOf(className) !== -1
			// 	} );
		}

	})

}


/**
 *
 * @param {string} queryString
 * @return {Array.<string>}
 * @private
 */
function _splitQueryBySegments( queryString ) {

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

export {addRoot,removeRoot,querySelectorAll}
