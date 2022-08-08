import CSSQuery from './css/CSSQuery';
import CSSRuleVR from './css/CSSRuleVR';
import CSSMediaQuery from './css/CSSMediaQuery';

/**
 * Stores any Block that doesn't have MeshUIComponent parent
 * @type {MeshUIComponent[]}
 * @private
 */
const _roots = [];

/**
 * Add a MeshUIComponent has being a root, not having MeshUIComponent parent
 * @param {MeshUIComponent} block
 */
function addRoot( block ) {

	if ( _roots.indexOf( block ) === -1 ) {
		_roots.push( block );
	}

}

/**
 * Remove a MeshUIComponent has being a root
 * @param block
 */
function removeRoot( block ) {

	const index = _roots.indexOf( block );
	if ( index !== -1 ) {

		_roots.splice( index, 1 );

	}

}


/**
 * querySelectorAll is an entrypoint, logic are deviate to internal _querySelectorAll
 * @param {string|CSSQuery} query
 * @param {MeshUIComponent|Array.<MeshUIComponent>} [context]
 * @return {Array.<MeshUIComponent>}
 */
function querySelectorAll( query, context = null ) {

	if( !( query instanceof CSSQuery ) ) {
		query = CSSQuery.build( query );
	}

	// if no lookup context is provided, use any root MeshUIComponent
	if ( !context ) {
		context = _roots;
	}

	// Be sure the provided lookup context is an Array
	if ( !Array.isArray( context ) ) {
		context = [ context ];
	}


	let results = [];
	// Run the internal logic on any context
	for ( let i = 0; i < context.length; i++ ) {

		results = results.concat( _querySelectorAll( context[ i ], query ) );

	}

	// The same MeshUIComponent could be found multiple times, be sure they are only output once
	for ( let i = results.length - 1; i >= 0; i-- ) {

		const firstIndexOf = results.indexOf( results[ i ] );
		if ( firstIndexOf !== i ) {

			results.splice( i, 1 );

		}

	}

	return results;

}

/**
 * Internal logic for querySelectorAll
 * @param {MeshUIComponent} target
 * @param {CSSQuery} query
 * @param {boolean} [recursive=true] Traverse all children to process query
 * @return {Array.<MeshUIComponent>}
 * @private
 */
function _querySelectorAll( target, query, recursive = true ) {

	let results = [];

	// propagate the query selection to any children
	if ( recursive ) {

		for ( let i = 0; i < target.childrenUIs.length; i++ ) {

			results = results.concat( _querySelectorAll( target.childrenUIs[ i ], query ) );

		}

	}

	// check that the target match the first query segment of the list
	// ie: "div.foo" in "div.foo span.bar > p"
	if ( query[ 0 ].match( target ) ) {

		// push the target as result if there is no more segments in the query
		if ( query.length === 1 ) {
			results.push( target );
			return results;
		}

		// Or check children and sibling to complete further segments
		const subQuery = query.slice( 1 );

		// check which css combinator to apply
		if ( subQuery && subQuery !== '' ) {

			// Descendant combinator, looks in any children, recursively
			if ( !subQuery[ 0 ].combinator || subQuery[ 0 ].combinator === '' ) {
				for ( let i = 0; i < target.childrenUIs.length; i++ ) {

					results = results.concat( _querySelectorAll( target.childrenUIs[ i ], subQuery ) );
				}

			}
			// direct child combinator, only look in direct children, not recursively
			else if ( subQuery[ 0 ].combinator === '>' ) {

				for ( let i = 0; i < target.childrenUIs.length; i++ ) {

					results = results.concat( _querySelectorAll( target.childrenUIs[ i ], subQuery, false ) );

				}
			}

			// siblings combinator
			else if ( target.parentUI && ( subQuery[ 0 ].combinator === '~' || subQuery[ 0 ].combinator === '+' ) ) {

				// retrieve the childIndex of the current target
				const currentIndex = target.parentUI.childrenUIs.indexOf( target );

				// build the siblings list to check
				let adjacentSiblings;

				// General sibling, next query segments apply on any further children
				if ( subQuery[ 0 ].combinator === '~' ) {
					adjacentSiblings = target.parentUI.childrenUIs.slice( currentIndex + 1 );
				} else {
					// adjacent sibling, next query segment apply only to next sibling
					adjacentSiblings = target.parentUI.childrenUIs.slice( currentIndex + 1, currentIndex + 2 );
				}

				// Looks to siblings, not recursively
				for ( let i = 0; i < adjacentSiblings.length; i++ ) {

					results = results.concat( _querySelectorAll( adjacentSiblings[ i ], subQuery, false ) );

				}

			} else {

				throw new Error( `UIDocument::querySelectorAll() - The provided css combinator('${subQuery[ 0 ].combinator}') is not implemented` );

			}

		}

	}

	return results;

}

/**
 *
 * @type {Array.<CSSRuleVR>}
 * @private
 */
let _rules = null;
let _conditions = null;
let _observers = [];

/**
 * WIP
 * @deprecated until achieved
 * @param {boolean} [listenForChanges=false]
 */
function loadSheets( listenForChanges = false ) {

	// If it should be reactive and a document isset
	if( listenForChanges && document ){

		// Starts be removing any previously set MutationObservers
		for ( let i = 0; i < _observers.length; i++ ) {
			let previousMutationObserver = _observers[ i ];
			previousMutationObserver.disconnect();
			previousMutationObserver = null;
		}

		_observers = [];

		_addMutationObserverOnContainer( document.documentElement );

		const sheets = document.querySelectorAll('link[media="vr"],style[media="vr"]');
		for ( let i = 0; i < sheets.length; i++ ) {

			_addMutationObserverOnStyleSheet( sheets[ i ] );

		}
	}



	// reset elements
	// @TODO: Dispose conditions
	_rules = [];
	_conditions = [];

	if ( document && document.styleSheets ) {

		for ( const styleSheet of document.styleSheets ) {
			if ( styleSheet.media.mediaText === 'vr' ) {

				const { rules, conditions } = _importSheet( styleSheet.cssRules );

				_rules = _rules.concat( rules );
				_conditions = _conditions.concat( conditions );

			}

		}

		for ( let j = 0; j < _rules.length; j++ ) {
			_rules[ j ].order = j;
		}

		_rules.sort( _sortXSSRules );

		for ( const condition of _conditions ) {
			condition.init( _applyRules );
		}

	}

	_applyRules();

}

/**
 *
 * @param {Array.<MutationRecord>} mutations
 * @private
 */
function _addOrRemoveStylesheetMutation( mutations ){
	let reload = false;
	mutations.forEach(function(mutation) {

		for (let i = 0; i < mutation.addedNodes.length; i++){
			if( _matchVRStyleSheet(mutation.addedNodes[i]) ){
				reload = true;
			}

		}

		for ( let i = 0; i < mutation.removedNodes.length; i++ ) {

			if( _matchVRStyleSheet(mutation.removedNodes[ i ]) ){
				reload = true;
			}

		}

	})

	if( reload ){
		loadSheets( true );
	}
}

function _matchVRStyleSheet( element ) {

	return element.tagName === 'LINK' || element.tagName === 'STYLE' && element.getAttribute('media') === 'vr';

}

function _addMutationObserverOnContainer( container ){

	const observer = new MutationObserver( _addOrRemoveStylesheetMutation );

	observer.observe( container, { childList: true, subtree: true });
	_observers.push( observer );
}

/**
 *
 * @param cssStyleSheet
 * @private
 */
function _addMutationObserverOnStyleSheet( cssStyleSheet ){


	// observe the stylesheet itself for content changes
	/* eslint-disable no-unused-vars */
	const observer = new MutationObserver(function(mutations) {
		loadSheets(true);
	});
	/* eslint-enable no-unused-vars */

	// Pass in the target node, as well as the observer options.
	observer.observe( cssStyleSheet, {
		attributes:    true,
		childList:     true,
		subtree: true,
		characterData: true,
		characterDataOldValue: true
	});

	_observers.push( observer );


	// // Observe the parent to know if this stylesheet will be removed
	// const parentObserver = new MutationObserver( function(mutations) {
	//
	// 	for ( let j = 0; j < mutations.length; j++ ) {
	// 		const mutation = mutations[j];
	//
	// 		if( mutation.type === 'childList' ){
	//
	// 			for ( let k = 0; k < mutation.removedNodes.length; k++ ) {
	// 				const removedNode = mutation.removedNodes[ k ];
	//
	// 				if( removedNode === cssStyleSheet ){
	// 					// remove parentObserver, remove observe, rebuild styles
	// 					loadSheets(true);
	// 					break;
	// 				}
	//
	// 			}
	//
	// 		}
	//
	// 	}
	//
	// });
	//
	// parentObserver.observe( cssStyleSheet.parentElement , { childList : true});
	//
	// _observers.push( parentObserver );
}

/**
 * When an element has changed its identity
 * 		- ID
 * 		- ClassList
 * 		- Attributes & values
 *
 * Try to apply any css rules to it and its children
 * @param {MeshUIComponent} element
 */
export function elementChangeIdentity( element ){

	_checkAndApplyCSSRules(element);

	element.traverse( (child) => {

		if( child.isUI ) {

			_checkAndApplyCSSRules(child);

		}

	})

}

/**
 *
 * @param {MeshUIComponent} forElement
 * @private
 */
function _checkAndApplyCSSRules( forElement ){

	// to bundle of styles property to set
	let computedStyles = {};
	let found = false;

	// Loop through each enabled rules
	for ( const rule of _rules ) {

		if( !rule.enabled ) continue;

		// If the element match the rule
		if( rule.query.match( forElement ) ) {

			// append the rules styles properties
			computedStyles = {...computedStyles,...rule.styles};
			found = true;

		}

	}

	// If at least one rule has matched
	if( found ) {

		// Set computed styles
		forElement.set( computedStyles );

	}

}


export function computeStyle( element ){
	const elements = [];
	if( element.parentUI ){
		elements.push( element.parentUI );
	}

	element.traverse( (child) => {
		if( child.isUI ) elements.push( child );
	})

	for ( const elem of elements ) {

		let computedStyles = {};
		let found = false;
		for ( const rule of _rules ) {

			if( !rule.enabled ) continue;

			if( rule.query.match(elem) ) {
				computedStyles = {...computedStyles,...rule.styles};
				found = true;
			}

		}

		if( found ) elem.set( computedStyles );
	}

}


export function _applyRules(){

	for ( const rule of _rules ) {

		if( !rule.enabled ) continue;

		const targets = querySelectorAll( rule.query );

		for ( const target of targets ) {
			target.set( rule.styles );
		}
	}
}

/**
 * Sort the rules by specificity and order
 * Making it sure any overrides is justified
 *
 * @param {CSSRuleVR} a
 * @param {CSSRuleVR} b
 * @returns {number}
 * @private
 */
function  _sortXSSRules( a, b ){

	if( a.specificity < b.specificity ){
		return -1;
	}

	if( a.specificity > b.specificity ){
		return 1;
	}

	if( a.order < b.order ){
		return -1;
	}

	if( a.order > b.order ){
		return 1;
	}

	return 0;

}

/**
 * @Todo : Try to reduce as much as possible this table by updating meshUIComponent properties to match
 * 				 as much as possible css valid properties
 *
 * @type {Object.<string,string>}
 * @private
 */
const _lookUpTable = {
	flexDirection: "contentDirection"
}

/**
 *
 * @param rulesList
 * @param {string|null} [condition=null]
 * @returns {{rules: *[], conditions: *[]}}
 * @private
 */
function _importSheet( rulesList, condition = null ) {

	let rules = [];
	let mediaQ = null;
	let conditions = [];

	if( condition && condition !== '' ) {

		mediaQ = new CSSMediaQuery(condition);
		conditions.push( mediaQ );

	}

	for ( let i = 0; i < rulesList.length; i++ ) {

		const rule = rulesList[ i ];

		if ( rule.selectorText ) {


			const newRule = new CSSRuleVR( rule.selectorText, rule.style, _lookUpTable );
			rules.push( newRule );

			if( mediaQ ){
				mediaQ.addRule( newRule );
			}

		} else if ( rule.conditionText ) {

			let newCondition = condition;
			if( !newCondition || newCondition === '' ){
				newCondition = rule.conditionText;
			}else{
				newCondition += ` and ${rule.conditionText}`;
			}

			const { rules : addRules, conditions : addConditions } = _importSheet( rule.cssRules , newCondition)

			rules = rules.concat( addRules );
			conditions = conditions.concat( addConditions );

		}

	}

	return { rules, conditions };

}


export { loadSheets };

export { addRoot, removeRoot, querySelectorAll };
