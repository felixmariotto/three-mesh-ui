import { buildThreeSetup } from '../../../utils/TestThree.js' ;
import { preloadFonts } from '../../../utils/TestFonts.js';
import { addThreeLinks, addThreeParagraphs, fiveBlockContainer, threeParentContainers } from '../../../utils/TestStructure.js';


describe( 'QuerySelector', function () {

	let scene, camera, renderer, render;
	let fontFamily;

	before( function ( done ) {

		( { scene, camera, renderer, render } = buildThreeSetup() );
		fontFamily = preloadFonts( done );

	} );

	let root, parent1, parent2, parent3;

	let secondRoot;

	// paragraphs
	let p11,p12,p13,p21,p22,p23,p31,p32,p33;

	let VRDocument;

	before( function () {

		//build a container with 5 children blocks
		( { root, parent1, parent2, parent3 } = threeParentContainers( scene ) );

		// container will have :root

		parent1.classList.add('parent', 'parent--1');
		parent1.elementID = "parent_1";

		parent2.classList.add('parent', 'parent--2');
		parent2.elementID = "parent_2";

		parent3.classList.add('parent', 'parent--3');
		parent3.elementID = "parent_3";

		// adds 3 paragraphs in each parent
		( {l1:p11, l2:p12, l3:p13} = addThreeLinks(parent1) );
		p11.classList.add('link','link--1');
		p11.setAttribute('src', '/internal/link/2');

		p12.classList.add('link','link--2');
		p12.setAttribute('src', 'https://external.link/2');
		p12.setAttribute('disabled');

		p13.classList.add('link','link--3');
		p13.setAttribute('src', 'https://external.link/3');
		p13.setAttribute('target', '_blank');

		( {l1:p21, l2:p22, l3:p23} = addThreeLinks(parent2) );
		p21.classList.add('link','link--1');
		p21.setAttribute('src', '/internal/link/2');

		p22.classList.add('link','link--2');
		p22.setAttribute('src', 'https://external.link/2');
		p22.setAttribute('disabled');

		p23.classList.add('link','link--3');
		p23.setAttribute('src', 'https://external.link/3');
		p23.setAttribute('target', '_blank');

		( {l1:p31, l2:p32, l3:p33} = addThreeLinks(parent3) );
		p31.classList.add('link','link--1');
		p31.setAttribute('src', '/internal/link/2');

		p32.classList.add('link','link--2');
		p32.setAttribute('src', 'https://external.link/2');
		p32.setAttribute('disabled');

		p33.classList.add('link','link--3');
		p33.setAttribute('src', 'https://external.link/3');
		p33.setAttribute('target', '_blank');


		secondRoot = new ThreeMeshUI.Block({});
		scene.add( secondRoot );

		VRDocument = ThreeMeshUI.VRDocument;

		render();

	} );


	describe( ':root', function () {

		it( 'Should contains 2 roots from VRDocument', () => {

			let result = VRDocument.querySelectorAll(":root");
			expect(result.length).equals(2);
			expect(result).include( root );
			expect(result).include( secondRoot );

		});

		it( 'Should contains 1 root from root', () => {

			let result = root.querySelectorAll(":root");
			expect(result.length).equals(1);
			expect(result).include( root );
			expect(result).not.include( secondRoot );

		});


	});


	describe( '.link (single class)', function () {

		it( 'Should contains 9 .link from VRDocument', () => {

			let result = VRDocument.querySelectorAll(".link");
			expect(result.length).equals(9);

		});

		it( 'Should contains 3 .link #parent1', () => {

			let result = parent1.querySelectorAll(".link");
			expect(result.length).equals(3);

		});

	});

	describe( '.link.link--2 (multiple class)', function () {

		it( 'Should contains 3 .link from VRDocument', () => {

			let result = VRDocument.querySelectorAll(".link.link--2");
			expect(result.length).equals(3);

		});

		it( 'Should contains 1 .link #parent1', () => {

			let result = parent1.querySelectorAll(".link.link--2");
			expect(result.length).equals(1);
			expect(result[0]).equals(p12);

		});

	});


	describe( '[src] (attribute isset)', function () {

		it( 'Should contains 9 elements with src attribute from VRDocument', () => {

			let result = VRDocument.querySelectorAll("[src]");
			expect(result.length).equals(9);

		});

		it( 'Should contains 3 elements with src attribute from #parent1', () => {

			let result = parent1.querySelectorAll("[src]");
			expect(result.length).equals(3);

		});

	});

	describe( '[src]+[disabled] (attribute isset multiple)', function () {

		it( 'Should contains 3 elements with src + disabled attribute from VRDocument', () => {

			let result = VRDocument.querySelectorAll("[src][disabled]");
			expect(result.length).equals(3);

		});

		it( 'Should contains 1 elements with src + disabled attribute from #parent1', () => {

			let result = parent1.querySelectorAll("[src][disabled]");
			expect(result.length).equals(1);

		});

	});

	describe( '[src^="https://"] (attribute starts with)', function () {

		it( 'Should contains 6 elements with src starting with "https://', () => {

			let result = VRDocument.querySelectorAll(`[src^="https://"]`);
			expect(result.length).equals(6);

		});

		it( 'Should contains 1 elements with src starting with "https:// from #parent1', () => {

			let result = parent1.querySelectorAll(`[src^="https://"]`);
			expect(result.length).equals(2);

		});

	});

	describe( '[src^="https://"][disabled] (attribute starts with + isset)', function () {

		it( 'Should contains 6 elements with src starting with "https://', () => {

			let result = VRDocument.querySelectorAll(`[src^="https://"][disabled]`);
			expect(result.length).equals(3);

		});

		it( 'Should contains 1 elements starting with "https:// from #parent1', () => {

			let result = parent1.querySelectorAll(`[src^="https://"][disabled]`);
			expect(result.length).equals(1);

		});

	});

	describe( '[src$="/2"] (attribute ends with)', function () {

		it( 'Should contains 6 elements with src ending with "/2"', () => {

			let result = VRDocument.querySelectorAll(`[src$="/2"]`);
			expect(result.length).equals(6);

		});

		it( 'Should contains 2 elements with src ending with "/2" from #parent1', () => {

			let result = parent1.querySelectorAll(`[src$="/2"]`);
			expect(result.length).equals(2);

		});

	});

	describe( '[src="value"] (attribute equals)', function () {

		it( 'Should contains 0 elements with src equals "/2"', () => {

			let result = VRDocument.querySelectorAll(`[src="/2"]`);
			expect(result.length).equals(0);

		});

		it( 'Should contains 0 elements with src equals "/2" from #parent1', () => {

			let result = parent1.querySelectorAll(`[src="/2"]`);
			expect(result.length).equals(0);

		});

		it( 'Should contains 3 elements with src equals "https://external.link/2"', () => {

			let result = VRDocument.querySelectorAll(`[src="https://external.link/2"]`);
			expect(result.length).equals(3);

		});

		it( 'Should contains 1 elements with src equals "https://external.link/2" from #parent1', () => {

			let result = parent1.querySelectorAll(`[src="https://external.link/2"]`);
			expect(result.length).equals(1);

		});

	});

	describe( 'Descendant (space)', function () {

		it( 'Should contains 9 elements from :root', () => {

			let result = VRDocument.querySelectorAll(`:root a`);
			expect(result.length).equals(9);

			result = VRDocument.querySelectorAll(`.parent a`);
			expect(result.length).equals(9);

			result = VRDocument.querySelectorAll(`.parent .link`);
			expect(result.length).equals(9);

		});

		it( 'Should contains 3 elements from #parent_1', () => {

			let result = VRDocument.querySelectorAll(`#parent_1 a`);
			expect(result.length).equals(3);

			result = VRDocument.querySelectorAll(`.parent#parent_1 a`);
			expect(result.length).equals(3);

			result = VRDocument.querySelectorAll(`#parent_1.parent a`);
			expect(result.length).equals(3);

			result = VRDocument.querySelectorAll(`.parent.parent--1 .link`);
			expect(result.length).equals(3);

			result = VRDocument.querySelectorAll(`:root .parent--1 .link`);
			expect(result.length).equals(3);

		});

	});

	describe( 'Direct (>)', function () {

		it( 'Should contains 3 elements from #parent_1', () => {

			let result = VRDocument.querySelectorAll(`#parent_1 > a`);
			expect(result.length).equals(3);

			result = VRDocument.querySelectorAll(`.parent#parent_1 > a`);
			expect(result.length).equals(3);

			result = VRDocument.querySelectorAll(`#parent_1.parent > a`);
			expect(result.length).equals(3);

			result = VRDocument.querySelectorAll(`.parent.parent--1 > .link`);
			expect(result.length).equals(3);

			result = VRDocument.querySelectorAll(`:root .parent--1 > .link`);
			expect(result.length).equals(3);

		});

		it( 'Should contains 0 elements from :root', () => {

			let result = VRDocument.querySelectorAll(`:root > a`);
			expect(result.length).equals(0);

			result = VRDocument.querySelectorAll(`:root > .link`);
			expect(result.length).equals(0);

		});

	});


	describe( 'Adjacent siblings (+)', function () {

		it( 'Should contains 6 elements from :root', () => {

			let result = VRDocument.querySelectorAll(`.parent > a + a`);
			expect(result.length).equals(6);

			result = VRDocument.querySelectorAll(`a + a`);
			expect(result.length).equals(6);

		});

		it( 'Should contains 0 elements from :root', () => {

			let result = VRDocument.querySelectorAll(`.parent > a + a.link--1`);
			expect(result.length).equals(0);

			result = VRDocument.querySelectorAll(`a + a.link--1`);
			expect(result.length).equals(0);

		});

		it( 'Should contains 3 elements from :root', () => {

			let result = VRDocument.querySelectorAll(`.parent > a + a.link--2`);
			expect(result.length).equals(3);

			result = VRDocument.querySelectorAll(`a + a.link--2`);
			expect(result.length).equals(3);

		});

		it( 'Should contains 1 elements from #parent_1', () => {

			let result = VRDocument.querySelectorAll(`.parent--1 > a + a.link--2`);
			expect(result.length).equals(1);

			result = VRDocument.querySelectorAll(`.parent--1 a + a.link--2`);
			expect(result.length).equals(1);

			result = VRDocument.querySelectorAll(`#parent_1 a + a.link--2`);
			expect(result.length).equals(1);

			result = VRDocument.querySelectorAll(`#parent_1 > a + a.link--2`);
			expect(result.length).equals(1);

		});

	});

	describe( 'General siblings (~)', function () {

		it( 'Should contains 6 elements from :root', () => {

			let result = VRDocument.querySelectorAll(`.parent > a ~ a`);
			expect(result.length).equals(6);

			result = VRDocument.querySelectorAll(`a ~ a`);
			expect(result.length).equals(6);

			result = VRDocument.querySelectorAll(`:root a ~ a`);
			expect(result.length).equals(6);

			result = VRDocument.querySelectorAll(`:root .parent a ~ a`);
			expect(result.length).equals(6);

			result = VRDocument.querySelectorAll(`:root .parent > a ~ a`);
			expect(result.length).equals(6);

			result = VRDocument.querySelectorAll(`a.link ~ a.link`);
			expect(result.length).equals(6);

			result = VRDocument.querySelectorAll(`a.link.link--1 ~ a.link`);
			expect(result.length).equals(6);

		});

		it( 'Should contains 0 elements from :root', () => {

			let result = VRDocument.querySelectorAll(`.parent > a.link--2 ~ a.link--1`);
			expect(result.length).equals(0);

		});

	});

} );
