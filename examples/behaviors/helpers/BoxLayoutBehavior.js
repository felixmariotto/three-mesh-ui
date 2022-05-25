import { Mesh, MeshBasicMaterial, PlaneBufferGeometry, Texture, Vector4 } from 'three';

export default class BoxLayoutBehavior {

	/**
	 *
	 * @param {MeshUIComponent} reference
	 * @param {Array.<MeshUIComponent|Mesh|Object3D>|MeshUIComponent|Mesh|Object3D} targets
	 * @param {"uv","uv2","uvG"} uvSet
	 */
	constructor( reference ) {

		this.overlay = new Mesh(
			new PlaneBufferGeometry(1,1),
			new LayoutMaterial({map:new Texture(),opacity:1, transparent:true}) );

		// This value should be obtained from offsetZ value of elements;
		this.overlay.position.z = 0.0005;

		reference.add (this.overlay);

		reference.addAfterUpdate( () => {

			const offsetWidth = reference.getOffsetWidth();
			const offsetHeight = reference.getOffsetHeight();
			const padding = reference._padding;
			const border = reference._borderWidth;

			this.overlay.scale.set( offsetWidth, offsetHeight, 1);

			this.overlay.material.userData.border.value.set(
				1 - border.x / offsetHeight,
				1 - border.y / offsetWidth,
				border.z / offsetHeight,
				border.w / offsetWidth
			);


			this.overlay.material.userData.padding.value.set(
				1 - ( border.x + padding.x ) / offsetHeight,
				1 - ( border.y + padding.y ) / offsetWidth,
					( border.z + padding.z ) / offsetHeight,
					( border.w + padding.w ) / offsetWidth
			);

		});

	}

}

class LayoutMaterial extends MeshBasicMaterial{

	constructor(options = {}) {
		super(options);

		this.userData.padding = { value: new Vector4(0,0,0,0) };
		this.userData.margin = { value: new Vector4(0,0,0,0) };
		this.userData.border = { value: new Vector4(0,0,0,0) };

		this.onBeforeCompile = shader => {

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
uniform vec4 padding;
uniform vec4 border;
`


const paddingColorFragment = /* glsl */`
if( vUv.x < padding.w || vUv.x > padding.y || vUv.y > padding.x || vUv.y < padding.z ) {
	diffuseColor = vec4( 0.76, 0.815, 0.545, opacity );
}else{
	diffuseColor.a = 0.03;
}

if( vUv.x < border.w || vUv.x > border.y || vUv.y > border.x || vUv.y < border.z ) {
	diffuseColor = vec4( 0.992, 0.86, 0.588, opacity );
}

`
