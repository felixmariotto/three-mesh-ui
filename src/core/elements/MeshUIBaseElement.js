//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Object3D, Texture, Vector4 } from 'three';
import Mediator from '../../utils/mediator/Mediator';
import ParentProperty from '../properties/hierarchy/ParentProperty';
import BooleanProperty from '../properties/BooleanProperty';
import NumberProperty from '../properties/NumberProperty';
import SideProperty from '../properties/SideProperty';
import UpdateManager from '../../components/core/UpdateManager';
import FontProperty from '../properties/FontProperty';
import StyleVector4Property from '../properties/style-properties/StyleVector4Property';
import Display from '../properties/style-properties/visibility/Display';
import BoxSizing from '../properties/style-properties/bounds/BoxSizing';
import StyleColorProperty from '../properties/style-properties/StyleColorProperty';
import StyleFactorProperty from '../properties/style-properties/StyleFactorProperty';
import BackgroundImage from '../properties/style-properties/background/BackgroundImage';
import BackgroundSize from '../properties/style-properties/background/BackgroundSize';
import WhiteSpace from '../properties/style-properties/font/WhiteSpace';
import FontStyle from '../properties/style-properties/font/FontStyle';
import LineHeight from '../properties/style-properties/font/LineHeight';
import FontKerning from '../properties/style-properties/font/FontKerning';
import LetterSpacing from '../properties/style-properties/font/LetterSpacing';
import Overflow from '../properties/style-properties/visibility/Overflow';
import BorderRadius from '../properties/style-properties/border/BorderRadius';
import BorderWidth from '../properties/style-properties/border/BorderWidth';
import VisibleProperty from '../properties/VisibleProperty';
import BackgroundColorProperty from '../properties/style-properties/background/BackgroundColorProperty';
import EmptyProperty from '../properties/EmptyProperty';
import FontFamilyDefault from '../properties/style-properties/font/FontFamilyDefault';
import InlineJustificator from '../properties/InlineJustificator';
import FontSizeDefault from '../properties/style-properties/font/FontSizeDefault';
import FontWeightDefault from '../properties/style-properties/font/FontWeightDefault';
import AlignItemsProperty from '../properties/style-properties/flex/AlignItemsProperty';
import TextAlignProperty from '../properties/style-properties/font/TextAlignProperty';
import FlexDirectionProperty from '../properties/style-properties/flex/FlexDirectionProperty';
import JustifyContentProperty from '../properties/style-properties/flex/JustifyContentProperty';
import OrderProperty from '../properties/style-properties/flex/OrderProperty';
import BoxAutoSize from '../properties/AutoSizeBox';
import PositionProperty from '../properties/style-properties/PositionProperty';
import WidthProperty from '../properties/style-properties/bounds/WidthProperty';
import HeightProperty from '../properties/style-properties/bounds/HeightProperty';
/* eslint-enable no-unused-vars */

export default class MeshUIBaseElement extends Object3D {

	/**
	 *
	 * @param {Object.<string,Class>} [properties=null]
	 * @param {Object.<string,any>} [values=null]
	 */
	constructor( properties = null, values = null) {

		super();

		Object.defineProperties( this, {
				isUI: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

		/**
		 *
		 * @type {Mesh|null}
		 * @protected
		 */
		this._backgroundMesh = null;

		/**
		 *
		 * @type {Material}
		 * @internal
		 */
		this._material = null;

		/**
		 *
		 * @type {Material}
		 * @protected
		 */
		this._customDepthMaterial = null;

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @protected
		 */
		this._materialMediation = {};

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @private
		 */
		this._meshMediation = {
			castShadow: { m: 'castShadow' },
			receiveShadow: { m: 'receiveShadow' },
			renderOrder: {m: 'renderOrder' }
		};

		// Children lists

		/**
		 *
		 * @type {EmptyProperty|ChildrenBox|ChildrenInline}
		 * @internal
		 */
		this._children = properties.children ? new properties.children : new EmptyProperty();
		this._parent = new ParentProperty();

		// update parentUI when this component will be added or removed
		this.addEventListener( 'added', this._rebuildParentUI );
		this.addEventListener( 'removed', this._rebuildParentUI );

		//material properties
		this._side = new SideProperty( /*default FrontSide*/ );
		this._alphaTest = new NumberProperty('alphaTest', 0.02 );

		// mesh properties
		this._visible = new VisibleProperty( 'visible', true );
		this._castShadow = new BooleanProperty( 'castShadow', false );
		this._receiveShadow = new BooleanProperty( 'receiveShadow', false );
		this._renderOrder = new NumberProperty( 'renderOrder', 0 );
		this._segments = new NumberProperty( 'segments', 1 );

		/**
		 *
		 * @type {BoundsBox|BoundsText|EmptyProperty}
		 * @internal
		 */
		this._bounds = properties.bounds ? new properties.bounds() : new EmptyProperty();

		// styles ---;

		this._order = new OrderProperty( 0 );

		this._padding = new StyleVector4Property( 'padding', new Vector4(0,0,0,0) );
		this._margin = new StyleVector4Property( 'margin', new Vector4(0,0,0,0) );


		this._position = new PositionProperty();

		/**
		 *
		 * @type {FlexDirectionProperty}
		 * @internal
		 */
		this._flexDirection = properties.flexDirection ? new properties.flexDirection() : new FlexDirectionProperty();

		this._justifyContent = properties.justifyContent ? new properties.justifyContent() : new JustifyContentProperty();

		this._alignItems = properties.alignItems ? new properties.alignItems() : new AlignItemsProperty();

		this._display = new Display( 'flex' );

		this._boxSizing = new BoxSizing( 'border-box' );
		this._width = new WidthProperty();
		this._height = new HeightProperty();

		this._backgroundColor = new BackgroundColorProperty(0x000000 );
		this._backgroundOpacity = new StyleFactorProperty('backgroundOpacity', 1.0);
		this._backgroundImage = new BackgroundImage();
		this._backgroundSize = new BackgroundSize( 'cover' );

		this._color = properties.color ? new properties.color() : new StyleColorProperty('color', 'inherit');
		this._opacity = new StyleFactorProperty( 'opacity', 1.0);

		this._whiteSpace = new WhiteSpace( 'pre-line' );

		this._fontFamily = properties.fontFamily ? new properties.fontFamily() : new FontFamilyDefault();
		this._fontStyle = new FontStyle( 'normal' );
		this._fontSize = properties.fontSize ? new properties.fontSize() : new FontSizeDefault();
		this._fontWeight = properties.fontWeight ? new properties.fontWeight() : new FontWeightDefault();

		this._lineHeight = new LineHeight( 1.2 );

		this._fontKerning = new FontKerning( 'normal' );
		this._letterSpacing = new LetterSpacing( 0 );

		this._overflow = new Overflow( 'visible' );

		this._borderRadius = new BorderRadius( 0 );
		this._borderWidth = new BorderWidth( 0 );
		this._borderColor = new StyleColorProperty( 'borderColor', 0xff00ff );
		this._borderOpacity = new StyleFactorProperty( 'borderOpacity', 1);

		// styles ---;

		this._font = new FontProperty();

		this._lineBreak = properties.lineBreak ? new properties.lineBreak() : new EmptyProperty();

		/**
		 *
		 * @type {TextContentEmpty|TextContentText|TextContentInline}
		 * @internal
		 */
		this._textContent = properties.textContent ? new properties.textContent() : new EmptyProperty();

		/**
		 *
		 * @type {GlyphsProperty}
		 * @internal
		 */
		this._glyphs = properties.glyphs ? new properties.glyphs() : new EmptyProperty();

		this._inlines = properties.inlines ? new properties.inlines() : new EmptyProperty();


		/**
		 *
		 * @type {BoxLayouter|TextLayouter|EmptyProperty}
		 * @internal
		 */
		this._layouter = properties.layouter ? new properties.layouter() : new EmptyProperty();

		this._inlineJustificator = new InlineJustificator();

		this._textAlign = properties.textAlign ? new properties.textAlign() : new TextAlignProperty();

		this._autoSize = new BoxAutoSize();


		this._renderer = properties.renderer ? new properties.renderer() : new EmptyProperty();

		/**
		 *
		 * @type {Array.<BaseProperty>}
		 * @internal
		 */
		this._components = [

			this._children,
			this._parent,

			this._fontFamily,
			this._fontStyle,
			this._fontWeight,
			this._font,

			this._whiteSpace,

			this._textContent,
			this._glyphs,

			this._inlines,

			this._visible,

			this._side,
			this._alphaTest,
			this._castShadow,
			this._receiveShadow,
			this._renderOrder,
			this._segments,
			// styles ---;

			this._boxSizing,
			this._padding,
			this._margin,
			this._width,
			this._height,

			this._bounds,

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


			// font : update order : WhiteSpace > Glyph > Inlines > Kerning > newlineBreakability > LineBreak > FontSize
			// font : process order : ??
			// this._font,

			this._fontSize,
			this._lineHeight,
			this._fontKerning,
			this._letterSpacing,


			this._overflow,

			this._borderRadius,
			this._borderWidth,
			this._borderColor,
			this._borderOpacity,

			// this._styles,
			// styles ---;
			this._lineBreak,
			this._layouter,

			this._inlineJustificator,
			this._textAlign,

			this._autoSize,

			// !! this._renderer renderer MUST NOT BE in components !!
		]

		/**
		 *
		 * @type {*[]}
		 * @private
		 */
		this._onAfterUpdates = [];

		if( values ) this.set( values );

	}


	// TODO:L Update mesh update material.


	///////////////
	///  UPDATE
	///////////////

	update( ) {

		const out = {};
		for ( const component of this._components ) {

			if( component._needsUpdate ) {

				component.update( this, out );
				component._needsUpdate = false;

			}

		}

		this._transferToMaterial( out );
		this._transferToMesh( out );

		// update children
		for ( const child of this._children._uis ) {
			child.update();
		}

	}

	process() {

		// process first time : Natural size
		for ( const child of this._children._uis ) {
			child.process();
		}


		// console.log( this.name );
		for ( const component of this._components ) {

			if( component._needsProcess ) {

				// console.log( '    ', component.id );
				component.process( this );
				component._needsProcess = false;

			}

		}

	}

	render() {

		if( this._renderer._needsProcess ) {

			this._renderer.process( this );
			this._renderer._needsProcess = false;

		}

		// render all children
		for ( const child of this._children._uis ) {
			child.render();
		}


	}

	/**
	 *
	 * @param {Object} options
	 * @param {"row"|"row-reverse"|"column"|"column-reverse"} [options.flexDirection]
	 * @param {"start"|"center"|"end"|"space-around"|"space-between"|"space-evenly"} [options.justifyContent]
	 * @param {"start"|"center"|"end"|"stretch"} [options.alignItems]
	 * @param {"visible"|"hidden"} [options.overflow]
	 * @param {"normal"|"none"} [options.fontKerning]
	 * @param {number} [options.segments]
	 * @param {"normal"|"italic"} [options.fontStyle]
	 * @param {"light"|"normal"|"bold"|"bolder"|100|200|300|400|500|600|700|800|900} [options.fontWeight]
	 *
	 * @param {Color|number|string} [options.backgroundColor]
	 * @param {number} [options.backgroundOpacity]
	 * @param {"cover"|"contain"|"stretch"} [options.backgroundSize]
	 * @param {Texture|string} [options.backgroundImage]
	 *
	 *
	 * @param {Vector4|Array.<number>|number|string} [options.borderRadius]
	 * @param {Vector4|Array.<number>|number|string} [options.borderWidth]
	 * @param {Color|number|string} [options.borderColor]
	 *
	 * @param {"content-box"|"border-box"} [options.boxSizing]
	 * @param {number|"auto"} [options.width]
	 * @param {number|"auto"} [options.height]
	 * @param {Vector4|Array.<number>|number|string} [options.padding]
	 * @param {Vector4|Array.<number>|number|string} [options.margin]
	 *
	 * @param {"left"|"right"|"center"|"justify"|"justify-left"|"justify-right"} [options.textAlign]
	 * @param {boolean} [options.visible]
	 * @param {number} [options.letterSpacing]
	 *
	 * @param {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"} [options.whiteSpace]
	 */
	set( options ) {

		for ( let prop of Object.keys( options ) ) {

			const value = options[prop];

			// 1. replace deprecated properties
			switch ( prop ){
				case 'contentDirection':
					console.warn('ThreeMeshUI v7xx: property `contentDirection` is deprecated and has been renamed as `flexDirection`');
					prop = 'flexDirection';
					break;

				case 'interLine':
					console.warn('ThreeMeshUI v7xx: property `interLine` is deprecated and has been renamed as `lineHeight`');
					prop = 'lineHeight';
					break;

				case 'content':
					console.warn( 'ThreeMeshUI v7xx: property `content` is deprecated and has been renamed as `textContent`');
					prop = 'textContent';
					break;

				case 'fontColor':
					console.warn( 'ThreeMeshUI v7xx: property `fontColor` is deprecated and has been renamed as `color`');
					prop = 'color';
					break;

				case 'hiddenOverflow':
					console.warn( 'ThreeMeshUI v7xx: property `hiddenOverflow` is deprecated and has been renamed as `overflow`');
					prop = 'overflow';
					break;

				case 'backgroundTexture':
					console.warn( 'ThreeMeshUI v7xx: property `backgroundTexture` is deprecated and has been renamed as `backgroundImage`');
					prop = 'backgroundImage';
					break;

				case 'alignContent':
					console.warn( 'ThreeMeshUI v7xx: property `alignContent` is deprecated and has been renamed as `alignItems`');
					prop = 'alignItems';
					break;
			}

				switch ( prop ) {

				// properties
					case 'textContent' :
					case 'segments' :
					case 'visible' :
						//console.log( this[`_${prop}`], prop, value );
						this[`_${prop}`].value = value;
						break;

					case 'offset':
						// @TODO
						this[ prop ] = value;
						this.position.z = value;
						break;

					case 'fontSupersampling' :// todo
						break;

					// styles properties
					case 'flexDirection' :
					case 'justifyContent' :
					case 'alignItems' :
					case 'color' :
					case 'fontFamily' :
					case 'fontOpacity' :
					case 'fontKerning' :
					case 'fontSize' :
					case 'fontStyle' :
					case 'fontWeight' :
					case 'textAlign' :
					case 'letterSpacing' :
					case 'lineHeight' :
					case 'whiteSpace':
					case 'breakOn': // Not valid anymore?
					case 'width' :
					case 'height' :
					case 'padding':
					case 'margin' :
					case 'backgroundColor' :
					case 'backgroundOpacity' :
					case 'backgroundImage' :
					case 'backgroundSize' :
					case 'borderColor' :
					case 'borderOpacity' :
					case 'borderRadius' :
					case 'borderWidth':
					case 'overflow' :
					case 'boxSizing':
						if( this[`_${prop}`] ){
							this[`_${prop}`].inline = value;
						}
						break;

					default:
						// //console.log( prop, value );
						// dynamic behavior
						this[ prop ] = value;
				}

		}

	}



	/**
	 * Filters children in order to compute only one times children lists
	 * @private
	 */
	_rebuildChildrenLists() {

		//console.log( this.name, 'child added' );
		this._children._needsUpdate = true;

	}

	/**
	 * Try to retrieve parentUI after each structural change
	 * @protected
	 */
	_rebuildParentUI = () => {

		this._parent._needsUpdate = true;

		// set elements as root
		if ( this.parent && !this.parent.isUI ) {

			UpdateManager.register7xx( this );
			// this.pseudoClassList.add('root');

		} else {

			UpdateManager.remove7xx( this );
			// this.pseudoClassList.remove('root');

		}


	};

	/**
	 * When the user calls component.add, it registers for updates,
	 * then call THREE.Object3D.add.
	 */

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) {

		for ( let i = 0; i < arguments.length; i++ ) {

			super.add( arguments[ i ] );

		}


		this._rebuildChildrenLists();

		return this;

	}


	/**
	 * When the user calls component.remove, it registers for updates,
	 * then call THREE.Object3D.remove.
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	remove( object ) {

		for ( const id of Object.keys( arguments ) ) {

			// An inline component relies on its parent for positioning
			if ( arguments[ id ].isInline ) this.update( null, true );

		}

		super.remove( ...arguments );

		this._rebuildChildrenLists();

		return this;

	}

	/**
	 *
	 * @return {MeshUIBaseElement}
	 */
	clear() {


		this.traverse( ( obj ) => {

			UpdateManager.disposeOf( obj );

			if ( obj.material ) obj.material.dispose();
			if ( obj.geometry ) obj.geometry.dispose();

		} );

		super.clear();

		// remove properties
		this._backgroundMesh = null;
		this._material = null;
		this._materialMediation = null;
		this._meshMediation = null;

		this._children.dispose();
		this._children = null;

		this._parent.dispose();
		this._parent = null;

		this._side = null;
		this._alphaTest = null;
		this._visible = null;
		this._castShadow = null;
		this._receiveShadow = null;
		this._renderOrder = null;
		this._segments = null;
		this._bounds = null;

		// styles properties
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

		this._font = null;
		this._lineBreak = null;
		this._background = null;
		this._layouter = null;

		return this;
	}

	/**
	 *
	 * @return {string}
	 */
	get textContent() {

		this._textContent.process( this );

		return this._textContent._value;

	}

	/*********************************************************************************************************************
	 * FONTS
	 ********************************************************************************************************************/

	// /**
	//  * @param {FontVariant} value
	//  */
	// set font( value ) {
	//
	// 	this._font = value;
	//
	// }
	//
	// /**
	//  *
	//  * @returns {FontVariant}
	//  */
	// get font() { return this._font; }


	/***********************************************************************************************************************
	 * TO MATERIAL HOLDER
	 **********************************************************************************************************************/

	/**
	 *
	 * @returns {Material|ShaderMaterial}
	 */
	get material() { return this._material; }

	/**
	 *
	 * @param {Material|ShaderMaterial} material
	 */
	set material( material ) {

		this._material = material;

		// Update the fontMaterialProperties that need to be transferred to
		this._materialMediation = { ...material.constructor.mediation };

		// transfer all the properties to material
		//console.log( "transfoer to mat ------------->");
		this._transferToMaterial();

		if ( this._backgroundMesh ) {

			this._backgroundMesh.material = this._material;

		}

	}

	/**
	 *
	 * @param {Material|null} material
	 */
	set customDepthMaterial( material ) {

		this._customDepthMaterial = material;

		this._transferToMaterial();

		if ( this._backgroundMesh ) {
			// transfer to the main if isset
			this._backgroundMesh.customDepthMaterial = this._customDepthMaterial;

			console.log( "customDepthMaterial on backgroundMesh")


		}

	}

	/**
	 *
	 * @returns {Material|null}
	 */
	get customDepthMaterial() { return this._customDepthMaterial; }

	/**
	 * According to the list of materialProperties
	 * some properties are sent to material
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToMaterial( options = null ) {

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, this._material, options, this._materialMediation, this.customDepthMaterial );

	}

	/**
	 *
	 * @param {number} value
	 */
	set side( value ) {


		this._side.value = value;

		if ( this._material ) this._material.side = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get side() { return this._side.value; }

	/**
	 *
	 * @param {number} value
	 */
	set alphaTest ( value ) {

		this._alphaTest.value = value;

		if( this._material ) this._material.alphaTest = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get alphaTest () { return this._alphaTest.value; }

	/*********************************************************************************************************************
	 * MESH MEDIATION
	 ********************************************************************************************************************/

	/**
	 * According to the list of meshProperties
	 * some properties are sent to mesh
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToMesh( options = null ) {

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}


		}

		Mediator.mediate( this, this._backgroundMesh, options, this._meshMediation );

	}

	/**
	 * @internal
	 * @param {Mesh|Array.<Mesh>|null} mesh
	 */
	setBackgroundMesh( mesh ) {

		if( this._backgroundMesh ) {

			this.remove( this._backgroundMesh );
			this.unbindBackgroundMeshProperties();

		}

		this._backgroundMesh = mesh;

		if ( this._backgroundMesh ) {

			this.bindBackgroundMeshProperties();

			if( this._customDepthMaterial ) this._backgroundMesh.customDepthMaterial = this._customDepthMaterial;

			this._transferToMesh();

			this.add( this._backgroundMesh );

		}

	}

	/**
	 *
	 */
	bindBackgroundMeshProperties () { }

	/**
	 *
	 */
	unbindBackgroundMeshProperties () { }

	/**
	 *
	 * @param {boolean} value
	 */
	set castShadow( value ) {

		if( this._castShadow ) {

			console.log( "cast shadow set value")
			this._castShadow.value = value;
		}

	}

	/**
	 *
	 * @return {boolean}
	 */
	get castShadow() { return this._castShadow; }

	/**
	 *
	 * @param {boolean} value
	 */
	set receiveShadow( value ) {

		if( this._receiveShadow ) this._receiveShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get receiveShadow() { return this._receiveShadow; }

	/**
	 *
	 * @param {number} value
	 */
	set renderOrder( value ) {

		if( this._renderOrder ) this._renderOrder.value = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get renderOrder() { return this._renderOrder.value; }


	// Geometry

	/**
	 *
	 * @param {Number} v
	 */
	set segments (v) {

		this._segments.value = v;

		// @TODO : Geometry Update

	}

	/**
	 *
	 * @return {number}
	 */
	get segments () { return this._segments.value; }


	/***********************************************************************************************************************
	 * HOOKS & ALTERS
	 **********************************************************************************************************************/

	/**
	 *
	 * @param {Function} func
	 */
	set onAfterUpdate( func ) {

		console.warn( '`onAfterUpdate` property has been deprecated, please rely on `addAfterUpdate` instead.' );
		this.addAfterUpdate( func );

	}

	/**
	 *
	 * @param {Function} func
	 */
	addAfterUpdate( func ) {

		this._onAfterUpdates.push( func );

	}

	/**
	 *
	 * @param {Function} func
	 */
	removeAfterUpdate( func ) {

		const index = this._onAfterUpdates.indexOf( func );
		if ( index !== -1 ) {

			this._onAfterUpdates.splice( index, 1 );

		}

	}

	/**
	 * @todo: afterUpdate not called anymore
	 */
	performAfterUpdate() {

		for ( let i = 0; i < this._onAfterUpdates.length; i++ ) {

			this._onAfterUpdates[ i ]();

		}

	}

}
