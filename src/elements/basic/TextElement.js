import BoxElement from './BoxElement';
import TextContentText from '../../core/properties/TextContentText';
import TextLayouter from '../../core/properties/TextLayouter';
import TextAlignPropertyText from '../../core/properties/style-properties/font/TextAlignPropertyText';
import FlexDirectionPropertyText from '../../core/properties/style-properties/flex/FlexDirectionPropertyText';
import JustifyContentProperty from '../../core/properties/style-properties/flex/JustifyContentProperty';
import AlignItemsProperty from '../../core/properties/style-properties/flex/AlignItemsProperty';
import LineHeightPropertyInline from '../../core/properties/style-properties/font/LineHeightPropertyInline';
import WhiteSpacePropertyInline from '../../core/properties/style-properties/font/WhiteSpacePropertyInline';
import SegmentsPropertyText from '../../core/properties/geometry/SegmentsPropertyText';
import FontKerningPropertyText from '../../core/properties/style-properties/font/FontKerningPropertyText';
import BoundsText from '../../core/properties/BoundsText';
import ChildrenText from '../../core/properties/hierarchy/ChildrenText';
import AutoSizePropertyText from '../../core/properties/AutoSizePropertyText';
import RendererPropertyText from '../../core/properties/rendering/RendererPropertyText';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Object3D } from 'three';
import MeshUIBaseElement from '../../core/elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class TextElement extends BoxElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 * @param [properties={}]
	 */
	constructor( values = {}, properties = {}) {

		TextElement.definePropertiesValues( properties, values );

		super( properties, values );

		TextElement.init( this );


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
		let updateLayout = false;

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI || argument.isInline ) {

				if( argument.isInline ) {
					updateLayout = true;
				}

				validChildren.push( argument );

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		if( validChildren.length > 0 ) {

			super.add( ...validChildren )

		}

		if( updateLayout ) {
			this._children._needsUpdate = true;
			this._layouter._needsProcess = true;
		}

		return this;

	}


	set textContent ( value ) {

		this._textContent.value = value;

	}

	// Must redefine getter also, or issue.
	get textContent() {

		return super.textContent;

	}

	set invertAlpha( value ) {

		this._invertAlpha.value = value;

	}

	get invertAlpha () { return this._invertAlpha._value; }

	get lines() { return this._layouter._value; }

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {

		properties.flexDirection = FlexDirectionPropertyText;
		properties.justifyContent = JustifyContentProperty;
		properties.alignItems = AlignItemsProperty;
		properties.bounds = BoundsText;
		properties.autoSize = AutoSizePropertyText;
		properties.renderer = RendererPropertyText;

		if( !properties.children ) properties.children = ChildrenText;
		if( !properties.textContent ) properties.textContent = TextContentText;
		if( !properties.layouter ) properties.layouter = TextLayouter;
		if( !properties.lineHeight ) properties.lineHeight = LineHeightPropertyInline;
		if( !properties.textAlign ) properties.textAlign = TextAlignPropertyText;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.fontKerning ) properties.fontKerning = FontKerningPropertyText;
		if( !properties.segments ) properties.segments = SegmentsPropertyText;

		// configure
		if ( !values.width ) values.width = '100%';


		// break inheritance chains
		if ( !values.fontSide ) values.fontSide = 0; // FrontSide;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isText: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

	}
}
