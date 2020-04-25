
/*
	Job: Frame content by holding the size limit, and hold a THREE.Object3D that contains the content
	Knows: Its size and limits, and the THREE.Object3D containing the content and its transform.
*/

import { Object3D } from 'three'

import MeshUIComponent from '../core/MeshUIComponent';
import Frame from '../depictions/Frame';

function LayoutModule( options ) {

	options = options || {};

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const layout = Object.create( MeshUIComponent() );

	layout.height = options.height;
	layout.width = options.width;
	layout.backgroundMaterial = options.backgroundMaterial;

	if ( options.fontFamily ) layout.fontFamily = options.fontFamily;
	if ( options.fontSize ) layout.fontSize = options.fontSize;
	if ( options.fontMaterial ) layout.fontMaterial = options.fontMaterial;

	layout.threeOBJ = new Object3D;
	layout.position = layout.threeOBJ.position;
	layout.rotation = layout.threeOBJ.rotation;
	layout.type = 'layout';

	layout.update = function Update() {
		
		if ( !layout.height ) return
		if ( !layout.width ) return

		var frame = Frame(
			layout.width,
			layout.height,
			layout.backgroundMaterial 
		);

		layout.threeOBJ.add( frame );

	};
	layout.update();

	return layout;

};

export default LayoutModule ;