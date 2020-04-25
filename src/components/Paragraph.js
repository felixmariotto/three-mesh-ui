
/*
	Job: Parse user text into Lines objects, trim them according to container width, and position them in height
	Knows: Container dimensions, lines height, user text
*/

import MeshUIComponent from '../core/MeshUIComponent';
import FontLibrary from '../core/FontLibrary';

function Paragraph( options ) {

	options = options || {};

	// if a property is not found in paragraph, it will delegate to MeshUIComponent
	const paragraph = Object.create( MeshUIComponent() );

	paragraph.text = options.text;
	paragraph.lines = [];
	paragraph.type = "paragraph";

	paragraph.update = function Update() {

		// get font associated with this component. null if no font
		const font = FontLibrary.getFontOf( this );
		if ( !font ) return

	};
	paragraph.update();

	return paragraph

};

export default Paragraph