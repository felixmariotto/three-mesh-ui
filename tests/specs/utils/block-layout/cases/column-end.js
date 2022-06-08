import { buildThreeSetup } from '../../../../utils/TestThree.js';
import { preloadFonts } from '../../../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../../../utils/TestStructure.js';
import { imprecise } from '../../../../utils/TestNumber.js';

describe('Layout Case : {contentDirection:"column", justifyContent:"end"}', function () {

	let scene, camera, renderer, render;
	let fontFamily;

	before( function ( done ) {

		( { scene, camera, renderer, render } = buildThreeSetup() );
		fontFamily = preloadFonts( done );

	} );

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

	});

	beforeEach( function () {

		containerBB.set({contentDirection: 'column', justifyContent:'end'});
		containerCB.set({contentDirection: 'column', justifyContent:'end'});




		render();

	});

	it("Last child should snap on bottom on container", function () {

		const containerBottomBB = containerBB.centerY - containerBB.offsetHeight / 2;
		const containerBottomCB = containerCB.centerY - containerCB.offsetHeight / 2;

		expect( imprecise( child5BB.position.y) ).equals( containerBottomBB + child5BB.offsetHeight / 2 );
		expect( imprecise( child5CB.position.y) ).equals( containerBottomCB + child5CB.offsetHeight / 2 );
	});

	it("Last child should snap on top on container minus margin", function () {

		child5BB.set({margin:0.1});
		child5CB.set({margin:0.1});




		render();

		const containerBottomBB = containerBB.centerY - containerBB.offsetHeight / 2;
		const containerBottomCB = containerCB.centerY - containerCB.offsetHeight / 2;

		expect( imprecise( child5BB.position.y) ).equals( containerBottomBB + child5BB.offsetHeight / 2 + child5BB._margin.z);
		expect( imprecise( child5CB.position.y) ).equals( containerBottomCB + child5CB.offsetHeight / 2 + child5CB._margin.z);
	});


	describe(' + {alignItems:"center"}', function() {

		it("Any child should snap on container center", function () {

			child5BB.set({margin:0});
			child5CB.set({margin:0});

			containerBB.set({alignItems:'center'});
			containerCB.set({alignItems:'center'});

			render();

			expect( imprecise( child3BB.position.x) ).equals( containerBB.centerX );
			expect( imprecise( child3CB.position.x) ).equals( containerCB.centerX );
		});


		it("Any child should snap on container center minus margin", function () {

			child5BB.set({margin:0.1});
			child5CB.set({margin:0.1});




			render();

			expect( imprecise( child5BB.position.x) ).equals( containerBB.centerX + ( - child5BB._margin.y + child5BB._margin.w) / 2 );
			expect( imprecise( child5CB.position.x) ).equals( containerCB.centerX + ( - child5CB._margin.y + child5CB._margin.w) / 2 );

		});


		it("Any child should snap on container center minus margin mixed", function () {

			child5BB.set({margin: '0 0.1 0 0.2'});
			child5CB.set({margin: '0 0.1 0 0.2'});




			render();

			expect( imprecise( child5BB.position.x) ).equals( containerBB.centerX + ( - child5BB._margin.y + child5BB._margin.w ) / 2);
			expect( imprecise( child5CB.position.x) ).equals( containerCB.centerX + ( - child5CB._margin.y + child5CB._margin.w ) / 2);
		});

	});

	describe(' + {alignItems:"start"}', function() {

		it("Any child should snap on container left", function () {

			child5BB.set({margin:0});
			child5CB.set({margin:0});

			containerBB.set({alignItems:'start'});
			containerCB.set({alignItems:'start'});

			render();


			expect( imprecise( child5BB.position.x) ).equals( containerBB.centerX - containerBB.offsetWidth/2 + child5BB.offsetWidth/2 );
			expect( imprecise( child5CB.position.x) ).equals( containerCB.centerX - containerCB.offsetWidth/2 + child5CB.offsetWidth/2 );
		});

		it("Any child should snap on container left minus margin", function () {

			child5BB.set({margin:0.1});
			child5CB.set({margin:0.1});




			render();

			expect( imprecise( child5BB.position.x) ).equals(containerBB.centerX - containerBB.offsetWidth/2 + child5BB.offsetWidth/2 + child5BB._margin.w );
			expect( imprecise( child5CB.position.x) ).equals(containerCB.centerX - containerCB.offsetWidth/2 + child5CB.offsetWidth/2 + child5CB._margin.w );
		});

		it("Any child should snap on container center minus margin mixed", function () {

			child5BB.set({margin: '0 0.1 0 0.2'});
			child5CB.set({margin: '0 0.1 0 0.2'});




			render();

			expect( imprecise( child5BB.position.x) ).equals(containerBB.centerX - containerBB.offsetWidth/2 + child5BB.offsetWidth/2 + child5BB._margin.w );
			expect( imprecise( child5CB.position.x) ).equals(containerCB.centerX - containerCB.offsetWidth/2 + child5CB.offsetWidth/2 + child5CB._margin.w );
		});

	});

	describe(' + {alignItems:"end"}', function() {

		it("Any child should snap on container right", function () {

			child5BB.set({margin:0});
			child5CB.set({margin:0});

			containerBB.set({alignItems:'end'});
			containerCB.set({alignItems:'end'});

			render();


			expect( imprecise( child5BB.position.x) ).equals( containerBB.centerX + containerBB.offsetWidth/2 - child5BB.offsetWidth/2 );
			expect( imprecise( child5CB.position.x) ).equals( containerCB.centerX + containerCB.offsetWidth/2 - child5CB.offsetWidth/2 );
		});

		it("Any child should snap on container right minus margin", function () {

			child5BB.set({margin:0.1});
			child5CB.set({margin:0.1});




			render();

			expect( imprecise( child5BB.position.x) ).equals(containerBB.centerX + containerBB.offsetWidth/2 - child5BB.offsetWidth/2 - child5BB._margin.y );
			expect( imprecise( child5CB.position.x) ).equals(containerCB.centerX + containerCB.offsetWidth/2 - child5CB.offsetWidth/2 - child5CB._margin.y );
		});

		it("Any child should snap on container right minus margin mixed", function () {

			child5BB.set({margin: '0 0.1 0 0.2'});
			child5CB.set({margin: '0 0.1 0 0.2'});




			render();

			expect( imprecise( child5BB.position.x) ).equals(containerBB.centerX + containerBB.offsetWidth/2 - child5BB.offsetWidth/2 - child5BB._margin.y );
			expect( imprecise( child5CB.position.x) ).equals(containerCB.centerX + containerCB.offsetWidth/2 - child5CB.offsetWidth/2 - child5CB._margin.y );
		});

	});

});
