import { MeshUIBaseElement } from 'three-mesh-ui';
import TokenList from 'three-mesh-ui/examples/hyperthreemesh/core/utils/TokenList';
import NamedMap from 'three-mesh-ui/examples/hyperthreemesh/core/utils/NamedMap';
import CSSQuerySegment from 'three-mesh-ui/examples/hyperthreemesh/core/utils/css/CSSQuerySegment';
import * as HyperThreeMesh from 'three-mesh-ui/examples/hyperthreemesh/HyperThreeMesh';
import StylePropertyWrapper from '../../../../src/elements/html/properties/StylePropertyWrapper';
import StyleComputedPropertyWrapper from '../../../../src/elements/html/properties/StyleComputedPropertyWrapper';

/**
 * @extends {MeshUIBaseElement}
 */
export default class HTMBaseElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {Object.<string,Class>} [properties=null]
	 * @param {Object.<string,any>} [values=null]
	 */
	constructor( properties, values) {

		const tagName = values.tagName;
		delete values.tagName;

		if( !tagName ) throw new Error( "HyperThreeMesh::Element - Requires a tagName property.")

		super( properties, values );

		// @TODO: Rebuild css properties

		// HTML Interface ----------------------------------------------------------

		/**
		 *
		 * @type {string|null}
		 * @protected
		 */
		this._elementID = null;

		/**
		 *
		 * @type {TokenList}
		 * @private
		 */
		this._classList = new TokenList( HyperThreeMesh.requestUpdate );

		/**
		 *
		 * @type {TokenList}
		 * @private
		 */
		this._pseudoClassList = new TokenList( HyperThreeMesh.requestUpdate );

		/**
		 *
		 * @type {NamedMap}
		 * @private
		 */
		this._attributes = new NamedMap( HyperThreeMesh.requestUpdate );

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._tagName = tagName;

		this._styles = new StylePropertyWrapper( this );
		this._computedStyles = new StyleComputedPropertyWrapper( this );

	}

	/**
	 *
	 * @param v
	 */
	set elementID(v) {
		this._elementID = v;

		//@todo : rebuild styles
		HyperThreeMesh.requestUpdate();
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
	 * @returns {StylePropertyWrapper}
	 */
	get style() { return this._styles }

	/**
	 *
	 * @returns {StyleComputedPropertyWrapper}
	 */
	get computedStyle() { return this._computedStyles; }
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
	 * @returns {boolean}
	 */
	hasAttribute( attributeName ) {

		return this._attributes.has( attributeName );

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
	 * @override
	 * @param state
	 */
	activatePseudoState ( state ) {

		if ( state === 'hover' || state === 'disabled' || !this.hasAttribute( 'disabled' ) ) {
			this._pseudoClassList.add( state );
		}

	}

	/**
	 * @override
	 * @param state
	 */
	deactivatePseudoState ( state ) {
		this._pseudoClassList.remove( state );
	}

	togglePseudoState ( state ) {
		this._pseudoClassList.toggle( state );
	}

	hasPseudoState( state ) {
		return this._pseudoClassList.contains( state );
	}

	/**
	 * Query select in children only
	 * @param {String} query
	 * @returns {Array<MeshUIBaseElement>}
	 */
	querySelectorAll( query ) {

		return HyperThreeMesh.querySelectorAll( query, this );

	}

	clear() {

		this._styles.dispose();
		this._styles = null;

		this._computedStyles.dispose();
		this._computedStyles = null;

		return super.clear();

	}



}
