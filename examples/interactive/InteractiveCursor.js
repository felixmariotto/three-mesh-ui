import InteractiveListener from 'three-mesh-ui/examples/interactive/InteractiveListener';

export default class InteractiveCursor extends InteractiveListener{


	/**
	 *
	 * @param {HTMLElement|Document} htmlElement
	 * @param {string} cursor
	 */
	constructor( htmlElement, cursor = 'crosshair' ) {

		super();

		this._cursor = cursor;

		this._htmlElement = htmlElement;

		this._lastValue = 'inherit';

	}

	/**
	 * @override
	 * @param {MeshUIBaseElement|Object3D|null} element
	 */
	hoveredElementHasChanged ( element ) {

		if( element !== null && this._lastValue === 'inherit') {

			this._htmlElement.style.cursor = this._cursor;
			this._lastValue = this._cursor;

		} else if( element === null && this._lastValue !== 'inherit' ) {

			this._htmlElement.style.cursor = 'inherit';
			this._lastValue = 'inherit';

		}

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement|Object3D|null} element
	 */
	selectedElementHasChanged( element ) {  /* eslint-enable no-unused-vars */ }

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement|Object3D|null} element
	 */
	clicked( element ) { /* eslint-enable no-unused-vars */ }
}
