import { buildThreeSetup } from '../../../utils/TestThree.js' ;
import { preloadFonts } from '../../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../../utils/TestStructure.js';
import { imprecise } from '../../../utils/TestNumber.js';


describe("JustifyContent", function () {

	let scene, camera, renderer, render;
	let fontFamily;

	before(function (done) {

		({scene, camera, renderer, render} = buildThreeSetup());
		fontFamily = preloadFonts( done );

	});

	let container, child1, child2, child3, child4, child5;

	before(function () {

		//build a container with 5 children blocks
		( { container, child1, child2, child3, child4, child5 } = fiveBlockContainer(scene) );
		render();

	});

	beforeEach( function () {

		container.set({flexDirection: 'column'});

	});


	describe(".START", function() {

		beforeEach( () => {

			container.set({flexDirection:'column', justifyContent: 'start'});
			render();

		})


		it('Distance from first child should be greater', () => {
			// As start means left or top, first child should be the most distant from the center
			// Note : This won't be true if children overflows their parent

			// column -> vertical -> y diffs
			const dyChild1 = container.position.y - child1.position.y;
			const dyChild5 = container.position.y - child5.position.y;
			expect(dyChild1*dyChild1).greaterThan(dyChild5*dyChild5);

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> x diffs
			const dxChild1 = container.position.x - child1.position.x;
			const dxChild5 = container.position.x - child5.position.x;
			expect(dxChild1*dxChild1).greaterThan(dxChild5*dxChild5);

		});

		it('All children should share the same axis', () => {

			// column -> vertical -> x shared
			expect( child1.position.x ).equals( child2.position.x );
			expect( child2.position.x ).equals( child3.position.x );
			expect( child3.position.x ).equals( child4.position.x );
			expect( child4.position.x ).equals( child5.position.x );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> y shared
			expect( child1.position.y ).equals( child2.position.y );
			expect( child2.position.y ).equals( child3.position.y );
			expect( child3.position.y ).equals( child4.position.y );
			expect( child4.position.y ).equals( child5.position.y );

		});


	});

	describe(".END", function() {

		beforeEach( () => {

			container.set({flexDirection:'column', justifyContent: 'end'});
			render();

		})


		it('Distance from first child should be smaller', () => {
			// As end means right or bottom, first child should be the most distant from the center
			// Note : This won't be true if children overflows their parent

			// column -> vertical -> y diffs
			const dyChild1 = container.position.y - child1.position.y;
			const dyChild5 = container.position.y - child5.position.y;
			expect(dyChild1*dyChild1).lessThan(dyChild5*dyChild5);

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> x diffs
			const dxChild1 = container.position.x - child1.position.x;
			const dxChild5 = container.position.x - child5.position.x;
			expect(dxChild1*dxChild1).lessThan(dxChild5*dxChild5);

		});

		it('All children should share the same axis', () => {

			// column -> vertical -> x shared
			expect( child1.position.x ).equals( child2.position.x );
			expect( child2.position.x ).equals( child3.position.x );
			expect( child3.position.x ).equals( child4.position.x );
			expect( child4.position.x ).equals( child5.position.x );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> y shared
			expect( child1.position.y ).equals( child2.position.y );
			expect( child2.position.y ).equals( child3.position.y );
			expect( child3.position.y ).equals( child4.position.y );
			expect( child4.position.y ).equals( child5.position.y );

		});


	});

	describe(".CENTER", function() {

		beforeEach( () => {
			container.set({flexDirection:'column', justifyContent: 'center'});
			render();
		})


		it( 'Middle child should be in center', () => {

			// row -> horizontal -> y center
			expect( imprecise( child3.position.y ) ).equals(0 );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> x center
			expect( imprecise( child3.position.x ) ).equals(0 );

		})

		it('Distance from first child should be greater', () => {
			// As start means left or top, first child should be the most distant from the center

			// column -> vertical -> y diffs
			const dyChild2 = container.position.y - child2.position.y;
			const dyChild4 = container.position.y - child4.position.y;
			expect(imprecise( dyChild2*dyChild2 ) ).equals(imprecise( dyChild4*dyChild4 ) );

			const dyChild1 = container.position.y - child1.position.y;
			const dyChild5 = container.position.y - child5.position.y;
			expect(imprecise( dyChild1*dyChild1 ) ).equals(imprecise( dyChild5*dyChild5 ) );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> x diffs
			const dxChild2 = container.position.x - child2.position.x;
			const dxChild4 = container.position.x - child4.position.x;
			expect(imprecise( dxChild2*dxChild2 ) ).equals(imprecise( dxChild4*dxChild4 ) );

			const dxChild1 = container.position.x - child1.position.x;
			const dxChild5 = container.position.x - child5.position.x;
			expect(imprecise( dxChild1*dxChild1 ) ).equals(imprecise( dxChild5*dxChild5 ) );

		});

		it('All children should share the same axis', () => {

			// column -> vertical -> x shared
			expect( child1.position.x ).equals( child2.position.x );
			expect( child2.position.x ).equals( child3.position.x );
			expect( child3.position.x ).equals( child4.position.x );
			expect( child4.position.x ).equals( child5.position.x );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> y shared
			expect( child1.position.y ).equals( child2.position.y );
			expect( child2.position.y ).equals( child3.position.y );
			expect( child3.position.y ).equals( child4.position.y );
			expect( child4.position.y ).equals( child5.position.y );

		});


	});

	describe(".SPACE_EVENLY", function() {

		beforeEach( () => {
			container.set({flexDirection:'column', justifyContent: 'space-evenly'});
			render();
		})


		it( 'Middle child should be in center', () => {

			// row -> horizontal -> y center
			expect( imprecise( child3.position.y ) ).equals(0 );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> x center
			expect( imprecise( child3.position.x ) ).equals(0 );

		})

		it('Distance from borders equals distance between items', () => {

			// distance from border equals distance between items
			// column -> vertical -> y diffs
			const dyChild1to2 = child2.position.y - child1.position.y;
			const dyChild4to5 = child5.position.y - child4.position.y;
			expect( imprecise( dyChild1to2*dyChild1to2 ) ).equals( imprecise( dyChild4to5*dyChild4to5 ) );

			const dyBorderTop = -container._bounds._offsetHeight /2 + child1.position.y;
			const dyBorderBottom = container._bounds._offsetHeight /2 + child5.position.y;

			expect( imprecise( dyBorderTop*dyBorderTop )  ).equals( imprecise( dyBorderBottom*dyBorderBottom  ) );
			expect( imprecise( dyBorderTop - child1._height._value/2 )  ).equals( imprecise( dyChild1to2 )  );

			container.set({flexDirection: 'row'});
			render();


			// column -> vertical -> x diffs
			const dxChild1to2 = child2.position.x - child1.position.x;
			const dxChild4to5 = child5.position.x - child4.position.x;
			expect(imprecise( dxChild1to2*dxChild1to2 ) ).equals( imprecise( dxChild4to5*dxChild4to5 ) );

			const dxBorderLeft = container._bounds._offsetWidth/2 + child1.position.x;
			const dxBorderRight = -container._bounds._offsetWidth/2 + child5.position.x;

			expect( imprecise( dxBorderLeft*dxBorderLeft )  ).equals( imprecise( dxBorderRight*dxBorderRight )  );
			expect( imprecise( dxBorderLeft + child1._width._value/2  ) ).equals( imprecise( dxChild1to2 )  );

		});

		it('All children should share the same axis', () => {

			// column -> vertical -> x shared
			expect( child1.position.x ).equals( child2.position.x );
			expect( child2.position.x ).equals( child3.position.x );
			expect( child3.position.x ).equals( child4.position.x );
			expect( child4.position.x ).equals( child5.position.x );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> y shared
			expect( child1.position.y ).equals( child2.position.y );
			expect( child2.position.y ).equals( child3.position.y );
			expect( child3.position.y ).equals( child4.position.y );
			expect( child4.position.y ).equals( child5.position.y );

		});


	});

	describe(".SPACE_AROUND", function() {

		beforeEach( () => {
			container.set({flexDirection:'column', justifyContent: 'space-around'});
			render();
		})


		it( 'Middle child should be in center', () => {

			// row -> horizontal -> y center
			expect( imprecise( child3.position.y ) ).equals(0 );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> x center
			expect( imprecise( child3.position.x ) ).equals(0 );

		})

		it('Distance from borders equals half distance between items', () => {

			// distance from border equals distance between items
			// column -> vertical -> y diffs
			const dyChild1to2 = child2.position.y - child1.position.y;
			const dyChild4to5 = child5.position.y - child4.position.y;
			expect(imprecise( dyChild1to2*dyChild1to2 ) ).equals( imprecise( dyChild4to5*dyChild4to5 ) );

			// prevent precision issue
			let dyBorderTop = -container._bounds._offsetHeight /2 + child1.position.y;
			dyBorderTop = parseFloat(dyBorderTop.toFixed(4));
			let dyBorderBottom = container._bounds._offsetHeight /2 + child5.position.y;
			dyBorderBottom = parseFloat(dyBorderBottom.toFixed(4));

			expect( imprecise( dyBorderTop*dyBorderTop ) ).equals( imprecise( dyBorderBottom*dyBorderBottom ) );
			expect( imprecise( dyBorderTop ) ).equals( imprecise( dyChild1to2 / 2 ) );

			container.set({flexDirection: 'row'});
			render();


			// column -> vertical -> x diffs
			const dxChild1to2 = child2.position.x - child1.position.x;
			const dxChild4to5 = child5.position.x - child4.position.x;
			expect(imprecise( dxChild1to2*dxChild1to2 ) ).equals(imprecise( dxChild4to5*dxChild4to5 ));

			// prevent precision issue
			let dxBorderLeft = container._bounds._offsetWidth/2 + child1.position.x;
			dxBorderLeft = parseFloat(dxBorderLeft.toFixed(4));
			let dxBorderRight = -container._bounds._offsetWidth/2 + child5.position.x;
			dxBorderRight = parseFloat(dxBorderRight.toFixed(4));

			expect( imprecise( dxBorderLeft*dxBorderLeft ) ).equals( imprecise( dxBorderRight*dxBorderRight ) );
			expect( imprecise( dxBorderLeft ) ).equals( imprecise( dxChild1to2 / 2 ) );

		});

		it('All children should share the same axis', () => {

			// column -> vertical -> x shared
			expect( child1.position.x ).equals( child2.position.x );
			expect( child2.position.x ).equals( child3.position.x );
			expect( child3.position.x ).equals( child4.position.x );
			expect( child4.position.x ).equals( child5.position.x );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> y shared
			expect( child1.position.y ).equals( child2.position.y );
			expect( child2.position.y ).equals( child3.position.y );
			expect( child3.position.y ).equals( child4.position.y );
			expect( child4.position.y ).equals( child5.position.y );

		});


	});

	describe(".SPACE_BETWEEN", function() {

		beforeEach( () => {
			container.set({flexDirection:'column', justifyContent: 'space-between'});
			render();
		})


		it( 'Middle child should be in center', () => {

			// row -> horizontal -> y center
			expect( imprecise(child3.position.y) ).equals(0 );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> x center
			expect( imprecise(child3.position.x) ).equals(0 );

		})

		it('Distance from borders equals half item size', () => {

			// column -> vertical -> y diffs

			// prevent precision issue
			const dyBorderTop = -container._bounds._offsetHeight /2 + child1.position.y;
			const dyBorderBottom = container._bounds._offsetHeight /2 + child5.position.y;

			expect( Math.abs( imprecise(dyBorderTop) ) ).equals( child1._height._value/2 );
			expect( Math.abs( imprecise(dyBorderBottom) ) ).equals( child5._height._value/2 );

			container.set({flexDirection: 'row'});
			render();


			// column -> vertical -> x diffs
			const dxBorderLeft = container._bounds._offsetWidth/2 + child1.position.x;
			const dxBorderRight = -container._bounds._offsetWidth/2 + child5.position.x;

			expect( Math.abs( imprecise( dxBorderLeft ) ) ).equals( child1._width._value/2 );
			expect( Math.abs( imprecise( dxBorderRight ) ) ).equals( child5._width._value/2 );

		});

		it('All children should share the same axis', () => {

			// column -> vertical -> x shared
			expect( child1.position.x ).equals( child2.position.x );
			expect( child2.position.x ).equals( child3.position.x );
			expect( child3.position.x ).equals( child4.position.x );
			expect( child4.position.x ).equals( child5.position.x );

			container.set({flexDirection: 'row'});
			render();

			// row -> horizontal -> y shared
			expect( child1.position.y ).equals( child2.position.y );
			expect( child2.position.y ).equals( child3.position.y );
			expect( child3.position.y ).equals( child4.position.y );
			expect( child4.position.y ).equals( child5.position.y );

		});


	});

});
