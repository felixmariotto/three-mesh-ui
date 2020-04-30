
/*
	Job:
		- Holding basic identity information of this component : type, id, parent, children
		- Getting this component attribute, from itself or from its parents
	Knows:
		- This component type, id, parent and children
*/

import FontLibrary from './FontLibrary';
import MaterialLibrary from './MaterialLibrary';

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

const DEFAULT_VALUES = {
	container: null,
	fontFamily: null,
	fontSize: 0.1,
	fontMaterial: MaterialLibrary.DEFAULTS.fontMaterial,
	offset: 0.03,
	textAlign: "center",
	contentDirection: "row",
	justifyContent: "center"
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
		getOffset,
		getTextAlign,
		getParentsNumber,
		getContentDirection,
		getJustifyContent,

		appendChild,
		removeChild,
		update,
		_addParent,
		_removeParent,
		_updateFont,
		_getProperty,
		set

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

		if ( !this[ propName ] && this.parent ) {

			return this.parent._getProperty( propName )

		} else if ( this[ propName ] ) {

			return this[ propName ]

		} else {

			return DEFAULT_VALUES[ propName ]

		};

	};

	//
	
	function getFontSize() {

		return this._getProperty( 'fontSize' );

	};

	//

	function getFontMaterial() {

		return this._getProperty( 'fontMaterial' );

	};

	//

	function getOffset() {

		return this._getProperty( 'offset' );

	};

	//

	function getTextAlign() {

		return this._getProperty( 'textAlign' );

	};

	/// SPECIALS

	// return the first parent with a 'threeOBJ' property
	function getContainer() {

		if ( !this.threeOBJ && this.parent ) {

			return this.parent.getContainer();

		} else if ( this.threeOBJ ) {

			return this

		} else {

			return DEFAULT_VALUES.container

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

			return DEFAULT_VALUES.fontFamily

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

	function getContentDirection() {
		return this.contentDirection || DEFAULT_VALUES.contentDirection;
	};

	//

	function getJustifyContent() {
		return this.justifyContent || DEFAULT_VALUES.justifyContent;
	};

	////////////////////////
	///  CHILDREN / PARENT
	////////////////////////

	// add a new child to this component
	function appendChild( child ) {

		this.children.push( child );
		child._addParent( this );

		if ( this.threeOBJ && child.threeOBJ ) {
			this.threeOBJ.add( child.threeOBJ );
		};

		this.update( true, null );

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

	// Called because a parent or a child updated.
	// It call the specific update function of the component, and propagate the updates to parents or chidren.
	function update( updateLayout, updateInner ) {

		const myPromise = (new Promise((resolve, reject)=> {
		
			this.parseParams( resolve, reject );

		}))
		.then(()=> {

			if ( updateLayout ) {

				this.getHighestParent().updateLayout();

			};

			if ( updateInner ) {

				this.getHighestParent().updateInner();

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
		this.update();

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
					layoutNeedsUpdate = true;
					this[ prop ] = options[ prop ];
					break;

				case "backgroundMaterial" :
				case "fontMaterial" :
				case "offset" :
					innerNeedsUpdate = true;
					this[ prop ] = options[ prop ];
					break;

			};

		};

		// special case, if the font is updated, then the this.update() must be called only when the font finished loading

		if ( options.font ) {
			FontLibrary.setFont( this, options.font );
			layoutNeedsUpdate = false;
			innerNeedsUpdate = false;
		};

		// Call component update

		this.update( layoutNeedsUpdate, innerNeedsUpdate );
		
	};

	//

	return component

};

export default MeshUIComponent ;
