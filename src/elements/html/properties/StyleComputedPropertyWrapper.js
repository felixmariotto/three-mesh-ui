//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Color, Vector4 } from 'three';
import MeshUIBaseElement from './../../../core/elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

/**
 * Wrapper of properties to fit html naming and multiple inputs : computed & computed(css)
 */
export default class StyleComputedPropertyWrapper {

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	constructor( element ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 * @private
		 */
		this._element = element;

	}

	set( values ) {

		for ( const property in values ) {
			this[property] = values[property];
		}

	}

	/***********************************************************************************************************************
	 * computed GETTERS - SETTERS
	 **********************************************************************************************************************/

	/** Box Properties ---------------------------------------------------------*/

	/**
	 *
	 * @param {"border-box"|"content-box"} value
	 */
	set boxSizing( value ) {

		this._element._boxSizing.computed = value;

	}

	/**
	 *
	 * @return {"border-box"|"content-box"}
	 */
	get boxSizing() { return this._element._boxSizing._computed; }


	/**
	 *
	 * @param {number} v
	 */
	set width ( v ) {

		this._element._width.computed = v;

	}

	/**
	 *
	 * @return {*}
	 */
	get width () { return this._element._width._computed; }

	/**
	 *
	 * @param {number} v
	 */
	set height ( v ) {

		this._element._height.computed = v;

	}

	/**
	 *
	 * @return {*}
	 */
	get height () { return this._element._height._computed; }


	/**
	 *
	 * @param {Vector4|Array.<number>|number|string} v
	 */
	set padding( v ) {

		this._element._padding.computed = v;

	}


	/**
	 *
	 * @return {Vector4}
	 */
	get padding () { return this._element._padding._computed; }


	/**
	 *
	 * @param {number} v
	 */
	set paddingTop ( v ) {

		this._element._padding.computedTop = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingTop () { return this._element._padding.computedTop; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingRight (v) {

		this._element._padding.computedRight = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingRight () { return this._element._padding.computedRight; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingBottom (v) {

		this._element._padding.computedBottom = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingBottom () { return this._element._padding.computedBottom; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingLeft ( v ) {

		this._element._padding.computedLeft = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingLeft () { return this._element._padding.computedLeft; }

	/**
	 *
	 * @param {Vector4|Array.<number>|number|string} v
	 */
	set margin( v ) {

		this._element._margin.computed = v;

	}


	/**
	 *
	 * @return {Vector4}
	 */
	get margin () {
		return this._element._margin._computed;
	}


	/**
	 *
	 * @param {number} v
	 */
	set marginTop ( v ) {

		this._element._margin.computedTop = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginTop () { return this._element._margin.computedTop; }

	/**
	 *
	 * @param {number} v
	 */
	set marginRight (v) {

		this._element._margin.computedRight = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginRight () { return this._element._margin.computedRight; }

	/**
	 *
	 * @param {number} v
	 */
	set marginBottom (v) {

		this._element._margin.computedBottom = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginBottom () { return this._element._margin.computedBottom; }

	/**
	 *
	 * @param {number} v
	 */
	set marginLeft ( v ) {

		this._element._margin.computedLeft = v;

	}

	/** Display Properties -----------------------------------------------------*/


	/**
	 *
	 * @param {"flex"|"none"} value
	 */
	set display ( value ) {

		this._element._display.computed = value;

	}

	/**
	 *
	 * @return {"flex"|"none"}
	 */
	get display() { return this._element._display._computed; }


	/**
	 *
	 * @param {"visible"|"hidden"} v
	 */
	set overflow ( v ) {

		this._element._overflow.computed = v;

	}

	/**
	 *
	 * @return {"visible"|"hidden"}
	 */
	get overflow () { return this._element._overflow._computed; }

	/** Position Properties ----------------------------------------------------*/

	/**
	 *
	 * @param {"static"|"absolute"} v
	 */
	set position ( v ) {

		this._element._position.computed = v;

	}

	/**
	 *
	 * @return {"static"|"absolute"}
	 */
	get position () { return this._element._position._computed; }


	/** Flex Properties --------------------------------------------------------*/

	/**
	 *
	 * @param {"column"|"column-reverse"|"row"|"row-reverse"} value
	 */
	set flexDirection( value ) {

		this._element._flexDirection.computed = value;

	}

	/**
	 *
	 * @return {"column"|"column-reverse"|"row"|"row-reverse"}
	 */
	get flexDirection() { return this._element._flexDirection._computed; }

	/**
	 *
	 * @param {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"} value
	 */
	set justifyContent( value ) {

		this._element._justifyContent.computed = value;

	}

	/**
	 *
	 * @return {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"}
	 */
	get justifyContent() { return this._element._justifyContent._computed; }

	/**
	 *
	 * @param {"start"|"center"|"end"|"stretch"} value
	 */
	set alignItems ( value ) {

		this._element._alignItems.computed = value;

	}

	/**
	 *
	 * @return {"start"|"center"|"end"|"stretch"}
	 */
	get alignItems() { return this._element._alignItems._computed; }


	/**
	 *
	 * @param {number} v
	 */
	set order (v) {

		this._element._order.computed = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get order () { return this._element._order._computed; }


	/** Background Properties --------------------------------------------------*/

	/**
	 *
	 * @param {Color|number|string} v
	 */
	set backgroundColor( v ) {

		this._element._backgroundColor.computed = v;

	}

	/**
	 *
	 * @return {Color|number|string}
	 */
	get backgroundColor() { return this._element._backgroundColor._computed; }


	set backgroundOpacity ( v ) {

		this._element._backgroundOpacity.computed = v;

	}

	get backgroundOpacity () { return this._element._backgroundOpacity._computed; }

	/**
	 *
	 * @param {Texture|string} v
	 */
	set backgroundImage ( v ) {

		this._element._backgroundImage.computed = v;

	}

	/**
	 *
	 * @return {Texture|string}
	 */
	get backgroundImage () { return this._element._backgroundImage._computed; }

	/**
	 *
	 * @param {"cover"|"contain"|"stretch"} v
	 */
	set backgroundSize ( v ) {

		this._element._backgroundSize.computed = v;

	}

	/**
	 *
	 * @return {"cover"|"contain"|"stretch"}
	 */
	get backgroundSize() { return this._element._backgroundSize._computed; }


	/** Text Properties --------------------------------------------------------*/

	/**
	 *
	 * @param {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"} v
	 */
	set whiteSpace ( v ) {

		this._element._whiteSpace.computed = v;

	}

	/**
	 *
	 * @return {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"}
	 */
	get whiteSpace () { return this._element._whiteSpace._computed; }





	/**
	 *
	 * @param {Color|number|string} v
	 */
	set color( v ) {

		this._element._color.computed = v;

	}

	/**
	 *
	 * @return {Color|number|string}
	 */
	get color () { return this._element._color._computed; }

	/**
	 *
	 * @param {number} v
	 */
	set opacity ( v ) {

		this._element._fontOpacity.computed = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get opacity () { return this._element._fontOpacity._computed; }




	/**
	 *
	 * @param {"normal"|"italic"} v
	 */
	set fontStyle (v) {

		this._element._fontStyle.computed = v;

	}

	/**
	 *
	 * @return {"normal"|"italic"}
	 */
	get fontStyle () { return this._element._fontStyle._computed; }


	/**
	 *
	 * @param {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}  v
	 */
	set fontWeight ( v ) {

		this._element._fontWeight.computed = v;

	}

	/**
	 *
	 * @return {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}
	 */
	get fontWeight () { return this._element._fontWeight._computed; }

	/**
	 *
	 * @param {"normal"|"none"} v
	 */
	set fontKerning ( v ) {

		this._element._fontKerning.computed = v;

	}

	/**
	 *
	 * @return {"normal"|"none"}
	 */
	get fontKerning () { return this._element._fontKerning._computed; }


	/**
	 *
	 * @param {number} v
	 */
	set letterSpacing (v) {

		this._element._letterSpacing.computed = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get letterSpacing () { return this._element._letterSpacing._computed; }

	/**
	 *
	 * @param {number} v
	 */
	set lineHeight ( v ) {

		this._element._lineHeight.computed = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get lineHeight () { return this._element._lineHeight._computed; }


	/**
	 *
	 * @param {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"} v
	 */
	set textAlign ( v ) {

		this._element._textAlign.computed = v;

	}

	/**
	 *
	 * @return {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"}
	 */
	get textAlign() { return this._element._textAlign._computed; }


	/** Border Properties ----------------------------------------------------------------------------------------------*/

	/**
	 * Set the units of borderRadius
	 * @param {string|"rem"} v
	 */
	set borderRadiusUnits( v ) {

		// @TODO:
		this._element._borderRadius.units = v;

	}

	/**
	 * Get the units of borderRadius
	 * @returns {string}
	 */
	get borderRadiusUnits() { /* @TODO:computed units */ return this._element._borderRadius.units; }

	/**
	 *
	 * @param {Vector4|Array.<Number>|Number|string} v
	 */
	set borderRadius( v ) {

		this._element._borderRadius.computed = v;

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get borderRadius() { return this._element._borderRadius._computed; }

	/**
	 * Set the top left radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopLeftRadius( v ) {

		this._element._borderRadius.computedTopLeft = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopLeftRadius() { return this._element._borderRadius.computedTopLeft; }


	/**
	 * Set the top right radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopRightRadius( v ) {

		this._element._borderRadius.computedTopRight = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopRightRadius() { return this._element._borderWidth.computedTopRight; }

	/**
	 * Set the bottom right radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomRightRadius( v ) {

		this._element._borderRadius.computedBottomRight = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomRightRadius() { return this._element._borderWidth.computedBottomRight; }

	/**
	 * Set the bottom left radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomLeftRadius( v ) {

		this._element._borderRadius.computedBottomLeft = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomLeftRadius() { return this._element._borderWidth.computedBottomLeft; }

	/**
	 * Set the top left and top right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopRadius( v ) {

		this._element._borderRadius.computedTop = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopRadius() { return this._element._borderWidth.computedTop; }

	/**
	 * Set the top right and bottom right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderRightRadius( v ) {

		this._element._borderRadius.computedRight = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderRightRadius() { return this._element._borderRadius.computedRight; }

	/**
	 * Set the top left and bottom left radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderLeftRadius( v ) {

		this._element._borderRadius.computedLeft = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderLeftRadius() { return this._element._borderRadius.computedLeft; }

	/**
	 * Set the bottom left and bottom right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomRadius( v ) {

		this._element._borderRadius.computedBottom = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomRadius() { return this._element._borderRadius.computedBottom; }


	/**
	 * Set the units of borderWidth
	 * @param {string|"rem"} v
	 */
	set borderWidthUnits( v ) {

		// @TODO : computed and Computed units to be implemented
		this._element._borderWidth.units = v;

	}

	/**
	 * Get the units of borderWidth
	 * @returns {string}
	 */
	get borderWidthUnits() { return this._element._borderWidth.units; }

	/**
	 *
	 * @param {Vector4|Array.<Number>|Number|string} v
	 */
	set borderWidth( v ) {

		this._element._borderWidth.computed = v;

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get borderWidth() { return this._element._borderWidth._computed; }

	/**
	 * Set the width of the top side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderTopWidth( v ) {

		this._element._borderWidth.computedTop = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopWidth() { return this._element._borderWidth.computedTop; }

	/**
	 * Set the width of the right side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderRightWidth( v ) {

		this._element._borderWidth.computedRight = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderRightWidth() { return this._element._borderWidth.computedRight; }

	/**
	 * Set the width of the bottom side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderBottomWidth( v ) {

		this._element._borderWidth.computedBottom = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomWidth() { return this._element._borderWidth.computedBottom; }

	/**
	 * Set the width of the left side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderLeftWidth( v ) {

		this._element._borderWidth.computedLeft = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderLeftWidth() { return this._element._borderWidth.computedLeft; }


	/**
	 *
	 * @param {Color|Number|string} v
	 */
	set borderColor( v ) {

		this._element._borderColor.computed = v;

	}

	/**
	 *
	 * @returns {Color}
	 */
	get borderColor() { return this._element._borderColor._computed; }

	/**
	 *
	 * @param v
	 */
	set borderOpacity (v) {

		this._element._borderOpacity.computed = v;

	}

	/**
	 *
	 * @return {*}
	 */
	get borderOpacity () { return this._element._borderOpacity._computed; }



	/**
	 *
	 * @param value
	 */
	set computed( value ) {

		// do update
		// this._needsUpdate = true;

	}

	/**
	 *
	 * @return {Object.<string,any>}
	 */
	get computed() {

		const output = {};
		for ( const component of this._element._components ) {

			output[component.id] = component.output;

		}

		return output;

	}


	dispose () {

		this._element = null;

	}


}
