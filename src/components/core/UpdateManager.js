/*

Job:
	- recording components required updates
	- trigger those updates when 'update' is called

*/

//

const UpdateManager = {
	requestUpdate,
	register
};

const components = [];
let requestedUpdates = {};

const timestamp = Date.now()

function requestUpdate( component, updateParsing, updateLayout, updateInner ) {

	component.traverse( (child)=> {

		if ( !child.isUI ) return

		if ( !requestedUpdates[ child.id ] ) {

			requestedUpdates[ child.id ] = {
				child,
				updateParsing,
				updateLayout,
				updateInner
			};

		} else {

			if (updateParsing) requestedUpdates[ child.id ].updateParsing = true;
			if (updateLayout) requestedUpdates[ child.id ].updateLayout = true;
			if (updateInner) requestedUpdates[ child.id ].updateInner = true;

		};

	})

};

//

function register( component ) {

	if ( !components.includes(component) ) {

		components.push( component );

	};

};

//

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

	};

};

//

function callParsingUpdateOf( component ) {

	return new Promise( (resolve)=> {

		new Promise( (resolveThisComponent, reject)=> {

			const request = requestedUpdates[ component.id ];

			if ( request && request.updateParsing ) {

				request.updateParsing = false;

				component.parseParams( resolveThisComponent, reject );

			} else {

				resolveThisComponent();

			};

		})
		.then( (data)=> {

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

};

//

function callUpdatesOf( component ) {

	let request = requestedUpdates[ component.id ]

	//

	if ( request && request.updateLayout ) {

		request.updateLayout = false;

		component.updateLayout();

	};

	//

	if ( request && request.updateInner ) {

		request.updateInner = false;

		component.updateInner();

	};

	//

	component.getUIChildren().forEach( (childUI)=> {

		callUpdatesOf( childUI );

	});

};

export { UpdateManager }
export { update }

export default UpdateManager;
