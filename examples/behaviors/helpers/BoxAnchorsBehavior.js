import Behavior from '../../../src/utils/Behavior';
import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

export default class BoxAnchorsBehavior extends Behavior{

	constructor( subject ) {

		super( subject );

		const anchorGeometry = new PlaneGeometry(0.05, 0.05);
		const anchorMaterial = new MeshBasicMaterial({color:0xff9900});

		this.anchorTL = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorTC = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorTR = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorCL = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorC = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorCR = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorBL = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorBC = new Mesh( anchorGeometry, anchorMaterial );
		this.anchorBR = new Mesh( anchorGeometry, anchorMaterial );

	}

	attach() {

		this._subject.add(
			this.anchorTL, this.anchorTC, this.anchorTR,
			this.anchorCL, this.anchorC, this.anchorCR,
			this.anchorBL, this.anchorBC, this.anchorBR,
		);

		this._subject.addAfterUpdate( this.act )

		this.act();

	}

	detach() {

		this._subject.remove(
			this.anchorTL, this.anchorTC, this.anchorTR,
			this.anchorCL, this.anchorC, this.anchorCR,
			this.anchorBL, this.anchorBC, this.anchorBR,
		);

		this._subject.removeAfterUpdate( this.act );

	}

	act = () => {

		const left = this._subject.centerX - this._subject.innerWidth / 2;
		const right = this._subject.centerX + this._subject.innerWidth / 2;
		const top = this._subject.centerY + this._subject.innerHeight / 2;
		const bottom = this._subject.centerY - this._subject.innerHeight / 2;

		this.anchorTL.position.x = this.anchorCL.position.x = this.anchorBL.position.x = left;
		this.anchorTR.position.x = this.anchorCR.position.x = this.anchorBR.position.x = right;

		this.anchorTL.position.y = this.anchorTC.position.y = this.anchorTR.position.y = top;
		this.anchorBL.position.y = this.anchorBC.position.y = this.anchorBR.position.y = bottom;

		this.anchorC.position.set( this._subject.centerX, this._subject.centerY );
		this.anchorTC.position.x = this.anchorBC.position.x = this._subject.centerX;
		this.anchorCL.position.y = this.anchorCR.position.y = this._subject.centerY;

	}

}
