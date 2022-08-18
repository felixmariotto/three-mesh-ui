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

export default class BoxElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {Object.<string,Class>} [properties=null]
	 * @param {Object.<string,any>} [values=null]
	 */
	constructor( properties = null, values = null) {

		if( !properties ) properties = {};
		if( !properties.children ) properties.children = ChildrenBox;
		if( !properties.bounds ) properties.bounds = BoundsBox;
		if( !properties.flexDirection ) properties.flexDirection = FlexDirectionPropertyBox;
		if( !properties.justifyContent ) properties.justifyContent = JustifyContentPropertyBox;
		if( !properties.alignItems ) properties.alignItems = AlignItemsPropertyBox;
		if( !properties.position ) properties.position = PositionPropertyBox;

		if( !properties.renderer ) properties.renderer = RendererPropertyBox;

		super( properties, values );

		Object.defineProperties( this, {
				isBox: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);


		this.material = new FrameMaterial();
		this._renderer.process( this );

		this._backgroundMesh.visible = false;

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

}
