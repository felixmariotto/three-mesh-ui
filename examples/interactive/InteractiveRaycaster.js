import * as THREE from "three";
import VRControl from "three-mesh-ui/examples/controls/VRControl";


let selectState = false;
let inited = false;
let mouse;

function _init() {
	mouse = new THREE.Vector2();
	mouse.x = mouse.y = null;

	// compute mouse position in normalized device coordinates
	// (-1 to +1) for both directions.
	// Used to raycasting against the interactive elements

	window.addEventListener('pointermove', (event) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	});

	window.addEventListener('pointerdown', () => {
		selectState = true
	});

	window.addEventListener('pointerup', () => {
		selectState = false
	});


	window.addEventListener('touchstart', (event) => {
		selectState = true;
		mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
	});

	window.addEventListener('touchend', () => {
		selectState = false;
		mouse.x = null;
		mouse.y = null;
	});
}

export default class InteractiveRaycaster {

	/**
	 *
	 * @param {THREE.Camera} camera
	 * @param {THREE.WebGLRenderer} renderer
	 * @param {VRControl} vrControl
	 */
	constructor( camera, renderer, vrControl = null) {
		if (!inited) {
			_init();
		}

		this._camera = camera;
		this._renderer = renderer;
		if (vrControl && vrControl instanceof VRControl) {

			vrControl.controllers[0].addEventListener('selectstart', () => {
				selectState = true
			});
			vrControl.controllers[0].addEventListener('selectend', () => {
				selectState = false
			});

			this._vrControl = vrControl;
		}

		this._raycaster = new THREE.Raycaster();
		this._objectsToTest = [];
	}

	addObject(object) {

		if (this._objectsToTest.indexOf(object) === -1) {
			this._objectsToTest.push(object);
		}


		if (arguments.length > 1) {
			for (let i = 0; i < arguments.length; i++) {
				this.addObject(arguments[i]);
			}
		}
	}

	removeObject(object) {

		let index = this._objectsToTest.indexOf(object);
		if (index !== -1) {
			this._objectsToTest.splice(index, 1);
		}

		if (arguments.length > 1) {
			for (let i = 0; i < arguments.length; i++) {
				this.removeObject(arguments[i]);
			}
		}
	}

	/**
	 *
	 */
	update() {

		// Find closest intersecting object
		let intersect;

		if (this._renderer.xr.isPresenting && this._vrControl) {

			this._vrControl.setFromController(0, this._raycaster.ray);

			intersect = this._raycast();

			// Position the little white dot at the end of the controller pointing ray
			if (intersect) this._vrControl.setPointerAt(0, intersect.point);

		} else if (mouse.x !== null && mouse.y !== null) {

			this._raycaster.setFromCamera(mouse, this._camera);

			intersect = this._raycast();

		}

		// Update targeted button state (if any)
		if (intersect && intersect.object.isUI) {

			if (selectState) {

				// Component.setState internally call component.set with the options you defined in component.setupState
				intersect.object.setState('select');

			} else {

				// Component.setState internally call component.set with the options you defined in component.setupState
				intersect.object.setState('hovered');

			}

		}

		// Update non-targeted buttons state

		this._objectsToTest.forEach((obj) => {

			if ((!intersect || obj !== intersect.object) && obj.isUI) {

				// Component.setState internally call component.set with the options you defined in component.setupState
				obj.setState('idle');

			}
		});
	}

	set camera(camera){
		this._camera = camera;
	}

	get camera(){
		return this._camera;
	}


	_raycast() {

		return this._objectsToTest.reduce((closestIntersection, obj) => {

			const intersection = this._raycaster.intersectObject(obj, true);

			if (!intersection[0]) return closestIntersection

			if (!closestIntersection || intersection[0].distance < closestIntersection.distance) {

				intersection[0].object = obj;

				return intersection[0];

			} else {

				return closestIntersection;

			}

		}, null);


	}


}
