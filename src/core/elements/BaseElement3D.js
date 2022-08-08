import { FrontSide, Object3D } from 'three';
import Mediator from '../../utils/mediator/Mediator';
import ChildrenProperty from '../properties/ChildrenProperty';
import ParentProperty from '../properties/ParentProperty';
import BooleanProperty from '../properties/BooleanProperty';
import NumberProperty from '../properties/NumberProperty';
import SideProperty from '../properties/SideProperty';
import UpdateManager from '../../components/core/UpdateManager';

export default class BaseElement3D extends Object3D {

	constructor() {

		super();

		/**
		 *
		 * @type {Mesh|null}
		 * @protected
		 */
		this._main = null;

		/**
		 *
		 * @type {Material}
		 * @protected
		 */
		this._material = null;

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @protected
		 */
		this._materialMediation = {};

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @private
		 */
		this._meshMediation = {
			_castShadow: { m: 'castShadow' },
			_receiveShadow: { m: 'receiveShadow' },
			_renderOrder:{m:'renderOrder' }
		};

		// Children lists
		this._children = new ChildrenProperty();

		this._parent = new ParentProperty();

		// update parentUI when this component will be added or removed
		this.addEventListener( 'added', this._rebuildParentUI );
		this.addEventListener( 'removed', this._rebuildParentUI );

		//material properties
		this._side = new SideProperty( /*default FrontSide*/ );
		this._alphaTest = new NumberProperty('alphaTest', 0.02 );

		// mesh properties
		this._visible = new BooleanProperty( 'visible', true );
		this._castShadow = new BooleanProperty( 'castShadow', false );
		this._receiveShadow = new BooleanProperty( 'receiveShadow', false );
		this._renderOrder = new NumberProperty( 'renderOrder', 0 );

		this._segments = new NumberProperty( 'segments', 1 );

		/**
		 *
		 * @type {Array.<BaseProperty>}
		 * @protected
		 */
		this._components = [
			this._children,
			this._parent,
			this._side,
			this._alphaTest,
			this._visible,
			this._castShadow,
			this._receiveShadow,
			this._renderOrder,
			this._segments
		]
	}


	///////////////
	///  UPDATE
	///////////////

	get needsUpdate() {

		return this._components.some( x => x._needsUpdate );

	}

	update( ) {

		const out = {};
		for ( const component of this._components ) {

			if( component._needsUpdate ) {

				console.log( component.id );
				component.update( this, out );
				component._needsUpdate = false;

			}

		}

		console.log( "updated", out );

		this._transferToMaterial( out );

	}

	get needsProcess() {

		return this._components.some( x => x._needsProcess );

	}



	process( vrElement ) {

		for ( const component of this._components ) {

			if( component._needsProcess ) {

				console.log( "process", component );
				component.process( this );
				component._needsProcess = false;

			}

		}

	}

	/**
	 * Filters children in order to compute only one times children lists
	 * @private
	 */
	_rebuildChildrenLists() {

		this._children._needsUpdate = true;

	}

	/**
	 * Try to retrieve parentUI after each structural change
	 * @private
	 */
	_rebuildParentUI = () => {

		this._parent._needsUpdate = true;

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

		for ( const id of Object.keys( arguments ) ) {

			// An inline component relies on its parent for positioning
			if ( arguments[ id ].isUI ) this.update( null, true );
			// if ( arguments[ id ].isInline ) this.update( null, true );

		}

		super.add( ...arguments );

		this._rebuildChildrenLists();

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
	 * @return {BaseElement3D}
	 */
	clear() {


		this.traverse( ( obj ) => {

			UpdateManager.disposeOf( obj );

			if ( obj.material ) obj.material.dispose();
			if ( obj.geometry ) obj.geometry.dispose();

		} );

		super.clear();

		// remove properties
		this._main = null;
		this._material = null;
		this._materialMediation = null;
		this._meshMediation = null;

		this._children.dispose();
		this._children = null;

		this._parent.dispose();
		this._parent = null;

		this._side = null;
		this._alphaTest = null;
		this._visible = null;
		this._castShadow = null;
		this._receiveShadow = null;
		this._renderOrder = null;
		this._segments = null;

		return this;
	}

	/*********************************************************************************************************************
	 * FONTS
	 ********************************************************************************************************************/

	/**
	 * @param {FontVariant} value
	 */
	set font( value ) {

		this._font = value;

	}

	/**
	 *
	 * @returns {FontVariant}
	 */
	get font() { return this._font; }


	/***********************************************************************************************************************
	 * TO MATERIAL HOLDER
	 **********************************************************************************************************************/

	/**
	 *
	 * @returns {Material|ShaderMaterial}
	 */
	get material() { return this._material; }

	/**
	 *
	 * @param {Material|ShaderMaterial} material
	 */
	set material( material ) {

		this._material = material;

		// Update the fontMaterialProperties that need to be transferred to
		this._materialMediation = { ...material.constructor.mediation };

		// transfer all the properties to material
		this._transferToMaterial();

		if ( this._main ) {

			this._main.material = this._material;

		}

	}

	/**
	 *
	 * @param {Material|null} material
	 */
	set customDepthMaterial( material ) {

		this._customDepthMaterial = material;

		this._transferToMaterial();

		if ( this._main ) {
			// transfer to the main if isset
			this._main.customDepthMaterial = this._customDepthMaterial;

		}

	}

	/**
	 *
	 * @returns {Material|null}
	 */
	get customDepthMaterial() { return this._customDepthMaterial; }

	/**
	 * According to the list of materialProperties
	 * some properties are sent to material
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToMaterial( options = null ) {

		Mediator.mediate( this, this._material, options, this._materialMediation, this.customDepthMaterial );

	}

	/**
	 *
	 * @param {number} value
	 */
	set side( value ) {

		this._side.value = value;

		if ( this._material ) this._material.side = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get side() { return this._side.value; }

	/**
	 *
	 * @param {number} value
	 */
	set alphaTest ( value ) {

		this._alphaTest.value = value;

		if( this._material ) this._material.alphaTest = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get alphaTest () { return this._alphaTest.value; }

	/*********************************************************************************************************************
	 * MESH MEDIATION
	 ********************************************************************************************************************/

	/**
	 *
	 * @param {boolean} value
	 */
	set visible( value ) {

		if( this._visible ) {
			this._visible.value = value;
		}

	}

	/**
	 *
	 * @return {boolean}
	 */
	get visible() { return this._visible.value; }

	/**
	 *
	 * @param {boolean} value
	 */
	set castShadow( value ) {

		this._castShadow = value;

		if ( this._main ) this._main.castShadow = v;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get castShadow() { return this._castShadow; }

	/**
	 *
	 * @param {boolean} value
	 */
	set receiveShadow( value ) {

		this._receiveShadow = value;

		if ( this._main ) this._main.receiveShadow = this._receiveShadow;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get receiveShadow() { return this._receiveShadow; }

	/**
	 *
	 * @param {number} value
	 */
	set renderOrder( value ) {

		if( this._renderOrder ) {

			this._renderOrder.value = value;

			if ( this._main ) this._main.renderOrder = this._renderOrder;

		}
	}

	/**
	 *
	 * @return {number}
	 */
	get renderOrder() { return this._renderOrder.value; }


	// Geometry

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

}
