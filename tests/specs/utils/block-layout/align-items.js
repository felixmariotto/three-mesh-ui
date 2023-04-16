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
			container.set( { flexDirection: 'column', justifyContent: 'center', alignItems: 'start' } );
			render();
		} );

		it( 'Items should snap to half their size', () => {

			// columns -> x snap align
			expect( child1.position.x ).equals( -container._width._value / 2 + child1._width._value / 2 );
			expect( child2.position.x ).equals( -container._width._value / 2 + child2._width._value / 2 );
			expect( child3.position.x ).equals( -container._width._value / 2 + child3._width._value / 2 );
			expect( child4.position.x ).equals( -container._width._value / 2 + child4._width._value / 2 );
			expect( child5.position.x ).equals( -container._width._value / 2 + child5._width._value / 2 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.x ).equals( -container._width._value / 2 + child1._width._value / 2 );
			expect( child2.position.x ).equals( -container._width._value / 2 + child2._width._value / 2 );
			expect( child3.position.x ).equals( -container._width._value / 2 + child3._width._value / 2 );
			expect( child4.position.x ).equals( -container._width._value / 2 + child4._width._value / 2 );
			expect( child5.position.x ).equals( -container._width._value / 2 + child5._width._value / 2 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.x ).equals( -container._width._value / 2 + child1._width._value / 2 );
			expect( child2.position.x ).equals( -container._width._value / 2 + child2._width._value / 2 );
			expect( child3.position.x ).equals( -container._width._value / 2 + child3._width._value / 2 );
			expect( child4.position.x ).equals( -container._width._value / 2 + child4._width._value / 2 );
			expect( child5.position.x ).equals( -container._width._value / 2 + child5._width._value / 2 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.x ).equals( -container._width._value / 2 + child1._width._value / 2 );
			expect( child2.position.x ).equals( -container._width._value / 2 + child2._width._value / 2 );
			expect( child3.position.x ).equals( -container._width._value / 2 + child3._width._value / 2 );
			expect( child4.position.x ).equals( -container._width._value / 2 + child4._width._value / 2 );
			expect( child5.position.x ).equals( -container._width._value / 2 + child5._width._value / 2 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.x ).equals( -container._width._value / 2 + child1._width._value / 2 );
			expect( child2.position.x ).equals( -container._width._value / 2 + child2._width._value / 2 );
			expect( child3.position.x ).equals( -container._width._value / 2 + child3._width._value / 2 );
			expect( child4.position.x ).equals( -container._width._value / 2 + child4._width._value / 2 );
			expect( child5.position.x ).equals( -container._width._value / 2 + child5._width._value / 2 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.x ).equals( -container._width._value / 2 + child1._width._value / 2 );
			expect( child2.position.x ).equals( -container._width._value / 2 + child2._width._value / 2 );
			expect( child3.position.x ).equals( -container._width._value / 2 + child3._width._value / 2 );
			expect( child4.position.x ).equals( -container._width._value / 2 + child4._width._value / 2 );
			expect( child5.position.x ).equals( -container._width._value / 2 + child5._width._value / 2 );

			// row -> y snap align
			container.set( { flexDirection: 'row', justifyContent: 'center' } );
			render();

			expect( child1.position.y ).equals( container._height._value / 2 - child1._height._value / 2 );
			expect( child2.position.y ).equals( container._height._value / 2 - child2._height._value / 2 );
			expect( child3.position.y ).equals( container._height._value / 2 - child3._height._value / 2 );
			expect( child4.position.y ).equals( container._height._value / 2 - child4._height._value / 2 );
			expect( child5.position.y ).equals( container._height._value / 2 - child5._height._value / 2 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.y ).equals( container._height._value / 2 - child1._height._value / 2 );
			expect( child2.position.y ).equals( container._height._value / 2 - child2._height._value / 2 );
			expect( child3.position.y ).equals( container._height._value / 2 - child3._height._value / 2 );
			expect( child4.position.y ).equals( container._height._value / 2 - child4._height._value / 2 );
			expect( child5.position.y ).equals( container._height._value / 2 - child5._height._value / 2 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.y ).equals( container._height._value / 2 - child1._height._value / 2 );
			expect( child2.position.y ).equals( container._height._value / 2 - child2._height._value / 2 );
			expect( child3.position.y ).equals( container._height._value / 2 - child3._height._value / 2 );
			expect( child4.position.y ).equals( container._height._value / 2 - child4._height._value / 2 );
			expect( child5.position.y ).equals( container._height._value / 2 - child5._height._value / 2 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.y ).equals( container._height._value / 2 - child1._height._value / 2 );
			expect( child2.position.y ).equals( container._height._value / 2 - child2._height._value / 2 );
			expect( child3.position.y ).equals( container._height._value / 2 - child3._height._value / 2 );
			expect( child4.position.y ).equals( container._height._value / 2 - child4._height._value / 2 );
			expect( child5.position.y ).equals( container._height._value / 2 - child5._height._value / 2 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.y ).equals( container._height._value / 2 - child1._height._value / 2 );
			expect( child2.position.y ).equals( container._height._value / 2 - child2._height._value / 2 );
			expect( child3.position.y ).equals( container._height._value / 2 - child3._height._value / 2 );
			expect( child4.position.y ).equals( container._height._value / 2 - child4._height._value / 2 );
			expect( child5.position.y ).equals( container._height._value / 2 - child5._height._value / 2 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.y ).equals( container._height._value / 2 - child1._height._value / 2 );
			expect( child2.position.y ).equals( container._height._value / 2 - child2._height._value / 2 );
			expect( child3.position.y ).equals( container._height._value / 2 - child3._height._value / 2 );
			expect( child4.position.y ).equals( container._height._value / 2 - child4._height._value / 2 );
			expect( child5.position.y ).equals( container._height._value / 2 - child5._height._value / 2 );
		} );

	} );

	describe( '.END', () => {

		beforeEach( () => {
			container.set( { flexDirection: 'column', justifyContent: 'center', alignItems: 'end' } );
			render();
		} );

		it( 'Items should snap to half their size', () => {

			// columns -> x snap align
			expect( child1.position.x ).equals( container._width._value / 2 - child1._width._value / 2 );
			expect( child2.position.x ).equals( container._width._value / 2 - child2._width._value / 2 );
			expect( child3.position.x ).equals( container._width._value / 2 - child3._width._value / 2 );
			expect( child4.position.x ).equals( container._width._value / 2 - child4._width._value / 2 );
			expect( child5.position.x ).equals( container._width._value / 2 - child5._width._value / 2 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.x ).equals( container._width._value / 2 - child1._width._value / 2 );
			expect( child2.position.x ).equals( container._width._value / 2 - child2._width._value / 2 );
			expect( child3.position.x ).equals( container._width._value / 2 - child3._width._value / 2 );
			expect( child4.position.x ).equals( container._width._value / 2 - child4._width._value / 2 );
			expect( child5.position.x ).equals( container._width._value / 2 - child5._width._value / 2 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.x ).equals( container._width._value / 2 - child1._width._value / 2 );
			expect( child2.position.x ).equals( container._width._value / 2 - child2._width._value / 2 );
			expect( child3.position.x ).equals( container._width._value / 2 - child3._width._value / 2 );
			expect( child4.position.x ).equals( container._width._value / 2 - child4._width._value / 2 );
			expect( child5.position.x ).equals( container._width._value / 2 - child5._width._value / 2 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.x ).equals( container._width._value / 2 - child1._width._value / 2 );
			expect( child2.position.x ).equals( container._width._value / 2 - child2._width._value / 2 );
			expect( child3.position.x ).equals( container._width._value / 2 - child3._width._value / 2 );
			expect( child4.position.x ).equals( container._width._value / 2 - child4._width._value / 2 );
			expect( child5.position.x ).equals( container._width._value / 2 - child5._width._value / 2 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.x ).equals( container._width._value / 2 - child1._width._value / 2 );
			expect( child2.position.x ).equals( container._width._value / 2 - child2._width._value / 2 );
			expect( child3.position.x ).equals( container._width._value / 2 - child3._width._value / 2 );
			expect( child4.position.x ).equals( container._width._value / 2 - child4._width._value / 2 );
			expect( child5.position.x ).equals( container._width._value / 2 - child5._width._value / 2 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.x ).equals( container._width._value / 2 - child1._width._value / 2 );
			expect( child2.position.x ).equals( container._width._value / 2 - child2._width._value / 2 );
			expect( child3.position.x ).equals( container._width._value / 2 - child3._width._value / 2 );
			expect( child4.position.x ).equals( container._width._value / 2 - child4._width._value / 2 );
			expect( child5.position.x ).equals( container._width._value / 2 - child5._width._value / 2 );

			// row -> y snap align
			container.set( { flexDirection: 'row', justifyContent: 'center' } );
			render();

			expect( child1.position.y ).equals( -container._height._value / 2 + child1._height._value / 2 );
			expect( child2.position.y ).equals( -container._height._value / 2 + child2._height._value / 2 );
			expect( child3.position.y ).equals( -container._height._value / 2 + child3._height._value / 2 );
			expect( child4.position.y ).equals( -container._height._value / 2 + child4._height._value / 2 );
			expect( child5.position.y ).equals( -container._height._value / 2 + child5._height._value / 2 );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1.position.y ).equals( -container._height._value / 2 + child1._height._value / 2 );
			expect( child2.position.y ).equals( -container._height._value / 2 + child2._height._value / 2 );
			expect( child3.position.y ).equals( -container._height._value / 2 + child3._height._value / 2 );
			expect( child4.position.y ).equals( -container._height._value / 2 + child4._height._value / 2 );
			expect( child5.position.y ).equals( -container._height._value / 2 + child5._height._value / 2 );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1.position.y ).equals( -container._height._value / 2 + child1._height._value / 2 );
			expect( child2.position.y ).equals( -container._height._value / 2 + child2._height._value / 2 );
			expect( child3.position.y ).equals( -container._height._value / 2 + child3._height._value / 2 );
			expect( child4.position.y ).equals( -container._height._value / 2 + child4._height._value / 2 );
			expect( child5.position.y ).equals( -container._height._value / 2 + child5._height._value / 2 );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1.position.y ).equals( -container._height._value / 2 + child1._height._value / 2 );
			expect( child2.position.y ).equals( -container._height._value / 2 + child2._height._value / 2 );
			expect( child3.position.y ).equals( -container._height._value / 2 + child3._height._value / 2 );
			expect( child4.position.y ).equals( -container._height._value / 2 + child4._height._value / 2 );
			expect( child5.position.y ).equals( -container._height._value / 2 + child5._height._value / 2 );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1.position.y ).equals( -container._height._value / 2 + child1._height._value / 2 );
			expect( child2.position.y ).equals( -container._height._value / 2 + child2._height._value / 2 );
			expect( child3.position.y ).equals( -container._height._value / 2 + child3._height._value / 2 );
			expect( child4.position.y ).equals( -container._height._value / 2 + child4._height._value / 2 );
			expect( child5.position.y ).equals( -container._height._value / 2 + child5._height._value / 2 );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1.position.y ).equals( -container._height._value / 2 + child1._height._value / 2 );
			expect( child2.position.y ).equals( -container._height._value / 2 + child2._height._value / 2 );
			expect( child3.position.y ).equals( -container._height._value / 2 + child3._height._value / 2 );
			expect( child4.position.y ).equals( -container._height._value / 2 + child4._height._value / 2 );
			expect( child5.position.y ).equals( -container._height._value / 2 + child5._height._value / 2 );
		} );

	} );

	describe( '.CENTER', () => {

		beforeEach( () => {
			container.set( { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } );
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
			container.set( { flexDirection: 'row', justifyContent: 'center' } );
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
			container.set( { flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' } );

			// child1 keep its fixed size
			child2.set({width:'auto',height:'auto'});
			child3.set({width:'auto',height:'auto'});
			child4.set({width:'auto',height:'auto'});
			child5.set({width:'auto',height:'auto'});

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
			container.set( { flexDirection: 'row', justifyContent: 'center' } );
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
			expect( child1._bounds._offsetWidth ).equals( 0.1 );
			expect( child2._bounds._offsetWidth ).equals( container._width._value );
			expect( child3._bounds._offsetWidth ).equals( container._width._value );
			expect( child4._bounds._offsetWidth ).equals( container._width._value );
			expect( child5._bounds._offsetWidth ).equals( container._width._value );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1._bounds._offsetWidth ).equals( 0.1 );
			expect( child2._bounds._offsetWidth ).equals( container._width._value );
			expect( child3._bounds._offsetWidth ).equals( container._width._value );
			expect( child4._bounds._offsetWidth ).equals( container._width._value );
			expect( child5._bounds._offsetWidth ).equals( container._width._value );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1._bounds._offsetWidth ).equals( 0.1 );
			expect( child2._bounds._offsetWidth ).equals( container._width._value );
			expect( child3._bounds._offsetWidth ).equals( container._width._value );
			expect( child4._bounds._offsetWidth ).equals( container._width._value );
			expect( child5._bounds._offsetWidth ).equals( container._width._value );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1._bounds._offsetWidth ).equals( 0.1 );
			expect( child2._bounds._offsetWidth ).equals( container._width._value );
			expect( child3._bounds._offsetWidth ).equals( container._width._value );
			expect( child4._bounds._offsetWidth ).equals( container._width._value );
			expect( child5._bounds._offsetWidth ).equals( container._width._value );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1._bounds._offsetWidth ).equals( 0.1 );
			expect( child2._bounds._offsetWidth ).equals( container._width._value );
			expect( child3._bounds._offsetWidth ).equals( container._width._value );
			expect( child4._bounds._offsetWidth ).equals( container._width._value );
			expect( child5._bounds._offsetWidth ).equals( container._width._value );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1._bounds._offsetWidth ).equals( 0.1 );
			expect( child2._bounds._offsetWidth ).equals( container._width._value );
			expect( child3._bounds._offsetWidth ).equals( container._width._value );
			expect( child4._bounds._offsetWidth ).equals( container._width._value );
			expect( child5._bounds._offsetWidth ).equals( container._width._value );

			// row -> y snap align
			container.set( { flexDirection: 'row', justifyContent: 'center' } );
			render();

			expect( child1._bounds._offsetHeight  ).equals( 0.1 );
			expect( child2._bounds._offsetHeight  ).equals( container._height._value );
			expect( child3._bounds._offsetHeight  ).equals( container._height._value );
			expect( child4._bounds._offsetHeight  ).equals( container._height._value );
			expect( child5._bounds._offsetHeight  ).equals( container._height._value );

			container.set( { justifyContent: 'start' } );
			render();

			expect( child1._bounds._offsetHeight  ).equals( 0.1 );
			expect( child2._bounds._offsetHeight  ).equals( container._height._value );
			expect( child3._bounds._offsetHeight  ).equals( container._height._value );
			expect( child4._bounds._offsetHeight  ).equals( container._height._value );
			expect( child5._bounds._offsetHeight  ).equals( container._height._value );

			container.set( { justifyContent: 'end' } );
			render();

			expect( child1._bounds._offsetHeight  ).equals( 0.1 );
			expect( child2._bounds._offsetHeight  ).equals( container._height._value );
			expect( child3._bounds._offsetHeight  ).equals( container._height._value );
			expect( child4._bounds._offsetHeight  ).equals( container._height._value );
			expect( child5._bounds._offsetHeight  ).equals( container._height._value );

			container.set( { justifyContent: 'space-around' } );
			render();

			expect( child1._bounds._offsetHeight  ).equals( 0.1 );
			expect( child2._bounds._offsetHeight  ).equals( container._height._value );
			expect( child3._bounds._offsetHeight  ).equals( container._height._value );
			expect( child4._bounds._offsetHeight  ).equals( container._height._value );
			expect( child5._bounds._offsetHeight  ).equals( container._height._value );

			container.set( { justifyContent: 'space-evenly' } );
			render();

			expect( child1._bounds._offsetHeight  ).equals( 0.1 );
			expect( child2._bounds._offsetHeight  ).equals( container._height._value );
			expect( child3._bounds._offsetHeight  ).equals( container._height._value );
			expect( child4._bounds._offsetHeight  ).equals( container._height._value );
			expect( child5._bounds._offsetHeight  ).equals( container._height._value );

			container.set( { justifyContent: 'space-between' } );
			render();

			expect( child1._bounds._offsetHeight  ).equals( 0.1 );
			expect( child2._bounds._offsetHeight  ).equals( container._height._value );
			expect( child3._bounds._offsetHeight  ).equals( container._height._value );
			expect( child4._bounds._offsetHeight  ).equals( container._height._value );
			expect( child5._bounds._offsetHeight  ).equals( container._height._value );

			// restore
			child2.set({width:0.1});
			child3.set({width:0.1});
			child4.set({width:0.1});
			child5.set({width:0.1});

		} );

	} );

} );
