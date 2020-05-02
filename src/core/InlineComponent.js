/*
	Job: set dimension of this component according to parent's dimension
	Knows: parent dimensions
*/

import { Mesh } from 'three' ;

import MeshUIComponent from '../core/MeshUIComponent';

function InlineComponent() {

	const inlineComponent = Object.create( MeshUIComponent() );

	inlineComponent.type = 'InlineComponent'

	inlineComponent.isInline = true;

	inlineComponent.threeOBJ = new THREE.Object3D();

	inlineComponent.setPosFromParentRecords = function setPosFromParentRecords() {

		const INFO = this.parent.inlinesInfo[ this.id ];

		if ( !INFO ) return

		const MATERIAL = this.getFontMaterial();

		const textMesh = new Mesh( INFO.geometry, MATERIAL );

		inlineComponent.threeOBJ.add( textMesh );

	};

	return inlineComponent

};

export default InlineComponent