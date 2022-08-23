import Frame from '../../frame/Frame';
import FrameMaterial from '../../frame/materials/FrameMaterial';
import BoxElement from './BoxElement';
import TextContentText from '../../core/properties/TextContentText';
import TextLayouter from '../../core/properties/TextLayouter';
import TextAlignPropertyText from '../../core/properties/style-properties/font/TextAlignPropertyText';
import FlexDirectionPropertyText from '../../core/properties/style-properties/flex/FlexDirectionPropertyText';
import InlineElement from './InlineElement';
import JustifyContentProperty from '../../core/properties/style-properties/flex/JustifyContentProperty';
import AlignItemsProperty from '../../core/properties/style-properties/flex/AlignItemsProperty';
import LineHeightPropertyInline from '../../core/properties/style-properties/font/LineHeightPropertyInline';
import WhiteSpacePropertyInline from '../../core/properties/style-properties/font/WhiteSpacePropertyInline';
import SegmentsPropertyText from '../../core/properties/geometry/SegmentsPropertyText';
import FontKerningPropertyText from '../../core/properties/style-properties/font/FontKerningPropertyText';
import BoundsText from '../../core/properties/BoundsText';
import ChildrenText from '../../core/properties/hierarchy/ChildrenText';
import AutoSizePropertyText from '../../core/properties/AutoSizePropertyText';

export default class TextElement extends BoxElement {

	/**
	 *
	 * @param {Object.<string,any>} [values=null]
	 */
	constructor( values = null) {

		const properties = {};

		properties.flexDirection = FlexDirectionPropertyText;
		properties.justifyContent = JustifyContentProperty;
		properties.alignItems = AlignItemsProperty;
		properties.bounds = BoundsText;
		properties.autoSize = AutoSizePropertyText;

		if( !properties.children ) properties.children = ChildrenText;
		if( !properties.textContent ) properties.textContent = TextContentText;
		if( !properties.layouter ) properties.layouter = TextLayouter;
		if( !properties.lineHeight ) properties.lineHeight = LineHeightPropertyInline;
		if( !properties.textAlign ) properties.textAlign = TextAlignPropertyText;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.fontKerning ) properties.fontKerning = FontKerningPropertyText;
		if( !properties.segments ) properties.segments = SegmentsPropertyText;


		if( !values ) {
			values = {};
		}

		// configure
		if ( !values.width ) values.width = '100%';


		// break inheritance chains
		if ( !values.fontSide ) values.fontSide = 0; // FrontSide;

		super( properties, values );

		Object.defineProperties( this, {
				isText: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);


		this.backgroundMaterial = new FrameMaterial();
		this.setBackgroundMesh( new Frame(this) );

		this._backgroundMesh.visible = false;

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

				updateLayout = true;
				validChildren.push( argument );

				argument.position.z = 0.005;
				argument.renderOrder = argument.id;

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		if( validChildren.length > 0 ) {

			super.add( ...validChildren )

		}

		if( updateLayout ) this._layouter._needsProcess = true;


		return this;

	}


	set textContent ( value ) {

		for ( let i = this.children.length - 1 ; i >= 0; i-- ) {
			const child = this.children[ i ];
			if( child.isUI ) {

				this.remove( child );
				child.clear();

			}

		}

		if( value ) {

			this.add( new InlineElement({name:'anonymousInline',textContent:value}));

		}

	}

	set invertAlpha( value ) {

		this._invertAlpha.value = value;

	}

	get invertAlpha () { return this._invertAlpha._value; }

	get lines() { return this._layouter._value; }

}
