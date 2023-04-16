import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import { Behavior } from 'three-mesh-ui';

/**
 * Sample of Behavior that relies on AfterUpdate calls
 */
export default class BoxAnchorsBehavior extends Behavior{


	constructor( subject ) {

		super( subject );

		// This behavior requires additional objects and materials
		const anchorGeometry = new PlaneGeometry(0.05, 0.05);
		const anchorMaterial = new MeshBasicMaterial({color:0xff9900});

		// create meshes
		this.anchorTL = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorTC = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorTR = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorCL = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorC  = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorCR = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorBL = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorBC = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorBR = new Mesh( anchorGeometry, anchorMaterial );

		// place meshes
		this.anchorTL.position.z = this.anchorTC.position.z = this.anchorTR.position.z =
		this.anchorCL.position.z = this.anchorC.position.z = this.anchorCR.position.z =
		this.anchorBL.position.z = this.anchorBC.position.z = this.anchorBR.position.z = 0.005;

		// store an _actor binded function
		this._actor = this.act.bind( this );

	}

	/**
	 * When attaching this behavior what should happen?
	 */
	attach() {

		// Lets add all our additional meshes as subject children
		this._subject.add(
			this.anchorTL, this.anchorTC, this.anchorTR,
			this.anchorCL, this.anchorC, this.anchorCR,
			this.anchorBL, this.anchorBC, this.anchorBR,
		);

		// register an afterUpdate call on the subject. After update call will run this._action binded function.
		this._subject.addAfterUpdate( this._actor )

		// optionally, this as soon as attached, this behavior won't wait the first afterUpdate call
		// and chose manually act one first time.
		this.act();

	}

	/**
	 * When detaching this behavior what should happen?
	 */
	detach() {

		// Lets remove all our additional meshes as subject children
		this._subject.remove(
			this.anchorTL, this.anchorTC, this.anchorTR,
			this.anchorCL, this.anchorC, this.anchorCR,
			this.anchorBL, this.anchorBC, this.anchorBR,
		);

		// remove the afterUpdate call we registered in attach()
		this._subject.removeAfterUpdate( this._actor );

	}

	/**
	 * When this behavior acts, what should happen?
	 */
	act () {

		// Job: It should correctly place each visual anchors at their right position.
		// Prerequisite? The bounds of the the subject!

		// Let retrieve the bounds property of the subject.
		const bounds = this._subject._bounds;

		// Thanks to the bounds. we can acquire more values
		// Use those to compute left,right,top and bottom position
		const left = bounds._centerX - bounds._innerWidth / 2;
		const right = bounds._centerX + bounds._innerWidth / 2;
		const top = bounds._centerY + bounds._innerHeight / 2;
		const bottom = bounds._centerY - bounds._innerHeight / 2;

		// Then place each anchors thanks to the computed bounds values.
		this.anchorTL.position.x = this.anchorCL.position.x = this.anchorBL.position.x = left;
		this.anchorTR.position.x = this.anchorCR.position.x = this.anchorBR.position.x = right;

		this.anchorTL.position.y = this.anchorTC.position.y = this.anchorTR.position.y = top;
		this.anchorBL.position.y = this.anchorBC.position.y = this.anchorBR.position.y = bottom;

		this.anchorC.position.set( bounds._centerX, bounds._centerY , this.anchorC.position.z );
		this.anchorTC.position.x = this.anchorBC.position.x = bounds._centerX;
		this.anchorCL.position.y = this.anchorCR.position.y = bounds._centerY;

	}

}
