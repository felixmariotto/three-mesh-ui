/* global THREE, ThreeMeshUI, scene, camera, renderer, controls */

describe("ContentDirection", function () {

	let scene, camera, renderer, render;

	before(function (done) {

		scene = new THREE.Scene();

		const WIDTH = window.innerWidth;
		const HEIGHT = window.innerHeight;
		camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( WIDTH, HEIGHT );

		document.body.appendChild( renderer.domElement );

		camera.position.set( 0, 1.6, 0 );

		render = () => {
			ThreeMeshUI.update();
			renderer.render( scene, camera );
		}

		// load fonts
		ThreeMeshUI.FontLibrary.prepare(
			ThreeMeshUI.FontLibrary
				.addFontFamily("Roboto")
				.addVariant('400','normal', "/base/examples/assets/fonts/msdf/roboto/regular.json", "/base/examples/assets/fonts/msdf/roboto/regular.png")
		).then( done );

	});

	let block, child1, child2;

	before(function () {

		console.log("sublevel before");

		//build a container with 2 children blocks
		block = new ThreeMeshUI.Block({ width: 1, height:1 });
		child1 = new ThreeMeshUI.Block({ width: 0.25, height: 0.25 });
		child2 = new ThreeMeshUI.Block({ width: 0.45, height: 0.45 });
		block.add( child1, child2 );
		scene.add( block );
		render();

	});


	describe(".COLUMN", function() {

		before( () => {
			block.set({contentDirection: 'column'});
			render();
		})


		it('First child should be above', () => {
			expect(child1.position.y).greaterThan(child2.position.y);
		});

		it('Children should share the same position.x', () => {
			expect(child1.position.x).equals(child2.position.x);
		});

		it("Vertical distance between children should be respected", function () {

			let yDelta = child1.position.y - child2.position.y;
			let hDelta = ( child1.getHeight() / 2 ) + ( child2.getHeight() / 2 );
			expect( yDelta ).equals( hDelta );

		});

		it("Margins should change the vertical distance between children", function () {

			const addedMargin = 0.1
			child1.set({margin:addedMargin});
			render();

			let yDelta = child1.position.y - child2.position.y;
			let hDelta = ( child1.getHeight() / 2 ) + ( child2.getHeight() / 2 );

			expect( yDelta ).equals( hDelta + addedMargin );
		});
	});
	describe(".COLUMN_REVERSE", function() {

		before( () => {
			block.set({contentDirection: 'column-reverse'});
			child1.set({margin:0});
			render();
		})


		it('First child should be below', () => {
			expect(child1.position.y).lessThan(child2.position.y);
		});

		it('Children should share the same position.x', () => {
			expect(child1.position.x).equals(child2.position.x);
		});

		it("Vertical distance between children should be respected", function () {

			let yDelta = child2.position.y - child1.position.y;
			let hDelta = ( child1.getHeight() / 2 ) + ( child2.getHeight() / 2 );
			expect( yDelta ).equals( hDelta );

		});

		it("Margins should change the vertical distance between children", function () {

			const addedMargin = 0.1
			child1.set({margin:addedMargin});
			render();

			let yDelta = child2.position.y - child1.position.y;
			let hDelta = ( child1.getHeight() / 2 ) + ( child2.getHeight() / 2 );

			expect( yDelta ).equals( hDelta + addedMargin );
		});

	});

	describe(".ROW", function() {

		before( () => {
			block.set({contentDirection: 'row'});
			child1.set({margin:0});
			render();
		})


		it('First child should be at left', () => {
			expect(child1.position.x).lessThan(child2.position.x);
		});

		it('Children should share the same position.y', () => {
			expect(child1.position.y).equals(child2.position.y);
		});

		it("Horizontal distance between children should be respected", function () {

			let xDelta = child2.position.x - child1.position.x;
			let wDelta = ( child1.getWidth() / 2 ) + ( child2.getWidth() / 2 );
			expect( xDelta ).equals( wDelta );

		});

		it("Margins should change the horizontal distance between children", function () {

			const addedMargin = 0.1
			child1.set({margin:addedMargin});
			render();

			let xDelta = child2.position.x - child1.position.x;
			let wDelta = ( child1.getWidth() / 2 ) + ( child2.getWidth() / 2 );

			expect( xDelta ).equals( wDelta + addedMargin );
		});
	});

	describe(".ROW_REVERSE", function() {

		before( () => {
			block.set({contentDirection: 'row-reverse'});
			child1.set({margin:0});
			render();
		})


		it('First child should be at right', () => {
			expect(child1.position.x).greaterThan(child2.position.x);
		});

		it('Children should share the same position.y', () => {
			expect(child1.position.y).equals(child2.position.y);
		});

		it("Horizontal distance between children should be respected", function () {

			let xDelta = child1.position.x - child2.position.x;
			let wDelta = ( child1.getWidth() / 2 ) + ( child2.getWidth() / 2 );
			expect( xDelta ).equals( wDelta );

		});

		it("Margins should change the horizontal distance between children", function () {

			const addedMargin = 0.1
			child1.set({margin:addedMargin});
			render();

			let xDelta = child1.position.x - child2.position.x;
			let wDelta = ( child1.getWidth() / 2 ) + ( child2.getWidth() / 2 );

			expect( xDelta ).equals( wDelta + addedMargin );
		});
	});

});
