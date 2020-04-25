
/*
	Job: Frame content by holding the size limit, and hold a THREE.Object3D that contains the content
	Knows: Its size and limits, and the THREE.Object3D containing the content and its transform.
*/

import { Object3D } from 'three'

import MeshUIComponent from '../core/MeshUIComponent';
import Frame from '../depictions/Frame';

function LayoutModule( options ) {

	const layout = Object.create( MeshUIComponent() );

	layout.height = options.height ? options.height : undefined;
	layout.width = options.width ? options.width : undefined;
	layout.backgroundMaterial = options.backgroundMaterial ? options.backgroundMaterial : undefined;

	if ( options.fontFamily ) layout.fontFamily = options.fontFamily;
	if ( options.fontSize ) layout.fontSize = options.fontSize;
	if ( options.fontMaterial ) layout.fontMaterial = options.fontMaterial;

	layout.threeOBJ = new Object3D;
	layout.position = layout.threeOBJ.position;
	layout.rotation = layout.threeOBJ.rotation;
	layout.type = 'layout';

	(function makeFrame() {

		if ( !layout.height ) return
		if ( !layout.width ) return

		var frame = Frame(
			layout.width,
			layout.height,
			layout.backgroundMaterial 
		);

		layout.threeOBJ.add( frame );

	})();

	return layout;

};

export default LayoutModule ;