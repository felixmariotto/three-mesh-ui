import RenderOrderProperty from '../properties/RenderOrderProperty';
import OffsetProperty from '../properties/OffsetProperty';
import FontSmoothProperty from '../properties/FontSmoothProperty';
import PaddingProperty from '../properties/style-properties/bounds/PaddingProperty';
import MarginProperty from '../properties/style-properties/bounds/MarginProperty';
import Mediator from '../../utils/mediator/Mediator';
import ParentProperty from '../properties/hierarchy/ParentProperty';
import NumberProperty from '../properties/NumberProperty';
import SideProperty from '../properties/SideProperty';
import UpdateManager from '../../components/core/UpdateManager';
import FontProperty from '../properties/FontProperty';
import { Object3D } from 'three';
import Display from '../properties/style-properties/visibility/Display';
import BoxSizing from '../properties/style-properties/bounds/BoxSizing';
import StyleColorProperty from '../properties/style-properties/StyleColorProperty';
import StyleFactorProperty from '../properties/style-properties/StyleFactorProperty';
import BackgroundImage from '../properties/style-properties/background/BackgroundImage';
import BackgroundSize from '../properties/style-properties/background/BackgroundSize';
import Overflow from '../properties/style-properties/visibility/Overflow';
import BorderRadius from '../properties/style-properties/border/BorderRadius';
import BorderWidth from '../properties/style-properties/border/BorderWidth';
import VisibleProperty from '../properties/VisibleProperty';
import BackgroundColorProperty from '../properties/style-properties/background/BackgroundColorProperty';
import EmptyProperty from '../properties/EmptyProperty';
import InlineJustificator from '../properties/InlineJustificator';
import AlignItemsProperty from '../properties/style-properties/flex/AlignItemsProperty';
import TextAlignProperty from '../properties/style-properties/font/TextAlignProperty';
import FlexDirectionProperty from '../properties/style-properties/flex/FlexDirectionProperty';
import JustifyContentProperty from '../properties/style-properties/flex/JustifyContentProperty';
import OrderProperty from '../properties/style-properties/flex/OrderProperty';
import PositionProperty from '../properties/style-properties/PositionProperty';
import WidthProperty from '../properties/style-properties/bounds/WidthProperty';
import HeightProperty from '../properties/style-properties/bounds/HeightProperty';
import TextContentEmpty from '../properties/TextContentEmpty';
import FontStyleProperty from '../properties/style-properties/font/FontStyleProperty';
import FontWeightProperty from '../properties/style-properties/font/FontWeightProperty';
import FontFamilyProperty from '../properties/style-properties/font/FontFamilyProperty';
import LineHeightProperty from '../properties/style-properties/font/LineHeightProperty';
import WhiteSpaceProperty from '../properties/style-properties/font/WhiteSpaceProperty';
import LetterSpacingProperty from '../properties/style-properties/font/LetterSpacingProperty';
import FontSizeProperty from '../properties/style-properties/font/FontSizeProperty';
import FontLibrary from '../../font/FontLibrary';
import SegmentsProperty from '../properties/geometry/SegmentsProperty';
import InvertAlphaProperty from '../properties/InvertAlphaProperty';
import FontKerningProperty from '../properties/style-properties/font/FontKerningProperty';
import InheritableBooleanProperty from '../properties/InheritableBooleanProperty';
import InheritableMaterialProperty from '../properties/InheritableMaterialProperty';
import { directTransferNotNull } from '../../utils/mediator/transformers/CommonTransformers';
import { uniformOrUserDataTransformer } from '../../utils/mediator/transformers/MaterialTransformers';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Color, Texture, Vector4, Mesh, Material, ShaderMaterial } from 'three';
import BaseProperty from './../properties/BaseProperty';
/* eslint-enable no-unused-vars */

export default class MeshUIBaseElement extends Object3D {

	/**
	 *
	 * @param {Properties} properties
	 * @param {Options} values
	 */
	constructor( properties, values) {

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
		 * @internal
		 */
		this._backgroundMesh = null;



		/**
		 *
		 * @type {Material}
		 * @internal
		 */
		this._backgroundMaterial = null;

		/**
		 *
		 * @type {Material}
		 * @protected
		 */
		this._backgroundCustomDepthMaterial = null;

		/**
		 *
		 * @type {Object.<{m:string, t?:(target:any, targetProperty:string, value:any) => void}>}
		 * @protected
		 */
		this._backgroundMaterialMediation = {};

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @private
		 */
		this._backgroundMeshMediation = {
			backgroundCastShadow: { m: 'castShadow' },
			backgroundReceiveShadow: { m: 'receiveShadow' },
			renderOrder: {m: 'renderOrder' }
		};

		/**
		 *
		 * @type {Mesh|null}
		 * @internal
		 */
		this._fontMesh = null;

		/**
		 *
		 * @type {InheritableMaterialProperty}
		 * @internal
		 */
		this._fontMaterial = new InheritableMaterialProperty('fontMaterial');

		/**
		 *
		 * @type {InheritableMaterialProperty}
		 * @private
		 */
		this._fontCustomDepthMaterial = new InheritableMaterialProperty('fontCustomDepthMaterial');

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @private
		 */
		this._fontMeshMediation = {
			fontMaterial: { m: 'material' },
			fontCustomDepthMaterial: { m : 'customDepthMaterial', t:directTransferNotNull},
			fontCastShadow: { m: 'castShadow' },
			fontReceiveShadow: { m: 'receiveShadow' },
			renderOrder: {m: 'renderOrder' }
		};

		// Children lists

		/**
		 *
		 * @type {EmptyProperty|ChildrenBox|ChildrenText}
		 * @internal
		 */
		this._children = properties.children ? new properties.children : new EmptyProperty("children");
		this._parent = new ParentProperty();

		// update parentUI when this component will be added or removed
		this.addEventListener( 'added', this._rebuildParentUI );
		this.addEventListener( 'removed', this._rebuildParentUI );

		//material properties
		this._backgroundSide = new SideProperty( 'backgroundSide' );
		this._fontSide = new SideProperty( 'fontSide' );
		this._backgroundAlphaTest = new NumberProperty( 'backgroundAlphaTest', 0.02 );
		this._fontAlphaTest = new NumberProperty( 'fontAlphaTest', 0.02 );

		// mesh properties
		this._visible = new VisibleProperty( 'visible', true );

		this._backgroundCastShadow = new InheritableBooleanProperty( 'backgroundCastShadow' );
		this._fontCastShadow = new InheritableBooleanProperty( 'fontCastShadow' );
		this._backgroundReceiveShadow = new InheritableBooleanProperty( 'backgroundReceiveShadow' );
		this._fontReceiveShadow = new InheritableBooleanProperty( 'fontReceiveShadow' );

		// @TODO: RenderOrder for background and fonts
		this._renderOrder = new RenderOrderProperty();

		// @TODO : background & Text
		this._segments = properties.segments ? new properties.segments() : new SegmentsProperty();


		/**
		 *
		 * @type {BoundsBox|BoundsText|EmptyProperty}
		 * @ignore
		 * @internal
		 */
		this._bounds = properties.bounds ? new properties.bounds() : new EmptyProperty("bounds");

		// styles ---;

		this._order = new OrderProperty();

		this._padding = new PaddingProperty();
		this._margin = new MarginProperty();


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

		this._backgroundColor = properties.backgroundColor ? new properties.backgroundColor() : new BackgroundColorProperty();
		this._backgroundOpacity = new StyleFactorProperty('backgroundOpacity', 0.5);
		this._backgroundImage = new BackgroundImage();
		this._backgroundSize = new BackgroundSize( 'cover' );

		this._color = properties.color ? new properties.color() : new StyleColorProperty('color', 'inherit');
		this._fontOpacity = new StyleFactorProperty( 'fontOpacity', 'inherit');

		this._whiteSpace = properties.whiteSpace ? new properties.whiteSpace() : new WhiteSpaceProperty();

		this._fontFamily = properties.fontFamily ? new properties.fontFamily() : new FontFamilyProperty();
		this._fontStyle = properties.fontStyle ? new properties.fontStyle() : new FontStyleProperty( 'normal' );
		this._fontWeight = properties.fontWeight ? new properties.fontWeight() : new FontWeightProperty();
		this._fontSize = properties.fontSize ? new properties.fontSize() : new FontSizeProperty();

		this._lineHeight = properties.lineHeight ? new properties.lineHeight() : new LineHeightProperty();

		this._fontKerning = properties.fontKerning ? new properties.fontKerning() : new FontKerningProperty();
		this._letterSpacing = properties.letterSpacing ? new properties.letterSpacing() : new LetterSpacingProperty();

		this._overflow = new Overflow( 'visible' );

		this._borderRadius = new BorderRadius( 0 );
		this._borderWidth = new BorderWidth( 0 );
		this._borderColor = new StyleColorProperty( 'borderColor', 0xff00ff );
		this._borderOpacity = new StyleFactorProperty( 'borderOpacity', 1);

		// styles ---;

		this._font = new FontProperty();

		this._lineBreak = properties.lineBreak ? new properties.lineBreak() : new EmptyProperty("lineBreak");

		/**
		 *
		 * @type {TextContentEmpty|TextContentText|TextContentInline}
		 * @internal
		 */
		this._textContent = properties.textContent ? new properties.textContent() : new TextContentEmpty();

		/**
		 *
		 * @type {GlyphsProperty}
		 * @internal
		 */
		this._glyphs = properties.glyphs ? new properties.glyphs() : new EmptyProperty("glyphs");

		this._inlines = properties.inlines ? new properties.inlines() : new EmptyProperty("inlines");


		/**
		 *
		 * @type {BoxLayouter|TextLayouter|EmptyProperty}
		 * @internal
		 */
		this._layouter = properties.layouter ? new properties.layouter() : new EmptyProperty("layouter");

		this._inlineJustificator = new InlineJustificator();

		this._textAlign = properties.textAlign ? new properties.textAlign() : new TextAlignProperty();

		this._autoSize = properties.autoSize ? new properties.autoSize() : new EmptyProperty("autoSize");

		this._renderer = properties.renderer ? new properties.renderer() : new EmptyProperty("renderer");

		this._offset = new OffsetProperty();

		// adds
		this._invertAlpha = new InvertAlphaProperty();
		this._fontSmooth = properties.fontSmooth ? new properties.fontSmooth() : new FontSmoothProperty();

		/**
		 *
		 * @type {Array.<BaseProperty>}
		 * @internal
		 */
		this._components = [

			this._children,
			this._parent,


			this._autoSize,


			this._fontFamily,
			this._fontStyle,
			this._fontWeight,
			this._font,

			this._whiteSpace,

			this._textContent,
			this._glyphs,

			this._inlines,

			this._visible,

			// Meshes interfaces
			this._backgroundSide,
			this._fontSide,
			this._backgroundAlphaTest,
			this._fontAlphaTest,
			this._backgroundCastShadow,
			this._fontCastShadow,
			this._backgroundReceiveShadow,
			this._fontReceiveShadow,
			this._renderOrder,
			this._segments,
			// styles ---;

			this._padding,
			this._margin,
			this._width,
			this._height,
			this._borderWidth,
			this._boxSizing,

			this._bounds,

			this._position,


			this._flexDirection,
			this._justifyContent,
			this._alignItems,
			this._order,


			this._display,
			this._backgroundColor,
			this._backgroundOpacity,
			this._backgroundImage,
			this._backgroundSize,
			this._fontOpacity,
			this._color,


			// font : update order : WhiteSpace > Glyph > Inlines > Kerning > newlineBreakability > LineBreak > FontSize
			// font : process order : ??
			// this._font,

			this._fontSize,
			this._lineHeight,
			this._fontKerning,
			this._letterSpacing,

			this._borderRadius,
			this._borderColor,
			this._borderOpacity,

			// this._styles,
			// styles ---;
			this._lineBreak,
			this._offset,
			this._layouter,

			this._inlineJustificator,
			this._textAlign,


			// !! this._renderer renderer MUST NOT BE in components !!

			this._invertAlpha,
			this._fontSmooth,

			this._fontMaterial,
			this._fontCustomDepthMaterial,
			this._renderer,
			this._overflow,
		]


		/**
		 *
		 * @type {*[]}
		 * @private
		 */
		this._onAfterUpdates = [];


		// breaks inheritance chains
		// if( !values ) values = {};
		if( !values.backgroundSide ) values.backgroundSide = 0; // FrontSide


		if( values ) this.set( values );

	}


	///////////////
	///  UPDATE
	///////////////

	update( ) {


		// console.log( "Update Element", this.name , this.constructor.name );

		const out = {};
		for ( const component of this._components ) {

			if( component._needsUpdate ) {

				// console.log( '    ', component.id )
				component.update( this, out );
				component._needsUpdate = false;

			}

		}

		this._transferToBackgroundMesh( out );
		this._transferToFontMesh( out );

		this._transferToBackgroundMaterial( out );
		this._transferToFontMaterial( out );


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


		// console.log( 'Process ', this.name );
		for ( const component of this._components ) {

			if( component._needsProcess ) {

				// console.log( '    ', component.id );
				component.process( this );
				component._needsProcess = false;

			}

		}

	}

	render() {

		// console.log( 'render ', this.name );
		for ( let i = 0; i < this._components.length; i++ ) {
			const component = this._components[ i ];
			if( component._needsRender ) {
				// console.log( '    ', component.id);
				component.render( this );
				component._needsRender = false;
			}
		}

		// render all children
		for ( const child of this._children._uis ) {
			child.render();
		}

	}


	/**
	 *
	 * @param {Options} options
	 */
	set( options ) {

		// Retro compatibility, when not recommended way
		// 2. < v7.x.x way
		if( options.fontTexture ) {

			console.warn( "ThreeMeshUI::set( {fontTexture} ) is deprecated. Please use fontLibrary to register font families and variants.")

			if( options.fontFamily ) {

				// Set from old way, check if that family is already registered
				const fontName = options.fontFamily.pages ? options.fontFamily.info.face : options.fontFamily;

				let fontFamily = FontLibrary.getFontFamily( fontName );

				if ( !fontFamily ) {

					const fontStyle = options.fontStyle ? options.fontStyle : 'normal';
					const fontWeight = options.fontWeight ? options.fontWeight : '400';

					fontFamily = FontLibrary.addFontFamily( fontName )
						.addVariant( fontWeight, fontStyle, options.fontFamily, options.fontTexture );

				}

				options['fontFamily'] = fontFamily;

				delete options['fontTexture'];

			}

		}



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

				case "borderTopColor":
				case "borderBottomColor":
				case "borderLeftColor":
				case "borderRightColor":
					prop = 'borderColor';
					break;
			}

				switch ( prop ) {

				// properties

				// As textContent property might alter the hierarchy, do not wait until update
				// 	case 'textContent' :

					case 'fontSmooth':
					case 'renderOrder':
					case 'segments' :
					case 'visible' :
					case 'offset':
						this[`_${prop}`].value = value;
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
					case 'order':
					case 'boxSizing':
						if( this[`_${prop}`] ){
							this[`_${prop}`].inline = value;
						}
						break;

					case 'paddingTop':
						this._padding.top = value;
						break;
					case 'paddingRight':
						this._padding.right = value;
						break;
					case 'paddingBottom':
						this._padding.bottom = value;
						break;
					case 'paddingLeft':
						this._padding.left = value;
						break;

					case 'marginTop':
						this._margin.top = value;
						break;
					case 'marginRight':
						this._margin.right = value;
						break;
					case 'marginBottom':
						this._margin.bottom = value;
						break;
					case 'marginLeft':
						this._margin.left = value;
						break;

					case 'borderTopWidth':
						this._borderWidth.top = value;
						break;
					case 'borderRightWidth':
						this._borderWidth.right = value;
						break;
					case 'borderBottomWidth':
						this._borderWidth.bottom = value;
						break;
					case 'borderLeftWidth':
						this._borderWidth.left = value;
						break;

					case 'borderTopLeftRadius':
						this._borderRadius.topLeft = value;
						break;
					case 'borderTopRightRadius':
						this._borderRadius.topRight = value;
						break;
					case 'borderBottomRightRadius':
						this._borderRadius.bottomRight = value;
						break;
					case 'borderBottomLeftRadius':
						this._borderRadius.bottomLeft = value;
						break;


					// Back & Front linked properties
					case 'side':
					case 'castShadow':
					case 'receiveShadow':
						const upperCamelCaseProperty = prop.charAt(0).toUpperCase()+prop.substr(1);
						this[`_background${upperCamelCaseProperty}`].value = value;
						this[`_font${upperCamelCaseProperty}`].value = value;
						break;


						// Meshes & material properties
					case 'fontSide':
					case 'backgroundSide':
					case 'fontCastShadow':
					case 'backgroundCastShadow':
					case 'fontReceiveShadow':
					case 'backgroundReceiveShadow':
					case 'fontMaterial':
					case 'fontCustomDepthMaterial':
						this[`_${prop}`].value = value;
						break;


					default:

						if( this[ prop ] !== undefined ) {
							this[ prop ] = value
						}else if( this[`_${prop}`] !== undefined ) {
							this[`_${prop}`].value = value;
						} else {
							// error
						}
				}

		}

	}

	get ( property ) {

		switch ( property ) {

			case 'overflow':
			case 'width' :
			case 'height' :
				return this[`_${property}`].inline;
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

			UpdateManager.register( this );
			this.activatePseudoState('root');

		} else {

			UpdateManager.remove( this );
			this.deactivatePseudoState('root');
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

		let addedUIChildren = false;
		for ( let i = 0; i < arguments.length; i++ ) {

			super.add( arguments[ i ] );

			if( arguments[i].isUI ) {
				addedUIChildren = true;
			}

		}

		if( addedUIChildren ) this._rebuildChildrenLists();

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
	 * @return {Object3D}
	 */
	clear() {

		this.removeFromParent();

		this.traverse( ( obj ) => {

			if ( obj.material ) obj.material.dispose();
			if ( obj.geometry ) obj.geometry.dispose();

		} );

		super.clear();

		// remove properties
		this._backgroundMesh = null;
		this._backgroundMaterial = null;
		this._backgroundMaterialMediation = null;
		this._backgroundMeshMediation = null;

		this._children.dispose();
		this._children = null;

		this._parent.dispose();
		this._parent = null;

		this._backgroundSide = null;
		this._backgroundAlphaTest = null;
		this._visible = null;
		this._backgroundCastShadow = null;
		this._backgroundReceiveShadow = null;
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
		this._fontOpacity = null;
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

	/***********************************************************************************************************************
	 * TO MATERIAL HOLDER
	 **********************************************************************************************************************/

	/**
	 *
	 * @returns {Material|ShaderMaterial}
	 */
	get backgroundMaterial() { return this._backgroundMaterial; }

	/**
	 *
	 * @param {Material|ShaderMaterial} material
	 */
	set backgroundMaterial( material ) {

		this._backgroundMaterial = material;

		// Update the fontMaterialProperties that need to be transferred to
		this._backgroundMaterialMediation = { ...material.constructor.mediation };

		// transfer all the properties to material
		this._transferToBackgroundMaterial();

		if ( this._backgroundMesh ) {

			this._backgroundMesh.material = this._backgroundMaterial;
			uniformOrUserDataTransformer( material, 'frameSize', this._backgroundMesh.scale );

		}

	}

	/**
	 *
	 * @param {Material|null} material
	 */
	set backgroundCustomDepthMaterial( material ) {

		this._backgroundCustomDepthMaterial = material;

		this._transferToBackgroundMaterial();

		if ( this._backgroundMesh ) {
			// transfer to the main if isset
			this._backgroundMesh.customDepthMaterial = this._backgroundCustomDepthMaterial;

		}

	}

	/**
	 *
	 * @returns {Material|null}
	 */
	get backgroundCustomDepthMaterial() { return this._backgroundCustomDepthMaterial; }

	/**
	 * According to the list of materialProperties
	 * some properties are sent to material
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToBackgroundMaterial( options = null ) {

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, this._backgroundMaterial, options, this._backgroundMaterialMediation, this._backgroundCustomDepthMaterial );

	}

	/**
	 *
	 * @param {number} value
	 */
	set backgroundSide( value ) {

		this._backgroundSide.value = value;

		if ( this._backgroundMaterial ) this._backgroundMaterial.side = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get backgroundSide() { return this._backgroundSide.value; }

	/**
	 *
	 * @param {number} value
	 */
	set backgroundAlphaTest ( value ) {

		this._backgroundAlphaTest.value = value;

		if( this._backgroundMaterial ) this._backgroundMaterial.alphaTest = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get backgroundAlphaTest () { return this._backgroundAlphaTest.value; }

	/** Font Material ----------------------------------------------------------*/

	/**
	 *
	 * @returns {Material|ShaderMaterial}
	 */
	// get fontMaterial() { return this._fontMaterial__; }
	get fontMaterial() { return this._fontMaterial.value; }

	/**
	 *
	 * @param {Material|ShaderMaterial} material
	 */
	set fontMaterial( material ) {

		this._fontMaterial.value = material;

	}

	/**
	 *
	 * @param {Material|null} material
	 */
	set fontCustomDepthMaterial( material ) {

		this._fontCustomDepthMaterial.value = material;

	}

	/**
	 *
	 * @returns {Material|null}
	 */
	get fontCustomDepthMaterial() { return this._fontCustomDepthMaterial.value; }

	/**
	 * According to the list of materialProperties
	 * some properties are sent to material
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToFontMaterial( options = null ) {

		const fontMat = this._fontMaterial.value;
		if( !fontMat ) return;

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, fontMat, options, this._fontMaterial._mediation, this._fontCustomDepthMaterial.value );

	}

	/**
	 *
	 * @param {number} value
	 */
	set fontSide( value ) {

		this._fontSide.value = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get fontSide() { return this._fontSide.value; }

	/**
	 *
	 * @param {number} value
	 */
	set fontAlphaTest ( value ) {

		this._fontAlphaTest.value = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get fontAlphaTest () { return this._fontAlphaTest.value; }

	/*********************************************************************************************************************
	 * MESH MEDIATION
	 ********************************************************************************************************************/

	/**
	 * According to the list of meshProperties
	 * some properties are sent to mesh
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToBackgroundMesh( options = null ) {

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}


		}

		Mediator.mediate( this, this._backgroundMesh, options, this._backgroundMeshMediation );

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

			if( this._backgroundCustomDepthMaterial ) {
				this._backgroundMesh.customDepthMaterial = this._backgroundCustomDepthMaterial;
			}

			if( this._backgroundMaterial ) {
				uniformOrUserDataTransformer( this._backgroundMaterial, 'frameSize', this._backgroundMesh.scale );
			}

			this._transferToBackgroundMesh();

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


	activatePseudoState ( state ) {

	}

	deactivatePseudoState ( state ) {

	}

	togglePseudoState ( state ) {

	}


	hasPseudoState( state ) {
		return false;
	}

	set borderRadiusMediation ( value ) {
		this._borderRadius.mediation = value;
	}

	/**
	 *
	 * @param {boolean} value
	 */
	set backgroundCastShadow( value ) {

		if( this._backgroundCastShadow ) this._backgroundCastShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get backgroundCastShadow() { return this._backgroundCastShadow; }

	/**
	 *
	 * @param {boolean} value
	 */
	set backgroundReceiveShadow( value ) {

		if( this._backgroundReceiveShadow ) this._backgroundReceiveShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get backgroundReceiveShadow() { return this._backgroundReceiveShadow; }

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

	/** Font Mesh --------------------------------------------------------------*/

	/**
	 * According to the list of meshProperties
	 * some properties are sent to mesh
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToFontMesh( options = null ) {

		if( !this._fontMesh ) return;

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, this._fontMesh, options, this._fontMeshMediation );

	}

	/**
	 * @internal
	 * @param {Mesh|Array.<Mesh>|null} mesh
	 */
	setFontMesh( mesh ) {

		if( this._fontMesh ) {

			this.remove( this._fontMesh );

			if ( this._fontMesh.material ) this._fontMesh.material.dispose();
			if ( this._fontMesh.geometry ) this._fontMesh.geometry.dispose();

			this._fontMesh = null;
			// deepDelete( this._fontMesh );

			this.unbindFontMeshProperties();

		}

		this._fontMesh = mesh;

		if ( this._fontMesh ) {

			this._fontMesh.raycast = () => {};

			this.bindFontMeshProperties();

			this._transferToFontMaterial();
			this._transferToFontMesh();

			this.add( this._fontMesh );

		}

	}

	/**
	 *
	 */
	bindFontMeshProperties () { }

	/**
	 *
	 */
	unbindFontMeshProperties () { }

	/**
	 *
	 * @param {boolean} value
	 */
	set fontCastShadow( value ) {

		if( this._fontCastShadow ) this._fontCastShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get fontCastShadow() { return this._fontCastShadow; }

	/**
	 *
	 * @param {boolean} value
	 */
	set fontReceiveShadow( value ) {

		if( this._fontReceiveShadow ) this._fontReceiveShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get fontReceiveShadow() { return this._fontReceiveShadow; }

	/***********************************************************************************************************************
	 * GEOMETRY
	 **********************************************************************************************************************/

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

		console.warn( 'ThreeMeshUI v7xx : `onAfterUpdate()` property has been deprecated, please rely on `addAfterUpdate` instead.' );
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

	/**
	 *
	 * @param {string} name
	 * @param {BaseProperty} instance
	 * @returns {void}
	 */
	appendProperty( name, instance ) {

		this[`_${name}`] = instance;
		this._components.push( instance );

	}

	/**
	 *
	 * @param {string} name
	 * @param {BaseProperty} instance
	 * @returns {BaseProperty}
	 */
	replaceProperty( name, instance ) {

		const oldProperty = this[`_${name}`];

		const index = this._components.indexOf( oldProperty );

		this._components[index] = this[`_${name}`] = instance;
		instance.needsUpdate = true;

		return oldProperty;

	}

}

/**
 * @typedef Properties
 * @type {Object.<string,Function>}
 */

/**
 * @typedef Options
 * @type {DocumentedOptions & Object.<string,any>}
 */

/**
 *
 * @typedef {Object} DocumentedOptions
 *
 * @property [options.name] {string}
 * @property [options.flexDirection] {"row"|"row-reverse"|"column"|"column-reverse"}
 * @property [options.justifyContent] {"start"|"center"|"end"|"space-around"|"space-between"|"space-evenly"}
 * @property [options.alignItems] {"start"|"center"|"end"|"stretch"}
 * @property [options.overflow] {"visible"|"hidden"}
 * @property [options.fontKerning] {"normal"|"none"}
 * @property [options.segments] {number}
 * @property [options.fontStyle] {"normal"|"italic"}
 * @property [options.fontWeight] {"light"|"normal"|"bold"|"bolder"|100|200|300|400|500|600|700|800|900}
 *
 * @property [options.color]{Color|number|string} The font color
 *
 * @property [options.backgroundColor]{Color|number|string} The background color
 * @property [options.backgroundOpacity] {number}
 * @property [options.backgroundSize] {"cover"|"contain"|"stretch"}
 * @property [options.backgroundImage] {Texture|string}
 *
 *
 * @property [options.borderRadius] {Vector4|Array.<number>|number|string}
 * @property [options.borderWidth] {Vector4|Array.<number>|number|string}
 * @property [options.borderColor] {Color|number|string}
 *
 * @property [options.boxSizing] {"content-box"|"border-box"}
 * @property [options.width] {number|string|"100%"|"auto"}
 * @property [options.height] {number|string|"100%"|"auto"}
 * @property [options.padding] {Vector4|Array.<number>|number|string}
 * @property [options.margin] {Vector4|Array.<number>|number|string}
 *
 * @property [options.textAlign] {"left"|"right"|"center"|"justify"|"justify-left"|"justify-right"}
 * @property [options.visible] {boolean}
 * @property [options.letterSpacing] {number}
 *
 * @property [options.whiteSpace] {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"}
 * @property [options.fontTexture] {Texture|string} @deprecated
 * @property [options.textContent] {string}
 *
 */
