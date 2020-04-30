
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

	block.type = 'Block';

	block.childrenPos = {};

	const frameContainer = new Object3D();
	frameContainer.name = "Block-FrameContainer"
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

		// Position this element according to parent instructions

		if ( block.parent && block.parent.childrenPos[ block.id ] ) {

			block.threeOBJ.position.x = ( block.parent.childrenPos[ block.id ].x );

		};

		// Position inner elements according to dimensions and layout parameters

		if ( block.children.length > 0 ) {

			const DIRECTION = block.contentDirection || 'row';
			const JUSTIFICATION = block.justifyContent || 'center';

			switch ( DIRECTION ) {

				case 'row' :
					block.children.reduce( (accu, child, i)=> {

						const CHILD_WIDTH = child.width || child.getInnerWidth();
						const CHILD_ID = child.id;
						const ADDI_OFFSET = i ? CHILD_WIDTH / 2 : 0;

						block.childrenPos[ CHILD_ID ] = {
							x: accu + ADDI_OFFSET
						};

						return accu + (CHILD_WIDTH / 2);

					}, 0 );
					break;

				case 'row-reverse' :
					console.log('direction row reverse');
					break;

				case 'column' :
					console.log('direction column');
					break;

				case 'column-reverse' :
					console.log('direction column-reverse');
					break;

			};

		};

		// Cleanup previous depictions

		DeepDelete( frameContainer );

		// Create new depictions

		const frame = Frame(
			WIDTH,
			HEIGHT,
			block.backgroundMaterial 
		);

		frame.renderOrder = block.getParentsNumber();

		frameContainer.add( frame );

		// Propagate update among children

		for ( let child of block.children ) {

			child.updateLayout();

		};

	};

	block.updateInner = function UpdateInner() {

		block.threeOBJ.position.z = block.getOffset();

		for ( let child of block.children ) {

			child.updateInner();

		};
		
	};

	// Lastly set the options parameters to this object, which will trigger an update
	block.set( options, true, true );

	return block;

};

export default LayoutModule ;