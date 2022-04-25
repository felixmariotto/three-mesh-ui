/* Import everything we need from Three.js */

import * as THREE from "three";
import {VRButton} from "three/examples/jsm/webxr/VRButton.js";
import {BoxLineGeometry} from "three/examples/jsm/geometries/BoxLineGeometry.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

import ThreeMeshUI from "three-mesh-ui";

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';


import {Mesh, MeshBasicMaterial, PlaneBufferGeometry, ShaderMaterial, UniformsUtils} from "three";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

window.addEventListener("load", init);
window.addEventListener("resize", onWindowResize);

//

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x505050);

	// use of orthgraphic camera to increase matching
	camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 1000 );

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(WIDTH, HEIGHT);
	renderer.xr.enabled = true;
	document.body.appendChild(VRButton.createButton(renderer));
	document.body.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);
	camera.position.set(0, 0.925, 0);

	camera.zoom = 1275;
	camera.updateProjectionMatrix();

	controls.target = new THREE.Vector3(0, 1, -1.8);
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0),
		new THREE.LineBasicMaterial({color: 0x808080})
	);

	scene.add(room);

	// TEXT PANEL

	makeUI();

	//

	renderer.setAnimationLoop(loop);
}

//

function makeUI() {
	const container = new ThreeMeshUI.Block({
		height: 1.5,
		width: 0.55,
		justifyContent: "center",
		alignContent: "center",
		backgroundOpacity: 0,
	});

	container.position.set(0, 0.925, -1.8);
	// container.rotation.x = -0.55;
	scene.add(container);

	//

	const textBlock = new ThreeMeshUI.Block({
		height: 0.4,
		width: 0.73,
		margin: 0.05,
		alignContent: "right",
		justifyContent: "center",
		padding: 0.03,
		interLine: -0.01,
		letterSpacing: 0
	});

	container.add(textBlock);

	//

	container.set({
		fontFamily: FontJSON,
		fontTexture: FontImage,
	});

	const textContent = "The spiny bush viper is known for its extremely keeled dorsal scales.";
	const text = new ThreeMeshUI.Text({
		fontSize: 0.06,
		fontOpacity: 0.75,
		content: textContent,
	});


	// Lines properties. Lines are planes manually added behind each text lines
	// in order to perceive and validate line width

	const lineMat = new MeshBasicMaterial({color:0xff9900,opacity:0.5});
	let lines = [];

	text.onAfterUpdate = function () {

		if (!(text.fontMaterial instanceof FontMaterialDebugger) ) {

			// remove all lines previously added
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				container.remove(line);
			}
			lines = [];

			// only process when texts are not empty
			if( text.children.length == 0 ) return;

			// replace the default fontMaterial with a debugging one
			// which shows quad in opposite font color
			text.children[0].material = new FontMaterialDebugger(text.fontMaterial);
			text.children[0].material.uniforms.u_texture.value = text.fontMaterial.uniforms.u_texture.value;
			text.children[0].material.uniforms.u_opacity.value = text.fontMaterial.uniforms.u_opacity.value;

			// retrieve all lines sent by InlineManager for the textBlock
			for (let i = 0; i < textBlock.lines.length; i++) {

				const lineProperty = textBlock.lines[i];

				if( !lineProperty[0] ) continue;

				// ( I was unable to quickly match lineHeight )
				// lineHeight doesn't fit
				const lineHeight = lineProperty.lineHeight/4;

				// create a mesh for each line
				const lineGeo = new PlaneBufferGeometry(lineProperty.width, lineHeight );
				const lineMesh = new Mesh( lineGeo, lineMat);

				lineMesh.position.x = lineProperty[0].offsetX + (lineProperty.width/2);
				lineMesh.position.y = lineProperty[0].offsetY + (lineHeight/2);

				lineMesh.position.z = 0.018;

				lines.push(lineMesh);
				container.add(lineMesh);
			}

		}
	}

	textBlock.add(text);


	//build html overlay for comparison and selection
	const overlay = document.createElement('div');
	overlay.classList.add('overlay');

	overlay.innerHTML = `
    <div style="flex-grow: 1; display: flex; flex-direction: column">
    <!-- Text Area for input -->
    <textarea></textarea>
    <!-- Buttons for preset text contents -->
    <div style="display: flex">
        <button data-tc="The spiny bush viper is known for its extremely keeled dorsal scales.">Default</button>
        <button data-tc="The spiny bush viper is \nknown for its extremely \nkeeled dorsal scales.">Default formatted</button>
        <button data-tc="The spiny bush viper is\nknown for its extremely\nkeeled dorsal scales.">Default formatted trimmed</button>
        <button data-tc="          d         \n          d         \n          d         ">Untrimmed matrix</button>
        <button data-tc="a................................. a....."> Issue: html dont break</button>
    </div>
    </div>

    <div>
        <!-- html visualizers of what the render should look like with different white-space value -->
        <fieldset data-ws="normal">
            <legend>white-space:normal</legend>
            <p data-a="left"></p>
            <p data-a="center"></p>
            <p data-a="right"></p>
        </fieldset>
        <fieldset data-ws="pre-wrap">
            <legend>white-space:pre-wrap</legend>
            <p data-a="left"></p>
            <p data-a="center"></p>
            <p data-a="right" class="selected"></p>
        </fieldset>
        <fieldset data-ws="pre-line">
            <legend>white-space:pre-line</legend>
            <p data-a="left"></p>
            <p data-a="center"></p>
            <p data-a="right"></p>
        </fieldset>
    </div>`;

	//
	const tA = overlay.querySelector('textarea');
	tA.value = textContent;

	const paragraphs = overlay.querySelectorAll("p");
	for (let i = 0; i < paragraphs.length; i++) {
		paragraphs[i].textContent = textContent;
		paragraphs[i].addEventListener("click", (e) => {

			for (let j = 0; j < paragraphs.length; j++) {
				paragraphs[j].classList.remove('selected');
			}

			const selectedParagraph = e.currentTarget;
			selectedParagraph.classList.add('selected');

			const align = selectedParagraph.getAttribute('data-a');
			const whiteSpace = selectedParagraph.parentElement.getAttribute("data-ws");

			// Block whitespace will helps to compute size and collapsing whitespace chars
			textBlock.set({
				alignContent: align,
				whiteSpace: whiteSpace,// but this is not propagated to children
			});

			// so setting Text whitespace is required to know whitespace behaviour of \n ;
			// lineBreak : mandatory|possible ( done in Text );
			text.set({whiteSpace:whiteSpace});
		})
	}

	// preset content buttons interactions
	const textButtons = overlay.querySelectorAll("button");
	for (let i = 0; i < textButtons.length; i++) {
		textButtons[i].addEventListener('click',(e)=>{
			const buttonClicked = e.currentTarget;
			tA.value = buttonClicked.getAttribute('data-tc');
			tA.dispatchEvent(new Event('input'));
		});
	}


	// inject styles
	const style = document.createElement('style');
	style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
        .overlay { position:fixed; top:20px; right:20px; display:flex; width:95% }
        .overlay fieldset{ display:flex; height: fit-content; padding:0.25rem }
        .overlay fieldset legend { color: orange; font-weight: 700; background: #222; margin: auto; }
        .overlay p, .overlay textarea { border-radius: 5px;}
        .overlay textarea { height: 60px; border-radius: 5px; white-space: nowrap; }
        .overlay p { margin: 0 15px; font-family: 'Roboto', sans-serif; border-bottom: 3px solid transparent; }
        .overlay p.selected { border-bottom-color: greenyellow; }
        .overlay p { cursor: pointer; width:180px; color:whitesmoke; background: #000; padding:15px; }
        [data-ws="pre-wrap"] p { white-space: pre-wrap; }
        [data-ws="pre-line"] p { white-space: pre-line; }
        [data-a="left"] { text-align: left; }
        [data-a="center"] { text-align: center; }
        [data-a="right"] { text-align: right; }
    `;
	document.head.appendChild(style);
	document.body.appendChild(overlay);


	// update texts as soon textarea changes
	tA.addEventListener('input', () => {
		const tc = tA.value;

		// update html paragraph
		for (let i = 0; i < paragraphs.length; i++) {
			paragraphs[i].textContent = tc;
		}
		// and threemeshui text
		text.set({content: tc});
	});

}

// Function that resize the renderer when the browser window is resized

function onWindowResize() {

	const W = window.innerWidth;
	const H = window.innerHeight;

	const aspect = W / H;
	// camera.aspectRatio = aspect;

	camera.left = W *aspect/ - 2;
	camera.right = W *aspect/ 2;
	camera.top = H * aspect/ 2;
	camera.bottom = - H * aspect/ 2;

	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// Render loop (called ~60 times/second, or more in VR)

function loop() {
	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render(scene, camera);
}

/**
 *
 */
class FontMaterialDebugger extends ShaderMaterial {

	/**
	 *
	 * @param {ShaderMaterial} fontMaterial
	 */
	constructor( fontMaterial ) {

		super({
			uniforms: UniformsUtils.clone(fontMaterial.uniforms),
			transparent: true,
			clipping: true,
			vertexShader: textVertex,
			fragmentShader: textFragment,
			extensions: {
				derivatives: true
			}
		});
	}
}

const textVertex = `
	varying vec2 vUv;

	#include <clipping_planes_pars_vertex>

	void main() {

		vUv = uv;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;
		gl_Position.z -= 0.00001;

		#include <clipping_planes_vertex>

	}
`;

//

const textFragment = `
	uniform sampler2D u_texture;
	uniform vec3 u_color;
	uniform float u_opacity;

	varying vec2 vUv;

	#include <clipping_planes_pars_fragment>

	float median(float r, float g, float b) {
		return max(min(r, g), min(max(r, g), b));
	}

	void main() {

		vec3 textureSample = texture2D( u_texture, vUv ).rgb;
		float sigDist = median( textureSample.r, textureSample.g, textureSample.b ) - 0.5;
		float alpha = clamp( sigDist / fwidth( sigDist ) + 0.5, 0.0, 1.0 );
		alpha = min( alpha, u_opacity );

		if( alpha < 0.02) {
		    gl_FragColor = vec4( vec3(1.)-u_color, 1.0 );
		}else{
            gl_FragColor = vec4( u_color, u_opacity );
         }

		#include <clipping_planes_fragment>

	}
`;
