//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from './../../core/elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

/**
 * Job:
 * - recording components required updates
 * - trigger those updates when 'update' is called
 *
 * This module is a bit special. It is, with FontLibrary, one of the only modules in the 'component'
 * directory not to be used in component composition (Object.assign).
 *
 * When MeshUIComponent is instanciated, it calls UpdateManager.register().
 *
 * Then when MeshUIComponent receives new attributes, it doesn't update the component right away.
 * Instead, it calls UpdateManager.requestUpdate(), so that the component is updated when the user
 * decides it (usually in the render loop).
 *
 * This is best for performance, because when a UI is created, thousands of componants can
 * potentially be instantiated. If they called updates function on their ancestors right away,
 * a given component could be updated thousands of times in one frame, which is very ineficient.
 *
 * Instead, redundant update request are moot, the component will update once when the use calls
 * update() in their render loop.
 */
export default class UpdateManager {


	static register( component ) {

		if ( !this.elements.includes( component ) ) {

				this.elements.push( component );

		}

	}

	static remove( component ) {

		const index = this.elements.indexOf( component );
		if ( index !== -1 ) {

			this.elements.splice( index, 1 );

		}

	}


	static update() {

		for ( const UIElement of this.elements ) {
			UIElement.update();

			UIElement.process(); // Natural process
			UIElement.process(); // Actual process (optional) - For auto size and stretch

			UIElement.render();
		}

	}

}

/**
 * @internal
 * @type {Array.<MeshUIBaseElement>}
 */
UpdateManager.elements = [];
