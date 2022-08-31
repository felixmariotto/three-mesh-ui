import { DataTexture, MeshToonMaterial, RedFormat } from 'three';
import { MSDFFontMaterialUtils } from 'three-mesh-ui';

/**
 * Example of enabling MeshLambertMaterial to render ThreeMeshUI MSDF Texts
 */
export default class MSDFToonMaterial extends MeshToonMaterial {

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @override
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return MSDFFontMaterialUtils.mediation;

	}


	constructor( options = {} ) {

		// be sure transparent and alphaTest are set
		MSDFFontMaterialUtils.ensureMaterialOptions( options );

		// Automatically generate a gradient map if not provided
		if( !options.gradientMap ) {

			// Use the webgl2 format, unless format is defined
			const format = options.format ? options.format : RedFormat;
			// const format = options.format ? options.format : LuminanceFormat;

			const granularity = options.tones ? options.tones : 8;

			const colors = new Uint8Array( granularity );
			for ( let c = 0; c <= colors.length; c++ ) {

				colors[ c ] = ( c / colors.length ) * 256;

			}

			const gradientMap = new DataTexture( colors, colors.length, 1, format );
			gradientMap.needsUpdate = true;

			options.gradientMap = gradientMap;

		}

		// build this material
		super( options );

		// ensure this material support webgl preprocessors
		MSDFFontMaterialUtils.ensureDefines( this );

		// ensure this material has the proper userData properties (api for uniforms)
		MSDFFontMaterialUtils.ensureUserData( this, options );

		// override the shaders
		this.onBeforeCompile = shader => {

			// links this material userDatas with its uniforms
			MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );

			// inject ThreeMeshUI shaderChunks to provide msdf rendering
			MSDFFontMaterialUtils.injectShaderChunks( shader );

		}

	}

}
