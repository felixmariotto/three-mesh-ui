import CSSQuery from './CSSQuery';
import CSSSpecificity from './CSSSpecificity';
import { Color } from 'three';

export default class CSSRuleVR {

	/**
	 *
	 * @param {string} queryString
	 * @param {Object.<string, string>} styles
	 * @param {Object.<string, string>} [lookupTable=null]
	 */
	constructor( queryString, styles, lookupTable = null ) {

		/**
		 *
		 * @type {CSSQuery}
		 * @private
		 */
		this._query = CSSQuery.build( queryString );

		/**
		 *
		 * @type {number}
		 * @private
		 */
		this._specificity = CSSSpecificity( this._query );

		/**
		 *
		 * @type {number}
		 * @private
		 */
		this._order = 0;

		this._styles = {};

		// Build styles
		// @TODO: Could use a lookup table for property and/or value conversion
		for ( let k = 0; k < styles.length; k++ ) {
			const styleProperty = styles[ k ];

			let value = styles[styleProperty];

			if( value.match(/rem|px|em/g) ) {

				value = parseFloat( value.replace(/rem|px|em/g, '') );
			}

			if( styleProperty.indexOf('color') !== -1 ) {

				// if the value comes with packed alpha
				if( value.indexOf('rgba') === 0 ) {

					// extract rgba components
					/* eslint-disable no-useless-escape */
					const colorComponents = value.match(/([\d\.]+)/g);
					/* eslint-enable no-useless-escape */

					// To apply alpha too
					if( colorComponents.length === 4 ) {

						let alphaProperty = styleProperty.replace('color', 'opacity');
						if( alphaProperty === 'opacity' ) {
							alphaProperty = 'fontOpacity';
						}

						// If it is not previously defined
						if( !styles[alphaProperty] || styles[alphaProperty] === "" ){
							this._styles[_camelize(alphaProperty)] = parseFloat( colorComponents[3] );
						}

					}

					value = new Color( `rgb(${colorComponents[0]},${colorComponents[1]},${colorComponents[2]})` );

				} else {

					value = new Color( value );

				}

			}

			// try to update the property according to lookup table
			let property = _camelize(styleProperty);
			if( lookupTable && lookupTable[property] ) {

				property = lookupTable[property];

			}

			this._styles[property] = value;

		}

		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._enabled = true;

	}

	/**
	 *
	 * @returns {boolean}
	 */
	get enabled() { return this._enabled; }

	/**
	 *
	 * @param v
	 */
	set enabled( v ) {
		this._enabled = v;
	}

	/**
	 *
	 * @returns {CSSQuery}
	 */
	get query(){ return this._query; }

	/**
	 *
	 * @returns {number}
	 */
	get specificity() { return this._specificity; }

	/**
	 *
	 * @returns {number}
	 */
	get order() { return this._order; }

	/**
	 *
	 * @param {number} v
	 */
	set order( v ) {

		this._order = v;

	}

	/**
	 *
	 * @returns {Object.<string,any>}
	 */
	get styles() { return this._styles; }

}

/**
 *
 * @param {string} s
 * @returns {string}
 * @private
 */
function _camelize( s ) {
	return s.replace( /-./g, x => x[ 1 ].toUpperCase() );
}
