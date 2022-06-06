import { buildThreeSetup } from '../../../../utils/TestThree.js';
import { preloadFonts } from '../../../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../../../utils/TestStructure.js';
import { imprecise } from '../../../../utils/TestNumber.js';

describe('Layout Case : {contentDirection:"row", justifyContent:"start"}', function () {

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

		containerBB.set({contentDirection: 'row', justifyContent:'start'});
		containerCB.set({contentDirection: 'row', justifyContent:'start'});




		render();

	});

	it("First child should snap on left on container", function () {

		const containerLeftBB = containerBB.centerX - containerBB.innerWidth / 2;
		const containerLeftCB = containerCB.centerX - containerCB.innerWidth / 2;

		expect( imprecise( child1BB.position.x) ).equals( containerLeftBB + child1BB.offsetWidth / 2 );
		expect( imprecise( child1CB.position.x) ).equals( containerLeftCB + child1CB.offsetWidth / 2 );
	});

	it("First child should snap on left on container minus margin", function () {

		child1BB.set({margin:0.1});
		child1CB.set({margin:0.1});




		render();

		const containerLeftBB = containerBB.centerY - containerBB.innerWidth / 2;
		const containerLeftCB = containerCB.centerY - containerCB.innerWidth / 2;

		expect( imprecise( child1BB.position.x) ).equals( containerLeftBB + child1BB.offsetWidth / 2 + child1BB._margin.w);
		expect( imprecise( child1CB.position.x) ).equals( containerLeftCB + child1CB.offsetWidth / 2 + child1CB._margin.w);
	});


	describe(' + {alignItems:"center"}', function() {

		it("Any child should snap on container center", function () {

			child1BB.set({margin:0});
			child1CB.set({margin:0});

			containerBB.set({alignItems:'center'});
			containerCB.set({alignItems:'center'});

			render();

			expect( imprecise( child3BB.position.y) ).equals( containerBB.centerY );
			expect( imprecise( child3CB.position.y) ).equals( containerCB.centerY );
		});


		it("Any child should snap on container center minus margin", function () {

			child1BB.set({margin:0.1});
			child1CB.set({margin:0.1});




			render();

			expect( imprecise( child1BB.position.y) ).equals( containerBB.centerY + ( - child1BB._margin.x + child1BB._margin.z) / 2 );
			expect( imprecise( child1CB.position.y) ).equals( containerCB.centerY + ( - child1CB._margin.x + child1CB._margin.z) / 2 );

		});


		it("Any child should snap on container center minus margin mixed", function () {

			child1BB.set({margin: '0.1 0 0.2 0'});
			child1CB.set({margin: '0.1 0 0.2 0'});




			render();

			expect( imprecise( child1BB.position.y) ).equals( containerBB.centerY + ( - child1BB._margin.x + child1BB._margin.z ) / 2);
			expect( imprecise( child1CB.position.y) ).equals( containerCB.centerY + ( - child1CB._margin.x + child1CB._margin.z ) / 2);
		});

	});

	describe(' + {alignItems:"start"}', function() {

		it("Any child should snap on container top", function () {

			child1BB.set({margin:0});
			child1CB.set({margin:0});

			containerBB.set({alignItems:'start'});
			containerCB.set({alignItems:'start'});

			render();


			expect( imprecise( child1BB.position.y) ).equals( containerBB.centerY + containerBB.offsetHeight/2 - child1BB.offsetHeight/2 );
			expect( imprecise( child1CB.position.y) ).equals( containerCB.centerY + containerCB.offsetHeight/2 - child1CB.offsetHeight/2 );
		});

		it("Any child should snap on container top minus margin", function () {

			child1BB.set({margin:0.1});
			child1CB.set({margin:0.1});




			render();

			expect( imprecise( child1BB.position.y) ).equals(containerBB.centerY + containerBB.offsetHeight/2 - child1BB.offsetHeight/2 - child1BB._margin.x );
			expect( imprecise( child1CB.position.y) ).equals(containerCB.centerY + containerCB.offsetHeight/2 - child1CB.offsetHeight/2 - child1CB._margin.x );
		});

		it("Any child should snap on container center minus margin mixed", function () {

			child1BB.set({margin: '0.1 0 0.2 0'});
			child1CB.set({margin: '0.1 0 0.2 0'});




			render();

			expect( imprecise( child1BB.position.y) ).equals(containerBB.centerY + containerBB.offsetHeight/2 - child1BB.offsetHeight/2 - child1BB._margin.x );
			expect( imprecise( child1CB.position.y) ).equals(containerCB.centerY + containerCB.offsetHeight/2 - child1CB.offsetHeight/2 - child1CB._margin.x );
		});

	});

	describe(' + {alignItems:"end"}', function() {

		it("Any child should snap on container bottom", function () {

			child1BB.set({margin:0});
			child1CB.set({margin:0});

			containerBB.set({alignItems:'end'});
			containerCB.set({alignItems:'end'});

			render();


			expect( imprecise( child1BB.position.y) ).equals( containerBB.centerY - containerBB.offsetHeight/2 + child1BB.offsetHeight/2 );
			expect( imprecise( child1CB.position.y) ).equals( containerCB.centerY - containerCB.offsetHeight/2 + child1CB.offsetHeight/2 );
		});

		it("Any child should snap on container bottom minus margin", function () {

			child1BB.set({margin:0.1});
			child1CB.set({margin:0.1});




			render();

			expect( imprecise( child1BB.position.y) ).equals(containerBB.centerY - containerBB.offsetHeight/2 + child1BB.offsetHeight/2 + child1BB._margin.z );
			expect( imprecise( child1CB.position.y) ).equals(containerCB.centerY - containerCB.offsetHeight/2 + child1CB.offsetHeight/2 + child1CB._margin.z );
		});

		it("Any child should snap on container right minus margin mixed", function () {

			child1BB.set({margin: '0.1 0 0.2 0'});
			child1CB.set({margin: '0.1 0 0.2 0'});




			render();

			expect( imprecise( child1BB.position.y) ).equals(containerBB.centerY - containerBB.offsetHeight/2 + child1BB.offsetHeight/2 + child1BB._margin.z );
			expect( imprecise( child1CB.position.y) ).equals(containerCB.centerY - containerCB.offsetHeight/2 + child1CB.offsetHeight/2 + child1CB._margin.z );
		});

	});

});
