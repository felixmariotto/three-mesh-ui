import Element from './Element';
import StylePropertyWrapper from './properties/StylePropertyWrapper';
import TokenList from '../../utils/dom/TokenList';
import NamedMap from '../../utils/dom/NamedMap';
import CSSQuerySegment from '../../utils/dom/css/CSSQuerySegment';
import MeshUIBaseElement from '../../core/elements/MeshUIBaseElement';



export default class HTMLElementVR extends MeshUIBaseElement {

	constructor() {

		super();

		/**
		 *
		 * @type {string|null}
		 * @private
		 */
		this._elementID = null;

		/**
		 *
		 * @type {TokenList}
		 * @private
		 */
		this._classList = new TokenList( () => {} );

		/**
		 *
		 * @type {TokenList}
		 * @private
		 */
		this._pseudoClassList = new TokenList( () => {} );

		/**
		 *
		 * @type {NamedMap}
		 * @private
		 */
		this._attributes = new NamedMap( () => {} );

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._tagName = '';

		/**
		 *
		 * @type {StylePropertyWrapper}
		 * @private
		 */
		this._styles = new StylePropertyWrapper( this );

	}


	/**
	 *
	 * @return {StylePropertyWrapper}
	 */
	get style() { return this._styles; }

	/**
	 *
	 * @return {number}
	 */
	get offsetWidth() { return this._bounds._offsetWidth; }

	/**
	 *
	 * @return {number}
	 */
	get offsetHeight () { return this._bounds._offsetHeight; }

	/**
	 *
	 * @return {number}
	 */
	get innerWidth () { return this._bounds._innerWidth; }

	/**
	 *
	 * @return {number}
	 */
	get innerHeight () { return this._bounds._innerHeight; }

	/**
	 *
	 * @return {number}
	 */
	get centerX() { return this._bounds._centerX; }

	/**
	 *
	 * @return {number}
	 */
	get centerY () { return this._bounds._centerY; }

	/**
	 *
	 * @param {string} v
	 */
	set textContent ( v ) {

		this._textContent.value = v;
		this._needsUpdate = true;

	}

	/**
	 *
	 * @return {string}
	 */
	get textContent () {

		return this._textContent.value + " " +  this._children.childrenUIs.map( child => child.textContent ).join( " " );

	}

	/**
	 *
	 * @return {Lines}
	 */
	get lines() {

		return this._inlineManager.value;

	}

	/**
	 *
	 * @param v
	 */
	set elementID(v) {
		this._elementID = v;
		//@TODO : Should rebuild computed styles
	}

	/**
	 *
	 * @returns {string}
	 */
	get elementID() { return this._elementID; }

	/**
	 *
	 * @returns {string}
	 */
	get tagName() { return this._tagName; }

	/**
	 *
	 * @returns {NamedMap}
	 */
	get attributes() { return this._attributes; }

	/**
	 *
	 * @param {string} attributeName
	 * @param {string|null} [value=null]
	 */
	setAttribute( attributeName, value= null ) {

		this._attributes.set( attributeName, value );

	}

	/**
	 *
	 * @param {string} attributeName
	 * @returns {string}
	 */
	getAttribute( attributeName ) {

		return this._attributes.get( attributeName );

	}

	/**
	 *
	 * @param {string} attributeName
	 */
	removeAttribute( attributeName ) {

		this._attributes.remove( attributeName );

	}
	/**
	 *
	 * @returns {TokenList}
	 */
	get classList() { return this._classList; }

	/**
	 *
	 * @returns {TokenList}
	 */
	get pseudoClassList() { return this._pseudoClassList; }

	/**
	 * ie: `div#id[type="menu"]:disabled`
	 * @returns {string}
	 */
	copyAttributes() {

		let output = this._tagName;

		if ( this._elementID ) {

			output += `#${this._elementID}`;

		}

		output += this._classList.toString( '.' );
		output += this._attributes.toString();
		output += this._pseudoClassList.toString( ':' );

		return output;

	}

	/**
	 *	ie : `div#id[type="menu"]:disabled`
	 * @param {CSSQuerySegment|string} querySegment
	 */
	pasteAttributes( querySegment ) {

		// Be sure to work with a querySegment
		if ( !( querySegment instanceof CSSQuerySegment ) ) {

			querySegment = new CSSQuerySegment( querySegment );

		}

		// reset existing attributes
		this._elementID = null;
		this._classList.clear();
		this._pseudoClassList.clear();
		this._attributes.clear();

		// loop through each conditions of the query segment
		for ( let i = 0; i < querySegment.conditions.length; i++ ) {

			const condition = querySegment.conditions[ i ];

			switch ( condition.type ) {

				case 'tag':
					if ( this._tagName === '' ) {
						this._tagName = condition.value;
					}
					continue;

				case 'id':
					this._elementID = condition.value;
					continue;

				case 'class':
					for ( let j = 0; j < condition.value.length; j++ ) {
						this._classList.add( condition.value[ j ] );
					}
					continue;

				case 'pseudoClass':
					for ( let j = 0; j < condition.value.length; j++ ) {
						this._pseudoClassList.add( condition.value[ j ] );
					}
					continue;

				case 'attribute':
					for ( let j = 0; j < condition.value.length; j++ ) {
						const attrComponent = condition.value[ j ];
						this._attributes.set( attrComponent.name, attrComponent.value );
					}

			}

		}

		// @TODO : Should rebuild computed styles

		return this;

	}


	/**
	 * Query select in children only
	 * @param {String} query
	 * @returns {Array<MeshUIComponent>}
	 */
	querySelectorAll( query ) {

		return querySelectorAll( query, this );

	}

	/**
	 *
	 * @return {MeshUIBaseElement}
	 */
	clear() {

		this._styles.dispose();
		this._styles = null;

		this._pseudoClassList.dispose();
		this._pseudoClassList = null;

		this._classList.dispose();
		this._classList = null;

		this._attributes.dispose();
		this._attributes = null;

		return super.clear();
	}

}


