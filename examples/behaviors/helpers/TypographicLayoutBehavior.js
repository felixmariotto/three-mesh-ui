import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import { Behavior } from 'three-mesh-ui';

/**
 * Sample of Behavior that relies on AfterUpdate calls
 */
export default class TypographicLayoutBehavior extends Behavior{


	constructor( subject, backgroundColor = 0x9e9e9e, lineColor = 0xff0099 ) {

		super( subject );

		this.lineMat = new MeshBasicMaterial( { color: backgroundColor, opacity: 1 } );
		this.baseMat = new MeshBasicMaterial( { color: lineColor, opacity: 1 } );
		this.medianMat = new MeshBasicMaterial( { color: lineColor } );

		this.lines = [];

		// This behavior requires additional objects and materials

		// store an _actor binded function
		this._actor = this.act.bind( this );

	}

	/**
	 * When attaching this behavior what should happen?
	 */
	attach() {

		// register an afterUpdate call on the subject. After update call will run this._action binded function.
		this._subject.addAfterUpdate( this._actor )

		// optionally, this as soon as attached, this behavior won't wait the first afterUpdate call
		// and chose manually act one first time.
		if( this._subject.lines )	this.act();

	}

	/**
	 * When detaching this behavior what should happen?
	 */
	detach() {

		// remove the afterUpdate call we registered in attach()
		this._subject.removeAfterUpdate( this._actor );



	}

	/**
	 * When this behavior acts, what should happen?
	 */
	act () {

		// remove all lines previously added
		for ( let i = 0; i < this.lines.length; i++ ) {
			const lineMesh = this.lines[ i ];
			this._subject.remove( lineMesh );
		}

		this.lines = [];



		// retrieve all lines sent by InlineManager for the textBlock
		for ( let i = 0; i < this._subject.lines.length; i++ ) {

			const line = this._subject.lines[ i ];

			if ( !line[ 0 ] ) continue;

			const lineHeight = line.lineHeight;
			const lineBase = line.lineBase;

			const deltaLine = lineHeight - lineBase;

			// TextBackground
			const lineGeo = new PlaneGeometry( line.width, lineHeight );
			const lineMesh = new Mesh( lineGeo, this.lineMat );
			lineMesh.name = 'DevLineMesh';

			lineMesh.position.x = line.x + line.width/2;
			lineMesh.position.y = line.y - line.lineHeight/2;

			this.lines.push( lineMesh );
			this._subject.add( lineMesh );

			// baseline
			const baselineMesh = new Mesh( new PlaneGeometry( line.width, 0.002 ), this.baseMat );
			baselineMesh.position.x = lineMesh.position.x;
			// baselineMesh.position.y = line.y -  // Baseline
			baselineMesh.position.y = lineMesh.position.y - lineBase/2 + 0.002;

			this.lines.push( baselineMesh );
			this._subject.add( baselineMesh );


			// Median
			const medianMesh = new Mesh( new PlaneGeometry( line.width, 0.002 ),this.medianMat );

			medianMesh.position.x = lineMesh.position.x;
			medianMesh.position.y =  lineMesh.position.y + deltaLine/2 - 0.002; // Baseline

			this.lines.push( medianMesh );
			this._subject.add( medianMesh );

			baselineMesh.position.z = medianMesh.position.z = this._subject.children[0].position.z + 0.006;


		}


	}

	_clear(){

	}

}
