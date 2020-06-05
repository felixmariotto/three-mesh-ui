/*

Job:
- recording components required updates
- trigger those updates when 'update' is called

This module is a bit special. It is, with FontLibrary, one of the only modules in the 'component'
directory not to be used in component composition (Object.assign).

When MeshUIComponent is instanciated, it calls UpdateManager.register().

Then when MeshUIComponent receives new attributes, it doesn't update the component right away.
Instead, it calls UpdateManager.requestUpdate(), so that the component is updated when the user
decides it (usually in the render loop).

This is best for performance, because when a UI is created, thousands of componants can
potentially be instantiated. If they called updates function on their ancestors right away,
a given component could be updated thousands of times in one frame, which is very ineficient.

Instead, redundant update request are moot, the component will update once when the use calls
update() in their render loop.

*/

export { update }

export default {
	requestUpdate,
	register,
	disposeOf
};

//

const components = [];
const requestedUpdates = {};

// const timestamp = Date.now();

// get called by MeshUIComponent when component.set has been used.
// It registers this component and all its descendants for the different types of updates that were required.

function requestUpdate( component, updateParsing, updateLayout, updateInner ) {

	component.traverse( (child)=> {

		if ( !child.isUI ) return

		// request updates for all descendants of the passed components
		if ( !requestedUpdates[ child.id ] ) {

			requestedUpdates[ child.id ] = {
				updateParsing,
				updateLayout,
				updateInner
			};

		} else {

			if (updateParsing) requestedUpdates[ child.id ].updateParsing = true;
			if (updateLayout) requestedUpdates[ child.id ].updateLayout = true;
			if (updateInner) requestedUpdates[ child.id ].updateInner = true;

		}

	});

}

// Register a passed component for later updates

function register( component ) {

	if ( !components.includes(component) ) {

		components.push( component );

	}

}

// Unregister a component (when it's deleted for instance)

function disposeOf( component ) {

	const idx = components.indexOf( component );

	if ( idx > -1 ) {

		components.splice( idx, 1 );

	}

}

// Trigger all requested updates of registered components

function update() {

	if ( Object.keys(requestedUpdates).length > 0 ) {

		const roots = components.filter( (component)=> {

			return !component.getUIParent()

		});

		//

		Promise.all( roots.map( (component)=> {

			return callParsingUpdateOf( component );

		}))
			.then( ()=> {

				roots.forEach( (component)=> {

					callUpdatesOf( component );

				});

			})
			.catch( (err)=> {

				console.error(err)

			});

	}

}

// Synchronously calls parseParams update of all components from parent to children

function callParsingUpdateOf( component ) {

	return new Promise( (resolve)=> {

		new Promise( (resolveThisComponent, reject)=> {

			const request = requestedUpdates[ component.id ];

			if ( request && request.updateParsing ) {

				request.updateParsing = false;

				component.parseParams( resolveThisComponent, reject );

			} else {

				resolveThisComponent();

			}

		})
			.then( ()=> {

				Promise.all( component.getUIChildren().map( (childUI)=> {

					return callParsingUpdateOf( childUI );

				}))
					.then( ()=> {

						resolve();

					})
					.catch( (err)=> {

						console.error( err );

					});

			})
			.catch( (err)=> {

				console.error( err );

			});

	});

}

// Calls updateLayout and updateInner functions of components that need an update

function callUpdatesOf( component ) {

	const request = requestedUpdates[ component.id ]

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

	//

	delete requestedUpdates[ component.id ];

	//

	component.getUIChildren().forEach( (childUI)=> {

		callUpdatesOf( childUI );

	});

}
