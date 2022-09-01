import { buildThreeSetup } from '../../utils/TestThree.js';
import { preloadFonts } from '../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../utils/TestStructure.js';
import { imprecise } from '../../utils/TestNumber.js';

describe("BoxComponent", function () {

	let scene, camera, renderer, render;
	let fontFamily;

	before(function (done) {

		({scene, camera, renderer, render} = buildThreeSetup());
		fontFamily = preloadFonts( done );

	});

	// BorderBox
	let containerBB, child1BB, child2BB, child3BB, child4BB, child5BB;

	// ContentBox
	let containerCB, child1CB, child2CB, child3CB, child4CB, child5CB;


	before(function () {

		//build a container with 5 children blocks
		( { container:containerBB, child1:child1BB, child2:child2BB, child3:child3BB, child4:child4BB, child5:child5BB } = fiveBlockContainer(scene) );
		( { container:containerCB, child1:child1CB, child2:child2CB, child3:child3CB, child4:child4CB, child5:child5CB } = fiveBlockContainer(scene) );


		containerBB.set({boxSizing: 'border-box'});
		containerCB.set({boxSizing: 'content-box'});

		render();

	});


	/**
	 * Job:
	 * Being sure properties that update box sizing work properly
	 */
	describe("Computed widths, heights & centers", function() {

		beforeEach( function() {

			containerCB.set({padding:0, borderWidth:0});
			containerBB.set({padding:0, borderWidth:0});

		} );

		/*******************************************************************************************************************
		 * PADDING ONLY
		 ******************************************************************************************************************/

		it('Without padding, without borders', () => {

			expect( containerCB._bounds._offsetWidth ).equals(1.0 );
			expect( containerBB._bounds._offsetWidth ).equals(1.0 );

			expect( containerCB._bounds._offsetHeight ).equals(1.0 );
			expect( containerBB._bounds._offsetHeight ).equals(1.0 );

			expect( containerCB._bounds._innerWidth ).equals(1.0 );
			expect( containerBB._bounds._innerWidth ).equals(1.0 );

			expect( containerCB._bounds._innerHeight ).equals(1.0 );
			expect( containerBB._bounds._innerHeight ).equals(1.0 );

			expect( containerCB._bounds._centerX ).equals( 0 );
			expect( containerBB._bounds._centerX ).equals( 0 );

			expect( containerCB._bounds._centerY ).equals( 0 );
			expect( containerBB._bounds._centerY ).equals( 0 );

		});

		it('With padding, without borders', () => {

			containerCB.set({padding:0.1});
			containerBB.set({padding:0.1});
			render();


			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.2 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.2 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.8 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(0.8 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('With padding left, without borders', () => {

			containerCB.set({paddingLeft:0.1});
			containerBB.set({paddingLeft:0.1});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.1 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.9 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0.05 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0.05 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('With padding left + right greater, without borders', () => {

			containerCB.set({paddingLeft:0.1, paddingRight:0.3});
			containerBB.set({paddingLeft:0.1, paddingRight:0.3});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.4 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.6 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( -0.1 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( -0.1 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('With padding left + right lesser, without borders', () => {

			containerCB.set({paddingLeft:0.3, paddingRight:0.1});
			containerBB.set({paddingLeft:0.3, paddingRight:0.1});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.4 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.6 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0.1 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0.1 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('With padding top , without borders', () => {

			containerCB.set({paddingTop:0.1});
			containerBB.set({paddingTop:0.1});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.1 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(0.9 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( -0.05 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( -0.05 );

		});

		it('With padding top + bottom greater , without borders', () => {

			containerCB.set({paddingTop:0.1, paddingBottom:0.3});
			containerBB.set({paddingTop:0.1, paddingBottom:0.3});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.4 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(0.6 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0.1 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0.1 );

		});

		it('With padding top + bottom lesser , without borders', () => {

			containerCB.set({paddingTop:0.3, paddingBottom:0.1});
			containerBB.set({paddingTop:0.3, paddingBottom:0.1});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.4 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(0.6 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( -0.1 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( -0.1 );

		});

		/*******************************************************************************************************************
		 * BORDERS ONLY
		 ******************************************************************************************************************/

		it('Without padding, with borders', () => {

			containerCB.set({borderWidth:0.1});
			containerBB.set({borderWidth:0.1});
			render();


			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.2 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.2 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.8 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(0.8 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('Without padding , with borders left', () => {

			containerCB.set({borderLeftWidth:0.1});
			containerBB.set({borderLeftWidth:0.1});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.1 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.9 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0.05 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0.05 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('Without padding , with borders left + right greater', () => {

			containerCB.set({borderLeftWidth:0.1, borderRightWidth:0.3});
			containerBB.set({borderLeftWidth:0.1, borderRightWidth:0.3});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.4 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.6 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( -0.1 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( -0.1 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('Without padding , with borders left + right lesser', () => {

			containerCB.set({borderLeftWidth:0.3, borderRightWidth:0.1});
			containerBB.set({borderLeftWidth:0.3, borderRightWidth:0.1});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.4 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.6 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0.1 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0.1 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('Without padding , with borders top', () => {

			containerCB.set({borderTopWidth:0.1});
			containerBB.set({borderTopWidth:0.1});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.1 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(0.9 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( -0.05 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( -0.05 );

		});

		it('Without padding , without borders top + bottom greater', () => {

			containerCB.set({borderTopWidth:0.1, borderBottomWidth:0.3});
			containerBB.set({borderTopWidth:0.1, borderBottomWidth:0.3});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.4 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(0.6 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0.1 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0.1 );

		});

		it('Without padding , with borders  top + bottom lesser', () => {

			containerCB.set({borderTopWidth:0.3, borderBottomWidth:0.1});
			containerBB.set({borderTopWidth:0.3, borderBottomWidth:0.1});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.4 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(0.6 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( -0.1 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( -0.1 );

		});

		it('With padding left , with borders left', () => {

			containerCB.set({borderLeftWidth:0.1,paddingLeft:0.1});
			containerBB.set({borderLeftWidth:0.1,paddingLeft:0.1});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.2 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.8 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0.1 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0.1 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('With padding left greater, with borders left', () => {

			containerCB.set({borderLeftWidth:0.1,paddingLeft:0.2});
			containerBB.set({borderLeftWidth:0.1,paddingLeft:0.2});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.3 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.7 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( 0.15 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( 0.15 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

		it('With padding right greater , with borders left', () => {

			containerCB.set({borderLeftWidth:0.1,paddingRight:0.2});
			containerBB.set({borderLeftWidth:0.1,paddingRight:0.2});
			render();

			expect( imprecise( containerCB._bounds._offsetWidth ) ).equals(1.3 );
			expect( imprecise( containerBB._bounds._offsetWidth ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._offsetHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._offsetHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._innerWidth ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerWidth ) ).equals(0.7 );

			expect( imprecise( containerCB._bounds._innerHeight ) ).equals(1.0 );
			expect( imprecise( containerBB._bounds._innerHeight ) ).equals(1.0 );

			expect( imprecise( containerCB._bounds._centerX ) ).equals( -0.05 );
			expect( imprecise( containerBB._bounds._centerX ) ).equals( -0.05 );

			expect( imprecise( containerCB._bounds._centerY ) ).equals( 0 );
			expect( imprecise( containerBB._bounds._centerY ) ).equals( 0 );

		});

	});

});
