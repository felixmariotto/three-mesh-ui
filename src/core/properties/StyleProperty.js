import FlexDirection from './style-properties/FlexDirection';
import JustifyContent from './style-properties/JustifyContent';
import AlignItems from './style-properties/AlignItems';
import BaseProperty from './BaseProperty';
import BoxSizing from './style-properties/BoxSizing';
import Display from './style-properties/Display';
import FontKerning from './style-properties/FontKerning';
import BackgroundSize from './style-properties/BackgroundSize';
import LetterSpacing from './style-properties/LetterSpacing';
import StyleFactorProperty from './style-properties/StyleFactorProperty';
import StyleColorProperty from './style-properties/StyleColorProperty';
import FontStyle from './style-properties/FontStyle';
import FontWeight from './style-properties/FontWeight';
import LineHeight from './style-properties/LineHeight';
import WhiteSpace from './style-properties/WhiteSpace';
import Overflow from './style-properties/Overflow';
import Order from './style-properties/Order';
import Position from './style-properties/Position';
import BackgroundImage from './style-properties/BackgroundImage';
import FontFamily from './style-properties/FontFamily';
import { Vector4 } from 'three';
import StyleVector4Property from './style-properties/StyleVector4Property';
import TextAlign from './style-properties/TextAlign';
import BorderRadius from './style-properties/BorderRadius';
import BorderWidth from './style-properties/BorderWidth';
import StyleSideProperty from './style-properties/StyleSideProperty';

export default class StyleProperty extends BaseProperty{

	constructor() {

		super('style');

		this._order = new Order( 0 );

		this._padding = new StyleVector4Property( 'padding', new Vector4(0,0,0,0) );
		this._margin = new StyleVector4Property( 'margin', new Vector4(0,0,0,0) );


		this._position = new Position( 'static' );

		this._flexDirection = new FlexDirection( 'row' );

		this._justifyContent = new JustifyContent( 'start' );

		this._alignItems = new AlignItems( 'start' );

		this._display = new Display( 'flex' );

		this._boxSizing = new BoxSizing( 'border-box' );
		this._width = new StyleSideProperty( 'width' );
		this._height = new StyleSideProperty( 'height' );

		this._backgroundColor = new StyleColorProperty('backgroundColor', 0x000000 );
		this._backgroundOpacity = new StyleFactorProperty('backgroundOpacity', 1.0);
		this._backgroundImage = new BackgroundImage();
		this._backgroundSize = new BackgroundSize( 'cover' );

		this._color = new StyleColorProperty('color', 0xFFFFFF);
		this._opacity = new StyleFactorProperty( 'opacity', 1.0);

		this._whiteSpace = new WhiteSpace( 'pre-line' );

		this._fontFamily = new FontFamily( );
		this._fontStyle = new FontStyle( 'normal' );
		this._fontWeight = new FontWeight( 'normal' );

		this._lineHeight = new LineHeight( 1.2 );

		this._fontKerning = new FontKerning( 'normal' );
		this._letterSpacing = new LetterSpacing( 0 );

		this._overflow = new Overflow( 'visible' );

		this._textAlign = new TextAlign( 'left' );

		this._borderRadius = new BorderRadius( 0 );
		this._borderWidth = new BorderWidth( 0 );
		this._borderColor = new StyleColorProperty( 'borderColor', 0xff00ff );
		this._borderOpacity = new StyleFactorProperty( 'borderOpacity', 1);


		/**
		 *
		 * @type {Array.<SubStyleProperty>}
		 * @private
		 */
		this._components = [
			this._boxSizing,
			this._padding,
			this._margin,
			this._width,
			this._height,

			this._position,


			this._flexDirection,
			this._justifyContent,
			this._alignItems,


			this._display,
			this._backgroundColor,
			this._backgroundOpacity,
			this._backgroundImage,
			this._backgroundSize,
			this._opacity,
			this._color,

			this._whiteSpace,
			// font : update order : WhiteSpace > Glyph > Inlines > Kerning > newlineBreakability > LineBreak > FontSize
			// font : process order : ??
			// this._font,
			this._fontFamily,
			this._fontStyle,
			this._fontWeight,

			this._lineHeight,
			this._fontKerning,
			this._letterSpacing,


			this._overflow,
			this._textAlign,

			this._borderRadius,
			this._borderWidth,
			this._borderColor,
			this._borderOpacity

		];

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

		this._boxSizing.inline = value;
		this._checkUpdate( this._boxSizing );

	}

	/**
	 *
	 * @return {"border-box"|"content-box"}
	 */
	get boxSizing() { return this._boxSizing.inline; }


	/**
	 *
	 * @param {number} v
	 */
	set width ( v ) {

		this._width.inline = v;
		this._checkUpdate( this._width );

	}

	/**
	 *
	 * @return {*}
	 */
	get width () { return this._width.inline; }

	/**
	 *
	 * @param {number} v
	 */
	set height ( v ) {

		this._height.inline = v;
		this._checkUpdate( this._height );

	}

	/**
	 *
	 * @return {*}
	 */
	get height () { return this._height.inline; }


	/**
	 *
	 * @param {Vector4|Array.<number>|number|string} v
	 */
	set padding( v ) {

		this._padding.inline = v;
		this._checkUpdate( this._padding );

	}


	/**
	 * // @TODO : I don't like that if it not the same as inputed
	 * @return {Vector4}
	 */
	get padding () {
		return this._padding.inline;
	}


	/**
	 *
	 * @param {number} v
	 */
	set paddingTop ( v ) {

		this._padding.top = v;
		this._checkUpdate( this._padding );

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingTop () { return this._padding.top; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingRight (v) {

		this._padding.right = v;
		this._checkUpdate( this._padding );

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingRight () { return this._padding.right; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingBottom (v) {

		this._padding.bottom = v;
		this._checkUpdate( this._padding );

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingBottom () { return this._padding.bottom; }

	/**
	 *
	 * @param {number} v
	 */
	set paddingLeft ( v ) {

		this._padding.left = v;
		this._checkUpdate( this._padding );

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingLeft () { return this._padding.left; }

	/**
	 *
	 * @param {Vector4|Array.<number>|number|string} v
	 */
	set margin( v ) {

		this._margin.inline = v;
		this._checkUpdate( this._margin );

	}


	/**
	 * // @TODO : I don't like that if it not the same as inputed
	 * @return {Vector4}
	 */
	get margin () {
		return this._margin.inline;
	}


	/**
	 *
	 * @param {number} v
	 */
	set marginTop ( v ) {

		this._margin.top = v;
		this._checkUpdate( this._margin );

	}

	/**
	 *
	 * @return {number}
	 */
	get marginTop () { return this._margin.top; }

	/**
	 *
	 * @param {number} v
	 */
	set marginRight (v) {

		this._margin.right = v;
		this._checkUpdate( this._margin );

	}

	/**
	 *
	 * @return {number}
	 */
	get marginRight () { return this._margin.right; }

	/**
	 *
	 * @param {number} v
	 */
	set marginBottom (v) {

		this._margin.bottom = v;
		this._checkUpdate( this._margin );

	}

	/**
	 *
	 * @return {number}
	 */
	get marginBottom () { return this._margin.bottom; }

	/**
	 *
	 * @param {number} v
	 */
	set marginLeft ( v ) {

		this._margin.left = v;
		this._checkUpdate( this._margin );

	}

	/** Display Properties -----------------------------------------------------*/


	/**
	 *
	 * @param {"flex"|"none"} value
	 */
	set display ( value ) {

		this._display.inline = value;
		this._checkUpdate( this._display );

	}

	/**
	 *
	 * @return {"flex"|"none"}
	 */
	get display() { return this._display.inline; }


	/**
	 *
	 * @param {"visible"|"hidden"} v
	 */
	set overflow ( v ) {

		this._overflow.inline = v;
		this._checkUpdate( this._overflow );

	}

	/**
	 *
	 * @return {"visible"|"hidden"}
	 */
	get overflow () { return this._overflow.inline; }

	/** Position Properties ----------------------------------------------------*/

	/**
	 *
	 * @param {"static"|"absolute"} v
	 */
	set position ( v ) {

		this._position.inline = v;
		this._checkUpdate( this._position );

	}

	/**
	 *
	 * @return {"static"|"absolute"}
	 */
	get position () { return this._position.inline; }


	/** Flex Properties --------------------------------------------------------*/

	/**
	 *
	 * @param {"column"|"column-reverse"|"row"|"row-reverse"} value
	 */
	set flexDirection( value ) {

		this._flexDirection.inline = value;
		this._checkUpdate( this._flexDirection );

	}

	/**
	 *
	 * @return {"column"|"column-reverse"|"row"|"row-reverse"}
	 */
	get flexDirection() { return this._flexDirection.inline; }

	/**
	 *
	 * @param {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"} value
	 */
	set justifyContent( value ) {

		this._justifyContent.inline = value;
		this._checkUpdate( this._justifyContent );

	}

	/**
	 *
	 * @return {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"}
	 */
	get justifyContent() { return this._justifyContent.inline; }

	/**
	 *
	 * @param {"start"|"center"|"end"|"stretch"} value
	 */
	set alignItems ( value ) {

		this._alignItems.inline = value;
		this._checkUpdate( this._alignItems );

	}

	/**
	 *
	 * @return {"start"|"center"|"end"|"stretch"}
	 */
	get alignItems() { return this._alignItems.inline; }


	/**
	 *
	 * @param {number} v
	 */
	set order (v) {

		this._order.inline = v;
		this._checkUpdate( this._order );

	}

	/**
	 *
	 * @return {number}
	 */
	get order () { return this._order.inline; }


	/** Background Properties --------------------------------------------------*/

	/**
	 *
	 * @param {Color|number|string} v
	 */
	set backgroundColor( v ) {

		this._backgroundColor.inline = v;
		this._checkUpdate( this._backgroundColor );

	}

	/**
	 *
	 * @return {Color|number|string}
	 */
	get backgroundColor() { return this._backgroundColor.inline; }


	set backgroundOpacity ( v ) {

		this._backgroundOpacity.inline = v;
		this._checkUpdate( this._backgroundOpacity );

	}

	get backgroundOpacity () { return this._backgroundOpacity.inline; }

	/**
	 *
	 * @param {Texture|string} v
	 */
	set backgroundImage ( v ) {

		this._backgroundImage.inline = v;
		this._checkUpdate( this._backgroundImage );

	}

	/**
	 *
	 * @return {Texture|string}
	 */
	get backgroundImage () { return this._backgroundImage.inline; }

	/**
	 *
	 * @param {"cover"|"contain"|"stretch"} v
	 */
	set backgroundSize ( v ) {

		this._backgroundSize.inline = v;
		this._checkUpdate( this._backgroundSize );

	}

	/**
	 *
	 * @return {"cover"|"contain"|"stretch"}
	 */
	get backgroundSize() { return this._backgroundSize.inline; }


	/** Text Properties --------------------------------------------------------*/

	/**
	 *
	 * @param {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"} v
	 */
	set whiteSpace ( v ) {

		this._whiteSpace.inline = v;
		this._checkUpdate( this._whiteSpace );

	}

	/**
	 *
	 * @return {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"}
	 */
	get whiteSpace () { return this._whiteSpace.inline; }





	/**
	 *
	 * @param {Color|number|string} v
	 */
	set color( v ) {

		this._color.inline = v;
		this._checkUpdate( this._color );

	}

	/**
	 *
	 * @return {Color|number|string}
	 */
	get color () { return this._color.inline; }

	/**
	 *
	 * @param {number} v
	 */
	set opacity ( v ) {

		this._opacity.inline = v;

	}

	/**
	 *
	 * @return {number}
	 */
	get opacity () { return this._opacity.inline; }




	/**
	 *
	 * @param {"normal"|"italic"} v
	 */
	set fontStyle (v) {

		this._fontStyle.inline = v;
		this._checkUpdate( this._fontStyle );

	}

	/**
	 *
	 * @return {"normal"|"italic"}
	 */
	get fontStyle () { return this._fontStyle.inline; }


	/**
	 *
	 * @param {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}  v
	 */
	set fontWeight ( v ) {

		this._fontWeight.inline = v;
		this._checkUpdate( this._fontWeight );

	}

	/**
	 *
	 * @return {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}
	 */
	get fontWeight () { return this._fontWeight.inline; }

	/**
	 *
	 * @param {"normal"|"none"} v
	 */
	set fontKerning ( v ) {

		this._fontKerning.inline = v;
		this._checkUpdate( this._fontKerning.inline );

	}

	/**
	 *
	 * @return {"normal"|"none"}
	 */
	get fontKerning () { return this._fontKerning.inline; }


	/**
	 *
	 * @param {number} v
	 */
	set letterSpacing (v) {

		this._letterSpacing.inline = v;
		this._checkUpdate( this._letterSpacing.inline );

	}

	/**
	 *
	 * @return {number}
	 */
	get letterSpacing () { return this._letterSpacing.inline; }

	/**
	 *
	 * @param {number} v
	 */
	set lineHeight ( v ) {

		this._lineHeight.inline = v;
		this._checkUpdate( this._lineHeight );

	}

	/**
	 *
	 * @return {number}
	 */
	get lineHeight () { return this._lineHeight.inline; }


	/**
	 *
	 * @param {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"} v
	 */
	set textAlign ( v ) {

		this._textAlign.inline = v;

	}

	/**
	 *
	 * @return {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"}
	 */
	get textAlign() { return this._textAlign.inline; }


	/** Border Properties ----------------------------------------------------------------------------------------------*/

	/**
	 * Set the units of borderRadius
	 * @param {string|"em"|"rem"|"%"} v
	 */
	set borderRadiusUnits( v ) {

		// @TODO:
		this._borderRadiusComponent.units = v;

	}

	/**
	 * Get the units of borderRadius
	 * @returns {string}
	 */
	get borderRadiusUnits() { /* @TODO:inline units */ return this._borderRadiusComponent.units; }

	/**
	 *
	 * @param {Vector4|Array.<Number>|Number|string} v
	 */
	set borderRadius( v ) {

		this._borderRadius.inline = v;
		this._checkUpdate( this._borderRadius );

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get borderRadius() { return this._borderRadius.inline; }

	/**
	 * Set the top left radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopLeftRadius( v ) {

		this._borderRadius.topLeft = v;
		this._checkUpdate( this._borderRadius );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopLeftRadius() { return this._borderRadius.topLeft; }


	/**
	 * Set the top right radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopRightRadius( v ) {

		this._borderRadius.topRight = v;
		this._checkUpdate( this._borderRadius );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopRightRadius() { return this._borderWidth.topRight; }

	/**
	 * Set the bottom right radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomRightRadius( v ) {

		this._borderRadius.bottomRight = v;
		this._checkUpdate( this._borderRadius );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomRightRadius() { return this._borderWidth.bottomRight; }

	/**
	 * Set the bottom left radius only
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomLeftRadius( v ) {

		this._borderRadius.bottomLeft = v;
		this._checkUpdate( this._borderRadius );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomLeftRadius() { return this._borderWidth.bottomLeft; }

	/**
	 * Set the top left and top right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderTopRadius( v ) {

		this._borderRadius.top = v;
		this._checkUpdate( this._borderRadius );
	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopRadius() { return this._borderWidth.top; }

	/**
	 * Set the top right and bottom right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderRightRadius( v ) {

		this._borderRadius.right = v;
		this._checkUpdate( this._borderRadius );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderRightRadius() { return this._borderRadius.right; }

	/**
	 * Set the top left and bottom left radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderLeftRadius( v ) {

		this._borderRadius.left = v;
		this._checkUpdate( this._borderRadius );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderLeftRadius() { return this._borderRadius.left; }

	/**
	 * Set the bottom left and bottom right radiuses
	 * @param {Number} v in units of `borderRadiusUnits`
	 */
	set borderBottomRadius( v ) {

		this._borderRadius.bottom = v;
		this._checkUpdate( this._borderRadius );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomRadius() { return this._borderRadius.bottom; }


	/**
	 * Set the units of borderWidth
	 * @param {string|"em"|"rem"|"%"} v
	 */
	set borderWidthUnits( v ) {

		// @TODO : Inline and Computed units to be implemented
		this._borderWidth.units = v;
		this._checkUpdate( this._borderWidth );

	}

	/**
	 * Get the units of borderWidth
	 * @returns {string}
	 */
	get borderWidthUnits() { return this._borderWidth.units; }

	/**
	 *
	 * @param {Vector4|Array.<Number>|Number|string} v
	 */
	set borderWidth( v ) {

		this._borderWidth.inline = v;
		this._checkUpdate( this._borderWidth );

	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get borderWidth() { return this._borderWidth.inline; }

	/**
	 * Set the width of the top side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderTopWidth( v ) {

		this._borderWidth.top = v;
		this._checkUpdate( this._borderWidth );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderTopWidth() { return this._borderWidth.top; }

	/**
	 * Set the width of the right side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderRightWidth( v ) {

		this._borderWidth.right = v;
		this._checkUpdate( this._borderWidth );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderRightWidth() { return this._borderWidth.right; }

	/**
	 * Set the width of the bottom side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderBottomWidth( v ) {

		this._borderWidth.bottom = v;
		this._checkUpdate( this._borderWidth );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderBottomWidth() { return this._borderWidth.bottom; }

	/**
	 * Set the width of the left side border only
	 * @param {Number} v in units of `borderWidthUnits`
	 */
	set borderLeftWidth( v ) {

		this._borderWidth.left = v;
		this._checkUpdate( this._borderWidth );

	}

	/**
	 *
	 * @returns {number}
	 */
	get borderLeftWidth() { return this._borderWidth.left; }


	/**
	 *
	 * @param {Color|Number|string} v
	 */
	set borderColor( v ) {

		this._borderColor.inline = v;
		this._checkUpdate( this._borderColor );

	}

	/**
	 *
	 * @returns {Color}
	 */
	get borderColor() { return this._borderColor.inline; }

	/**
	 *
	 * @param v
	 */
	set borderOpacity (v) {

		this._borderOpacity.inline = v;
		this._checkUpdate( this._borderOpacity );

	}

	/**
	 *
	 * @return {*}
	 */
	get borderOpacity () { return this._borderOpacity.inline; }



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

	/**
	 *
	 * @param vrElement
	 * @param out
	 */
	update( vrElement, out ) {

		for ( const component of this._components ) {

			// console.log( component._id, component._needsUpdate)
			if( component._needsUpdate ) {

				component.update( vrElement, out );
				component._needsUpdate = false;

				if( component._needsProcess ) {
					this._needsProcess = true;
				}

			}

		}

	}

	process( vrElement ) {

		for ( const component of this._components ) {

			if( component._needsProcess ) {

				component.process( vrElement );
				component._needsProcess = false;

			}

		}

	}

	dispose () {

		this._components = null;

		// @TODO: Should dispose referenced values ? Color, Vector4?

		this._boxSizing = null;
		this._padding = null;
		this._margin = null;
		this._position = null;
		this._flexDirection = null;
		this._justifyContent = null;
		this._alignItems = null;
		this._display = null;
		this._backgroundColor = null;
		this._backgroundOpacity = null;
		this._backgroundSize = null;
		this._opacity = null;
		this._color = null;
		this._whiteSpace = null;
		this._fontFamily = null;
		this._fontStyle = null;
		this._fontWeight = null;
		this._lineHeight = null;
		this._fontKerning = null;
		this._letterSpacing = null;
		this._overflow = null;
		this._textAlign = null;

	}

	/**
	 *
	 * @param {BaseProperty} property
	 * @private
	 */
	_checkUpdate( property ) {

		if( property._needsUpdate ) {

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @param {BaseProperty} property
	 * @private
	 */
	_checkProcess( property ) {

		if( property._needsProcess ) {

			this._needsProcess = true;

		}
	}


}
