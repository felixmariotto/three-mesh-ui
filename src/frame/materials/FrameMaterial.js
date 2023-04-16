import { Color, FrontSide, ShaderMaterial, Vector2, Vector3, Vector4 } from 'three';
import { fragmentShader, vertexShader } from '../renderers/ShaderLib/framematerial.glsl';
import FrameMaterialUtils from '../utils/FrameMaterialUtils';

export default class FrameMaterial extends ShaderMaterial {


	/**
	 * This static method is mandatory for extending ThreeMeshUI.FrameMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {FrameMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(frameMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return FrameMaterialUtils.mediation;

	}

	constructor() {
		super ( {
			uniforms: {
				alphaTest: { value: 0.02 },
				map: { value: null },
				diffuse: { value: new Color(0xffffff) },
				opacity: { value: 1.0 },
				borderColor: { value: new Color(0x000000) },
				borderOpacity: { value: 0 },
				borderRadius: { value: new Vector4(0,0,0,0) },
				// Corners for customized radius not all starting on center [0.5,0.5];
				// Corners will be generated from borderRadiuses
				cornerTL: { value : new Vector2(0,1) },
				cornerTR: { value : new Vector2(1,1) },
				cornerBR: { value : new Vector2(1,0) },
				cornerBL: { value : new Vector2(0,0) },
				borderWidth: { value: new Vector4(0,0,0,0) },

				frameSize: { value: new Vector3( 1, 1, 1 ) },
				textureSize: { value: new Vector2( 1, 1 ) }
			},
			side: FrontSide,
			transparent: true,
			clipping: true,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			extensions: {
				derivatives: true
			}
		} );

		// webgl preprocessor AlphaTest set by default
		this.defines[ 'USE_ALPHATEST' ] = '';
		this.needsUpdate = true;
	}

	set map( value ) {

		this.uniforms.map.value = value;
		if( !value ) {

			if( this.defines['USE_UV'] !== undefined ) {

				delete this.defines['USE_UV'];
				this.needsUpdate = true;

			}

		} else if( this.defines['USE_UV'] === undefined ) {

			this.defines['USE_UV'] = '';
			this.needsUpdate = true;

		}

		this.needsUpdate = true;

	}

	get map(){
		return this.uniforms.map.value;
	}

	/**
	 *
	 * @returns {number}
	 */
	get alphaTest() {

		return this.uniforms.alphaTest.value;

	}



	/**
	 *
	 * @param {number} v
	 */
	set alphaTest( v ) {
		this.uniforms.alphaTest.value = v;
	}

	/**
	 *
	 * @param {number} v
	 */
	set opacity( v ) {

		if( this.uniforms )
			this.uniforms.opacity.value = v;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {number}
	 */
	get opacity() {

		return this.uniforms.opacity.value;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {Color}
	 */
	get color() {

		return this.uniforms.diffuse.value;

	}

	/**
	 *
	 * @param {Color} v
	 */
	set color( v ) {

		this.uniforms.diffuse.value = v;

	}

}
