import { buildThreeSetup } from '../../utils/TestThree.js';
import { preloadFonts } from '../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../utils/TestStructure.js';
import { imprecise } from '../../utils/TestNumber.js';

describe("MeshUIComponent", function () {


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

	} );


	/**
	 * Job:
	 * Being sure properties are correctly updated
	 */
	describe( "Margins", function () {

		it('Margins should work in duplicated 4 dimensions', ()=>{

			container.set({margin:0.1});
			expect(container._margin.x).equals(container._margin.y);
			expect(container._margin.y).equals(container._margin.z);
			expect(container._margin.z).equals(container._margin.w);
			expect(container._margin.w).equals(0.1);

		});

		it('Margins should work in duplicated 2 dimensions', ()=>{

			container.set({margin:'0.1 0.2'});
			expect(container._margin.x).equals(container._margin.z);
			expect(container._margin.y).equals(container._margin.w);
			expect(container._margin.y).equals(0.2);
			expect(container._margin.x).equals(0.1);

		});

		it('Margins should work in duplicated 2 dimensions array', ()=>{

			container.set({margin:[0.2,0.1]});
			expect(container._margin.x).equals(container._margin.z);
			expect(container._margin.y).equals(container._margin.w);
			expect(container._margin.y).equals(0.1);
			expect(container._margin.x).equals(0.2);

		});

		it('Margins should work in 4 dimensions', ()=>{

			container.set({margin:'0.1 0.2 0.3 0.4'});
			expect(container._margin.x).equals(0.1);
			expect(container._margin.y).equals(0.2);
			expect(container._margin.z).equals(0.3);
			expect(container._margin.w).equals(0.4);

		});

		it('Margins should work with top', ()=>{

			container.set({marginTop:0});
			expect(container._margin.x).equals(0);
			// while other remains
			expect(container._margin.y).equals(0.2);
			expect(container._margin.z).equals(0.3);
			expect(container._margin.w).equals(0.4);

		});

		it('Margins should work with right', ()=>{

			container.set({marginRight:0});
			expect(container._margin.x).equals(0);
			expect(container._margin.y).equals(0);
			// while other remains
			expect(container._margin.z).equals(0.3);
			expect(container._margin.w).equals(0.4);

		});

		it('Margins should work with bottom', ()=>{

			container.set({marginBottom:0});
			expect(container._margin.x).equals(0);
			expect(container._margin.y).equals(0);
			expect(container._margin.z).equals(0);
			// while other remains
			expect(container._margin.w).equals(0.4);

		});

		it('Margins should work with left', ()=>{

			container.set({marginLeft:0});
			expect(container._margin.x).equals(0);
			expect(container._margin.y).equals(0);
			expect(container._margin.z).equals(0);
			expect(container._margin.w).equals(0);

		});


	} );


	//padding

	describe( "Paddings", function () {

		it('Paddings should work in duplicated 4 dimensions', ()=>{

			container.set({padding:0.1});
			expect(container._padding.x).equals(container._padding.y);
			expect(container._padding.y).equals(container._padding.z);
			expect(container._padding.z).equals(container._padding.w);
			expect(container._padding.w).equals(0.1);

		});

		it('Paddings should work in duplicated 2 dimensions', ()=>{

			container.set({padding:'0.1 0.2'});
			expect(container._padding.x).equals(container._padding.z);
			expect(container._padding.y).equals(container._padding.w);
			expect(container._padding.y).equals(0.2);
			expect(container._padding.x).equals(0.1);

		});

		it('Paddings should work in duplicated 2 dimensions array', ()=>{

			container.set({padding:[0.2,0.1]});
			expect(container._padding.x).equals(container._padding.z);
			expect(container._padding.y).equals(container._padding.w);
			expect(container._padding.y).equals(0.1);
			expect(container._padding.x).equals(0.2);

		});

		it('Paddings should work in 4 dimensions', ()=>{

			container.set({padding:'0.1 0.2 0.3 0.4'});
			expect(container._padding.x).equals(0.1);
			expect(container._padding.y).equals(0.2);
			expect(container._padding.z).equals(0.3);
			expect(container._padding.w).equals(0.4);

		});

		it('Paddings should work with top', ()=>{

			container.set({paddingTop:0});
			expect(container._padding.x).equals(0);
			// while other remains
			expect(container._padding.y).equals(0.2);
			expect(container._padding.z).equals(0.3);
			expect(container._padding.w).equals(0.4);

		});

		it('Paddings should work with right', ()=>{

			container.set({paddingRight:0});
			expect(container._padding.x).equals(0);
			expect(container._padding.y).equals(0);
			// while other remains
			expect(container._padding.z).equals(0.3);
			expect(container._padding.w).equals(0.4);

		});

		it('Paddings should work with bottom', ()=>{

			container.set({paddingBottom:0});
			expect(container._padding.x).equals(0);
			expect(container._padding.y).equals(0);
			expect(container._padding.z).equals(0);
			// while other remains
			expect(container._padding.w).equals(0.4);

		});

		it('Paddings should work with left', ()=>{

			container.set({paddingLeft:0});
			expect(container._padding.x).equals(0);
			expect(container._padding.y).equals(0);
			expect(container._padding.z).equals(0);
			expect(container._padding.w).equals(0);

		});


	} );


	// Borders

	describe( "Border Widths", function () {

		it('Border Widths should work in duplicated 4 dimensions', ()=>{

			container.set({borderWidth:0.1});
			expect(container._borderWidth.x).equals(container._borderWidth.y);
			expect(container._borderWidth.y).equals(container._borderWidth.z);
			expect(container._borderWidth.z).equals(container._borderWidth.w);
			expect(container._borderWidth.w).equals(0.1);

		});

		it('Border Widths should work in duplicated 2 dimensions', ()=>{

			container.set({borderWidth:'0.1 0.2'});
			expect(container._borderWidth.x).equals(container._borderWidth.z);
			expect(container._borderWidth.y).equals(container._borderWidth.w);
			expect(container._borderWidth.y).equals(0.2);
			expect(container._borderWidth.x).equals(0.1);

		});

		it('Border Widths should work in duplicated 2 dimensions array', ()=>{

			container.set({borderWidth:[0.2,0.1]});
			expect(container._borderWidth.x).equals(container._borderWidth.z);
			expect(container._borderWidth.y).equals(container._borderWidth.w);
			expect(container._borderWidth.y).equals(0.1);
			expect(container._borderWidth.x).equals(0.2);

		});

		it('Border Widths should work in 4 dimensions', ()=>{

			container.set({borderWidth:'0.1 0.2 0.3 0.4'});
			expect(container._borderWidth.x).equals(0.1);
			expect(container._borderWidth.y).equals(0.2);
			expect(container._borderWidth.z).equals(0.3);
			expect(container._borderWidth.w).equals(0.4);

		});

		it('Border Widths should work with top', ()=>{

			container.set({borderTopWidth:0});
			expect(container._borderWidth.x).equals(0);
			// while other remains
			expect(container._borderWidth.y).equals(0.2);
			expect(container._borderWidth.z).equals(0.3);
			expect(container._borderWidth.w).equals(0.4);

		});

		it('Border Widths should work with right', ()=>{

			container.set({borderRightWidth:0});
			expect(container._borderWidth.x).equals(0);
			expect(container._borderWidth.y).equals(0);
			// while other remains
			expect(container._borderWidth.z).equals(0.3);
			expect(container._borderWidth.w).equals(0.4);

		});

		it('Border Widths should work with bottom', ()=>{

			container.set({borderBottomWidth:0});
			expect(container._borderWidth.x).equals(0);
			expect(container._borderWidth.y).equals(0);
			expect(container._borderWidth.z).equals(0);
			// while other remains
			expect(container._borderWidth.w).equals(0.4);

		});

		it('Border Widths should work with left', ()=>{

			container.set({borderLeftWidth:0});
			expect(container._borderWidth.x).equals(0);
			expect(container._borderWidth.y).equals(0);
			expect(container._borderWidth.z).equals(0);
			expect(container._borderWidth.w).equals(0);

		});


	} );


});
