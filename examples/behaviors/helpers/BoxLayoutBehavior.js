import { Mesh, MeshBasicMaterial, PlaneBufferGeometry, Texture, Vector4 } from 'three';
import Behavior from '../../../src/utils/Behavior';

export default class BoxLayoutBehavior extends Behavior{

	/**
	 *
	 * @param {MeshUIComponent} subject
	 */
	constructor( subject ) {

		super( subject );

		/**
		 *
		 * @type {Mesh<PlaneGeometry, BoxLayoutMaterial>}
		 * @private
		 */
		this._overlay = new Mesh(
			new PlaneBufferGeometry(1,1),
			new BoxLayoutMaterial({map:new Texture(),opacity:0.8, transparent:true}) );

		this._overlay.position.z = 0.0001;

	}

	attach() {

		this._subject.add (this._overlay);
		this._subject.addAfterUpdate( this.act );
		this.act();

	}

	detach() {

		this._subject.remove( this._overlay );
		this._subject.removeAfterUpdate( this.act );

	}

	act = () => {

		const margin = this._subject._margin._value;
		const border = this._subject._borderWidth._value;
		const padding = this._subject._padding._value;

		const offsetWidth = this._subject._bounds._offsetWidth + margin.w + margin.y;
		const offsetHeight = this._subject._bounds._offsetHeight + margin.x + margin.z;

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

	}

	clear() {

		this._overlay.geometry.dispose();
		this._overlay.material.dispose();

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

const paddingColorParsFragment = /* glsl */`
uniform vec4 margin;
uniform vec4 border;
uniform vec4 padding;
`


const paddingColorFragment = /* glsl */`
if( vUv.x < padding.w || vUv.x > padding.y || vUv.y > padding.x || vUv.y < padding.z ) {
	diffuseColor = vec4( 0.76, 0.815, 0.545, opacity );
}else{
	diffuseColor.a = 0.02;
}

if( vUv.x < border.w || vUv.x > border.y || vUv.y > border.x || vUv.y < border.z ) {
	diffuseColor = vec4( 0.992, 0.86, 0.588, opacity );
}

if( vUv.x < margin.w || vUv.x > margin.y || vUv.y > margin.x || vUv.y < margin.z ) {
	diffuseColor = vec4( 0.98, 0.8, 0.592, opacity );
}

if( diffuseColor.a < 0.03 ) discard;

`
