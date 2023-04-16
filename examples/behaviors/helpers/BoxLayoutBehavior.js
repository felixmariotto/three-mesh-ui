import { BufferAttribute, Mesh, MeshBasicMaterial, PlaneGeometry, RepeatWrapping, Texture, TextureLoader, Vector4 } from 'three';
import { Behavior } from 'three-mesh-ui';


export default class BoxLayoutBehavior extends Behavior{

	/**
	 *
	 * @param {MeshUIBaseElement} subject
	 * @param {Function|null}onTextureLoadedCallback
	 *
	 */
	constructor( subject, onTextureLoadedCallback = null ) {

		super( subject );

		const geometry = new PlaneGeometry( 1, 1 );

		// Add additional uv for borders computations by copying initial uv
		const uvB = new BufferAttribute( new Float32Array( geometry.getAttribute('uv').array ), 2);
		geometry.setAttribute('uvB', uvB ).name = 'uvB';

		/**
		 *
		 * @type {Mesh<PlaneGeometry, BoxLayoutMaterial>}
		 * @private
		 */
		this._overlay = new Mesh(
			geometry,
			new BoxLayoutMaterial({map:new Texture(),opacity:1, transparent:true}) );

		new TextureLoader().load( "https://threejs.org/examples/textures/uv_grid_opengl.jpg", (texture) => {

			this._texture = texture;
			this._texture.matrixAutoUpdate = true;
			this._texture.wrapS = this._texture.wrapT = RepeatWrapping;
			this._overlay.material.map = this._texture;

			this.act();

			if( onTextureLoadedCallback ) {
				onTextureLoadedCallback( texture );
			}

		});

		this._overlay.position.z = 0.0001;

		this._actor = this.act.bind( this );

	}

	attach() {

		this._subject.add (this._overlay);
		this._subject.addAfterUpdate( this._actor );
		this.act();

	}

	detach() {

		this._subject.remove( this._overlay );
		this._subject.removeAfterUpdate( this._actor );

	}

	act () {

		const margin = this._subject._margin._value;
		const border = this._subject._borderWidth._value;
		const padding = this._subject._padding._value;

		const offsetWidth = this._subject._bounds._offsetWidth + margin.w + margin.y;
		const offsetHeight = this._subject._bounds._offsetHeight + margin.x + margin.z;

		if( offsetWidth === 0 || offsetHeight === 0 ) return;

		this._overlay.scale.set( offsetWidth, offsetHeight, 1);

		this._overlay.position.x = - margin.w / 2 + margin.y / 2;
		this._overlay.position.y = - margin.z / 2 + margin.x / 2;

		this._overlay.material.userData.margin.value.set(
			1 - margin.x / offsetHeight,
			1 - margin.y / offsetWidth,
			margin.z / offsetHeight,
			margin.w / offsetWidth
		);

		this._overlay.material.userData.border.value.set(
			1 - ( margin.x + border.x ) / offsetHeight,
			1 - ( margin.y + border.y ) / offsetWidth,
			( margin.z + border.z ) / offsetHeight,
			( margin.w + border.w ) / offsetWidth
		);


		this._overlay.material.userData.padding.value.set(
			1 - ( margin.x + border.x + padding.x ) / offsetHeight,
			1 - ( margin.y + border.y + padding.y ) / offsetWidth,
			( margin.z + border.z + padding.z ) / offsetHeight,
			( margin.w + border.w + padding.w ) / offsetWidth
		);


		if( !this._texture ) return;

		this._texture.repeat.set(
			offsetWidth,
			offsetHeight
		);

		this._texture.offset.set(
			1 - ( margin.w + border.w + padding.w ),
			- ( margin.z + border.z + padding.z )
		);

	}

	clear() {

		this._overlay.geometry.dispose();
		this._overlay.material.dispose();

	}

	set color( v ) {
		this._overlay.material.color.set( v );
	}

}

class BoxLayoutMaterial extends MeshBasicMaterial{

	constructor(options = {}) {
		super(options);

		this.userData.padding = { value: new Vector4(0,0,0,0) };
		this.userData.margin = { value: new Vector4(0,0,0,0) };
		this.userData.border = { value: new Vector4(0,0,0,0) };

		this.onBeforeCompile = shader => {

			shader.uniforms.margin = this.userData.margin;
			shader.uniforms.padding = this.userData.padding;
			shader.uniforms.border = this.userData.border;

			shader.vertexShader = shader.vertexShader.replace(
				'#include <uv_pars_vertex>',
				'#include <uv_pars_vertex>\n' + paddingColorParsVertex
			);

			shader.vertexShader = shader.vertexShader.replace(
				'#include <uv_vertex>',
				'#include <uv_vertex>\n' + paddingColorVertex
			)

			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <uv_pars_fragment>',
				'#include <uv_pars_fragment>\n' + paddingColorParsFragment
			)

			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <alphamap_fragment>',
				'#include <alphamap_fragment>\n' + paddingColorFragment
			)

		}

	}

}

// const pars vertex
const paddingColorParsVertex = /* glsl */`
attribute vec2 uvB;
varying vec2 vUvB;
`

const paddingColorVertex = /* glsl */`
vUvB = uvB;
`

const paddingColorParsFragment = /* glsl */`
varying vec2 vUvB;

uniform vec4 margin;
uniform vec4 border;
uniform vec4 padding;
`


const paddingColorFragment = /* glsl */`
if( vUvB.x < padding.w || vUvB.x > padding.y || vUvB.y > padding.x || vUvB.y < padding.z ) {
	diffuseColor = vec4( 0.76, 0.815, 0.545, opacity );
}else{

	// greyscale
	// float biggerColorComponent = diffuseColor.x;
	// biggerColorComponent = max( biggerColorComponent, diffuseColor.y );
	// biggerColorComponent = max( biggerColorComponent, diffuseColor.z );
	// diffuseColor.xyz = vec3( biggerColorComponent );

	diffuseColor.a = 1.;
}

if( vUvB.x < border.w || vUvB.x > border.y || vUvB.y > border.x || vUvB.y < border.z ) {
	diffuseColor = vec4( 0.992, 0.86, 0.588, opacity );
}

if( vUvB.x < margin.w || vUvB.x > margin.y || vUvB.y > margin.x || vUvB.y < margin.z ) {
	diffuseColor = vec4( 0.98, 0.8, 0.592, opacity );
}

if( diffuseColor.a < 0.03 ) discard;

`
