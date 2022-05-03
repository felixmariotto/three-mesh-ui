import { MeshNormalMaterial } from 'three';
import * as ThreeMeshUI from 'three-mesh-ui';

/**
 * Example of enabling MeshNormalMaterial to render ThreeMeshUI MSDF Texts
 */
export default class MSDFNormalMaterial extends MeshNormalMaterial{


	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.fontMaterialProperties}
	 * @override
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get fontMaterialProperties() {

		return ThreeMeshUI.MSDFFontMaterialUtils.fontMaterialProperties;

	}

	constructor( options = {} ) {

		ThreeMeshUI.MSDFFontMaterialUtils.ensureMaterialOptions( options );

		super( options );

		ThreeMeshUI.MSDFFontMaterialUtils.ensureDefines( this );

		ThreeMeshUI.MSDFFontMaterialUtils.ensureUserData( this, options );

		this.onBeforeCompile = shader => {

			ThreeMeshUI.MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );

			ThreeMeshUI.MSDFFontMaterialUtils.injectVertexShaderChunks( shader );


			// Manually add fragments chunks
			// MeshNormalMaterial differ from other materials,
			// so MSDFFontMaterialUtils.injectFragmentShaderChunks() won't apply here

			//fragment pars
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <normalmap_pars_fragment>',
				`#include <normalmap_pars_fragment>
vec4 diffuseColor;
uniform float alphaTest;
${ThreeMeshUI.ShaderChunkUI.msdf_alphaglyph_pars_fragment}`
			);

			// fragment
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <normal_fragment_maps>',
				`#include <normal_fragment_maps>
diffuseColor = vec4( packNormalToRGB( normal ), opacity );
${ThreeMeshUI.ShaderChunkUI.msdf_alphaglyph_fragment}`
			);

			// output
			shader.fragmentShader = shader.fragmentShader.replace(
				'gl_FragColor = vec4( packNormalToRGB( normal ), opacity );',
				`if( diffuseColor.a < alphaTest ) discard;
                gl_FragColor = diffuseColor;`
			)

		}

	}

}
