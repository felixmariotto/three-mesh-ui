
/*
	Job: holding and giving information about a component style, parent and children
	Knows: what are the component parent and children, and its style
*/

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

	return {
		fontFamily: "helvetica", // font that is found for creating text shape AND positioning in height and so forth
		fontSize: 0.1, // font size in world units
		fontMaterial: undefined, // material, one instance is shared between all the components that use it, since all these components will be merged. If a component uses this material but another one when hover or when click, then a different instance of the material is used
		children: [],
		parent: undefined,
		type: 'MeshUIComponent',
		getFontFamily,
		getFontSize,
		getFontMaterial,
		appendChild,
		removeChild
	};

};

export default MeshUIComponent ;
