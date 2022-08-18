//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Vector4 } from 'three';
/* eslint-enable no-unused-vars */

/**
 * Wrapper of properties to fit html naming and multiple inputs : inline & computed(css)
 */
export default class StylePropertyWrapper {

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	constructor( vrElement ) {

		/**
		 *
		 * @type {HTMLElementVR}
		 * @private
		 */
		this._vrElement = vrElement;

	}

	/***********************************************************************************************************************
	 * INLINE GETTERS - SETTERS
	 **********************************************************************************************************************/

	/** Box Properties ---------------------------------------------------------*/

	/**
	 *
	 * @param {"border-box"|"content-box"} value
	 */
	set boxSizing( value ) {

		this._vrElement._boxSizing.inline = value;

	}

	/**
	 *
	 * @return {"border-box"|"content-box"}
	 */
	get boxSizing() { return this._vrElement._boxSizing._inline; }


	/**
	 *
	 * @param {number} v
	 */
	set width ( v ) {

		this._vrElement._width.inline = v;

	}

	/**
	 *
	 * @return {*}
	 */
	get width () { return this._vrElement._width._inline; }

	/**
	 *
	 * @param {number} v
	 */
	set height ( v ) {

		this._vrElement._height.inline = v;

	}

	/**
	 *
	 * @return {*}
	 */
	get height () { return this._vrElement._height._inline; }


	/**
	 *
	 * @param {Vector4|Array.<number>|number|string} v
	 */
	set padding( v ) {

		this._vrElement._padding.inline = v;

	}


	/**
	 *
	 * @return {Vector4}
	 */
	get padding () { return this._vrElement._padding._inline; }


	/**
	 *
	 * @param {number} v
	 */
	set paddingTop ( v ) {

		this._vrElement._padding.top = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingTop () { return this._vrElement._padding.top; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingRight (v) {

		this._vrElement._padding.right = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingRight () { return this._vrElement._padding.right; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingBottom (v) {

		this._vrElement._padding.bottom = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingBottom () { return this._vrElement._padding.bottom; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingLeft ( v ) {

		this._vrElement._padding.left = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingLeft () { return this._vrElement._padding.left; }

	/**
	 *
	 * @param {Vector4|Array.<number>|number|string} v
	 */
	set margin( v ) {

		this._vrElement._margin.inline = v;

	}


	/**
	 *
	 * @return {Vector4}
	 */
	get margin () {
		return this._vrElement._margin._inline;
	}


	/**
	 *
	 * @param {number} v
	 */
	set marginTop ( v ) {

		this._vrElement._margin.top = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginTop () { return this._vrElement._margin.top; }

	/**
	 *
	 * @param {number} v
	 */
	set marginRight (v) {

		this._vrElement._margin.right = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginRight () { return this._vrElement._margin.right; }

	/**
	 *
	 * @param {number} v
	 */
	set marginBottom (v) {

		this._vrElement._margin.bottom = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginBottom () { return this._vrElement._margin.bottom; }

	/**
	 *
	 * @param {number} v
	 */
	set marginLeft ( v ) {

		this._vrElement._margin.left = v;

	}

	/** Display Properties -----------------------------------------------------*/


	/**
	 *
	 * @param {"flex"|"none"} value
	 */
	set display ( value ) {

		this._vrElement._display.inline = value;

	}

	/**
	 *
	 * @return {"flex"|"none"}
	 */
	get display() { return this._vrElement._display._inline; }


	/**
	 *
	 * @param {"visible"|"hidden"} v
	 */
	set overflow ( v ) {

		this._vrElement._overflow.inline = v;

	}

	/**
	 *
	 * @return {"visible"|"hidden"}
	 */
	get overflow () { return this._vrElement._overflow._inline; }

	/** Position Properties ----------------------------------------------------*/

	/**
	 *
	 * @param {"static"|"absolute"} v
	 */
	set position ( v ) {

		this._vrElement._position.inline = v;

	}

	/**
	 *
	 * @return {"static"|"absolute"}
	 */
	get position () { return this._vrElement._position._inline; }


	/** Flex Properties --------------------------------------------------------*/

	/**
	 *
	 * @param {"column"|"column-reverse"|"row"|"row-reverse"} value
	 */
	set flexDirection( value ) {

		this._vrElement._flexDirection.inline = value;

	}

	/**
	 *
	 * @return {"column"|"column-reverse"|"row"|"row-reverse"}
	 */
	get flexDirection() { return this._vrElement._flexDirection._inline; }

	/**
	 *
	 * @param {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"} value
	 */
	set justifyContent( value ) {

		this._vrElement._justifyContent.inline = value;

	}

	/**
	 *
	 * @return {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"}
	 */
	get justifyContent() { return this._vrElement._justifyContent._inline; }

	/**
	 *
	 * @param {"start"|"center"|"end"|"stretch"} value
	 */
	set alignItems ( value ) {

		this._vrElement._alignItems.inline = value;

	}

	/**
	 *
	 * @return {"start"|"center"|"end"|"stretch"}
	 */
	get alignItems() { return this._vrElement._alignItems._inline; }


	/**
	 *
	 * @param {number} v
	 */
	set order (v) {

		this._vrElement._order.inline = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get order () { return this._vrElement._order._inline; }


	/** Background Properties --------------------------------------------------*/

	/**
	 *
	 * @param {Color|number|string} v
	 */
	set backgroundColor( v ) {

		this._vrElement._backgroundColor.inline = v;

	}

	/**
	 *
	 * @return {Color|number|string}
	 */
	get backgroundColor() { return this._vrElement._backgroundColor._inline; }


	set backgroundOpacity ( v ) {

		this._vrElement._backgroundOpacity.inline = v;

	}

	get backgroundOpacity () { return this._vrElement._backgroundOpacity._inline; }

	/**
	 *
	 * @param {Texture|string} v
	 */
	set backgroundImage ( v ) {

		this._vrElement._backgroundImage.inline = v;

	}

	/**
	 *
	 * @return {Texture|string}
	 */
	get backgroundImage () { return this._vrElement._backgroundImage._inline; }

	/**
	 *
	 * @param {"cover"|"contain"|"stretch"} v
	 */
	set backgroundSize ( v ) {

		this._vrElement._backgroundSize.inline = v;

	}

	/**
	 *
	 * @return {"cover"|"contain"|"stretch"}
	 */
	get backgroundSize() { return this._vrElement._backgroundSize._inline; }


	/** Text Properties --------------------------------------------------------*/

	/**
	 *
	 * @param {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"} v
	 */
	set whiteSpace ( v ) {

		this._vrElement._whiteSpace.inline = v;

	}

	/**
	 *
	 * @return {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"}
	 */
	get whiteSpace () { return this._vrElement._whiteSpace._inline; }





	/**
	 *
	 * @param {Color|number|string} v
	 */
	set color( v ) {

		this._vrElement._color.inline = v;

	}

	/**
	 *
	 * @return {Color|number|string}
	 */
	get color () { return this._vrElement._color._inline; }

	/**
	 *
	 * @param {number} v
	 */
	set opacity ( v ) {

		this._vrElement._opacity.inline = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get opacity () { return this._vrElement._opacity._inline; }




	/**
	 *
	 * @param {"normal"|"italic"} v
	 */
	set fontStyle (v) {

		this._vrElement._fontStyle.inline = v;

	}

	/**
	 *
	 * @return {"normal"|"italic"}
	 */
	get fontStyle () { return this._vrElement._fontStyle._inline; }


	/**
	 *
	 * @param {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}  v
	 */
	set fontWeight ( v ) {

		this._vrElement._fontWeight.inline = v;

	}

	/**
	 *
	 * @return {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}
	 */
	get fontWeight () { return this._vrElement._fontWeight._inline; }

	/**
	 *
	 * @param {"normal"|"none"} v
	 */
	set fontKerning ( v ) {

		this._vrElement._fontKerning.inline = v;

	}

	/**
	 *
	 * @return {"normal"|"none"}
	 */
	get fontKerning () { return this._vrElement._fontKerning._inline; }


	/**
	 *
	 * @param {number} v
	 */
	set letterSpacing (v) {

		this._vrElement._letterSpacing.inline = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get letterSpacing () { return this._vrElement._letterSpacing._inline; }

	/**
	 *
	 * @param {number} v
	 */
	set lineHeight ( v ) {

		this._vrElement._lineHeight.inline = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get lineHeight () { return this._vrElement._lineHeight._inline; }


	/**
	 *
	 * @param {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"} v
	 */
	set textAlign ( v ) {

		this._vrElement._textAlign.inline = v;

	}

	/**
	 *
	 * @return {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"}
	 */
	get textAlign() { return this._vrElement._textAlign._inline; }


	/** Border Properties ----------------------------------------------------------------------------------------------*/

	/**
	 * Set the units of borderRadius
	 * @param {string|"em"|"rem"|"%"} v
	 */
	set borderRadiusUnits( v ) {

		// @TODO:
		this._vrElement._borderRadius.units = v;

	}

	/**
	 * Get the units of borderRadius
	 * @returns {string}
	 */
	get borderRadiusUnits() { /* @TODO:inline units */ return this._vrElement._borderRadius.units; }

	/**
	 *
	 * @param {Vector4|Array.<Number>|Number|string} v
	 */
	set borderRadius( v ) {

		this._vrElement._borderRadius.inline = v;

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get borderRadius() { return this._vrElement._borderRadius._inline; }

	/**
	 * Set the top left radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopLeftRadius( v ) {

		this._vrElement._borderRadius.topLeft = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopLeftRadius() { return this._vrElement._borderRadius.topLeft; }


	/**
	 * Set the top right radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopRightRadius( v ) {

		this._vrElement._borderRadius.topRight = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopRightRadius() { return this._vrElement._borderWidth.topRight; }

	/**
	 * Set the bottom right radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomRightRadius( v ) {

		this._vrElement._borderRadius.bottomRight = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomRightRadius() { return this._vrElement._borderWidth.bottomRight; }

	/**
	 * Set the bottom left radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomLeftRadius( v ) {

		this._vrElement._borderRadius.bottomLeft = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomLeftRadius() { return this._vrElement._borderWidth.bottomLeft; }

	/**
	 * Set the top left and top right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopRadius( v ) {

		this._vrElement._borderRadius.top = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopRadius() { return this._vrElement._borderWidth.top; }

	/**
	 * Set the top right and bottom right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderRightRadius( v ) {

		this._vrElement._borderRadius.right = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderRightRadius() { return this._vrElement._borderRadius.right; }

	/**
	 * Set the top left and bottom left radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderLeftRadius( v ) {

		this._vrElement._borderRadius.left = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderLeftRadius() { return this._vrElement._borderRadius.left; }

	/**
	 * Set the bottom left and bottom right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomRadius( v ) {

		this._vrElement._borderRadius.bottom = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomRadius() { return this._vrElement._borderRadius.bottom; }


	/**
	 * Set the units of borderWidth
	 * @param {string|"em"|"rem"|"%"} v
	 */
	set borderWidthUnits( v ) {

		// @TODO : Inline and Computed units to be implemented
		this._vrElement._borderWidth.units = v;

	}

	/**
	 * Get the units of borderWidth
	 * @returns {string}
	 */
	get borderWidthUnits() { return this._vrElement._borderWidth.units; }

	/**
	 *
	 * @param {Vector4|Array.<Number>|Number|string} v
	 */
	set borderWidth( v ) {

		this._vrElement._borderWidth.inline = v;

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get borderWidth() { return this._vrElement._borderWidth._inline; }

	/**
	 * Set the width of the top side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderTopWidth( v ) {

		this._vrElement._borderWidth.top = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopWidth() { return this._vrElement._borderWidth.top; }

	/**
	 * Set the width of the right side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderRightWidth( v ) {

		this._vrElement._borderWidth.right = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderRightWidth() { return this._vrElement._borderWidth.right; }

	/**
	 * Set the width of the bottom side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderBottomWidth( v ) {

		this._vrElement._borderWidth.bottom = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomWidth() { return this._vrElement._borderWidth.bottom; }

	/**
	 * Set the width of the left side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderLeftWidth( v ) {

		this._vrElement._borderWidth.left = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderLeftWidth() { return this._vrElement._borderWidth.left; }


	/**
	 *
	 * @param {Color|Number|string} v
	 */
	set borderColor( v ) {

		this._vrElement._borderColor.inline = v;

	}

	/**
	 *
	 * @returns {Color}
	 */
	get borderColor() { return this._vrElement._borderColor._inline; }

	/**
	 *
	 * @param v
	 */
	set borderOpacity (v) {

		this._vrElement._borderOpacity.inline = v;

	}

	/**
	 *
	 * @return {*}
	 */
	get borderOpacity () { return this._vrElement._borderOpacity._inline; }



	/**
	 *
	 * @param value
	 */
	set computed( value ) {

		// do update
		this._needsUpdate = true;

	}

	/**
	 *
	 * @return {Object.<string,any>}
	 */
	get computed() {

		const output = {};
		for ( const component of this._components ) {

			output[component.id] = component.output;

		}

		return output;

	}


	dispose () {

		this._vrElement = null;

	}


}
