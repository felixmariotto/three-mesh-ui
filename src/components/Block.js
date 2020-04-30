
/*
	Job: Frame content by holding the size limit, and hold a THREE.Object3D that contains the content
	Knows: Its size and limits, and the THREE.Object3D containing the content and its transform.
*/

import { Object3D } from 'three'

import BoxComponent from '../core/BoxComponent';
import Frame from '../depictions/Frame';
import DeepDelete from '../utils/DeepDelete';

function LayoutModule( options ) {

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const block = Object.create( BoxComponent() );

	block.threeOBJ = new Object3D;
	block.threeOBJ.name = "MeshUI-Layout"

	block.position = block.threeOBJ.position;
	block.rotation = block.threeOBJ.rotation;
	block.type = 'Block';

	const frameContainer = new Object3D();
	block.threeOBJ.add( frameContainer );

	/////////////
	//  UPDATE
	/////////////

	block.parseParams = function ParseParams( resolve, reject ) {

		resolve();

	};

	block.updateLayout = function UpdateLayout() {

		// Get temporary dimension

		const WIDTH = block.width || block.getInnerWidth() + (block.padding * 2 || 0);

		const HEIGHT = block.height || block.getInnerHeight() + (block.padding * 2 || 0);

		if ( !WIDTH || !HEIGHT ) {
			console.warn('Block got no dimension from its parameters or form children parameters');
			return
		};

		// Cleanup previous depictions

		DeepDelete( frameContainer );

		// Create new depictions

		const frame = Frame(
			WIDTH,
			HEIGHT,
			block.backgroundMaterial 
		);

		frameContainer.add( frame );

		// Propagate update among children

		for ( let child of block.children ) {

			child.updateLayout();

		};

	};

	block.updateInner = function UpdateInner() {

		for ( let child of block.children ) {

			child.updateInner();

		};
		
	};

	// Lastly set the options parameters to this object, which will trigger an update
	block.set( options, true, true );

	return block;

};

export default LayoutModule ;