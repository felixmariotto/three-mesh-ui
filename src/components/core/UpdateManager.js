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

		const tips = components.filter( (component)=> {

			return component.getUIChildren().length === 0

		});

		//

		tips.forEach( (component)=> {

			callParsingUpdateOf( component );

		});

		//

		const roots = components.filter( (component)=> {

			return !component.getUIParent()

		});

		//

		setTimeout( ()=> {

			roots.forEach( (component)=> {

				callUpdatesOf( component );

			});

		}, 100 )

	};

};

//

function callParsingUpdateOf( component ) {

	const request = requestedUpdates[ component.id ];
	const parent = component.getUIParent();

	if ( request && request.updateParsing ) {

		component.parseParams();

		request.updateParsing = false

	};

	if ( parent ) callParsingUpdateOf( parent );

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
