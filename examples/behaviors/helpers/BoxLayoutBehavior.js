import { Mesh, MeshBasicMaterial, Plane, PlaneBufferGeometry, Texture, Vector2, Vector4 } from 'three';
import FrameMaterialUtils from '../../../src/frame/utils/FrameMaterialUtils';
import { ShaderChunkUI } from 'three-mesh-ui';

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
			new LayoutMaterial({map:new Texture(),opacity:0.8, transparent:true}) );
		this.overlay.position.z = 0.0005;

		reference.add (this.overlay);

		reference.addAfterUpdate( () => {

			const ratio = {
				x : reference.width/reference.getOffsetWidth(),
				y : reference.height/reference.getOffsetHeight(),
			}
			this.overlay.scale.set( reference.getOffsetWidth(), reference.getOffsetHeight(), 1);
			this.overlay.material.userData.padding.value.set(
				1 - reference._padding.x * ratio.y,
				1 - reference._padding.y * ratio.x,
				reference._padding.z * ratio.y,
				reference._padding.w * ratio.x
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
`


const paddingColorFragment = /* glsl */`
if( vUv.x < padding.w || vUv.x > padding.y || vUv.y > padding.x || vUv.y < padding.z ) {
	diffuseColor = vec4( 0.76, 0.815, 0.545, opacity );
}else{
	diffuseColor.a = 0.03;
}

`
