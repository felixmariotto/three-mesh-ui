import { MeshBasicMaterial } from 'three';
import FrameMaterialUtils from '../../../src/frame/utils/FrameMaterialUtils';

export default class FrameBasicMaterial extends MeshBasicMaterial {


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

		//ensure options
		FrameMaterialUtils.ensureMaterialOptions( options );

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
