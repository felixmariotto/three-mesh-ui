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

function requestUpdate( component, updateParsing, updateLayout, updateInner ) {

	if ( !requestedUpdates[ component.id ] ) {

		requestedUpdates[ component.id ] = {
			component,
			updateParsing,
			updateLayout,
			updateInner
		};

	} else {

		if (updateParsing) requestedUpdates[ component.id ].updateParsing = true;
		if (updateLayout) requestedUpdates[ component.id ].updateLayout = true;
		if (updateInner) requestedUpdates[ component.id ].updateInner = true;

	};

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

				component.parseParams( resolveThisComponent, reject );

				request.updateParsing = false;

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

		component.updateLayout();

		request.updateLayout = false

	};

	//

	if ( request && request.updateInner ) {

		component.updateInner();

		request.updateInner = false

	};

	//

	component.getUIChildren().forEach( (childUI)=> {

		callUpdatesOf( childUI );

	});

};

export { UpdateManager }
export { update }

export default UpdateManager;
