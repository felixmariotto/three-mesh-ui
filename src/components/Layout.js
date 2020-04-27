
/*
	Job: Frame content by holding the size limit, and hold a THREE.Object3D that contains the content
	Knows: Its size and limits, and the THREE.Object3D containing the content and its transform.
*/

import { Object3D } from 'three'

import MeshUIComponent from '../core/MeshUIComponent';
import Frame from '../depictions/Frame';

function LayoutModule( options ) {

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const layout = Object.create( MeshUIComponent() );

	layout.threeOBJ = new Object3D;
	layout.threeOBJ.name = "MeshUI-Layout"

	layout.position = layout.threeOBJ.position;
	layout.rotation = layout.threeOBJ.rotation;
	layout.type = 'layout';

	const depictionContainer = new THREE.Object3D();
	layout.threeOBJ.add( depictionContainer );

	/////////////
	//  UPDATE
	/////////////

	layout.update = function Update( skipChildrenUpdate ) {

		if ( layout.height && layout.width ) {

			// Cleanup previous depictions

			depictionContainer.traverse( (obj)=> {
				if ( obj.material ) obj.material.dispose();
				if ( obj.geometry ) obj.geometry.dispose();
				depictionContainer.remove( obj );
			});

			// Create new depictions

			const frame = Frame(
				layout.width,
				layout.height,
				layout.backgroundMaterial 
			);

			depictionContainer.add( frame );

		};

		if ( !skipChildrenUpdate ) {

			layout.children.forEach( (child)=> {
				child.update();
			});

		};
		
	};

	// Lastly set the options parameters to this object, which will trigger an update
	layout.set( options );

	return layout;

};

export default LayoutModule ;