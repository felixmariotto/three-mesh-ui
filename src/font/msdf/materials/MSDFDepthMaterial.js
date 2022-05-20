/* eslint-disable no-unused-vars */
import { Material, ShaderMaterial } from 'three';
/* eslint-enable no-unused-vars */

import { MeshDepthMaterial, RGBADepthPacking } from 'three';
import MSDFFontMaterialUtils from '../utils/MSDFFontMaterialUtils';

export default class MSDFDepthMaterial extends MeshDepthMaterial {

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a mediation for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(target:any, targetProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return MSDFFontMaterialUtils.mediation;

	}

	constructor( options = {} ) {

		// ensure the proper depthPacking
		options.depthPacking = RGBADepthPacking;
		// three-mesh-ui font material requires
		// some material options to be set as default
		// in order to work properly
		MSDFFontMaterialUtils.ensureMaterialOptions( options );
		delete options['transparent'];

		super( options );

		// three-mesh-ui font material requires
		// some webgl preprocessor to be set
		// in order to work properly
		MSDFFontMaterialUtils.ensureDefines( this );

		// three-mesh-ui font material requires
		// some userData properties to be set
		// in order to work properly
		MSDFFontMaterialUtils.ensureUserData( this, options );

		// three-mesh-ui custom font material can be achieve
		// by modifying the shader before its compilation
		this.onBeforeCompile = shader => {

			MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );
			MSDFFontMaterialUtils.injectShaderChunks( shader );

		}

	}

}
