
/*
	Job:
		- Holding basic identity information of this component : type, id, parent, children
		- Getting this component attribute, from itself or from its parents
		- Hold states information, and update state
	Knows:
		- This component type, id, parent and children
*/

import { Object3D } from 'three';

import FontLibrary from './FontLibrary';
import UpdateManager from './UpdateManager';

import DEFAULTS from '../../utils/Defaults';
import UniqueID from '../../utils/UniqueID';

export default function MeshUIComponent() {

	let component = {

		type: 'MeshUIComponent',
		id: UniqueID(),
		states: {},
		currentState: undefined,
		isUI: true,

		getHighestParent,
		getContainer,
		getFontFamily,
		getFontSize,
		getFontMaterial,
		getBackgroundMaterial,
		getBreakOn,
		getOffset,
		getParentsNumber,
		getAlignContent,
		getContentDirection,
		getJustifyContent,
		getInterline,
		getFontTexture,
		getTextType,
		getFontColor,
		getFontOpacity,
		getBorderRadius,
		getBackgroundSize,
		getUIChildren,
		getUIParent,

		update,
		_updateFontFamily,
		_updateFontTexture,
		_getProperty,
		set,
		setupState,
		setState

	};

	// Inherit from THREE.Object3D

	const propsObj = {};

	for ( let propName of Object.keys(component) ) {

		propsObj[ propName ] = {
			writable: true,
			configurable: true,
			value: component[ propName ]
		};

	};

	component = Object.create( new Object3D, propsObj )

	return component

	/////////////
	/// GETTERS
	/////////////

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

	function getFontMaterial() {
		return this._getProperty( 'fontMaterial' );
	};

	function getFontTexture() {
		return this._getProperty( 'fontTexture' );
	};

	function getFontFamily() {
		return this._getProperty( 'fontFamily' );
	};

	function getBackgroundMaterial() {
		return this._getProperty( 'backgroundMaterial' );
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

	function getBackgroundSize() {
		return this._getProperty( 'backgroundSize' );
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

	function getAlignContent() {
		return this.alignContent || DEFAULTS.alignContent;
	};

	function getContentDirection() {
		return this.contentDirection || DEFAULTS.contentDirection;
	};

	function getJustifyContent() {
		return this.justifyContent || DEFAULTS.justifyContent;
	};

	function getInterline() {
		return (this.interline === undefined) ? DEFAULTS.interline : this.interline;
	};

	function getOffset() {
		return (this.offset === undefined) ? DEFAULTS.offset : this.offset;
	};

	///////////////
	///  UPDATE
	///////////////

	function update( updateParsing, updateLayout, updateInner ) {

		UpdateManager.requestUpdate( this || component, updateParsing, updateLayout, updateInner );

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

				case "content" :
					parsingNeedsUpdate = true;

				case "width" :
				case "height" :
				case "fontSize" :
				case "interLine" :
				case "padding" :
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
					layoutNeedsUpdate = true;
					this[ prop ] = options[ prop ];
					break;

				case "fontMaterial" :
				case "offset" :
				case "backgroundMaterial" :
					innerNeedsUpdate = true;
					this[ prop ] = options[ prop ];
					break;

			};

		};

		// special cases, this.update() must be called only when some files finished loading

		if ( options.fontFamily ) {
			FontLibrary.setFontFamily( this, options.fontFamily );
			layoutNeedsUpdate = false;
			innerNeedsUpdate = false;
		};

		if ( options.fontTexture ) {
			FontLibrary.setFontTexture( this, options.fontTexture );
			layoutNeedsUpdate = false;
			innerNeedsUpdate = false;
		};
		
		// Call component update

		update( parsingNeedsUpdate, layoutNeedsUpdate, innerNeedsUpdate );

		if ( layoutNeedsUpdate ) this.getHighestParent().update( false, true, false );
		
	};

	/////////////////////
	// STATE MANAGEMENT
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
		
		if ( !savedState || state === this.currentState ) return

		this.currentState = state;

		if ( savedState.onSet ) savedState.onSet();

		if ( savedState.attributes ) this.set( savedState.attributes );

	};

};
