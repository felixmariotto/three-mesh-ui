import { buildThreeSetup } from '../../../utils/TestThree.js' ;
import { preloadFonts } from '../../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../../utils/TestStructure.js';


describe( 'AlignItems', function () {

	let scene, camera, renderer, render;
	let fontFamily;

	before( function ( done ) {

		( { scene, camera, renderer, render } = buildThreeSetup() );
		fontFamily = preloadFonts( done );

	} );

	let container, child1, child2, child3, child4, child5;

	before( function () {

		//build a container with 5 children blocks
		( { container, child1, child2, child3, child4, child5 } = fiveBlockContainer( scene ) );
		// change the size of all children
		child2.set( { width: 0.275, height: 0.275 } );
		child3.set( { width: 0.3, height: 0.3 } );
		child4.set( { width: 0.325, height: 0.325 } );
		child5.set( { width: 0.35, height: 0.35 } );

		render();

	} );


	describe( '.START', function () {

		beforeEach( () => {
			container.set( { contentDirection: 'column', justifyContent: 'center', alignItems: 'start' } );
			render();
		} );

		it( 'Items should snap to half their size', () => {

			// columns -> x snap align
			expect( child1.position.x ).equals( -container.width / 2 + child1.width / 2 );
			expect( child2.position.x ).equals( -container.width / 2 + child2.width / 2 );
			expect( child3.position.x ).equals( -container.width / 2 + child3.width / 2 );
			expect( child4.position.x ).equals( -container.width / 2 + child4.width / 2 );
			expect( child5.position.x ).equals( -container.width / 2 + child5.width / 2 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.x ).equals( -container.width / 2 + child1.width / 2 );
			expect( child2.position.x ).equals( -container.width / 2 + child2.width / 2 );
			expect( child3.position.x ).equals( -container.width / 2 + child3.width / 2 );
			expect( child4.position.x ).equals( -container.width / 2 + child4.width / 2 );
			expect( child5.position.x ).equals( -container.width / 2 + child5.width / 2 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.x ).equals( -container.width / 2 + child1.width / 2 );
			expect( child2.position.x ).equals( -container.width / 2 + child2.width / 2 );
			expect( child3.position.x ).equals( -container.width / 2 + child3.width / 2 );
			expect( child4.position.x ).equals( -container.width / 2 + child4.width / 2 );
			expect( child5.position.x ).equals( -container.width / 2 + child5.width / 2 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.x ).equals( -container.width / 2 + child1.width / 2 );
			expect( child2.position.x ).equals( -container.width / 2 + child2.width / 2 );
			expect( child3.position.x ).equals( -container.width / 2 + child3.width / 2 );
			expect( child4.position.x ).equals( -container.width / 2 + child4.width / 2 );
			expect( child5.position.x ).equals( -container.width / 2 + child5.width / 2 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.x ).equals( -container.width / 2 + child1.width / 2 );
			expect( child2.position.x ).equals( -container.width / 2 + child2.width / 2 );
			expect( child3.position.x ).equals( -container.width / 2 + child3.width / 2 );
			expect( child4.position.x ).equals( -container.width / 2 + child4.width / 2 );
			expect( child5.position.x ).equals( -container.width / 2 + child5.width / 2 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.x ).equals( -container.width / 2 + child1.width / 2 );
			expect( child2.position.x ).equals( -container.width / 2 + child2.width / 2 );
			expect( child3.position.x ).equals( -container.width / 2 + child3.width / 2 );
			expect( child4.position.x ).equals( -container.width / 2 + child4.width / 2 );
			expect( child5.position.x ).equals( -container.width / 2 + child5.width / 2 );

			// row -> y snap align
			container.set( { contentDirection: 'row', justifyContent: 'center' } );
			render();

			expect( child1.position.y ).equals( container.height / 2 - child1.height / 2 );
			expect( child2.position.y ).equals( container.height / 2 - child2.height / 2 );
			expect( child3.position.y ).equals( container.height / 2 - child3.height / 2 );
			expect( child4.position.y ).equals( container.height / 2 - child4.height / 2 );
			expect( child5.position.y ).equals( container.height / 2 - child5.height / 2 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.y ).equals( container.height / 2 - child1.height / 2 );
			expect( child2.position.y ).equals( container.height / 2 - child2.height / 2 );
			expect( child3.position.y ).equals( container.height / 2 - child3.height / 2 );
			expect( child4.position.y ).equals( container.height / 2 - child4.height / 2 );
			expect( child5.position.y ).equals( container.height / 2 - child5.height / 2 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.y ).equals( container.height / 2 - child1.height / 2 );
			expect( child2.position.y ).equals( container.height / 2 - child2.height / 2 );
			expect( child3.position.y ).equals( container.height / 2 - child3.height / 2 );
			expect( child4.position.y ).equals( container.height / 2 - child4.height / 2 );
			expect( child5.position.y ).equals( container.height / 2 - child5.height / 2 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.y ).equals( container.height / 2 - child1.height / 2 );
			expect( child2.position.y ).equals( container.height / 2 - child2.height / 2 );
			expect( child3.position.y ).equals( container.height / 2 - child3.height / 2 );
			expect( child4.position.y ).equals( container.height / 2 - child4.height / 2 );
			expect( child5.position.y ).equals( container.height / 2 - child5.height / 2 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.y ).equals( container.height / 2 - child1.height / 2 );
			expect( child2.position.y ).equals( container.height / 2 - child2.height / 2 );
			expect( child3.position.y ).equals( container.height / 2 - child3.height / 2 );
			expect( child4.position.y ).equals( container.height / 2 - child4.height / 2 );
			expect( child5.position.y ).equals( container.height / 2 - child5.height / 2 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.y ).equals( container.height / 2 - child1.height / 2 );
			expect( child2.position.y ).equals( container.height / 2 - child2.height / 2 );
			expect( child3.position.y ).equals( container.height / 2 - child3.height / 2 );
			expect( child4.position.y ).equals( container.height / 2 - child4.height / 2 );
			expect( child5.position.y ).equals( container.height / 2 - child5.height / 2 );
		} );

	} );

	describe( '.END', () => {

		beforeEach( () => {
			container.set( { contentDirection: 'column', justifyContent: 'center', alignItems: 'end' } );
			render();
		} );

		it( 'Items should snap to half their size', () => {

			// columns -> x snap align
			expect( child1.position.x ).equals( container.width / 2 - child1.width / 2 );
			expect( child2.position.x ).equals( container.width / 2 - child2.width / 2 );
			expect( child3.position.x ).equals( container.width / 2 - child3.width / 2 );
			expect( child4.position.x ).equals( container.width / 2 - child4.width / 2 );
			expect( child5.position.x ).equals( container.width / 2 - child5.width / 2 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.x ).equals( container.width / 2 - child1.width / 2 );
			expect( child2.position.x ).equals( container.width / 2 - child2.width / 2 );
			expect( child3.position.x ).equals( container.width / 2 - child3.width / 2 );
			expect( child4.position.x ).equals( container.width / 2 - child4.width / 2 );
			expect( child5.position.x ).equals( container.width / 2 - child5.width / 2 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.x ).equals( container.width / 2 - child1.width / 2 );
			expect( child2.position.x ).equals( container.width / 2 - child2.width / 2 );
			expect( child3.position.x ).equals( container.width / 2 - child3.width / 2 );
			expect( child4.position.x ).equals( container.width / 2 - child4.width / 2 );
			expect( child5.position.x ).equals( container.width / 2 - child5.width / 2 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.x ).equals( container.width / 2 - child1.width / 2 );
			expect( child2.position.x ).equals( container.width / 2 - child2.width / 2 );
			expect( child3.position.x ).equals( container.width / 2 - child3.width / 2 );
			expect( child4.position.x ).equals( container.width / 2 - child4.width / 2 );
			expect( child5.position.x ).equals( container.width / 2 - child5.width / 2 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.x ).equals( container.width / 2 - child1.width / 2 );
			expect( child2.position.x ).equals( container.width / 2 - child2.width / 2 );
			expect( child3.position.x ).equals( container.width / 2 - child3.width / 2 );
			expect( child4.position.x ).equals( container.width / 2 - child4.width / 2 );
			expect( child5.position.x ).equals( container.width / 2 - child5.width / 2 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.x ).equals( container.width / 2 - child1.width / 2 );
			expect( child2.position.x ).equals( container.width / 2 - child2.width / 2 );
			expect( child3.position.x ).equals( container.width / 2 - child3.width / 2 );
			expect( child4.position.x ).equals( container.width / 2 - child4.width / 2 );
			expect( child5.position.x ).equals( container.width / 2 - child5.width / 2 );

			// row -> y snap align
			container.set( { contentDirection: 'row', justifyContent: 'center' } );
			render();

			expect( child1.position.y ).equals( -container.height / 2 + child1.height / 2 );
			expect( child2.position.y ).equals( -container.height / 2 + child2.height / 2 );
			expect( child3.position.y ).equals( -container.height / 2 + child3.height / 2 );
			expect( child4.position.y ).equals( -container.height / 2 + child4.height / 2 );
			expect( child5.position.y ).equals( -container.height / 2 + child5.height / 2 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.y ).equals( -container.height / 2 + child1.height / 2 );
			expect( child2.position.y ).equals( -container.height / 2 + child2.height / 2 );
			expect( child3.position.y ).equals( -container.height / 2 + child3.height / 2 );
			expect( child4.position.y ).equals( -container.height / 2 + child4.height / 2 );
			expect( child5.position.y ).equals( -container.height / 2 + child5.height / 2 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.y ).equals( -container.height / 2 + child1.height / 2 );
			expect( child2.position.y ).equals( -container.height / 2 + child2.height / 2 );
			expect( child3.position.y ).equals( -container.height / 2 + child3.height / 2 );
			expect( child4.position.y ).equals( -container.height / 2 + child4.height / 2 );
			expect( child5.position.y ).equals( -container.height / 2 + child5.height / 2 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.y ).equals( -container.height / 2 + child1.height / 2 );
			expect( child2.position.y ).equals( -container.height / 2 + child2.height / 2 );
			expect( child3.position.y ).equals( -container.height / 2 + child3.height / 2 );
			expect( child4.position.y ).equals( -container.height / 2 + child4.height / 2 );
			expect( child5.position.y ).equals( -container.height / 2 + child5.height / 2 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.y ).equals( -container.height / 2 + child1.height / 2 );
			expect( child2.position.y ).equals( -container.height / 2 + child2.height / 2 );
			expect( child3.position.y ).equals( -container.height / 2 + child3.height / 2 );
			expect( child4.position.y ).equals( -container.height / 2 + child4.height / 2 );
			expect( child5.position.y ).equals( -container.height / 2 + child5.height / 2 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.y ).equals( -container.height / 2 + child1.height / 2 );
			expect( child2.position.y ).equals( -container.height / 2 + child2.height / 2 );
			expect( child3.position.y ).equals( -container.height / 2 + child3.height / 2 );
			expect( child4.position.y ).equals( -container.height / 2 + child4.height / 2 );
			expect( child5.position.y ).equals( -container.height / 2 + child5.height / 2 );
		} );

	} );

	describe( '.CENTER', () => {

		beforeEach( () => {
			container.set( { contentDirection: 'column', justifyContent: 'center', alignItems: 'center' } );
			render();
		} );

		it( 'Items should snap on center', () => {

			// columns -> x snap align
			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			// row -> y snap align
			container.set( { contentDirection: 'row', justifyContent: 'center' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );
		} );

	} );

	describe( '.STRETCH', () => {

		beforeEach( () => {
			container.set( { contentDirection: 'column', justifyContent: 'center', alignItems: 'stretch' } );
			render();
		} );

		it( 'Items should snap on center', () => {

			// columns -> x snap align
			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.x ).equals( 0 );
			expect( child2.position.x ).equals( 0 );
			expect( child3.position.x ).equals( 0 );
			expect( child4.position.x ).equals( 0 );
			expect( child5.position.x ).equals( 0 );

			// row -> y snap align
			container.set( { contentDirection: 'row', justifyContent: 'center' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.y ).equals( 0 );
			expect( child2.position.y ).equals( 0 );
			expect( child3.position.y ).equals( 0 );
			expect( child4.position.y ).equals( 0 );
			expect( child5.position.y ).equals( 0 );
		} );

		it( 'Items should fill their parent size', () => {

			// columns -> x snap align
			expect( child1.getWidth() ).equals( container.width );
			expect( child2.getWidth() ).equals( container.width );
			expect( child3.getWidth() ).equals( container.width );
			expect( child4.getWidth() ).equals( container.width );
			expect( child5.getWidth() ).equals( container.width );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.getWidth() ).equals( container.width );
			expect( child2.getWidth() ).equals( container.width );
			expect( child3.getWidth() ).equals( container.width );
			expect( child4.getWidth() ).equals( container.width );
			expect( child5.getWidth() ).equals( container.width );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.getWidth() ).equals( container.width );
			expect( child2.getWidth() ).equals( container.width );
			expect( child3.getWidth() ).equals( container.width );
			expect( child4.getWidth() ).equals( container.width );
			expect( child5.getWidth() ).equals( container.width );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.getWidth() ).equals( container.width );
			expect( child2.getWidth() ).equals( container.width );
			expect( child3.getWidth() ).equals( container.width );
			expect( child4.getWidth() ).equals( container.width );
			expect( child5.getWidth() ).equals( container.width );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.getWidth() ).equals( container.width );
			expect( child2.getWidth() ).equals( container.width );
			expect( child3.getWidth() ).equals( container.width );
			expect( child4.getWidth() ).equals( container.width );
			expect( child5.getWidth() ).equals( container.width );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.getWidth() ).equals( container.width );
			expect( child2.getWidth() ).equals( container.width );
			expect( child3.getWidth() ).equals( container.width );
			expect( child4.getWidth() ).equals( container.width );
			expect( child5.getWidth() ).equals( container.width );

			// row -> y snap align
			container.set( { contentDirection: 'row', justifyContent: 'center' } );
			render();

			expect( child1.getHeight() ).equals( container.height );
			expect( child2.getHeight() ).equals( container.height );
			expect( child3.getHeight() ).equals( container.height );
			expect( child4.getHeight() ).equals( container.height );
			expect( child5.getHeight() ).equals( container.height );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.getHeight() ).equals( container.height );
			expect( child2.getHeight() ).equals( container.height );
			expect( child3.getHeight() ).equals( container.height );
			expect( child4.getHeight() ).equals( container.height );
			expect( child5.getHeight() ).equals( container.height );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.getHeight() ).equals( container.height );
			expect( child2.getHeight() ).equals( container.height );
			expect( child3.getHeight() ).equals( container.height );
			expect( child4.getHeight() ).equals( container.height );
			expect( child5.getHeight() ).equals( container.height );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.getHeight() ).equals( container.height );
			expect( child2.getHeight() ).equals( container.height );
			expect( child3.getHeight() ).equals( container.height );
			expect( child4.getHeight() ).equals( container.height );
			expect( child5.getHeight() ).equals( container.height );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.getHeight() ).equals( container.height );
			expect( child2.getHeight() ).equals( container.height );
			expect( child3.getHeight() ).equals( container.height );
			expect( child4.getHeight() ).equals( container.height );
			expect( child5.getHeight() ).equals( container.height );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.getHeight() ).equals( container.height );
			expect( child2.getHeight() ).equals( container.height );
			expect( child3.getHeight() ).equals( container.height );
			expect( child4.getHeight() ).equals( container.height );
			expect( child5.getHeight() ).equals( container.height );
		} );

	} );

} );
