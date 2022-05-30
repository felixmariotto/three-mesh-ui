import { buildThreeSetup } from '../../../utils/TestThree.js' ;
import { preloadFonts } from '../../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../../utils/TestStructure.js';


describe("ContentDirection", function () {

	let scene, camera, renderer, render;
	let fontFamily;

	before(function (done) {

		({scene, camera, renderer, render} = buildThreeSetup());
		fontFamily = preloadFonts( done );

	});

	let container, child1, child2;

	before(function () {

		//build a container with 5 children blocks
		( {container,child1,child2} = fiveBlockContainer(scene) );
		// change the size of child2
		child2.set({width: 0.45, height: 0.45});
		render();

	});


	describe(".COLUMN", function() {

		before( () => {
			container.set({contentDirection: 'column'});
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
			container.set({contentDirection: 'column-reverse'});
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
			container.set({contentDirection: 'row'});
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
			container.set({contentDirection: 'row-reverse'});
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
