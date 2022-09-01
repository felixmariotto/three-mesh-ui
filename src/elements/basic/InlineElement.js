import MeshUIBaseElement from '../../core/elements/MeshUIBaseElement';
import TextContentInline from '../../core/properties/TextContentInline';
import InlinesProperty from '../../core/properties/InlinesProperty';
import GlyphsProperty from '../../core/properties/GlyphsProperty';
import ColorProperty from '../../core/properties/style-properties/font/ColorProperty';
import LineBreakProperty from '../../core/properties/LineBreakProperty';
import InlineLayouter from '../../core/properties/InlineLayouter';
import BackgroundColorPropertyInline from '../../core/properties/style-properties/background/BackgroundColorPropertyInline';
import FontStylePropertyInline from '../../core/properties/style-properties/font/FontStylePropertyInline';
import FontWeightPropertyInline from '../../core/properties/style-properties/font/FontWeightPropertyInline';
import FontFamilyPropertyInline from '../../core/properties/style-properties/font/FontFamilyPropertyInline';
import WhiteSpacePropertyInline from '../../core/properties/style-properties/font/WhiteSpacePropertyInline';
import LetterSpacingPropertyInline from '../../core/properties/style-properties/font/LetterSpacingPropertyInline';
import FontSizePropertyInline from '../../core/properties/style-properties/font/FontSizePropertyInline';
import SegmentsPropertyInline from '../../core/properties/geometry/SegmentsPropertyInline';
import FontKerningPropertyInline from '../../core/properties/style-properties/font/FontKerningPropertyInline';
import ChildrenInline from '../../core/properties/hierarchy/ChildrenInline';
import RendererPropertyInline from '../../core/properties/rendering/RendererPropertyInline';
import TextAlignPropertyInline from '../../core/properties/style-properties/font/TextAlignPropertyInline';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Object3D } from 'three';
/* eslint-enable no-unused-vars */

export default class InlineElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 */
	constructor( values = { }) {

		const properties = {};
		InlineElement.definePropertiesValues( properties, values );

		super( properties, values );

		InlineElement.init( this );

	}

	/* eslint-disable no-unused-vars */
	/**
	 * A Text Element can only contains inline elements
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

			if ( !argument.isUI || argument.isInline ) {

				validChildren.push( argument );

				argument.position.z = 0.005;

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}

	_rebuildParentUI = () => {

		super._rebuildParentUI();

		this._layouter._needsUpdate = true;

	}

	set textContent( value ) {

		this._textContent.value = value;

	}

	get textContent () { return this._textContent._value; }

	set invertAlpha( value ) {

		this._invertAlpha.value = value;

	}

	get invertAlpha () { return this._invertAlpha._value; }

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {  /* eslint-enable no-unused-vars */

		if( !properties.children ) properties.children = ChildrenInline;
		if( !properties.textContent ) properties.textContent = TextContentInline;
		if( !properties.glyphs ) properties.glyphs = GlyphsProperty;
		if( !properties.inlines ) properties.inlines = InlinesProperty;
		if( !properties.layouter ) properties.layouter = InlineLayouter;
		if( !properties.renderer ) properties.renderer = RendererPropertyInline;


		if( !properties.fontFamily ) properties.fontFamily = FontFamilyPropertyInline;
		if( !properties.fontWeight ) properties.fontWeight = FontWeightPropertyInline;
		if( !properties.fontStyle ) properties.fontStyle = FontStylePropertyInline;
		if( !properties.fontSize ) properties.fontSize = FontSizePropertyInline;
		if( !properties.color ) properties.color = ColorProperty;
		if( !properties.backgroundColor ) properties.backgroundColor = BackgroundColorPropertyInline;
		if( !properties.lineBreak ) properties.lineBreak = LineBreakProperty;
		if( !properties.letterSpacing ) properties.letterSpacing = LetterSpacingPropertyInline;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.segments ) properties.segments = SegmentsPropertyInline;
		if( !properties.textAlign ) properties.textAlign = TextAlignPropertyInline;

		if( !properties.fontKerning ) properties.fontKerning = FontKerningPropertyInline;

		// if( !properties.inlines ) properties.inlines = InlinesProperty;

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
				}
			}
		);

	}
}
