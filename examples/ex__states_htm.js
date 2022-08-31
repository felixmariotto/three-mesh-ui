// xfg:title States HTM
// xfg:category extend

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as HyperThreeMesh from 'three-mesh-ui/examples/hyperthreemesh/HyperThreeMesh';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

const vrStyleSheet = document.createElement('style');
vrStyleSheet.setAttribute('media','three-mesh-ui');
vrStyleSheet.textContent = `

:root{
	width: auto;
	padding: 0.2rem;
	background-color: rgba( 0, 0, 0, 0 );
	borderRadius: 0.01rem;
	align-items: center;
	flex-direction : row;
	justify-content: center;
}

.item-container{
	width: auto;
	padding: 0.05rem;
	flex-direction: column;
	background-color : rgba(0,0,0,0);
}

.item {
	width: 0.6rem;
	height: 0.5rem;
	margin: 0.02rem;
	text-align: center;
	align-items: center;
	background-color: rgba(0,0,0,0);
	flex-direction: column;
}

.item__title {
	width: 0.6rem;
	height: 0.08rem;
	justify-content: center;
	text-align: center;
	height: 0.075;
	background-color: rgba(128,128,128,0.2);
}

.item__inner-container {
	flex-direction: row;
	justify-content: space-evenly;
	width: 0.55rem;
	height: 0.4rem;
	background-color: rgba(0,0,0,0);
}

.color-block{
	width: 0.25rem;
	height: 0.35rem;
}

.legend {
	padding: 0.05rem;
	margin: 0.05rem;
	flex-direction: column;
	background-color: rgba(0,0,0,0.25);
	justify-content: space-between;
	align-items: center;
}

.legend .bp-content {
	height : 0.085rem;
	justify-content: center;
	align-items: center;
	margin: 0.0125rem;
	background-color: rgba(48,48,48,0.5);
	color: rgba(150,150,150,1);
	border-radius : 0.01rem;
	padding-left : 0.02rem;
}


.legend .info-text{
	margin-top: 0.05rem;
	text-align: justify;
  justify-content: end;
  background-color: rgba( 0,0,0,0 );
	font-size: 0.032rem;
}




@media ( max-width: 767px ){

	:root{ width: 1rem; }

	.bp-content.bp--0{ background-color: rgba(0,255,32,0.8); color: rgba(255,255,255,1) }

	.item-container{ padding:0; }
	.item{ width: 0.38rem; height: 0.38rem; flex-direction: column; box-sizing:content-box; padding: 0.045rem; background-color : rgba(0,0,0,0.25); }
	.item__inner-container{ flex-direction: column; height: 0.25rem; }
	.item__title { width: 0.35rem; }
	.color-block { width: 0.35rem; height: 0.1rem; }

}

@media ( min-width: 768px ){

	.item-container{ padding:0.1rem; }
	.bp-content.bp--1{ background-color: rgba(0,255,32,0.8); color: rgba(255,255,255,1); }

}

@media ( min-width: 1024px ){

	.bp-content.bp--2{ background-color: rgba(0,255,32,0.8); color: rgba(255,255,255,1); }

	.item-container {	flex-direction: row; padding:0.15rem; }

	.item { flex-direction: column-reverse; width: 0.37rem; }
	.item__title { width: 0.35rem; }
	.item__inner-container{ width: 0.3rem; }
	.color-block { width: 0.13rem; height: 0.3rem; }

}

@media ( min-width: 1200px ){

	.bp-content.bp--3{ background-color: rgba(0,255,32,0.8); color: rgba(255,255,255,1); }

	.item { width: 0.6rem; height: 0.5rem; }

	.item__title { width: 0.6rem; height: 0.08rem; }

	.item__inner-container { width: 0.55rem; height: 0.4rem; }

	.color-block{ width: 0.25rem; height: 0.35rem; }
}

@media ( min-width: 1600px ){

	.bp-content.bp--4{ background-color: rgba(0,255,32,0.8); color: rgba(255,255,255,1); }

	.item { width: 0.75rem; }

}



`;
document.head.appendChild( vrStyleSheet );

window.addEventListener("load", init);
window.addEventListener("resize", onWindowResize);

let container, stats;
//

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x505050);

  camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);
  renderer.xr.enabled = true;
  document.body.appendChild(VRButton.createButton(renderer));
  document.body.appendChild(renderer.domElement);

	stats = new Stats();
	document.body.appendChild( stats.dom );

  controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 1.6, 0);
  controls.target = new THREE.Vector3(0, 1, -1.8);
  controls.update();

  // ROOM

  const room = new THREE.LineSegments(
    new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0),
    new THREE.LineBasicMaterial({ color: 0x808080 })
  );

  scene.add(room);

  // TEXT PANEL

  makeTextPanel();

  //

  renderer.setAnimationLoop(loop);
}

//

function makeTextPanel() {
  container = HyperThreeMesh.createElement('div', {
		name: "rootBlock",
    padding: 0.025,
    fontFamily: FontJSON,
    fontTexture: FontImage,
    fontColor: new THREE.Color(0xffffff),
  });

  container.position.set(0, 1, -1.8);
  // Three-mesh-ui element directly placed in scene, will have the pseudo class :root
	scene.add(container);

  //

  const itemContainer = HyperThreeMesh.createElement('div', {
		name: 'i-cont',
		textAlign: "left",
		backgroundOpacity: 1
	});

	itemContainer.classList.add( 'item-container' );


	for ( let i = 0; i < 3; i++ ) {
		const item = HyperThreeMesh.createElement('div', {height: 0.5, width: 0.5});
		item.classList.add( 'item' );

		const itemTitle = HyperThreeMesh.createElement('h1',{content:'Item '+(i+1)});
		itemTitle.classList.add('item__title');

		const innerContainer = HyperThreeMesh.createElement('div',{height: 0.5, width: 0.5,});
		innerContainer.classList.add('item__inner-container');

		const block1 = HyperThreeMesh.createElement('div',{height: 0.1,
			width: 0.1,backgroundColor:new THREE.Color(0x00ff99)});
			block1.classList.add('color-block');
		const block2 = HyperThreeMesh.createElement('div',{height: 0.1,
			width: 0.1,backgroundColor:new THREE.Color(0x0099ff)});
		block2.classList.add('color-block');

		item.add( itemTitle, innerContainer );

		innerContainer.add( block1, block2 );

		itemContainer.add( item );

	}

	container.add( itemContainer );

	// legend

	const legend = HyperThreeMesh.createElement('div',{backgroundColor:new THREE.Color(0x00ff99)});
	legend.classList.add('legend');

	const legendTitleBlock = HyperThreeMesh.createElement('p',{height: 0.1, width: 0.65, justifyContent:'center', textContent:'ACTIVE BREAKPOINTS :', textAlign: 'center'});
	legend.add( legendTitleBlock );

	const bps = ['max-width: 767px','min-width:768px','min-width:1024px','min-width:1280px', 'min-width:1600px'];
	for ( let i = 0; i < bps.length; i++ ) {

		const bpBlock = HyperThreeMesh.createElement('button',{height: 0.5, width: 0.5,textContent:bps[i]});
		bpBlock.classList.add('bp-content', 'bp--'+i);
		legend.add( bpBlock );

	}


	const infoText = HyperThreeMesh.createElement('p',{height: 'auto', width: 0.6,content:"All the responsiveness in this POC comes FROM css side. You can also use the devTool:source to edit the innerText of the three-mesh-ui." });
	infoText.classList.add( 'info-text' );

	legend.add( infoText );

	container.add( legend );

	HyperThreeMesh.loadSheets( "three-mesh-ui", true );


}

//

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function loop() {
  // Don't forget, ThreeMeshUI must be updated manually.
  // This has been introduced in version 3.0.0 in order
  // to improve performance
  ThreeMeshUI.update();
	HyperThreeMesh.update();

  controls.update();
  renderer.render(scene, camera);

	stats.update();
}
