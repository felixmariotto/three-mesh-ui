import LineBreakProperty from '../../core/properties/LineBreakProperty';
import ChildrenInline from '../../core/properties/hierarchy/ChildrenInline';
import FontKerningProperty from '../../core/properties/style-properties/font/FontKerningProperty';
import BackgroundColorProperty from '../../core/properties/style-properties/background/BackgroundColorProperty';
import MeshUIBaseElement from '../../core/elements/MeshUIBaseElement';
import InlineLayouter from '../../core/properties/InlineLayouter';
import Inline from '../../core/elements/glyphs/Inline';
import FrameMaterial from '../../frame/materials/FrameMaterial';
import InlinesPropertyInlineBlock from '../../core/properties/InlinesPropertyInlineBlock';
import LetterSpacingPropertyInline from '../../core/properties/style-properties/font/LetterSpacingPropertyInline';
import FontSizePropertyInline from '../../core/properties/style-properties/font/FontSizePropertyInline';
import RendererPropertyInlineBox from '../../core/properties/rendering/RendererPropertyInlineBox';
import BoundsInlineBlock from '../../core/properties/BoundsInlineBlock';
import { Vector3 } from 'three';
import WhiteSpacePropertyInline from '../../core/properties/style-properties/font/WhiteSpacePropertyInline';
import FontFamilyPropertyInline from '../../core/properties/style-properties/font/FontFamilyPropertyInline';
import FontWeightPropertyInline from '../../core/properties/style-properties/font/FontWeightPropertyInline';
import FontStylePropertyInline from '../../core/properties/style-properties/font/FontStylePropertyInline';

export default class InlineBlockElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 */
	constructor( values = {}) {

		const properties = {};
		InlineBlockElement.definePropertiesValues( properties, values );

		super( properties, values );

		InlineBlockElement.init( this );

	}

	clear() {

		// remove cross reference
		for ( const inline of this._inlines._value ) {
			inline.clear();
		}

		return super.clear();
	}

	/**
	 * When the backgroundMesh has been set, bind properties
	 * @override
	 */
	bindBackgroundMeshProperties () {

		this._backgroundMesh.raycast = ()=>{};

		// bind the background scale with bounds
		this._bounds._size = this._backgroundMesh.scale;
		this._bounds._needsUpdate = true;

	}

	/**
	 * When the backgroundMesh has been unset, unbind properties
	 * @override
	 */
	unbindBackgroundMeshProperties () {

		// detach bounds size
		this._bounds._size = new Vector3(1,1,1);
		this._bounds._needsUpdate = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) { /* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI ) {

				validChildren.push( argument );

				argument.position.z = 0.005;

			} else {

				console.warn( 'ThreeMeshUI::InlineBlockElement cannot contains UI Elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}


	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {

		if( !properties.children ) properties.children = ChildrenInline;
		if( !properties.bounds ) properties.bounds = BoundsInlineBlock;
		if( !properties.inlines ) properties.inlines = InlinesPropertyInlineBlock;
		if( !properties.layouter ) properties.layouter = InlineLayouter;
		if( !properties.renderer ) properties.renderer = RendererPropertyInlineBox;

		// reset inlineElement specificity
		if( !properties.fontFamily ) properties.fontFamily = FontFamilyPropertyInline;
		if( !properties.fontWeight ) properties.fontWeight = FontWeightPropertyInline;
		if( !properties.fontStyle ) properties.fontStyle = FontStylePropertyInline;
		if( !properties.fontSize ) properties.fontSize = FontSizePropertyInline;

		if( !properties.backgroundColor ) properties.backgroundColor = BackgroundColorProperty;

		if( !properties.lineBreak ) properties.lineBreak = LineBreakProperty;
		if( !properties.letterSpacing ) properties.letterSpacing = LetterSpacingPropertyInline;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.fontKerning ) properties.fontKerning = FontKerningProperty;

		if( !values.backgroundSize ) values.backgroundSize = 'cover';
		if( !values.width ) values.width = '100%';
		if( !values.height ) values.height = '100%';
		if( !values.boxSizing ) values.boxSizing = 'border-box';

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isInline: {
					configurable: false,
					enumerable: true,
					value: true
				},
				isInlineBlock: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

		element._inlines._value = [new InlineBlockInline(element)];

		element.backgroundMaterial = new FrameMaterial();
		element._renderer.render( element );

	}

}




/**
 * InlineBlock has its own Inline implementation
 */
class InlineBlockInline extends Inline {

	/**
	 *
	 * @param {InlineBlockElement} parent
	 */
	constructor( parent ) {

		super();

		/**
		 * @TODO: This currently make a circular reference that should ideally be removed
		 * @type {InlineBlockElement}
		 * @private
		 */
		this._uiElement = parent;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get xadvance() {

		const padding = this._uiElement._padding._value;
		const width = this._uiElement._width;
		if( width._relative ) {
			return width._value * this._uiElement._fontSize.getInheritedInput( this._uiElement );
		}

		return padding.w + padding.y + width.value ;
	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get width() {

		const width = this._uiElement._width;

		if( width._relative ) {
			return width._value * this._uiElement._fontSize.getInheritedInput( this._uiElement );
		}

		return width.value;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get height() {

		const height = this._uiElement._height;
		if( height._relative ) {
			return height._value * this._uiElement._fontSize.getInheritedInput( this._uiElement ) ;
		}

		return height.value;

	}

	get anchor(){
		return this.height;
	}


	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineHeight() {

		const height = this._uiElement._height;
		if( height._relative ) {
			return height._value * this._uiElement._fontSize.getInheritedInput( this._uiElement );
		}

		return height.value;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineBase() {

		const height = this._uiElement._height;
		if( height._relative ) {
			return height._value * this._uiElement._fontSize.getInheritedInput( this._uiElement );
		}

		return height.value;

	}

	/**
	 *
	 */
	clear() {

		this._uiElement = null;

	}

}

