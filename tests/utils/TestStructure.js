/* global ThreeMeshUI */

export const fiveBlockContainer = function ( scene ) {

	const container = new ThreeMeshUI.Block({ width: 2, height:2 });
	const child1 = new ThreeMeshUI.Block({ width: 0.25, height: 0.25 });
	const child2 = new ThreeMeshUI.Block({ width: 0.25, height: 0.25 });
	const child3 = new ThreeMeshUI.Block({ width: 0.25, height: 0.25 });
	const child4 = new ThreeMeshUI.Block({ width: 0.25, height: 0.25 });
	const child5 = new ThreeMeshUI.Block({ width: 0.25, height: 0.25 });
	container.add( child1, child2, child3, child4, child5 );
	scene.add( container );

	return { container, child1, child2, child3, child4, child5 };

}
