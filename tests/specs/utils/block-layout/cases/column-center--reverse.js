import { buildThreeSetup } from '../../../../utils/TestThree.js';
import { preloadFonts } from '../../../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../../../utils/TestStructure.js';
import { imprecise } from '../../../../utils/TestNumber.js';

describe('Layout Case : {contentDirection:"column-reverse", justifyContent:"center"}', function () {

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

		containerBB.set({contentDirection: 'column-reverse', justifyContent:'center'});
		containerCB.set({contentDirection: 'column-reverse', justifyContent:'center'});




		render();

	});

	it("Third child should snap on container center", function () {

		expect( imprecise( child3BB.position.y) ).equals( containerBB.centerY );
		expect( imprecise( child3CB.position.y) ).equals( containerCB.centerY );

	});

	it("Third child should snap on container center minus margin", function () {

		child3BB.set({margin:0.1});
		child3CB.set({margin:0.1});




		render();

		expect( imprecise( child3BB.position.y) ).equals( containerBB.centerY + ( - child3BB._margin.x + child3BB._margin.z) / 2 );
		expect( imprecise( child3CB.position.y) ).equals( containerCB.centerY + ( - child3CB._margin.x + child3CB._margin.z) / 2 );
	});

	it("Third child should snap on container center minus margin mixed", function () {

		child3BB.set({margin: '0.1 0 0.2 0'});
		child3CB.set({margin: '0.1 0 0.2 0'});





		render();

		expect( imprecise( child3BB.position.y) ).equals( containerBB.centerY + ( - child3BB._margin.x + child3BB._margin.z ) / 2);
		expect( imprecise( child3CB.position.y) ).equals( containerCB.centerY + ( - child3CB._margin.x + child3CB._margin.z ) / 2);
	});

	describe('+ {alignItems:"center"}', function() {

		it("Any child should snap on container center", function () {

			child3BB.set({margin:0});
			child3CB.set({margin:0});

			containerBB.set({alignItems:'center'});
			containerCB.set({alignItems:'center'});

			render();


			expect( imprecise( child3BB.position.x) ).equals( containerBB.centerX );
			expect( imprecise( child3CB.position.x) ).equals( containerCB.centerX );
		});

		it("Any child should snap on container center minus margin", function () {

			child3BB.set({margin:0.1});
			child3CB.set({margin:0.1});




			render();

			expect( imprecise( child3BB.position.x) ).equals( containerBB.centerX + ( - child3BB._margin.y + child3BB._margin.w) / 2 );
			expect( imprecise( child3CB.position.x) ).equals( containerCB.centerX + ( - child3CB._margin.y + child3CB._margin.w) / 2 );
		});

		it("Any child should snap on container center minus margin mixed", function () {

			child3BB.set({margin: '0 0.1 0 0.2'});
			child3CB.set({margin: '0 0.1 0 0.2'});




			render();

			expect( imprecise( child3BB.position.x) ).equals( containerBB.centerX + ( - child3BB._margin.y + child3BB._margin.w ) / 2);
			expect( imprecise( child3CB.position.x) ).equals( containerCB.centerX + ( - child3CB._margin.y + child3CB._margin.w ) / 2);
		});

	});

	describe('+ {alignItems:"start"}', function() {

		it("Any child should snap on container left", function () {

			child3BB.set({margin:0});
			child3CB.set({margin:0});

			containerBB.set({alignItems:'start'});
			containerCB.set({alignItems:'start'});

			render();

			expect( imprecise( child3BB.position.x) ).equals( containerBB.centerX - containerBB.offsetWidth/2 + child3BB.offsetWidth/2 );
			expect( imprecise( child3CB.position.x) ).equals( containerCB.centerX - containerCB.offsetWidth/2 + child3CB.offsetWidth/2 );
		});

		it("Any child should snap on container left minus margin", function () {

			child3BB.set({margin:0.1});
			child3CB.set({margin:0.1});




			render();

			expect( imprecise( child3BB.position.x) ).equals(containerBB.centerX - containerBB.offsetWidth/2 + child3BB.offsetWidth/2 + child3BB._margin.w );
			expect( imprecise( child3CB.position.x) ).equals(containerCB.centerX - containerCB.offsetWidth/2 + child3CB.offsetWidth/2 + child3CB._margin.w );
		});

		it("Any child should snap on container center minus margin mixed", function () {

			child3BB.set({margin: '0 0.1 0 0.2'});
			child3CB.set({margin: '0 0.1 0 0.2'});




			render();

			expect( imprecise( child3BB.position.x) ).equals(containerBB.centerX - containerBB.offsetWidth/2 + child3BB.offsetWidth/2 + child3BB._margin.w );
			expect( imprecise( child3CB.position.x) ).equals(containerCB.centerX - containerCB.offsetWidth/2 + child3CB.offsetWidth/2 + child3CB._margin.w );
		});

	});

	describe('+ {alignItems:"end"}', function() {

		it("Any child should snap on container right", function () {

			child3BB.set({margin:0});
			child3CB.set({margin:0});

			containerBB.set({alignItems:'end'});
			containerCB.set({alignItems:'end'});

			render();


			expect( imprecise( child3BB.position.x) ).equals( containerBB.centerX + containerBB.offsetWidth/2 - child3BB.offsetWidth/2 );
			expect( imprecise( child3CB.position.x) ).equals( containerCB.centerX + containerCB.offsetWidth/2 - child3CB.offsetWidth/2 );
		});

		it("Any child should snap on container right minus margin", function () {

			child3BB.set({margin:0.1});
			child3CB.set({margin:0.1});




			render();

			expect( imprecise( child3BB.position.x) ).equals(containerBB.centerX + containerBB.offsetWidth/2 - child3BB.offsetWidth/2 - child3BB._margin.y );
			expect( imprecise( child3CB.position.x) ).equals(containerCB.centerX + containerCB.offsetWidth/2 - child3CB.offsetWidth/2 - child3CB._margin.y );
		});

		it("Any child should snap on container right minus margin mixed", function () {

			child3BB.set({margin: '0 0.1 0 0.2'});
			child3CB.set({margin: '0 0.1 0 0.2'});




			render();

			expect( imprecise( child3BB.position.x) ).equals(containerBB.centerX + containerBB.offsetWidth/2 - child3BB.offsetWidth/2 - child3BB._margin.y );
			expect( imprecise( child3CB.position.x) ).equals(containerCB.centerX + containerCB.offsetWidth/2 - child3CB.offsetWidth/2 - child3CB._margin.y );
		});

	});

});
