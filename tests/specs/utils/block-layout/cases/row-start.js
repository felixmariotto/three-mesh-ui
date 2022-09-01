import { buildThreeSetup } from '../../../../utils/TestThree.js';
import { preloadFonts } from '../../../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../../../utils/TestStructure.js';
import { imprecise } from '../../../../utils/TestNumber.js';

describe('Layout Case : {flexDirection:"row", justifyContent:"start"}', function () {

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

		containerBB.set({flexDirection: 'row', justifyContent:'start'});
		containerCB.set({flexDirection: 'row', justifyContent:'start'});




		render();

	});

	it("First child should snap on left on container", function () {

		const containerLeftBB = containerBB._bounds._centerX - containerBB._bounds._innerWidth / 2;
		const containerLeftCB = containerCB._bounds._centerX - containerCB._bounds._innerWidth / 2;

		expect( imprecise( child1BB.position.x) ).equals( containerLeftBB + child1BB._bounds._offsetWidth / 2 );
		expect( imprecise( child1CB.position.x) ).equals( containerLeftCB + child1CB._bounds._offsetWidth / 2 );
	});

	it("First child should snap on left on container minus margin", function () {

		child1BB.set({margin:0.1});
		child1CB.set({margin:0.1});




		render();

		const containerLeftBB = containerBB._bounds._centerY - containerBB._bounds._innerWidth / 2;
		const containerLeftCB = containerCB._bounds._centerY - containerCB._bounds._innerWidth / 2;

		expect( imprecise( child1BB.position.x) ).equals( containerLeftBB + child1BB._bounds._offsetWidth / 2 + child1BB._margin._value.w);
		expect( imprecise( child1CB.position.x) ).equals( containerLeftCB + child1CB._bounds._offsetWidth / 2 + child1CB._margin._value.w);
	});


	describe(' + {alignItems:"center"}', function() {

		it("Any child should snap on container center", function () {

			child1BB.set({margin:0});
			child1CB.set({margin:0});

			containerBB.set({alignItems:'center'});
			containerCB.set({alignItems:'center'});

			render();

			expect( imprecise( child3BB.position.y) ).equals( containerBB._bounds._centerY );
			expect( imprecise( child3CB.position.y) ).equals( containerCB._bounds._centerY );
		});


		it("Any child should snap on container center minus margin", function () {

			child1BB.set({margin:0.1});
			child1CB.set({margin:0.1});




			render();

			expect( imprecise( child1BB.position.y) ).equals( containerBB._bounds._centerY + ( - child1BB._margin._value.x + child1BB._margin._value.z) / 2 );
			expect( imprecise( child1CB.position.y) ).equals( containerCB._bounds._centerY + ( - child1CB._margin._value.x + child1CB._margin._value.z) / 2 );

		});


		it("Any child should snap on container center minus margin mixed", function () {

			child1BB.set({margin: '0.1 0 0.2 0'});
			child1CB.set({margin: '0.1 0 0.2 0'});




			render();

			expect( imprecise( child1BB.position.y) ).equals( containerBB._bounds._centerY + ( - child1BB._margin._value.x + child1BB._margin._value.z ) / 2);
			expect( imprecise( child1CB.position.y) ).equals( containerCB._bounds._centerY + ( - child1CB._margin._value.x + child1CB._margin._value.z ) / 2);
		});

	});

	describe(' + {alignItems:"start"}', function() {

		it("Any child should snap on container top", function () {

			child1BB.set({margin:0});
			child1CB.set({margin:0});

			containerBB.set({alignItems:'start'});
			containerCB.set({alignItems:'start'});

			render();


			expect( imprecise( child1BB.position.y) ).equals( containerBB._bounds._centerY + containerBB._bounds._offsetHeight/2 - child1BB._bounds._offsetHeight/2 );
			expect( imprecise( child1CB.position.y) ).equals( containerCB._bounds._centerY + containerCB._bounds._offsetHeight/2 - child1CB._bounds._offsetHeight/2 );
		});

		it("Any child should snap on container top minus margin", function () {

			child1BB.set({margin:0.1});
			child1CB.set({margin:0.1});




			render();

			expect( imprecise( child1BB.position.y) ).equals(containerBB._bounds._centerY + containerBB._bounds._offsetHeight/2 - child1BB._bounds._offsetHeight/2 - child1BB._margin._value.x );
			expect( imprecise( child1CB.position.y) ).equals(containerCB._bounds._centerY + containerCB._bounds._offsetHeight/2 - child1CB._bounds._offsetHeight/2 - child1CB._margin._value.x );
		});

		it("Any child should snap on container center minus margin mixed", function () {

			child1BB.set({margin: '0.1 0 0.2 0'});
			child1CB.set({margin: '0.1 0 0.2 0'});




			render();

			expect( imprecise( child1BB.position.y) ).equals(containerBB._bounds._centerY + containerBB._bounds._offsetHeight/2 - child1BB._bounds._offsetHeight/2 - child1BB._margin._value.x );
			expect( imprecise( child1CB.position.y) ).equals(containerCB._bounds._centerY + containerCB._bounds._offsetHeight/2 - child1CB._bounds._offsetHeight/2 - child1CB._margin._value.x );
		});

	});

	describe(' + {alignItems:"end"}', function() {

		it("Any child should snap on container bottom", function () {

			child1BB.set({margin:0});
			child1CB.set({margin:0});

			containerBB.set({alignItems:'end'});
			containerCB.set({alignItems:'end'});

			render();


			expect( imprecise( child1BB.position.y) ).equals( containerBB._bounds._centerY - containerBB._bounds._offsetHeight/2 + child1BB._bounds._offsetHeight/2 );
			expect( imprecise( child1CB.position.y) ).equals( containerCB._bounds._centerY - containerCB._bounds._offsetHeight/2 + child1CB._bounds._offsetHeight/2 );
		});

		it("Any child should snap on container bottom minus margin", function () {

			child1BB.set({margin:0.1});
			child1CB.set({margin:0.1});




			render();

			expect( imprecise( child1BB.position.y) ).equals(containerBB._bounds._centerY - containerBB._bounds._offsetHeight/2 + child1BB._bounds._offsetHeight/2 + child1BB._margin._value.z );
			expect( imprecise( child1CB.position.y) ).equals(containerCB._bounds._centerY - containerCB._bounds._offsetHeight/2 + child1CB._bounds._offsetHeight/2 + child1CB._margin._value.z );
		});

		it("Any child should snap on container right minus margin mixed", function () {

			child1BB.set({margin: '0.1 0 0.2 0'});
			child1CB.set({margin: '0.1 0 0.2 0'});




			render();

			expect( imprecise( child1BB.position.y) ).equals(containerBB._bounds._centerY - containerBB._bounds._offsetHeight/2 + child1BB._bounds._offsetHeight/2 + child1BB._margin._value.z );
			expect( imprecise( child1CB.position.y) ).equals(containerCB._bounds._centerY - containerCB._bounds._offsetHeight/2 + child1CB._bounds._offsetHeight/2 + child1CB._margin._value.z );
		});

	});

});
