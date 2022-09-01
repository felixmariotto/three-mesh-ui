import FrameMaterial from '../../frame/materials/FrameMaterial';
import MeshUIBaseElement from '../../core/elements/MeshUIBaseElement';
import ChildrenBox from '../../core/properties/hierarchy/ChildrenBox';
import BoundsBox from '../../core/properties/BoundsBox';
import AlignItemsPropertyBox from '../../core/properties/style-properties/flex/AlignItemsPropertyBox';
import FlexDirectionPropertyBox from '../../core/properties/style-properties/flex/FlexDirectionPropertyBox';
import JustifyContentPropertyBox from '../../core/properties/style-properties/flex/JustifyContentPropertyBox';
import { Vector3 } from 'three';
import RendererPropertyBox from '../../core/properties/rendering/RendererPropertyBox';
import PositionPropertyBox from '../../core/properties/style-properties/PositionPropertyBox';
import AutoSizePropertyBox from '../../core/properties/AutoSizePropertyBox';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Object3D } from 'three';
/* eslint-enable no-unused-vars */

export default class BoxElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	constructor( properties, values) {

		BoxElement.definePropertiesValues( properties, values );

		super( properties, values );

		BoxElement.init( this );

	}

	/**
	 * When the backgroundMesh has been set, bind properties
	 * @override
	 */
	bindBackgroundMeshProperties () {

		// bind the background scale with bounds
		this._bounds._size = this._backgroundMesh.scale;
		this._bounds._needsProcess = true;

	}

	/**
	 * When the backgroundMesh has been unset, unbind properties
	 * @override
	 */
	unbindBackgroundMeshProperties () {

		// detach bounds size
		this._bounds._size = new Vector3(1,1,1);
		this._bounds._needsProcess = true;

	}


	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {

		// customize property
		if( !properties.children ) properties.children = ChildrenBox;
		if( !properties.bounds ) properties.bounds = BoundsBox;
		if( !properties.flexDirection ) properties.flexDirection = FlexDirectionPropertyBox;
		if( !properties.justifyContent ) properties.justifyContent = JustifyContentPropertyBox;
		if( !properties.alignItems ) properties.alignItems = AlignItemsPropertyBox;
		if( !properties.position ) properties.position = PositionPropertyBox;
		if( !properties.autoSize ) properties.autoSize = AutoSizePropertyBox;

		if( !properties.renderer ) properties.renderer = RendererPropertyBox;


		// configure
		// /* ie: * /if ( !values.width ) values.width = '100%';


		// break inheritance chains
		if ( !values.fontSide ) values.fontSide = 0; // FrontSide;
		if ( !values.invertAlpha ) values.invertAlpha = false;
		if ( !values.fontCastShadow ) values.fontCastShadow = false;
		if ( !values.fontReceiveShadow ) values.fontReceiveShadow = false;
		if ( !values.backgroundCastShadow ) values.backgroundCastShadow = false;
		if ( !values.backgroundReceiveShadow ) values.backgroundReceiveShadow = false;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isBox: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);


		element.backgroundMaterial = new FrameMaterial();
		element._renderer.render( element );

		element._backgroundMesh.visible = false;

	}

}
