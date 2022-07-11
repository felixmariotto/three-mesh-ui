import CSSQuery from './css/CSSQuery';
import XSSRule from './css/XSSRule';
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


let _rules = null;
let _conditions = null;
let _observers = [];

/**
 * WIP
 * @deprecated until achieved
 * @param {boolean} [listenForChanges=false]
 */
function loadSheets( listenForChanges = false ) {

	if( listenForChanges && document ){

		for ( let i = 0; i < _observers.length; i++ ) {
			let observer1 = _observers[ i ];
			observer1.disconnect();
			observer1 = null;
		}

		_observers = [];


		const sheets = document.querySelectorAll('link[media="vr"],style[media="vr"]');
		for ( let i = 0; i < sheets.length; i++ ) {


			const sheet = sheets[ i ];

			// Create an observer instance.
			var observer = new MutationObserver(function(mutations) {
				loadSheets(true);
				console.log( mutations );
				// console.log(target.innerText);
			});

			// Pass in the target node, as well as the observer options.
			observer.observe(sheet, {
				attributes:    true, //?
				childList:     true, // ?
				subtree: true,
				characterData: true,
				characterDataOldValue: true
			});

			_observers.push( observer );

			var parentObserver = new MutationObserver( function(mutations) {
				console.log( "parent mutation", mutations);

				for ( let j = 0; j < mutations.length; j++ ) {
					const mutation = mutations[j];

					if( mutation.type === 'childList' ){

						for ( let k = 0; k < mutation.removedNodes.length; k++ ) {
							const removedNode = mutation.removedNodes[ k ];
							if( removedNode === sheet ){
								// remove parentObserver, remove observe, rebuild styles
								loadSheets(true);
								break;
							}

						}

					}

				}

			});

			parentObserver.observe( sheet.parentElement , { childList : true});

			_observers.push( parentObserver );

		}
	}



	// reset elements
	// @TODO: Dispose conditions
	_rules = [];
	_conditions = [];

	if ( document && document.styleSheets ) {

		for ( const styleSheet of document.styleSheets ) {
			if ( styleSheet.media.mediaText === 'vr' ) {

				const { rules, conditions } = _importSheet( styleSheet.cssRules);

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

function _applyRules(){
	for ( const rule of _rules ) {

		if( !rule.enabled ) continue;

		const targets = querySelectorAll( rule.query );

		for ( const target of targets ) {
			target.set( rule.styles );
		}
	}
}

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

			const newRule = new XSSRule( rule.selectorText, rule.style );
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
