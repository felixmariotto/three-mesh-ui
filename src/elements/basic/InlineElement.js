import ChildrenInline from '../../core/properties/hierarchy/ChildrenInline';
import MeshUIBaseElement from '../../core/elements/MeshUIBaseElement';
import TextContentInline from '../../core/properties/TextContentInline';
import InlinesProperty from '../../core/properties/InlinesProperty';
import GlyphsProperty from '../../core/properties/GlyphsProperty';
import FontFamilyProperty from '../../core/properties/style-properties/font/FontFamilyProperty';
import ColorProperty from '../../core/properties/style-properties/font/ColorProperty';
import LineBreakProperty from '../../core/properties/LineBreakProperty';
import InlineLayouter from '../../core/properties/InlineLayouter';
import FontSize from '../../core/properties/style-properties/font/FontSize';
import FontWeight from '../../core/properties/style-properties/font/FontWeight';

export default class InlineElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {Object.<string,any>} [values=null]
	 */
	constructor( values = null) {

		const properties = {};

		if( !properties.children ) properties.children = ChildrenInline;
		if( !properties.textContent ) properties.textContent = TextContentInline;
		if( !properties.glyphs ) properties.glyphs = GlyphsProperty;
		if( !properties.inlines ) properties.inlines = InlinesProperty;
		if( !properties.fontFamily ) properties.fontFamily = FontFamilyProperty;
		if( !properties.fontWeight ) properties.fontWeight = FontWeight;
		if( !properties.fontSize ) properties.fontSize = FontSize;
		if( !properties.color ) properties.color = ColorProperty;
		if( !properties.lineBreak ) properties.lineBreak = LineBreakProperty;
		if( !properties.layouter ) properties.layouter = InlineLayouter;

		// if( !properties.inlines ) properties.inlines = InlinesProperty;

		super( properties, values );

		Object.defineProperties( this, {
				isInline: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

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

}
