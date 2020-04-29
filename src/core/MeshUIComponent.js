
/*
	Job: holding and giving information about a component style, parent and children
	Knows: what are the component parent and children, and its style
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

function MeshUIComponent() {

	// return the first parent with a 'threeOBJ' property
	function getContainer() {

		if ( !this.threeOBJ && this.parent ) {

			return this.parent.getContainer();

		} else if ( this.threeOBJ ) {

			return this

		} else {

			return null

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

			return null

		};

	};

	// look for the fontSize property, and if does not exist, find it in parent or above
	function getFontSize() {

		if ( !this.fontSize && this.parent ) {

			return this.parent.getFontSize();

		} else if ( this.fontSize ) {

			return this.fontSize

		} else {

			return 0.1

		};

	};

	// look for the fontMaterial property, and if does not exist, find it in parent or above
	function getFontMaterial() {

		if ( !this.fontMaterial && this.parent ) {

			return this.parent.getFontMaterial();

		} else if ( this.fontMaterial ) {

			return this.fontMaterial

		} else {

			return MaterialLibrary.DEFAULTS.fontMaterial

		};

	};

	// look for the textJustification property in this component or in parents
	function getTextAlign() {

		if ( !this.textAlign && this.parent ) {

			return this.parent.getTextAlign();

		} else if ( this.textAlign ) {

			return this.textAlign

		} else {

			return "center"

		};

	};

	// add a new child to this component
	function appendChild( child ) {

		this.children.push( child );
		child._addParent( this );

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

	// Called by FontLibrary when the font requested for the current component is ready.
	// Trigger an update for the component whose font is now available.
	function _updateFont( url ) {

		this.fontFamily = url;
		this.update();

	};

	// Set this component's passed parameters.
	// If necessary, take special actions.
	// Update this component unless otherwise specified.
	function set( options, skipChildrenUpdate ) {

		if ( !options ) return

		const padding = options.padding || this.padding;

		for ( let prop of Object.keys(options) ) {

			switch ( prop ) {

				case "font" :
					FontLibrary.setFont( this, options.font );
					break;

				case "width" :
					if ( padding ) {
						this.innerWidth = options.width - (padding * 2);
					} else {
						this.innerWidth = options.width;
					};
					this.width = options.width;
					break;

				case "innerWidth" :
					if ( padding ) {
						this.width = options.innerWidth + (padding * 2);
					} else {
						this.width = options.innerWidth;
					};
					break;

				case "height" :
					if ( padding ) {
						this.innerHeight = options.height - (padding * 2);
					} else {
						this.innerHeight = options.height;
					};
					this.height = options.height;
					break;

				case "innerHeight" :
					if ( padding ) {
						this.height = options.innerHeight + (padding * 2);
					} else {
						this.height = options.innerHeight;
					};
					break;

				case "padding" :
					if ( this.width ) {
						this.innerWidth = this.width - (padding * 2);
					};
					if ( this.height ) {
						this.innerHeight = this.height - (padding * 2);
					};
					this.padding = padding;
					break;

				default:
					this[ prop ] = options[ prop ];
					break;

			};

		};

		// Trigger component update, if not specified otherwise AND a font parameter was not passed :
		// Because when the font will be loaded, an update will be triggered by this._updateFont
		if ( this.update && !options.font ) {

			this.update( skipChildrenUpdate );

		};
		
	};

	//

	return {
		children: [],
		parent: undefined,
		type: 'MeshUIComponent',
		id: generateSerial(),
		getContainer,
		getFontFamily,
		getFontSize,
		getFontMaterial,
		getTextAlign,
		appendChild,
		removeChild,
		_addParent,
		_removeParent,
		_updateFont,
		set
	};

};

export default MeshUIComponent ;
