
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import createText from 'three-bmfont-text';
import MSDFShader from 'three-bmfont-text/shaders/msdf';
import loadFont from 'load-bmfont';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, container, controls ;
const quotes = [
	'blablablabla',
	'foobar'
];

const opt = {
	font: 'assets/Roboto-msdf.json',
	image: 'assets/Roboto-msdf.png'
};

loadFont(opt.font, function (err, font) {

	if (err) throw err

	new THREE.TextureLoader().load(opt.image, function (tex) {
		start(font, tex)
	});

});

//

function start(font, texture) {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf2f2f2 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	document.body.appendChild( renderer.domElement );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, -2 );
	controls.target = new THREE.Vector3( 0, 0, 0 );
	controls.update();

	const mesh = new THREE.Mesh(
		new THREE.SphereBufferGeometry(0.2, 16, 16),
		new THREE.MeshNormalMaterial()
	);

	// scene.add( mesh );

	///

	container = new THREE.Object3D()
	scene.add(container)

	container.scale.setScalar(0.02)

	for (var i = 0; i < 1; i++) {
		createGlyph()
	};

	loop();

	function createGlyph () {

		var geom = createText({
		  text: quotes[Math.floor(Math.random() * quotes.length)].split(/\s+/g).slice(0, 6).join(' '),
		  font: font,
		  align: 'left',
		  flipY: texture.flipY
		})

		var material = new THREE.RawShaderMaterial(MSDFShader({
		  map: texture,
		  transparent: true,
		  color: 0xff00ff
		}));

		var layout = geom.layout
		var text = new THREE.Mesh(geom, material)
		text.position.set(0, -layout.descender + layout.height, 0)
		text.scale.multiplyScalar(Math.random() * 0.5 + 0.5)

		var textAnchor = new THREE.Object3D()
		textAnchor.add(text)
		container.add(textAnchor)

	};

};

//

function loop() {

	renderer.render( scene, camera );

	requestAnimationFrame( loop );

};