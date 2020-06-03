
/*
	Job:
		- Holding basic identity information of this component : type, id, parent, children
		- Getting this component attribute, from itself or from its parents
		- Hold states information, and update state
	Knows:
		- This component type, id, parent and children
*/

import { Object3D } from 'three/src/core/Object3D.js';
import { Plane } from 'three/src/math/Plane.js';
import { Vector3 } from 'three/src/math/Vector3.js';

import FontLibrary from './FontLibrary.js';
import UpdateManager from './UpdateManager.js';

import DEFAULTS from '../../utils/Defaults.js';

export default function MeshUIComponent() {

	return {

		states: {},
		currentState: undefined,
		isUI: true,

		getHighestParent,
		getContainer,
		getFontFamily,
		getFontSize,
		getBreakOn,
		getOffset,
		getParentsNumber,
		getAlignContent,
		getContentDirection,
		getJustifyContent,
		getInterLine,
		getFontTexture,
		getTextType,
		getFontColor,
		getFontOpacity,
		getBorderRadius,
		getBackgroundSize,
		getBackgroundColor,
		getBackgroundTexture,
		getBackgroundOpacity,
		getUIChildren,
		getUIParent,
		getClippingPlanes,

		update,
		_updateFontFamily,
		_updateFontTexture,
		_getProperty,
		set,
		setupState,
		setState,
		clear

	};

	/////////////
	/// GETTERS
	/////////////

	function getClippingPlanes() {

		const planes = [];

		if ( this.parent && this.parent.isUI ) {

			if ( this.isBlock ) {

				const yLimit = (this.parent.getHeight() / 2) - (this.parent.padding || 0);
				const xLimit = (this.parent.getWidth() / 2) - (this.parent.padding || 0);

				const newPlanes = [
					new Plane( new Vector3( 0, 1, 0 ), yLimit ),
					new Plane( new Vector3( 0, -1, 0 ), yLimit ),
					new Plane( new Vector3( 1, 0, 0 ), xLimit ),
					new Plane( new Vector3( -1, 0, 0 ), xLimit )
				];

				newPlanes.forEach( (plane)=> {

					plane.applyMatrix4( this.parent.matrixWorld );

				});

				planes.push( ...newPlanes );

			};

			if ( this.parent.parent && this.parent.parent.isUI ) {

				planes.push( ...this.parent.getClippingPlanes() );

			};

		};

		return planes;

	};

	//

	function getUIChildren() {

		return this.children.filter( (child)=> {

			return child.isUI

		});

	};

	//

	function getUIParent() {

		if ( this.parent && this.parent.isUI ) {

			return this.parent

		} else {

			return null

		};

	};

	// Get the highest parent of this component (the parent that has no parent on top of it)
	function getHighestParent() {

		if ( !this.getUIParent() ) {

			return this

		} else {

			return this.parent.getHighestParent();

		};

	};

	// look for a property in this object, and if does not find it, find in parents or return default value
	function _getProperty( propName ) {

		if ( this[ propName ] === undefined && this.getUIParent() ) {

			return this.parent._getProperty( propName )

		} else if ( this[ propName ] ) {

			return this[ propName ]

		} else {

			return DEFAULTS[ propName ]

		};

	};

	//
	
	function getFontSize() {
		return this._getProperty( 'fontSize' );
	};

	function getFontTexture() {
		return this._getProperty( 'fontTexture' );
	};

	function getFontFamily() {
		return this._getProperty( 'fontFamily' );
	};

	function getBreakOn() {
		return this._getProperty( 'breakOn' );
	};

	function getTextType() {
		return this._getProperty( 'textType' );
	};

	function getFontColor() {
		return this._getProperty( 'fontColor' );
	};

	function getFontOpacity() {
		return this._getProperty( 'fontOpacity' );
	};

	function getBorderRadius() {
		return this._getProperty( 'borderRadius' );
	};

	/// SPECIALS

	// return the first parent with a 'threeOBJ' property
	function getContainer() {

		if ( !this.threeOBJ && this.parent ) {

			return this.parent.getContainer();

		} else if ( this.threeOBJ ) {

			return this

		} else {

			return DEFAULTS.container

		};

	};

	// Get the number of UI parents above this elements (0 if no parent)
	function getParentsNumber( i ) {

		i = i || 0;

		if ( this.getUIParent() ) {

			return this.parent.getParentsNumber( i + 1 )

		} else {

			return i

		};

	};

	////////////////////////////////////
	/// GETTERS WITH NO PARENTS LOOKUP
	////////////////////////////////////

	function getBackgroundOpacity() {
		return ( !this.backgroundOpacity && this.backgroundOpacity !== 0 ) ?
					DEFAULTS.backgroundOpacity : this.backgroundOpacity;
	};

	function getBackgroundColor() {
		return this.backgroundColor || DEFAULTS.backgroundColor;
	};

	function getBackgroundTexture() {
		return this.backgroundTexture || DEFAULTS.backgroundTexture;
	};

	function getAlignContent() {
		return this.alignContent || DEFAULTS.alignContent;
	};

	function getContentDirection() {
		return this.contentDirection || DEFAULTS.contentDirection;
	};

	function getJustifyContent() {
		return this.justifyContent || DEFAULTS.justifyContent;
	};

	function getInterLine() {
		return (this.interLine === undefined) ? DEFAULTS.interLine : this.interLine;
	};

	function getOffset() {
		return (this.offset === undefined) ? DEFAULTS.offset : this.offset;
	};

	function getBackgroundSize() {
		return (this.backgroundSize === undefined) ? DEFAULTS.backgroundSize : this.backgroundSize;
	};

	///////////////
	///  UPDATE
	///////////////

	function update( updateParsing, updateLayout, updateInner ) {

		UpdateManager.requestUpdate( this, updateParsing, updateLayout, updateInner );

	};

	// Called by FontLibrary when the font requested for the current component is ready.
	// Trigger an update for the component whose font is now available.
	function _updateFontFamily( font ) {

		this.fontFamily = font;
		
		this.traverse( (child)=> {

			if ( child.isUI ) child.update( true, true, false );

		});

		this.getHighestParent().update( false, true, false );

	};

	function _updateFontTexture( texture ) {

		this.fontTexture = texture;

		this.getHighestParent().update( false, true, false );

	};

	// Set this component's passed parameters.
	// If necessary, take special actions.
	// Update this component unless otherwise specified.
	function set( options, layoutNeedsUpdate, innerNeedsUpdate ) {

		let parsingNeedsUpdate;

		// Register to the update manager, so that it knows when to update

		UpdateManager.register( this );

		// Abort if no option passed

		if ( !options || JSON.stringify(options) === JSON.stringify({}) ) return

		// Set this component parameters according to options, and trigger updates accordingly
		// The benefit of having two types of updates, is to put everthing that takes time
		// in one batch, and the rest in the other. This way, efficient animation is possible with
		// attribute from the light batch.

		for ( let prop of Object.keys(options) ) {

			switch ( prop ) {

				case "width" :
				case "height" :
				case "padding" :
				case "content" :
					parsingNeedsUpdate = true;
					layoutNeedsUpdate = true;
					this[ prop ] = options[ prop ];
					break;

				
				case "fontSize" :
				case "interLine" :
				case "margin" :
				case "contentDirection" :
				case "justifyContent" :
				case "alignContent" :
				case "content" :
				case "textType" :
				case "fontColor" :
				case "fontOpacity" :
				case "borderRadius" :
				case "backgroundSize" :
				case "src" :
					layoutNeedsUpdate = true;
					this[ prop ] = options[ prop ];
					break;

				case "fontMaterial" :
				case "offset" :
				case "backgroundColor" :
				case "backgroundOpacity" :
				case "backgroundTexture" :
					innerNeedsUpdate = true;
					this[ prop ] = options[ prop ];
					break;

			};

		};

		// special cases, this.update() must be called only when some files finished loading

		if ( options.fontFamily ) {
			FontLibrary.setFontFamily( this, options.fontFamily );
			layoutNeedsUpdate = false;
		};

		if ( options.fontTexture ) {
			FontLibrary.setFontTexture( this, options.fontTexture );
			layoutNeedsUpdate = false;
		};
		
		// Call component update

		this.update( parsingNeedsUpdate, layoutNeedsUpdate, innerNeedsUpdate );

		if ( layoutNeedsUpdate ) this.getHighestParent().update( false, true, false );
		
	};

	/////////////////////
	// STATES MANAGEMENT
	/////////////////////

	function setupState( options ) {

		this.states[ options.state ] = {
			attributes: options.attributes,
			onSet: options.onSet
		};

	};

	//

	function setState( state ) {

		const savedState = this.states[ state ];
		
		if ( !savedState ) {
			console.warn(`state "${ state }" does not exist within this component`);
			return
		};

		if ( state === this.currentState ) return

		this.currentState = state;

		if ( savedState.onSet ) savedState.onSet();

		if ( savedState.attributes ) this.set( savedState.attributes );

	};

	//

	function clear() {

		this.traverse( (obj)=> {

			UpdateManager.disposeOf( obj );

			if ( obj.material ) obj.material.dispose();

			if ( obj.geometry ) obj.geometry.dispose();

		});

	};

};
