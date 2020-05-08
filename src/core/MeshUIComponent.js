
/*
	Job:
		- Holding basic identity information of this component : type, id, parent, children
		- Getting this component attribute, from itself or from its parents
	Knows:
		- This component type, id, parent and children
*/

import FontLibrary from './FontLibrary';
import DEFAULTS from '../utils/Defaults';

function generateSerial() {

	const CHARS = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const serialLength = 10;

	let randomSerial = "";
	let i;
	let randomNumber;

	for (i = 0; i < serialLength; i = i + 1) {

		randomNumber = Math.floor(Math.random() * CHARS.length);

		randomSerial += CHARS.substring(randomNumber, randomNumber + 1);

	};

	return randomSerial

};

function MeshUIComponent() {

	const component = {

		children: [],
		parent: undefined,
		type: 'MeshUIComponent',
		id: generateSerial(),

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

		appendChild,
		removeChild,
		update,
		_addParent,
		_removeParent,
		_updateFont,
		_getProperty,
		set,
		setupHover

	};

	/////////////
	/// GETTERS
	/////////////

	// Get the highest parent of this component (the parent that has no parent on top of it)
	function getHighestParent() {

		if ( !this.parent ) {

			return this

		} else {

			return this.parent.getHighestParent();

		};

	};

	// look for a property in this object, and if does not find it, find in parents or return default value
	function _getProperty( propName ) {

		if ( this[ propName ] === undefined && this.parent ) {

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

	function getBackgroundMaterial() {
		return this._getProperty( 'backgroundMaterial' );
	};

	function getBreakOn() {
		return this._getProperty( 'breakOn' );
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

	// look for the fontFamily property, and if does not exist, find it in parent or above
	function getFontFamily() {

		const font = FontLibrary.getFontOf( this );

		if ( !font && this.parent ) {

			return this.parent.getFontFamily();

		} else if ( font ) {

			return font

		} else {

			return DEFAULTS.fontFamily

		};

	};

	// Get the number of parents above this elements (0 if no parent)
	function getParentsNumber( i ) {

		i = i || 0;

		if ( this.parent ) {

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
		return this.interline || DEFAULTS.interline;
	};

	function getOffset() {
		return this.offset || DEFAULTS.offset;
	};

	////////////////////////
	///  CHILDREN / PARENT
	////////////////////////

	// add a new child to this component
	function appendChild() {

		const children = [...arguments];

		children.forEach( (child)=> {

			this.children.push( child );

			child._addParent( this );

			if ( this.threeOBJ && child.threeOBJ ) {

				this.threeOBJ.add( child.threeOBJ );

			};

			if ( child.isInline ) {
				
				if ( this.inlineComponents ) {

					this.inlineComponents.push( child );

				} else {

					console.warn('This inline component cannot be added as child of this parent component')

				};
			
			};

			this.update( true, null );

		});

		return this

	};

	// remove a child from this component
	function removeChild( child ) {

		this.children.splice( this.children.indexOf( child ), 1 );
		child._removeParent();

	};

	function _addParent( parent ) {

		this.parent = parent ;

	};

	function _removeParent() {

		this.parent = undefined;

	};

	///////////////
	///  UPDATE
	///////////////

	// called by .set() because the user updated this component's params
	function update( updateLayout, updateInner ) {

		new Promise((resolve, reject)=> {

			this.getHighestParent().parseParams( resolve, reject );

		})
		.then(()=> {

			if ( updateLayout ) {

				this.getHighestParent().updateLayout();

			};

			if ( updateInner ) {

				this.updateInner();

			};

		})
		.catch((err)=> {

			console.error( err );

		});

	};

	// Called by FontLibrary when the font requested for the current component is ready.
	// Trigger an update for the component whose font is now available.
	function _updateFont( url ) {

		this.fontFamily = url;
		this.update( true, true );

	};

	// Set this component's passed parameters.
	// If necessary, take special actions.
	// Update this component unless otherwise specified.
	function set( options, layoutNeedsUpdate, innerNeedsUpdate ) {

		// Abort if no option passed

		if ( !options || JSON.stringify(options) === JSON.stringify({}) ) return

		// Set this component parameters according to options, and trigger updates accordingly

		for ( let prop of Object.keys(options) ) {

			switch ( prop ) {

				case "width" :
				case "height" :
				case "fontSize" :
				case "interLine" :
				case "fontFamily" :
				case "padding" :
				case "margin" :
				case "contentDirection" :
				case "justifyContent" :
				case "content" :
					layoutNeedsUpdate = true;
					this[ prop ] = options[ prop ];
					break;

				case "backgroundMaterial" :
				case "fontMaterial" :
				case "offset" :
					innerNeedsUpdate = true;
					this[ prop ] = options[ prop ];
					break;

				default :
					this[ prop ] = options[ prop ];
					break;

			};

		};

		// special case, if the fontFamily is updated, then the this.update() must be called only when the font finished loading

		if ( options.fontFamily ) {
			FontLibrary.setFont( this, options.fontFamily );
			layoutNeedsUpdate = false;
			innerNeedsUpdate = false;
		};
		
		// Call component update

		this.update( layoutNeedsUpdate, innerNeedsUpdate );
		
	};

	//

	function setupHover() {
		console.log('setup hover');
	};

	//

	return component

};

export default MeshUIComponent ;
