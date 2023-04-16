import { buildThreeSetup } from '../../../../utils/TestThree.js';
import { preloadFonts } from '../../../../utils/TestFonts.js';
import { fiveBlockContainer } from '../../../../utils/TestStructure.js';
import { imprecise } from '../../../../utils/TestNumber.js';

describe('Layout Case : {flexDirection:"column", justifyContent:"end"}', function () {

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

		containerBB.set({flexDirection: 'column', justifyContent:'end'});
		containerCB.set({flexDirection: 'column', justifyContent:'end'});




		render();

	});

	it("Last child should snap on bottom on container", function () {

		const containerBottomBB = containerBB._bounds._centerY - containerBB._bounds._offsetHeight / 2;
		const containerBottomCB = containerCB._bounds._centerY - containerCB._bounds._offsetHeight / 2;

		expect( imprecise( child5BB.position.y) ).equals( containerBottomBB + child5BB._bounds._offsetHeight / 2 );
		expect( imprecise( child5CB.position.y) ).equals( containerBottomCB + child5CB._bounds._offsetHeight / 2 );
	});

	it("Last child should snap on top on container minus margin", function () {

		child5BB.set({margin:0.1});
		child5CB.set({margin:0.1});




		render();

		const containerBottomBB = containerBB._bounds._centerY - containerBB._bounds._offsetHeight / 2;
		const containerBottomCB = containerCB._bounds._centerY - containerCB._bounds._offsetHeight / 2;

		expect( imprecise( child5BB.position.y) ).equals( containerBottomBB + child5BB._bounds._offsetHeight / 2 + child5BB._margin._value.z);
		expect( imprecise( child5CB.position.y) ).equals( containerBottomCB + child5CB._bounds._offsetHeight / 2 + child5CB._margin._value.z);
	});


	describe(' + {alignItems:"center"}', function() {

		it("Any child should snap on container center", function () {

			child5BB.set({margin:0});
			child5CB.set({margin:0});

			containerBB.set({alignItems:'center'});
			containerCB.set({alignItems:'center'});

			render();

			expect( imprecise( child3BB.position.x) ).equals( containerBB._bounds._centerX );
			expect( imprecise( child3CB.position.x) ).equals( containerCB._bounds._centerX );
		});


		it("Any child should snap on container center minus margin", function () {

			child5BB.set({margin:0.1});
			child5CB.set({margin:0.1});




			render();

			expect( imprecise( child5BB.position.x) ).equals( containerBB._bounds._centerX + ( - child5BB._margin._value.y + child5BB._margin._value.w) / 2 );
			expect( imprecise( child5CB.position.x) ).equals( containerCB._bounds._centerX + ( - child5CB._margin._value.y + child5CB._margin._value.w) / 2 );

		});


		it("Any child should snap on container center minus margin mixed", function () {

			child5BB.set({margin: '0 0.1 0 0.2'});
			child5CB.set({margin: '0 0.1 0 0.2'});




			render();

			expect( imprecise( child5BB.position.x) ).equals( containerBB._bounds._centerX + ( - child5BB._margin._value.y + child5BB._margin._value.w ) / 2);
			expect( imprecise( child5CB.position.x) ).equals( containerCB._bounds._centerX + ( - child5CB._margin._value.y + child5CB._margin._value.w ) / 2);
		});

	});

	describe(' + {alignItems:"start"}', function() {

		it("Any child should snap on container left", function () {

			child5BB.set({margin:0});
			child5CB.set({margin:0});

			containerBB.set({alignItems:'start'});
			containerCB.set({alignItems:'start'});

			render();


			expect( imprecise( child5BB.position.x) ).equals( containerBB._bounds._centerX - containerBB._bounds._offsetWidth/2 + child5BB._bounds._offsetWidth/2 );
			expect( imprecise( child5CB.position.x) ).equals( containerCB._bounds._centerX - containerCB._bounds._offsetWidth/2 + child5CB._bounds._offsetWidth/2 );
		});

		it("Any child should snap on container left minus margin", function () {

			child5BB.set({margin:0.1});
			child5CB.set({margin:0.1});




			render();

			expect( imprecise( child5BB.position.x) ).equals(containerBB._bounds._centerX - containerBB._bounds._offsetWidth/2 + child5BB._bounds._offsetWidth/2 + child5BB._margin._value.w );
			expect( imprecise( child5CB.position.x) ).equals(containerCB._bounds._centerX - containerCB._bounds._offsetWidth/2 + child5CB._bounds._offsetWidth/2 + child5CB._margin._value.w );
		});

		it("Any child should snap on container center minus margin mixed", function () {

			child5BB.set({margin: '0 0.1 0 0.2'});
			child5CB.set({margin: '0 0.1 0 0.2'});




			render();

			expect( imprecise( child5BB.position.x) ).equals(containerBB._bounds._centerX - containerBB._bounds._offsetWidth/2 + child5BB._bounds._offsetWidth/2 + child5BB._margin._value.w );
			expect( imprecise( child5CB.position.x) ).equals(containerCB._bounds._centerX - containerCB._bounds._offsetWidth/2 + child5CB._bounds._offsetWidth/2 + child5CB._margin._value.w );
		});

	});

	describe(' + {alignItems:"end"}', function() {

		it("Any child should snap on container right", function () {

			child5BB.set({margin:0});
			child5CB.set({margin:0});

			containerBB.set({alignItems:'end'});
			containerCB.set({alignItems:'end'});

			render();


			expect( imprecise( child5BB.position.x) ).equals( containerBB._bounds._centerX + containerBB._bounds._offsetWidth/2 - child5BB._bounds._offsetWidth/2 );
			expect( imprecise( child5CB.position.x) ).equals( containerCB._bounds._centerX + containerCB._bounds._offsetWidth/2 - child5CB._bounds._offsetWidth/2 );
		});

		it("Any child should snap on container right minus margin", function () {

			child5BB.set({margin:0.1});
			child5CB.set({margin:0.1});




			render();

			expect( imprecise( child5BB.position.x) ).equals(containerBB._bounds._centerX + containerBB._bounds._offsetWidth/2 - child5BB._bounds._offsetWidth/2 - child5BB._margin._value.y );
			expect( imprecise( child5CB.position.x) ).equals(containerCB._bounds._centerX + containerCB._bounds._offsetWidth/2 - child5CB._bounds._offsetWidth/2 - child5CB._margin._value.y );
		});

		it("Any child should snap on container right minus margin mixed", function () {

			child5BB.set({margin: '0 0.1 0 0.2'});
			child5CB.set({margin: '0 0.1 0 0.2'});




			render();

			expect( imprecise( child5BB.position.x) ).equals(containerBB._bounds._centerX + containerBB._bounds._offsetWidth/2 - child5BB._bounds._offsetWidth/2 - child5BB._margin._value.y );
			expect( imprecise( child5CB.position.x) ).equals(containerCB._bounds._centerX + containerCB._bounds._offsetWidth/2 - child5CB._bounds._offsetWidth/2 - child5CB._margin._value.y );
		});

	});

});
