import InteractiveListener from 'three-mesh-ui/examples/interactive/InteractiveListener';

/**
 * Job : Display html tooltip over an element when interactive object are hovered
 */
export default class InteractiveTooltip extends InteractiveListener{

	constructor( domElement ) {
		super();

		this._domElement = domElement;

	}

	/**
	 * What happen when interactive object are clicked?
	 * @param element
	 */
	clicked( element ) { /* nothing in this case */ }

	/**
	 * What happend when the current hovered changes?
	 * @param element
	 */
	hoveredElementHasChanged( element ) {

		// if we are currently hovering an element
		if( element ) {

			// grab its name, and feed it as title attribute to display tooltips
			this._domElement.setAttribute('title', element.name);

		} else {

			// no element hovered? remove the attribute
			this._domElement.removeAttribute('title');

		}

	}

	/**
	 * What happen when the current selected changes?
	 * @param element
	 */
	selectedElementHasChanged( element ) { /* nothing in this case */ }
}
