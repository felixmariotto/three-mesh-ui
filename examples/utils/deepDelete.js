function deepDelete( object3D ) {

	for ( let i = object3D.children.length - 1; i > -1; i-- ) {

		const child = object3D.children[ i ];

		if ( child.children.length > 0 ) deepDelete( child );

		object3D.remove( child );

		if ( child.material ) child.material.dispose();

		if ( child.geometry ) child.geometry.dispose();

	}

}

export default deepDelete;
