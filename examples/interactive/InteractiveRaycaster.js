import { Raycaster, Vector2 } from 'three';

/* eslint-disable no-unused-vars */
const CLICK = { type: 'click' };
/* eslint-enable no-unused-vars */
const HOVER = { type: 'hover' };

export default class InteractiveRaycaster {

	/**
	 *
	 * @param {THREE.Camera} camera
	 * @param {THREE.Scene} scene
	 * @param {THREE.WebGLRenderer} renderer
	 * @param {VRControl} vrControl
	 */
	constructor( camera, scene, renderer, vrControl = null ) {

		this._camera = camera;
		this._scene = scene;
		this._renderer = renderer;

		/**
		 *
		 * @type {VRControl}
		 * @private
		 */
		this._vrControl = vrControl;

		/**
		 *
		 * @type {Raycaster}
		 * @private
		 */
		this._raycaster = new Raycaster();

		/**
		 *
		 * @type {Array.<InteractiveListener>}
		 * @private
		 */
		this._listeners = [];

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @private
		 */
		this._objectsToTest = [];

		/**
		 *
		 * @type {Window|Document|HTMLElement}
		 * @private
		 */
		this._target = null;

		/**
		 *
		 * @type {Vector2|null}
		 * @private
		 */
		this._mouse = null;

		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._selectState = false;

		/**
		 *
		 * @type {null|MeshUIBaseElement}
		 * @private
		 */
		this._lastHoveredElement = null;

		/**
		 *
		 * @type {null|MeshUIBaseElement}
		 * @private
		 */
		this._lastSelectedElement = null;
	}

	/**
	 *
	 * @param {InteractiveListener} interactiveListener
	 */
	addListener( interactiveListener ) {

		if ( this._listeners.indexOf( interactiveListener ) === -1 ) {

			this._listeners.push( interactiveListener );

		}

	}

	/**
	 *
	 * @param {InteractiveListener} interactiveListener
	 */
	removeListener( interactiveListener ) {

		const index = this._listeners.indexOf( interactiveListener );
		if ( index !== -1 ) {

			this._listeners.splice( index, 1 );

		}

	}

	/**
	 *
	 * @param {Window|Document|HTMLElement} target
	 */
	start( target = null ) {

		if ( this._target ) throw new Error( 'InteractiveRaycaster::start() - is already started. Aborted.' );

		target = !target ? window : target;

		this._target = target;

		this._mouse = new Vector2();
		this._mouse.x = this._mouse.y = null;

		// compute mouse position in normalized device coordinates
		// (-1 to +1) for both directions.
		// Used to raycasting against the interactive elements

		target.addEventListener( 'pointermove', this._pointerMove );
		target.addEventListener( 'pointerdown', this._selectStart );
		target.addEventListener( 'pointerup', this._selectEnd );


		target.addEventListener( 'touchstart', this._touchMove );

		// According to latest documentation, pointerEvent is now widely supported.
		// and if we keep this line, on mobile the "select" operation is called twice
		// as a pointerup event is also generated by mobile browsers
		// target.addEventListener( 'touchend', this._touchEnd );

		if ( this._vrControl ) {

			this._vrControl.controllers[ 0 ].addEventListener( 'selectstart', this._selectStart );
			this._vrControl.controllers[ 0 ].addEventListener( 'selectend', this._selectEnd );

		}

	}

	_selectStart = () => {

		this._selectState = true;

	};

	_selectEnd = () => {

		this._click( );

		this._selectState = false;

	};

	_pointerMove = ( event ) => {

		this._mouse.x = ( event.clientX / this._target.innerWidth ) * 2 - 1;
		this._mouse.y = -( event.clientY / this._target.innerHeight ) * 2 + 1;

	};

	_touchMove = ( event ) => {

		this._selectStart();

		this._mouse.x = ( event.touches[ 0 ].clientX / this._target.innerWidth ) * 2 - 1;
		this._mouse.y = -( event.touches[ 0 ].clientY / this._target.innerHeight ) * 2 + 1;

	};

	// /* eslint-disable no-unused-vars */
	// /**
	//  *
	//  * @param event
	//  * @private
	//  */
	// _touchEnd = ( event ) => {  /* eslint-enable no-unused-vars */
	//
	// 	this._selectEnd();
	//
	// 	this._mouse.x = null;
	// 	this._mouse.y = null;
	//
	// };

	_setHoveredElement( object ) {

		if ( this._lastHoveredElement ) {

			if ( this._lastHoveredElement.isUI ) {

				this._lastHoveredElement.deactivatePseudoState( 'hover' );

			}

		}

		this._lastHoveredElement = object;

		if ( this._lastHoveredElement !== null ) {

			if ( this._lastHoveredElement.isUI ) {

				this._lastHoveredElement.activatePseudoState( 'hover' );
				this._lastHoveredElement.dispatchEvent( HOVER );

			}

		}

		// tell each listeners
		for ( let i = 0; i < this._listeners.length; i++ ) {

			this._listeners[ i ].hoveredElementHasChanged( this._lastHoveredElement );

		}

	}

	_setSelectedElement( object ) {

		if ( this._lastSelectedElement ) {

			if ( this._lastSelectedElement.isUI ) {

				this._lastSelectedElement.deactivatePseudoState( 'active' );

			}

		}

		this._lastSelectedElement = object;

		if ( this._lastSelectedElement !== null ) {

			if ( this._lastSelectedElement.isUI ) {

				this._lastSelectedElement.activatePseudoState( 'active' );

			}

		}

		// tell each listeners
		for ( let i = 0; i < this._listeners.length; i++ ) {

			this._listeners[ i ].selectedElementHasChanged( this._lastSelectedElement );

		}

	}

	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 * @private
	 */
	_click() {  /* eslint-enable no-unused-vars */

		if ( this._lastSelectedElement ) {

			// this._lastSelectedElement.dispatchEvent( CLICK );
			this._lastSelectedElement._clicked( this._lastIntersectObject );

			// tell each listeners
			for ( let i = 0; i < this._listeners.length; i++ ) {

				this._listeners[ i ].clicked( this._lastSelectedElement );

			}

		}

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {Object3D|MeshUIBaseElement} object
	 */
	addObject( object ) {  /* eslint-enable no-unused-vars */

			for ( let i = 0; i < arguments.length; i++ ) {

				const obj = arguments[i];

				if( obj.interactiveListener ) {

					this.addListener( obj.interactiveListener );

				}

				let objs;
				if( obj.interactiveObjects ) {
					objs = obj.interactiveObjects;

				} else {

					objs = [ obj ];
				}

				for ( let j = 0; j < objs.length; j++ ) {

					const obj2 = objs[j]
					if( !obj2._clicked ) {
						obj2._clicked = this._elementClicked;
					}

					this._objectsToTest.push( obj2 );
				}


			}

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {Object3D|MeshUIBaseElement} object
	 */
	removeObject( object ) {  /* eslint-enable no-unused-vars */

		for ( let i = 0; i < arguments.length; i++ ) {

			const obj = arguments[i];

			if( obj.interactiveListener ) this.removeListener( obj.interactiveListener );

			let objs = [obj];
			if( obj.interactiveObjects ) objs = [...obj.interactiveObjects];


			for ( let j = 0; j < objs.length; j++ ) {

				const objElement = objs[ j ];
				const index = this._objectsToTest.indexOf( objElement );

				if( index !== -1 ) this._objectsToTest.splice( index, 1 );

			}

		}

	}

	/**
	 *
	 */
	update() {

		// Find closest intersecting object
		let intersect;

		if ( this._renderer.xr.isPresenting && this._vrControl ) {

			this._vrControl.setFromController( 0, this._raycaster.ray );

			intersect = this._raycast();

			// Position the little white dot at the end of the controller pointing ray
			if ( intersect ) this._vrControl.setPointerAt( 0, intersect.point );

		} else if ( this._mouse.x !== null && this._mouse.y !== null ) {

			this._raycaster.setFromCamera( this._mouse, this._camera );

			intersect = this._raycast();

		}

		if ( intersect ) {

			const intersectObject = intersect.object;
			this._lastIntersectObject = intersect;

			if ( this._lastHoveredElement !== intersectObject ) {
				this._setHoveredElement( intersectObject );
			}

			if ( this._selectState ) {

				if ( this._lastSelectedElement !== intersectObject ) {
					this._setSelectedElement( intersectObject );
				}

			} else if ( this._lastSelectedElement !== null ) {

				this._setSelectedElement( null );

			}

		} else {

			if ( this._lastSelectedElement !== null ) this._setSelectedElement( null );
			if ( this._lastHoveredElement !== null ) this._setHoveredElement( null );

		}

	}

	set camera( camera ) {
		this._camera = camera;
	}

	get camera() {
		return this._camera;
	}


	_raycast() {

		return this._objectsToTest.reduce( ( closestIntersection, obj ) => {

			if( !this._scene.getObjectById( obj.id ) ) return closestIntersection;

			const intersection = this._raycaster.intersectObject( obj, true );

			if ( !intersection[ 0 ] ) return closestIntersection;

			if ( !closestIntersection || intersection[ 0 ].distance < closestIntersection.distance ) {

				intersection[ 0 ].object = obj;

				return intersection[ 0 ];

			}

			return closestIntersection;


		}, null );


	}

	_elementClicked( intersect ) {

		delete intersect.object;

		intersect.type = 'click';
		this.dispatchEvent( intersect );

	}


}
