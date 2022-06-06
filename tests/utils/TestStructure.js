/* global ThreeMeshUI */

export const oneBlockContainer = function ( scene ) {

	const container = new ThreeMeshUI.Block({ width: 1, height:1 });
	const child1 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });

	container.add( child1 );
	scene.add( container );

	return { container, child1 };

}

export const fiveBlockContainer = function ( scene ) {

	const container = new ThreeMeshUI.Block({ width: 1, height:1 });
	const child1 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	const child2 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	const child3 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	const child4 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	const child5 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });

	container.add( child1, child2, child3, child4, child5 );
	scene.add( container );

	return { container, child1, child2, child3, child4, child5 };

}
