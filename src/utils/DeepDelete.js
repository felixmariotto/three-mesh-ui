
import UpdateManager from '../components/core/UpdateManager.js';

function DeepDelete( Object3D ) {

	Object3D.children.forEach( (child)=> {

		if ( child.children.length > 0 ) DeepDelete( child );

		Object3D.remove( child );

		UpdateManager.disposeOf( child );

		if ( child.material ) child.material.dispose();

		if ( child.geometry ) child.geometry.dispose();

	});

	Object3D.children = [];

};

export default DeepDelete
