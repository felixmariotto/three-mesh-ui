
/*
	Job: holding and giving information about a component style, parent and children
	Knows: what are the component parent and children, and its style
*/

import FontLibrary from './FontLibrary';

function generateSerial() {

	var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	serialLength = 10,
	randomSerial = "",
	i,
	randomNumber;

	for (i = 0; i < serialLength; i = i + 1) {

		randomNumber = Math.floor(Math.random() * chars.length);

		randomSerial += chars.substring(randomNumber, randomNumber + 1);

	};

	return randomSerial

};

function MeshUIComponent() {

	// look for the fontFamily property, and if does not exist, find it in parent or above
	function getFontFamily() {

		if ( this.fontFamily ) {

			return this.fontFamily

		} else {

			return 'no font';

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

	};

	// remove a child from this component
	function removeChild( child ) {

		this.children.splice( this.children.indexOf( child ), 1 );

	};

	// Set the passed font as the font to use with this element and its children.
	// If the font is not found, then load it first
	function setFont( url ) {

		FontLibrary.setFont( this, url );

	};

	function _updateFont( url ) {

		console.log( this.type )

		this.fontFamily = url;
		this.update();

	};

	return {
		fontFamily: undefined, // font that is found for creating text shape AND positioning in height and so forth
		fontSize: 0.1, // font size in world units
		fontMaterial: undefined, // material, one instance is shared between all the components that use it, since all these components will be merged. If a component uses this material but another one when hover or when click, then a different instance of the material is used
		children: [],
		parent: undefined,
		type: 'MeshUIComponent',
		id: generateSerial(),
		getFontFamily,
		getFontSize,
		getFontMaterial,
		appendChild,
		removeChild,
		setFont,
		_updateFont
	};

};

export default MeshUIComponent ;
