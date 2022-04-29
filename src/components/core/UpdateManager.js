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

	/*
	 * get called by MeshUIComponent when component.set has been used.
	 * It registers this component and all its descendants for the different types of updates that were required.
	 */
	static requestUpdate( component, updateParsing, updateLayout, updateInner ) {

		component.traverse( ( child ) => {

			if ( !child.isUI ) return;

			// request updates for all descendants of the passed components
			if ( !this.requestedUpdates[ child.id ] ) {

				this.requestedUpdates[ child.id ] = {
					updateParsing,
					updateLayout,
					updateInner,
					needCallback: ( updateParsing || updateLayout || updateInner )
				};

			} else {

				if ( updateParsing ) this.requestedUpdates[ child.id ].updateParsing = true;
				if ( updateLayout ) this.requestedUpdates[ child.id ].updateLayout = true;
				if ( updateInner ) this.requestedUpdates[ child.id ].updateInner = true;

			}

		} );

	}

	/** Register a passed component for later updates */
	static register( component ) {

		if ( !this.components.includes( component ) ) {

			this.components.push( component );

		}

	}

	/** Unregister a component (when it's deleted for instance) */
	static disposeOf( component ) {

		const idx = this.components.indexOf( component );

		if ( idx > -1 ) {

			this.components.splice( idx, 1 );

		}

	}

	/** Trigger all requested updates of registered components */
	static update() {

		if ( Object.keys( this.requestedUpdates ).length > 0 ) {

			const roots = this.components.filter( ( component ) => {

				return !component.parentUI;

			} );

			roots.forEach( root => this.traverseParsing( root ) );
			roots.forEach( root => this.traverseUpdates( root ) );

		}

	}

	/**
	 * Calls parseParams update of all components from parent to children
	 * @private
	 */
	static traverseParsing( component ) {

		const request = this.requestedUpdates[ component.id ];

		if ( request && request.updateParsing ) {

			component.parseParams();

			request.updateParsing = false;

		}

		component.childrenUIs.forEach( child => this.traverseParsing( child ) );

	}

	/**
	 * Calls updateLayout and updateInner functions of components that need an update
	 * @private
	 */
	static traverseUpdates( component ) {

		const request = this.requestedUpdates[ component.id ];
		// instant remove the requested update,
		// allowing code below ( especially onAfterUpdate ) to add it without being directly remove
		delete this.requestedUpdates[ component.id ];

		//

		if ( request && request.updateLayout ) {

			request.updateLayout = false;

			component.updateLayout();

		}

		//

		if ( request && request.updateInner ) {

			request.updateInner = false;

			component.updateInner();

		}


		// Update any child
		component.childrenUIs.forEach( ( childUI ) => {

			this.traverseUpdates( childUI );

		} );

		// before sending onAfterUpdate
		if ( request && request.needCallback ) {

			component.onAfterUpdate();

		}

	}

}

// TODO move these into the class (Webpack unfortunately doesn't understand
// `static` property syntax, despite browsers already supporting this)
UpdateManager.components = [];
UpdateManager.requestedUpdates = {};
