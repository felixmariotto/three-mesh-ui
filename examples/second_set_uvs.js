import * as THREE from 'three';
import {VRButton} from 'three/examples/jsm/webxr/VRButton.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {BoxLineGeometry} from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import UVImage from './assets/spiny_bush_viper.jpg';
// import UVImage from './assets/uv_grid.jpg';
import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';
import {BufferAttribute, Float32BufferAttribute, Matrix3, Mesh, MeshBasicMaterial, PlaneBufferGeometry, RepeatWrapping, Texture} from "three";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

window.addEventListener('load', init);
window.addEventListener('resize', onWindowResize);

//

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x505050);

    camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.xr.enabled = true;
    document.body.appendChild(VRButton.createButton(renderer));
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 1.6, 0);
    controls.target = new THREE.Vector3(0, 1, -1.8);
    controls.update();

    // ROOM

    const room = new THREE.LineSegments(
        new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0),
        new THREE.LineBasicMaterial({color: 0x808080})
    );

    scene.add(room);

    // TEXT PANEL

    makeTextPanel();

    //

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(),
        new THREE.MeshBasicMaterial({color:0xff9900}),
    );

    scene.add( plane );


    renderer.setAnimationLoop(loop);

};

//

function makeTextPanel() {

    const container = new ThreeMeshUI.Block({
        width: 2.55,
        height: 1.25,
        padding: 0.05,
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 0.55,
        fontFamily: FontJSON,
        fontTexture: FontImage,
        interLine: -0.15,
        letterSpacing: -0.082 // @Notes : that negative letterspacing is not took into account for width computation
    });

    container.position.set(0, 1, -1.8);
    container.rotation.x = -0.55;
    scene.add(container);

    //
    const loader = new THREE.TextureLoader();
    loader.load( UVImage, (textureC)=> {

        textureC.wrapS = THREE.RepeatWrapping;
        textureC.wrapT = THREE.RepeatWrapping;

        textureC.wrapT = textureC.wrapS = RepeatWrapping;
        textureC.needsUpdate = true;

        const textContent = `Three Mesh-Ui`.toUpperCase();
        const text = new ThreeMeshUI.Text({
            content: textContent,
        });
        container.add(
            text
        );


        // @Notes : About this example itself,
        // I found it difficult to get started, due to nested scopes of this location.
        // The demo/sample will really start here but the current code breadbrumd is :
        //     makeTextPanel() > callback loader.load() > onAfterUpdate()
        text.onAfterUpdate = function () {
            if (text.children.length > 0) {

                // 1. BOX REFERENCE
                // the idea behind this sample is to provide a second set of uvs for each glyphs
                // we know we will need to set each UVs and for that we need a reference.
                // that reference can be acquired using the boundingBox of the inlineComponent

                // be sure that box is computed before aquiring it
                // @NOTES : `text.children[0]` can currently works because `mergedGeometries`
                text.children[0].geometry.computeBoundingBox();
                // this will return a THREE.Box3
                const bBox = text.children[0].geometry.boundingBox;

                // 2. BOX DIMENSIONS
                // Using the reference THREE.Box3, we can compute
                // the width and the height of the whole geometry
                //    optionally the depth, but we don't need it for that sample
                const geometryW = bBox.max.x - bBox.min.x;
                const geometryH = bBox.max.y - bBox.min.y;
                // const depth = bBox.max.z - bBox.min.z;

                // 3. SECOND UV SET
                // Base on the current vertex position and using
                // geometryW and geometryH previously computed
                const secondUVSetArray = [];

                // loop through each vertices
                const textVerticesArray = text.children[0].geometry.getAttribute('position').array;
                for (let i = 0; i < textVerticesArray.length; i += 3) {

                    const vertX = textVerticesArray[i];
                    const vertY = textVerticesArray[i + 1];

                    //normalized UV
                    secondUVSetArray.push((vertX / geometryW) + 0.5);
                    secondUVSetArray.push((vertY / geometryH) + 0.5);
                }

                // add a second set of UVs as geometry attributes
                // Gemeotry Attributes are automatically passed to vertexShader
                text.children[0].geometry.setAttribute('uvC', new BufferAttribute(new Float32Array(secondUVSetArray), 2));


                // 4. Replace the current fontMaterial shader with a customized one
                text.fontMaterial.uniforms.u_map = { value: textureC };
                text.fontMaterial.uniforms.u_uvCTransform = {value:textureC.matrix};

                text.fontMaterial.vertexShader = `
                    // this vertex shader is globally a copy paste of the three-mesh-ui
                    varying vec2 vUv;
                    attribute vec2 uvC;

                    // additional values
                    uniform mat3 u_uvCTransform;
                    varying vec2 vUvC;



                    #include <clipping_planes_pars_vertex>

                    void main() {

                        vUv = uv;

                        // define vUvC to feed fragment shader
                        vUvC = ( u_uvCTransform * vec3( uvC, 1 ) ).xy;


                        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                        gl_Position = projectionMatrix * mvPosition;
                        gl_Position.z -= 0.00001;

                        #include <clipping_planes_vertex>

                    }
                `;
                text.fontMaterial.fragmentShader = `
                    // this fragment shader is globally a copy paste of the three-mesh-ui
                    uniform sampler2D u_texture;
                    uniform vec3 u_color;
                    uniform float u_opacity;
                    varying vec2 vUv;

                    // additional values
                    varying vec2 vUvC;
                    uniform sampler2D u_map;


                    #include <clipping_planes_pars_fragment>

                    float median(float r, float g, float b) {
                        return max(min(r, g), min(max(r, g), b));
                    }

                    void main() {

                        vec3 textureSample = texture2D( u_texture, vUv ).rgb;
                        float sigDist = median( textureSample.r, textureSample.g, textureSample.b ) - 0.5;
                        float alpha = clamp( sigDist / fwidth( sigDist ) + 0.5, 0.0, 1.0 );
                        alpha = min( alpha, u_opacity );

                        if( alpha < 0.02) discard;

                        // color is now retrieve from texture
                        vec3 color = texture2D( u_map, vUvC).rgb;

                        gl_FragColor = vec4( color , alpha );

                        #include <clipping_planes_fragment>

                    }
                `;


                // 5. If you need to perform texture changes
                // dont forget to update texture matrix
                textureC.repeat.x = 5;
                textureC.repeat.y = 5;
                // textureC.needsUpdate = true;
                textureC.updateMatrix();
            }
        }
    });
};

// handles resizing the renderer when the viewport is resized

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

//

function loop() {

    // Don't forget, ThreeMeshUI must be updated manually.
    // This has been introduced in version 3.0.0 in order
    // to improve performance
    ThreeMeshUI.update();

    controls.update();
    renderer.render(scene, camera);
};
