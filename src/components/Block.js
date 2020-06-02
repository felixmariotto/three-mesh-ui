
/*
	Job: Keep a THREE.Object3D that contains the 3D content
	Knows: Its size and limits, and the THREE.Object3D containing the content and its transform.
*/

import { Object3D } from 'three/src/core/Object3D.js';

import BoxComponent from './core/BoxComponent.js';
import InlineManager from './core/InlineManager.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import MaterialManager from './core/MaterialManager.js';

import Frame from '../content/Frame.js';
import DeepDelete from '../utils/DeepDelete.js';

import { MeshBasicMaterial } from 'three';

export default function Block( options ) {

	const block = Object.assign(
		Object.create( new Object3D ),
		BoxComponent(),
		InlineManager(),
		MaterialManager(),
		MeshUIComponent()
	);

	block.isBlock = true;

	//

	const frameContainer = new Object3D();

	frameContainer.name = "MeshUI-FrameContainer"

	block.add( frameContainer );

	block.frameContainer = frameContainer;

	//

	block.parseParams = function parseParams( resolve ) { resolve() };

	block.updateLayout = updateLayout;

	block.updateInner = updateInner;

	// Lastly set the options parameters to this object, which will trigger an update
	
	block.set( options, true, true );

	return block;

};

////////////
//  UPDATE
////////////

function updateLayout() {

	// Get temporary dimension

	const WIDTH = this.getWidth();

	const HEIGHT = this.getHeight();

	if ( !WIDTH || !HEIGHT ) {
		console.warn('Block got no dimension from its parameters or from children parameters');
		return
	};

	// Position this element according to earlier parent computation.
	// Delegate to BoxComponent.

	this.setPosFromParentRecords();

	// Position inner elements according to dimensions and layout parameters.
	// Delegate to BoxComponent.

	if ( !this.children.find( child => child.isInline ) ) {

		this.computeChildrenPosition();

	} else {

		this.computeInlinesPosition();

	};
	
	// Cleanup previous depictions

	DeepDelete( this.frameContainer );

	// Create new visible frame

	const frame = Frame(
		WIDTH,
		HEIGHT,
		this.getBorderRadius(),
		this.getBackgroundSize(),
		this.getBackgroundMaterial()
	);

	frame.renderOrder = this.getParentsNumber();

	this.frameContainer.add( frame );

	// We check if this block is the root component,
	// because most of the time the user wants to set the
	// root component's z position themselves
	if ( this.getUIParent() ) {

		this.position.z = this.getOffset();

	};

};

//

function updateInner() {

	// We check if this block is the root component,
	// because most of the time the user wants to set the
	// root component's z position themselves
	if ( this.getUIParent() ) {

		this.position.z = this.getOffset();

	};

	this.frameContainer.traverse( (child)=> {

		if ( child.material ) {

			child.material = this.getBackgroundMaterial();

		};

	});
	
};
