
/*
	Job: Keep a THREE.Object3D that contains the 3D content
	Knows: Its size and limits, and the THREE.Object3D containing the content and its transform.
*/

import { Object3D } from 'three/src/core/Object3D.js';

import BoxComponent from './core/BoxComponent.js';
import Frame from '../content/Frame.js';
import DeepDelete from '../utils/DeepDelete.js';

function Block( options ) {

	const block = Object.create( BoxComponent() );

	block.type = 'Block';

	const frameContainer = new Object3D();
	frameContainer.name = "MeshUI-FrameContainer"
	block.add( frameContainer );

	block.frameContainer = frameContainer;

	////////////
	//  UPDATE
	////////////

	block.parseParams = function ParseParams() {};

	//

	block.updateLayout = function UpdateLayout() {

		// Get temporary dimension

		const WIDTH = block.getWidth();

		const HEIGHT = block.getHeight();

		if ( !WIDTH || !HEIGHT ) {
			console.warn('Block got no dimension from its parameters or form children parameters');
			return
		};

		// Position this element according to earlier parent computation.
		// Delegate to BoxComponent.

		block.setPosFromParentRecords();

		// Position inner elements according to dimensions and layout parameters.
		// Delegate to BoxComponent.

		if ( !block.children.find( child => child.isInline ) ) {

			block.computeChildrenPosition();

		} else {

			block.computeInlinesPosition();

		};
		
		// Cleanup previous depictions

		DeepDelete( frameContainer );

		// Create new visible frame

		const planes = this.getPlanes();

		planes.forEach( (plane)=> {

			plane.applyMatrix4( this.matrixWorld );

		});

		const frame = Frame(
			WIDTH,
			HEIGHT,
			block.getBorderRadius(),
			block.getBackgroundSize(),
			block.getBackgroundMaterial(),
			planes
		);

		frame.renderOrder = block.getParentsNumber();

		frameContainer.add( frame );

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( block.getUIParent() ) {

			block.position.z = block.getOffset();

		};

	};

	//

	block.updateInner = function UpdateInner() {

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( block.getUIParent() ) {

			block.position.z = block.getOffset();

		};

		frameContainer.traverse( (child)=> {

			if ( child.material ) {

				child.material = block.getBackgroundMaterial();

			};

		});
		
	};

	// Lastly set the options parameters to this object, which will trigger an update
	block.set( options, true, true );

	return block;

};

export default Block ;