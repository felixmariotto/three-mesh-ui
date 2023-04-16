//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Color, Vector4 } from 'three';
import MeshUIBaseElement from '../../../core/elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */


/**
 * Wrapper of properties to fit html naming and multiple inputs : inline & computed(css)
 */
export default class StylePropertyWrapper {

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

	/***********************************************************************************************************************
	 * INLINE GETTERS - SETTERS
	 **********************************************************************************************************************/

	/** Box Properties ---------------------------------------------------------*/

	/**
	 *
	 * @param {"border-box"|"content-box"} value
	 */
	set boxSizing( value ) {

		this._element._boxSizing.inline = value;

	}

	/**
	 *
	 * @return {"border-box"|"content-box"}
	 */
	get boxSizing() { return this._element._boxSizing._inline; }


	/**
	 *
	 * @param {number} v
	 */
	set width ( v ) {

		this._element._width.inline = v;

	}

	/**
	 *
	 * @return {*}
	 */
	get width () { return this._element._width._inline; }

	/**
	 *
	 * @param {number} v
	 */
	set height ( v ) {

		this._element._height.inline = v;

	}

	/**
	 *
	 * @return {*}
	 */
	get height () { return this._element._height._inline; }


	/**
	 *
	 * @param {Vector4|Array.<number>|number|string} v
	 */
	set padding( v ) {

		this._element._padding.inline = v;

	}


	/**
	 *
	 * @return {Vector4}
	 */
	get padding () { return this._element._padding._inline; }


	/**
	 *
	 * @param {number} v
	 */
	set paddingTop ( v ) {

		this._element._padding.top = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingTop () { return this._element._padding.top; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingRight (v) {

		this._element._padding.right = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingRight () { return this._element._padding.right; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingBottom (v) {

		this._element._padding.bottom = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingBottom () { return this._element._padding.bottom; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingLeft ( v ) {

		this._element._padding.left = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingLeft () { return this._element._padding.left; }

	/**
	 *
	 * @param {Vector4|Array.<number>|number|string} v
	 */
	set margin( v ) {

		this._element._margin.inline = v;

	}


	/**
	 *
	 * @return {Vector4}
	 */
	get margin () {
		return this._element._margin._inline;
	}


	/**
	 *
	 * @param {number} v
	 */
	set marginTop ( v ) {

		this._element._margin.top = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginTop () { return this._element._margin.top; }

	/**
	 *
	 * @param {number} v
	 */
	set marginRight (v) {

		this._element._margin.right = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginRight () { return this._element._margin.right; }

	/**
	 *
	 * @param {number} v
	 */
	set marginBottom (v) {

		this._element._margin.bottom = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginBottom () { return this._element._margin.bottom; }

	/**
	 *
	 * @param {number} v
	 */
	set marginLeft ( v ) {

		this._element._margin.left = v;

	}

	/** Display Properties -----------------------------------------------------*/


	/**
	 *
	 * @param {"flex"|"none"} value
	 */
	set display ( value ) {

		this._element._display.inline = value;

	}

	/**
	 *
	 * @return {"flex"|"none"}
	 */
	get display() { return this._element._display._inline; }


	/**
	 *
	 * @param {"visible"|"hidden"} v
	 */
	set overflow ( v ) {

		this._element._overflow.inline = v;

	}

	/**
	 *
	 * @return {"visible"|"hidden"}
	 */
	get overflow () { return this._element._overflow._inline; }

	/** Position Properties ----------------------------------------------------*/

	/**
	 *
	 * @param {"static"|"absolute"} v
	 */
	set position ( v ) {

		this._element._position.inline = v;

	}

	/**
	 *
	 * @return {"static"|"absolute"}
	 */
	get position () { return this._element._position._inline; }


	/** Flex Properties --------------------------------------------------------*/

	/**
	 *
	 * @param {"column"|"column-reverse"|"row"|"row-reverse"} value
	 */
	set flexDirection( value ) {

		this._element._flexDirection.inline = value;

	}

	/**
	 *
	 * @return {"column"|"column-reverse"|"row"|"row-reverse"}
	 */
	get flexDirection() { return this._element._flexDirection._inline; }

	/**
	 *
	 * @param {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"} value
	 */
	set justifyContent( value ) {

		this._element._justifyContent.inline = value;

	}

	/**
	 *
	 * @return {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"}
	 */
	get justifyContent() { return this._element._justifyContent._inline; }

	/**
	 *
	 * @param {"start"|"center"|"end"|"stretch"} value
	 */
	set alignItems ( value ) {

		this._element._alignItems.inline = value;

	}

	/**
	 *
	 * @return {"start"|"center"|"end"|"stretch"}
	 */
	get alignItems() { return this._element._alignItems._inline; }


	/**
	 *
	 * @param {number} v
	 */
	set order (v) {

		this._element._order.inline = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get order () { return this._element._order._inline; }


	/** Background Properties --------------------------------------------------*/

	/**
	 *
	 * @param {Color|number|string} v
	 */
	set backgroundColor( v ) {

		this._element._backgroundColor.inline = v;

	}

	/**
	 *
	 * @return {Color|number|string}
	 */
	get backgroundColor() { return this._element._backgroundColor._inline; }


	set backgroundOpacity ( v ) {

		this._element._backgroundOpacity.inline = v;

	}

	get backgroundOpacity () { return this._element._backgroundOpacity._inline; }

	/**
	 *
	 * @param {Texture|string} v
	 */
	set backgroundImage ( v ) {

		this._element._backgroundImage.inline = v;

	}

	/**
	 *
	 * @return {Texture|string}
	 */
	get backgroundImage () { return this._element._backgroundImage._inline; }

	/**
	 *
	 * @param {"cover"|"contain"|"stretch"} v
	 */
	set backgroundSize ( v ) {

		this._element._backgroundSize.inline = v;

	}

	/**
	 *
	 * @return {"cover"|"contain"|"stretch"}
	 */
	get backgroundSize() { return this._element._backgroundSize._inline; }


	/** Text Properties --------------------------------------------------------*/

	/**
	 *
	 * @param {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"} v
	 */
	set whiteSpace ( v ) {

		this._element._whiteSpace.inline = v;

	}

	/**
	 *
	 * @return {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"}
	 */
	get whiteSpace () { return this._element._whiteSpace._inline; }





	/**
	 *
	 * @param {Color|number|string} v
	 */
	set color( v ) {

		this._element._color.inline = v;

	}

	/**
	 *
	 * @return {Color|number|string}
	 */
	get color () { return this._element._color._inline; }

	/**
	 *
	 * @param {number} v
	 */
	set opacity ( v ) {

		this._element._fontOpacity.inline = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get opacity () { return this._element._fontOpacity._inline; }




	/**
	 *
	 * @param {"normal"|"italic"} v
	 */
	set fontStyle (v) {

		this._element._fontStyle.inline = v;

	}

	/**
	 *
	 * @return {"normal"|"italic"}
	 */
	get fontStyle () { return this._element._fontStyle._inline; }


	/**
	 *
	 * @param {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}  v
	 */
	set fontWeight ( v ) {

		this._element._fontWeight.inline = v;

	}

	/**
	 *
	 * @return {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}
	 */
	get fontWeight () { return this._element._fontWeight._inline; }

	/**
	 *
	 * @param {"normal"|"none"} v
	 */
	set fontKerning ( v ) {

		this._element._fontKerning.inline = v;

	}

	/**
	 *
	 * @return {"normal"|"none"}
	 */
	get fontKerning () { return this._element._fontKerning._inline; }


	/**
	 *
	 * @param {number} v
	 */
	set letterSpacing (v) {

		this._element._letterSpacing.inline = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get letterSpacing () { return this._element._letterSpacing._inline; }

	/**
	 *
	 * @param {number} v
	 */
	set lineHeight ( v ) {

		this._element._lineHeight.inline = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get lineHeight () { return this._element._lineHeight._inline; }


	/**
	 *
	 * @param {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"} v
	 */
	set textAlign ( v ) {

		this._element._textAlign.inline = v;

	}

	/**
	 *
	 * @return {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"}
	 */
	get textAlign() { return this._element._textAlign._inline; }


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
	get borderRadiusUnits() { /* @TODO:inline units */ return this._element._borderRadius.units; }

	/**
	 *
	 * @param {Vector4|Array.<Number>|Number|string} v
	 */
	set borderRadius( v ) {

		this._element._borderRadius.inline = v;

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get borderRadius() { return this._element._borderRadius._inline; }

	/**
	 * Set the top left radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopLeftRadius( v ) {

		this._element._borderRadius.topLeft = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopLeftRadius() { return this._element._borderRadius.topLeft; }


	/**
	 * Set the top right radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopRightRadius( v ) {

		this._element._borderRadius.topRight = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopRightRadius() { return this._element._borderWidth.topRight; }

	/**
	 * Set the bottom right radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomRightRadius( v ) {

		this._element._borderRadius.bottomRight = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomRightRadius() { return this._element._borderWidth.bottomRight; }

	/**
	 * Set the bottom left radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomLeftRadius( v ) {

		this._element._borderRadius.bottomLeft = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomLeftRadius() { return this._element._borderWidth.bottomLeft; }

	/**
	 * Set the top left and top right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopRadius( v ) {

		this._element._borderRadius.top = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopRadius() { return this._element._borderWidth.top; }

	/**
	 * Set the top right and bottom right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderRightRadius( v ) {

		this._element._borderRadius.right = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderRightRadius() { return this._element._borderRadius.right; }

	/**
	 * Set the top left and bottom left radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderLeftRadius( v ) {

		this._element._borderRadius.left = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderLeftRadius() { return this._element._borderRadius.left; }

	/**
	 * Set the bottom left and bottom right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomRadius( v ) {

		this._element._borderRadius.bottom = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomRadius() { return this._element._borderRadius.bottom; }


	/**
	 * Set the units of borderWidth
	 * @param {string|"rem"} v
	 */
	set borderWidthUnits( v ) {

		// @TODO : Inline and Computed units to be implemented
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

		this._element._borderWidth.inline = v;

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get borderWidth() { return this._element._borderWidth._inline; }

	/**
	 * Set the width of the top side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderTopWidth( v ) {

		this._element._borderWidth.top = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopWidth() { return this._element._borderWidth.top; }

	/**
	 * Set the width of the right side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderRightWidth( v ) {

		this._element._borderWidth.right = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderRightWidth() { return this._element._borderWidth.right; }

	/**
	 * Set the width of the bottom side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderBottomWidth( v ) {

		this._element._borderWidth.bottom = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomWidth() { return this._element._borderWidth.bottom; }

	/**
	 * Set the width of the left side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderLeftWidth( v ) {

		this._element._borderWidth.left = v;

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderLeftWidth() { return this._element._borderWidth.left; }


	/**
	 *
	 * @param {Color|Number|string} v
	 */
	set borderColor( v ) {

		this._element._borderColor.inline = v;

	}

	/**
	 *
	 * @returns {Color}
	 */
	get borderColor() { return this._element._borderColor._inline; }

	/**
	 *
	 * @param v
	 */
	set borderOpacity (v) {

		this._element._borderOpacity.inline = v;

	}

	/**
	 *
	 * @return {*}
	 */
	get borderOpacity () { return this._element._borderOpacity._inline; }



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
