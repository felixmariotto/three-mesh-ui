/* global ThreeMeshUI */

export const oneBlockContainer = function ( scene ) {

	const container = new ThreeMeshUI.Block( { width: 1, height: 1 } );
	const child1 = new ThreeMeshUI.Block( { width: 0.1, height: 0.1 } );

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

export const threeParentContainers = function ( scene ) {

	const root = new ThreeMeshUI.Block({ width: 1, height:1 });
	const parent1 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	const parent2 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	const parent3 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });

	root.add( parent1, parent2, parent3 );
	scene.add( root );

	return { root, parent1, parent2, parent3 };

}

export const addThreeParagraphs = function( container ) {

	const p1 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	p1.pasteAttributes("p");

	const span1 = new ThreeMeshUI.Text({});
	span1.pasteAttributes('span');

	p1.add( span1 );

	const p2 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	p2.pasteAttributes("p");

	const span2 = new ThreeMeshUI.Text({});
	span2.pasteAttributes('span');

	p2.add( span2 );

	const p3 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	p3.pasteAttributes("p");

	const span3 = new ThreeMeshUI.Text({});
	span3.pasteAttributes('span');

	p3.add( span3 );

	container.add( p1, p2, p3 );

	return { p1, p2, p3 };

}

export const addThreeLinks = function( container ) {

	const l1 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	l1.pasteAttributes("a");

	const span1 = new ThreeMeshUI.Text({});
	span1.pasteAttributes('span');

	l1.add( span1 );

	const l2 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	l2.pasteAttributes("a");

	const span2 = new ThreeMeshUI.Text({});
	span2.pasteAttributes('span');

	l2.add( span2 );

	const l3 = new ThreeMeshUI.Block({ width: 0.1, height: 0.1 });
	l3.pasteAttributes("a");

	const span3 = new ThreeMeshUI.Text({});
	span3.pasteAttributes('span');

	l3.add( span3 );

	container.add( l1, l2, l3 );

	return { l1, l2, l3 };

}
