import Frame from '../../frame/Frame';
import FrameMaterial from '../../frame/materials/FrameMaterial';
import BoxElement from './BoxElement';
import ChildrenInline from '../../core/properties/hierarchy/ChildrenInline';
import BoundsText from '../../core/properties/BoundsText';
import StyleEmptyProperty from '../../core/properties/style-properties/StyleEmptyProperty';
import TextContentText from '../../core/properties/TextContentText';
import TextLayouter from '../../core/properties/TextLayouter';
import TextAlignPropertyText from '../../core/properties/style-properties/font/TextAlignPropertyText';
import FlexDirectionPropertyText from '../../core/properties/style-properties/flex/FlexDirectionPropertyText';

export default class TextElement extends BoxElement {

	/**
	 *
	 * @param {Object.<string,any>} [values=null]
	 */
	constructor( values = null) {

		const properties = {};

		properties.flexDirection = FlexDirectionPropertyText;
		properties.justifyContent = StyleEmptyProperty;
		properties.alignItems = StyleEmptyProperty;

		if( !properties.children ) properties.children = ChildrenInline;
		if( !properties.bounds ) properties.bounds = BoundsText;
		if( !properties.textContent ) properties.textContent = TextContentText;
		if( !properties.layouter ) properties.layouter = TextLayouter;
		if( !properties.textAlign ) properties.textAlign = TextAlignPropertyText;

		super( properties, values );

		Object.defineProperties( this, {
				isText: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);


		this.material = new FrameMaterial();
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

}
