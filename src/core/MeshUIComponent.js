
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

	// look for the fontFamily property, and if does not exist, find it in parent or above
	function getFontFamily( component ) {

		component = component || this;

		let font = FontLibrary.getFontOf( component );

		if ( !font && component.parent ) {

			return getFontFamily( component.parent );

		} else if ( font ) {

			return font

		} else {

			return null

		};

	};

	// look for the fontSize property, and if does not exist, find it in parent or above
	function getFontSize() {

		if ( this.fontSize ) {

			return this.fontSize

		} else {

			return 'no font size';

		};

	};

	// look for the fontMaterial property, and if does not exist, find it in parent or above
	function getFontMaterial() {

		if ( this.fontMaterial ) {

			return this.fontMaterial

		} else {

			return 'no font material';

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

	// Set the passed font as the font to use with this element and its children.
	// If the font is not found, then load it first
	function setFont( url ) {

		FontLibrary.setFont( this, url );

	};

	// Called by FontLibrary when the font requested for the current component is ready.
	// Trigger an update for the component whose font is now available.
	function _updateFont( url ) {

		this.fontFamily = url;
		this.update();

	};

	return {
		fontSize: 0.1, // font size in world units
		children: [],
		parent: undefined,
		type: 'MeshUIComponent',
		id: generateSerial(),
		getFontFamily,
		getFontSize,
		getFontMaterial,
		appendChild,
		removeChild,
		_addParent,
		_removeParent,
		setFont,
		_updateFont
	};

};

export default MeshUIComponent ;
