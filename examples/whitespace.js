/* Import everything we need from Three.js */

import * as THREE from "three";
import {VRButton} from "three/examples/jsm/webxr/VRButton.js";
import {BoxLineGeometry} from "three/examples/jsm/geometries/BoxLineGeometry.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

import ThreeMeshUI from "../src/three-mesh-ui.js";

import SnakeImage from "./assets/spiny_bush_viper.jpg";
// import FontJSON from "./assets/Roboto-msdf.json";
import FontJSON from "./assets/Roboto-Regular-space-msdf.json";
// import FontImage from "./assets/Roboto-msdf.png";
import FontImage from "./assets/Roboto-Regular-space-msdf.png";
import FontMaterialDebugger from "../src/utils/materials/FontMaterialDebugger";
import {Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneBufferGeometry} from "three";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

window.addEventListener("load", init);
window.addEventListener("resize", onWindowResize);

//

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x505050);

    //camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);
    // camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);

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
        interLine: -0.01,
        // interLine: 0.03,
        letterSpacing: 0
    });

    container.add(textBlock);
    window.textBlock = textBlock;

    //

    container.set({
        fontFamily: FontJSON,
        fontTexture: FontImage,
    });

    const textContent = "The spiny bush viper is known for its extremely keeled dorsal scales.";
    const text = new ThreeMeshUI.Text({
        fontOpacity: 0.75,
        content: textContent,
    });


    let lineMat = new MeshBasicMaterial({color:0xff9900,opacity:0.5});
    let lines = [];

    text.onAfterUpdate = function () {

        if (!(text.fontMaterial instanceof FontMaterialDebugger) ) {

            // remove all lines
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                container.remove(line);
            }
            lines = [];

            if( text.children.length == 0 ) return;

            text.children[0].material = new FontMaterialDebugger(text.fontMaterial);
            text.children[0].material.uniforms.u_texture.value = text.fontMaterial.uniforms.u_texture.value;
            text.children[0].material.uniforms.u_opacity.value = text.fontMaterial.uniforms.u_opacity.value;

            // console.log(text.children[0].material.uniforms.u_opacity.value);



            // console.log( text.position );
            // console.log( textBlock.lines );


            for (let i = 0; i < textBlock.lines.length; i++) {

                let lineProperty = textBlock.lines[i];

                if( !lineProperty[0] ) continue;

                const lineHeight = lineProperty.lineHeight/4;
                const lineBase = lineProperty.lineBase;

                let lineGeo = new PlaneBufferGeometry(lineProperty.width, lineHeight );
                let lineMesh = new Mesh( lineGeo, lineMat);

                const delta = lineHeight-lineBase;


                lineMesh.position.x = lineProperty[0].offsetX + (lineProperty.width/2);
                lineMesh.position.y = lineProperty[0].offsetY + (lineHeight/2);




                // I don't understand where the inline offset comes from
                // it has this.position.z = this.getOffset();
                // but this doens't fit
                lineMesh.position.z = 0.018;


                lines.push(lineMesh);
                container.add(lineMesh);
            }

        }
    }

    textBlock.add(text);

    //

    text.set({
        // fontColor: new THREE.Color(0x92e66c),
        fontColor: new THREE.Color(0xffffff),
        fontSize: 0.06,
    });

    textBlock.set({
        alignContent: "right",
        justifyContent: "center",
        padding: 0.03,
    });

    //



    //build html overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    overlay.innerHTML = `
    <div style="flex-grow: 1; display: flex; flex-direction: column">
    <textarea></textarea>
    <div style="display: flex">
        <button data-tc="The spiny bush viper is known for its extremely keeled dorsal scales.">Default</button>
        <button data-tc="The spiny bush viper is \nknown for its extremely \nkeeled dorsal scales.">Default formatted</button>
        <button data-tc="The spiny bush viper is\nknown for its extremely\nkeeled dorsal scales.">Default formatted trimmed</button>
        <button data-tc="          d         \n          d         \n          d         ">Untrimmed matrix</button>
        <button data-tc="a................................. a....."> Issue: html dont break</button>
        <button>T3</button>
        <button>T4</button>
    </div>
    </div>

    <div>
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

            //so Text whitespace will helps to know whitespace behaviour of \n ;
            // lineBreak : mandatory|possible ( done in Text );
            text.set({whiteSpace:whiteSpace});
        })
    }

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


    tA.addEventListener('input', (e) => {
        const tc = tA.value;

        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].textContent = tc;
        }
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
