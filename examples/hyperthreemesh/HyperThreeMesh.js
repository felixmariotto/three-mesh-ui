import CSSQuery from './core/utils/css/CSSQuery';
import CSSRuleVR from './core/utils/css/CSSRuleVR';
import CSSMediaQuery from './core/utils/css/CSSMediaQuery';
import UpdateManager from '../../src/components/core/UpdateManager';
import HTMTextElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMTextElement';
import HTMInlineElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMInlineElement';
import HTMBlockElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMBlockElement';
import KeyboardHTM from 'three-mesh-ui/examples/hyperthreemesh/KeyboardHTM';
import HTMInlineBlockElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMInlineBlockElement';
import HTMButton from 'three-mesh-ui/examples/hyperthreemesh/elements/HTMButton';
import HTMButtonToggle from 'three-mesh-ui/examples/hyperthreemesh/elements/HTMButtonToggle';
import HTMButtonRadio from 'three-mesh-ui/examples/hyperthreemesh/elements/HTMButtonRadio';


/**
 * querySelectorAll is an entrypoint, logic are deviate to internal _querySelectorAll
 * @param {string|CSSQuery} query
 * @param {MeshUIBaseElement|Array.<MeshUIBaseElement>} [context]
 * @return {Array.<MeshUIBaseElement>}
 */
function querySelectorAll( query, context = null ) {

	if( !( query instanceof CSSQuery ) ) {
		query = CSSQuery.build( query );
	}

	// if no lookup context is provided, use any root MeshUIComponent
	if ( !context ) {
		context = UpdateManager.elements;
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
 * @param {MeshUIBaseElement} target
 * @param {CSSQuery} query
 * @param {boolean} [recursive=true] Traverse all children to process query
 * @return {Array.<MeshUIBaseElement>}
 * @private
 */
function _querySelectorAll( target, query, recursive = true ) {

	let results = [];

	// propagate the query selection to any children
	if ( recursive ) {

		for ( let i = 0; i < target._children._uis.length; i++ ) {

			results = results.concat( _querySelectorAll( target._children._uis[ i ], query ) );

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
				for ( let i = 0; i < target._children._uis.length; i++ ) {

					results = results.concat( _querySelectorAll( target._children._uis[ i ], subQuery ) );
				}

			}
			// direct child combinator, only look in direct children, not recursively
			else if ( subQuery[ 0 ].combinator === '>' ) {

				for ( let i = 0; i < target._children._uis.length; i++ ) {

					results = results.concat( _querySelectorAll( target._children._uis[ i ], subQuery, false ) );

				}
			}

			// siblings combinator
			else if ( target._parent._value && ( subQuery[ 0 ].combinator === '~' || subQuery[ 0 ].combinator === '+' ) ) {

				const parentUI = target._parent._value;

				// retrieve the childIndex of the current target
				const currentIndex = parentUI._children._uis.indexOf( target );

				// build the siblings list to check
				let adjacentSiblings;

				// General sibling, next query segments apply on any further children
				if ( subQuery[ 0 ].combinator === '~' ) {
					adjacentSiblings = parentUI._children._uis.slice( currentIndex + 1 );
				} else {
					// adjacent sibling, next query segment apply only to next sibling
					adjacentSiblings = parentUI._children._uis.slice( currentIndex + 1, currentIndex + 2 );
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
let _rules = [];
let _conditions = [];
let _observers = [];
let _media = 'three-mesh-ui';
/**
 * WIP
 * @deprecated until achieved
 * @param media
 * @param listenForChanges
 */
function loadSheets( media = 'three-mesh-ui', listenForChanges = false ) {

	_media = media;

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

		const sheets = document.querySelectorAll(`link[media="${media}"],style[media="${media}"]`);
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
			if ( styleSheet.media.mediaText === media ) {

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
			condition.init( () => { _needsUpdate = true; } );
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

	return element.tagName === 'LINK' || element.tagName === 'STYLE' && element.getAttribute('media') === _media;

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
		loadSheets(_media, true);
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
			// computedStyles = {...computedStyles,...rule.styles};
			computedStyles = {...computedStyles };
			found = true;

		}

	}

	// If at least one rule has matched
	if( found ) {

		console.log( computedStyles )

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

		if( found ) {
			elem.set( computedStyles );
		}
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
	// flexDirection: "contentDirection",
	rx: 'offset',
	offsetDistance: 'offset'
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

/**
 *
 * @param tag
 * @param options
 * @returns {HTMBaseElement}
 */
function createElement( tag, options = {} ){

	if( !options.tagName ) options.tagName = tag;
	switch ( tag.toLowerCase().replace(/\d/g, "") ) {

		case "p":
		case "h":
		case "label":
				return new HTMTextElement(options);

		case "button":
			return new HTMButton(options);

		case "toggle":
			options.tagName = 'button';
			return new HTMButtonToggle(options);

		case "radio":
			options.tagName = 'button';
			return new HTMButtonRadio(options);

		case "div":
		case "li":
		case "footer":
		case "header":
			return new HTMBlockElement(options);

		case "span":
		case "em":
		case "strong":
		case "sup":
		case "sub":
		case "small":
		case "link":
			return new HTMInlineElement(options);

		case "icon":
			return new HTMInlineBlockElement(options);

		case "keyboard":
			return new KeyboardHTM( options );

		default:
			throw new Error("HyperTextMesh::createElement() - The provided tagname is not implemented");

	}

}

let _needsUpdate = true;
function requestUpdate() {
	_needsUpdate = true;
}

function update() {
	if( _needsUpdate ) {
		_applyRules();
		_needsUpdate = false;
	}
}

export { loadSheets };

export { createElement, requestUpdate, update, querySelectorAll };
