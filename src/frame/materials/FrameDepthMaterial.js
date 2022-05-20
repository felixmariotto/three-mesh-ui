import { MeshDepthMaterial, RGBADepthPacking } from 'three';
import FrameMaterialUtils from '../utils/FrameMaterialUtils';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import { ShaderMaterial } from 'three';
/* eslint-enable no-unused-vars */

export default class FrameDepthMaterial extends MeshDepthMaterial {


	/**
	 * This static method is mandatory for extending ThreeMeshUI.FrameMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {FrameMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(frameMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return FrameMaterialUtils.mediation;

	}

	constructor( options = {} ) {

		// ensure the proper depthPacking
		options.depthPacking = RGBADepthPacking;

		//ensure options
		FrameMaterialUtils.ensureMaterialOptions( options );
		delete options['transparent'];

		super( options );

		FrameMaterialUtils.ensureDefines( this );

		FrameMaterialUtils.ensureUserData( this, options );

		// override the shaders
		this.onBeforeCompile = shader => {

			// links this material userDatas with its uniforms
			FrameMaterialUtils.bindUniformsWithUserData( shader, this );

			// inject ThreeMeshUI shaderChunks to provide msdf rendering
			FrameMaterialUtils.injectShaderChunks( shader );

		}

	}

}
