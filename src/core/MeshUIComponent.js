
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
	function getTextJustification() {

		if ( !this.textJustification && this.parent ) {

			return this.parent.getTextJustification();

		} else if ( this.textJustification ) {

			return this.textJustification

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

	// Set the passed font as the font to use with this element and its children.
	// If the font is not found, then load it first
	function set( options ) {

		for ( let prop of Object.keys(options) ) {

			switch ( prop ) {

				case "font" :
					FontLibrary.setFont( this, options.font );
					break;

			};

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
		getTextJustification,
		appendChild,
		removeChild,
		_addParent,
		_removeParent,
		_updateFont,
		set
	};

};

export default MeshUIComponent ;
