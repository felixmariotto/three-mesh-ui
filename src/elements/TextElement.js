import ElementVR from '../core/elements/ElementVR';
import BoxElement from './BoxElement';
import LineBreakProperty from '../core/properties/LineBreakProperty';
import TextContentProperty from '../core/properties/TextContentProperty';
import GlyphsProperty from '../core/properties/GlyphsProperty';
import InlinesProperty from '../core/properties/InlinesProperty';
import InlineManager from '../core/properties/InlineManager';
import InlineJustificator from '../core/properties/InlineJustificator';

export default class TextElement extends BoxElement {

	constructor() {

		super();

		this.isText = true;

		// inline manager => layouter

		// this._lineBreak = new LineBreakProperty();
		// this._textContent = new TextContentProperty();
		// this._glyphs = new GlyphsProperty();
		// this._inlines = new InlinesProperty();
		// this._inlineManager = new InlineManager();
		// this._inlineJustificator = new InlineJustificator();

	}

	/**
	 * A Text Element can only contains inline elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) {

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if( argument.isUI && argument.isInline ) {

				validChildren.push( argument )

			}

			validChildren.push( argument );

		}

		return super.add( ...validChildren );

	}

}
