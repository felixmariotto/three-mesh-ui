import { ShaderMaterial } from 'three';
import Defaults from '../../utils/Defaults.js';

/**

Job:
- Host the materials of a given component.
- Update a component's materials clipping planes
- When materials attributes are updated, update the material

Knows:
- Its component materials
- Its component ancestors clipping planes

 */
export default function MaterialManager( Base = class {
} ) {

	return class MaterialManager extends Base {

		getBackgroundUniforms() {

			let color, opacity;

			const texture = this.getBackgroundTexture();

			this.tSize.set(
				texture.image.width,
				texture.image.height
			);

			if ( texture.isDefault ) {

				color = this.getBackgroundColor();
				opacity = this.getBackgroundOpacity();

			} else {

				color = this.backgroundColor || Defaults.backgroundWhiteColor;

				opacity = ( !this.backgroundOpacity && this.backgroundOpacity !== 0 ) ?
					Defaults.backgroundOpaqueOpacity :
					this.backgroundOpacity;

			}

			const backgroundMapping = ( () => {

				switch ( this.getBackgroundSize() ) {
					case 'stretch':
						return 0;
					case 'contain':
						return 1;
					case 'cover':
						return 2;

				}

			} )();

			return {
				texture,
				color,
				opacity,
				backgroundMapping,
				borderRadius: this.getBorderRadius(),
				borderWidth: this.getBorderWidth(),
				borderColor: this.getBorderColor(),
				borderOpacity: this.getBorderOpacity(),
				size: this.size,
				tSize: this.tSize
			};

		}

		/** Update existing backgroundMaterial uniforms */
		updateBackgroundMaterial() {

			if ( this.backgroundUniforms ) {

				const uniforms = this.getBackgroundUniforms();

				this.backgroundUniforms.u_texture.value = uniforms.texture;
				this.backgroundUniforms.u_color.value = uniforms.color;
				this.backgroundUniforms.u_opacity.value = uniforms.opacity;
				this.backgroundUniforms.u_backgroundMapping.value = uniforms.backgroundMapping;
				this.backgroundUniforms.u_size.value = uniforms.size;
				this.backgroundUniforms.u_tSize.value = uniforms.tSize;

				if ( Array.isArray( uniforms.borderRadius ) ) {

					this.backgroundUniforms.u_borderRadiusTopLeft.value = uniforms.borderRadius[ 0 ];
					this.backgroundUniforms.u_borderRadiusTopRight.value = uniforms.borderRadius[ 1 ];
					this.backgroundUniforms.u_borderRadiusBottomRight.value = uniforms.borderRadius[ 2 ];
					this.backgroundUniforms.u_borderRadiusBottomLeft.value = uniforms.borderRadius[ 3 ];

				} else {

					this.backgroundUniforms.u_borderRadiusTopLeft.value = uniforms.borderRadius;
					this.backgroundUniforms.u_borderRadiusTopRight.value = uniforms.borderRadius;
					this.backgroundUniforms.u_borderRadiusBottomRight.value = uniforms.borderRadius;
					this.backgroundUniforms.u_borderRadiusBottomLeft.value = uniforms.borderRadius;

				}

				this.backgroundUniforms.u_borderWidth.value = uniforms.borderWidth;
				this.backgroundUniforms.u_borderColor.value = uniforms.borderColor;
				this.backgroundUniforms.u_borderOpacity.value = uniforms.borderOpacity;

			}

		}

		/** Update existing fontMaterial uniforms */
		updateTextMaterial() {

			if ( this.textUniforms ) {

				this.textUniforms.u_texture.value = this.getFontTexture();
				this.textUniforms.u_color.value = this.getFontColor();
				this.textUniforms.u_opacity.value = this.getFontOpacity();
				this.textUniforms.u_pxRange.value = this.getFontPXRange();
				this.fontMaterial.u_useRGSS = this.getFontSupersampling();

			}

		}

		/**
		 * Update a component's materials clipping planes.
		 * Called every frame
		 */
		updateClippingPlanes( value ) {

			const newClippingPlanes = value !== undefined ? value : this.getClippingPlanes();

			if ( JSON.stringify( newClippingPlanes ) !== JSON.stringify( this.clippingPlanes ) ) {

				this.clippingPlanes = newClippingPlanes;

				if ( this.fontMaterial ) this.fontMaterial.clippingPlanes = this.clippingPlanes;

				if ( this.backgroundMaterial ) this.backgroundMaterial.clippingPlanes = this.clippingPlanes;

			}

		}

		/** Called by Block, which needs the background material to create a mesh */
		getBackgroundMaterial() {

			const newUniforms = this.getBackgroundUniforms();

			if ( !this.backgroundMaterial || !this.backgroundUniforms ) {

				this.backgroundMaterial = this._makeBackgroundMaterial( newUniforms );

				return this.backgroundMaterial;

			}

			let borderRadiusChanged;
			if ( Array.isArray( newUniforms.borderRadius ) ) {

				borderRadiusChanged = (
					newUniforms.borderRadius[ 0 ] !== this.backgroundUniforms.u_borderRadiusTopLeft.value ||
					newUniforms.borderRadius[ 1 ] !== this.backgroundUniforms.u_borderRadiusTopRight.value ||
					newUniforms.borderRadius[ 2 ] !== this.backgroundUniforms.u_borderRadiusBottomRight.value ||
					newUniforms.borderRadius[ 3 ] !== this.backgroundUniforms.u_borderRadiusBottomLeft.value
				);

			} else {

				borderRadiusChanged = (
					newUniforms.borderRadius !== this.backgroundUniforms.u_borderRadiusTopLeft.value ||
					newUniforms.borderRadius !== this.backgroundUniforms.u_borderRadiusTopRight.value ||
					newUniforms.borderRadius !== this.backgroundUniforms.u_borderRadiusBottomRight.value ||
					newUniforms.borderRadius !== this.backgroundUniforms.u_borderRadiusBottomLeft.value
				);

			}

			if (
				newUniforms.texture !== this.backgroundUniforms.u_texture.value ||
				newUniforms.color !== this.backgroundUniforms.u_color.value ||
				newUniforms.opacity !== this.backgroundUniforms.u_opacity.value ||
				newUniforms.backgroundMapping !== this.backgroundUniforms.u_backgroundMapping.value ||
				borderRadiusChanged ||
				newUniforms.borderWidth !== this.backgroundUniforms.u_borderWidth.value ||
				newUniforms.borderColor !== this.backgroundUniforms.u_borderColor.value ||
				newUniforms.borderOpacity !== this.backgroundUniforms.u_borderOpacity.value ||
				newUniforms.size !== this.backgroundUniforms.u_size.value ||
				newUniforms.tSize !== this.backgroundUniforms.u_tSize.value
			) {

				this.updateBackgroundMaterial();

			}

			return this.backgroundMaterial;

		}

		/** Called by Text to get the font material */
		getFontMaterial() {

			const newUniforms = {
				'u_texture': this.getFontTexture(),
				'u_color': this.getFontColor(),
				'u_opacity': this.getFontOpacity(),
				'u_pxRange': this.getFontPXRange(),
				'u_useRGSS': this.getFontSupersampling()
			};

			if ( !this.fontMaterial || !this.textUniforms ) {

				this.fontMaterial = this._makeTextMaterial( newUniforms );

			} else if (
				newUniforms.u_texture !== this.textUniforms.u_texture.value ||
				newUniforms.u_color !== this.textUniforms.u_color.value ||
				newUniforms.u_opacity !== this.textUniforms.u_opacity.value ||
				newUniforms.u_pxRange !== this.textUniforms.u_pxRange.value ||
				newUniforms.u_useRGSS !== this.textUniforms.u_useRGSS.value
			) {

				this.updateTextMaterial();

			}

			return this.fontMaterial;

		}

		/** @private */
		_makeTextMaterial( materialOptions ) {

			this.textUniforms = {
				'u_texture': { value: materialOptions.u_texture },
				'u_color': { value: materialOptions.u_color },
				'u_opacity': { value: materialOptions.u_opacity },
				'u_pxRange': { value: materialOptions.u_pxRange },
				'u_useRGSS': { value: materialOptions.u_useRGSS }
			};

			return new ShaderMaterial( {
				uniforms: this.textUniforms,
				transparent: true,
				clipping: true,
				vertexShader: textVertex,
				fragmentShader: textFragment,
				extensions: {
					derivatives: true
				}
			} );

		}

		/** @private */
		_makeBackgroundMaterial( materialOptions ) {

			this.backgroundUniforms = {
				'u_texture': { value: materialOptions.texture },
				'u_color': { value: materialOptions.color },
				'u_opacity': { value: materialOptions.opacity },
				'u_backgroundMapping': { value: materialOptions.backgroundMapping },
				'u_borderWidth': { value: materialOptions.borderWidth },
				'u_borderColor': { value: materialOptions.borderColor },
				'u_borderRadiusTopLeft': { value: 0 },
				'u_borderRadiusTopRight': { value: 0 },
				'u_borderRadiusBottomRight': { value: 0 },
				'u_borderRadiusBottomLeft': { value: 0 },
				'u_borderOpacity': { value: materialOptions.borderOpacity },
				'u_size': { value: materialOptions.size },
				'u_tSize': { value: materialOptions.tSize }
			};

			if ( Array.isArray( materialOptions.borderRadius ) ) {

				this.backgroundUniforms[ 'u_borderRadiusTopLeft' ].values = materialOptions.borderRadius[ 0 ];
				this.backgroundUniforms[ 'u_borderRadiusTopRight' ].values = materialOptions.borderRadius[ 1 ];
				this.backgroundUniforms[ 'u_borderRadiusBottomRight' ].values = materialOptions.borderRadius[ 2 ];
				this.backgroundUniforms[ 'u_borderRadiusBottomLeft' ].values = materialOptions.borderRadius[ 3 ];

			} else {

				this.backgroundUniforms[ 'u_borderRadiusTopLeft' ].values = materialOptions.borderRadius;
				this.backgroundUniforms[ 'u_borderRadiusTopRight' ].values = materialOptions.borderRadius;
				this.backgroundUniforms[ 'u_borderRadiusBottomRight' ].values = materialOptions.borderRadius;
				this.backgroundUniforms[ 'u_borderRadiusBottomLeft' ].values = materialOptions.borderRadius;

			}

			return new ShaderMaterial( {
				uniforms: this.backgroundUniforms,
				transparent: true,
				clipping: true,
				vertexShader: backgroundVertex,
				fragmentShader: backgroundFragment,
				extensions: {
					derivatives: true
				}
			} );

		}

	};

}

////////////////
// Text shaders
////////////////

const textVertex = `
	varying vec2 vUv;

	#include <clipping_planes_pars_vertex>

	void main() {

		vUv = uv;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;
		gl_Position.z -= 0.00001;

		#include <clipping_planes_vertex>

	}
`;

//

const textFragment = `
	uniform sampler2D u_texture;
	uniform vec3 u_color;
	uniform float u_opacity;
    uniform float u_pxRange;
    uniform bool u_useRGSS;

	varying vec2 vUv;

	#include <clipping_planes_pars_fragment>

    // functions from the original msdf repo:
    // https://github.com/Chlumsky/msdfgen#using-a-multi-channel-distance-field

	float median(float r, float g, float b) {
		return max(min(r, g), min(max(r, g), b));
	}

    float screenPxRange() {
        vec2 unitRange = vec2(u_pxRange)/vec2(textureSize(u_texture, 0));
        vec2 screenTexSize = vec2(1.0)/fwidth(vUv);
        return max(0.5*dot(unitRange, screenTexSize), 1.0);
    }

    float tap(vec2 offsetUV) {
        vec3 msd = texture( u_texture, offsetUV ).rgb;
        float sd = median(msd.r, msd.g, msd.b);
        float screenPxDistance = screenPxRange() * (sd - 0.5);
        float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
        return alpha;
    }

    void main() {

        float alpha;

        if ( u_useRGSS ) {

            // shader-based supersampling based on https://bgolus.medium.com/sharper-mipmapping-using-shader-based-supersampling-ed7aadb47bec
            // per pixel partial derivatives
            vec2 dx = dFdx(vUv);
            vec2 dy = dFdy(vUv);

            // rotated grid uv offsets
            vec2 uvOffsets = vec2(0.125, 0.375);
            vec2 offsetUV = vec2(0.0, 0.0);

            // supersampled using 2x2 rotated grid
            alpha = 0.0;
            offsetUV.xy = vUv + uvOffsets.x * dx + uvOffsets.y * dy;
            alpha += tap(offsetUV);
            offsetUV.xy = vUv - uvOffsets.x * dx - uvOffsets.y * dy;
            alpha += tap(offsetUV);
            offsetUV.xy = vUv + uvOffsets.y * dx - uvOffsets.x * dy;
            alpha += tap(offsetUV);
            offsetUV.xy = vUv - uvOffsets.y * dx + uvOffsets.x * dy;
            alpha += tap(offsetUV);
            alpha *= 0.25;

        } else {

            alpha = tap( vUv );

        }


        // apply the opacity
        alpha *= u_opacity;

        // this is useful to avoid z-fighting when quads overlap because of kerning
        if ( alpha < 0.02) discard;


        gl_FragColor = vec4( u_color, alpha );

        #include <clipping_planes_fragment>
    }

`;

//////////////////////
// Background shaders
//////////////////////

const backgroundVertex = `
	varying vec2 vUv;

	#include <clipping_planes_pars_vertex>

	void main() {

		vUv = uv;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;

		#include <clipping_planes_vertex>

	}
`;

//

const backgroundFragment = `
	uniform sampler2D u_texture;
	uniform vec3 u_color;
	uniform float u_opacity;

    uniform float u_borderRadiusTopLeft;
    uniform float u_borderRadiusTopRight;
    uniform float u_borderRadiusBottomLeft;
    uniform float u_borderRadiusBottomRight;
    uniform float u_borderWidth;
    uniform vec3 u_borderColor;
    uniform float u_borderOpacity;
    uniform vec2 u_size;
    uniform vec2 u_tSize;
    uniform int u_backgroundMapping;

	varying vec2 vUv;

	#include <clipping_planes_pars_fragment>

    float getEdgeDist() {
        vec2 ndc = vec2( vUv.x * 2.0 - 1.0, vUv.y * 2.0 - 1.0 );
        vec2 planeSpaceCoord = vec2( u_size.x * 0.5 * ndc.x, u_size.y * 0.5 * ndc.y );
        vec2 corner = u_size * 0.5;
        vec2 offsetCorner = corner - abs( planeSpaceCoord );
        float innerRadDist = min( offsetCorner.x, offsetCorner.y ) * -1.0;
        if (vUv.x < 0.5 && vUv.y >= 0.5) {
            float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusTopLeft, 0.0 ) ) - u_borderRadiusTopLeft;
            float s = step( innerRadDist * -1.0, u_borderRadiusTopLeft );
            return mix( innerRadDist, roundedDist, s );
        }
        if (vUv.x >= 0.5 && vUv.y >= 0.5) {
            float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusTopRight, 0.0 ) ) - u_borderRadiusTopRight;
            float s = step( innerRadDist * -1.0, u_borderRadiusTopRight );
            return mix( innerRadDist, roundedDist, s );
        }
        if (vUv.x >= 0.5 && vUv.y < 0.5) {
            float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusBottomRight, 0.0 ) ) - u_borderRadiusBottomRight;
            float s = step( innerRadDist * -1.0, u_borderRadiusBottomRight );
            return mix( innerRadDist, roundedDist, s );
        }
        if (vUv.x < 0.5 && vUv.y < 0.5) {
            float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusBottomLeft, 0.0 ) ) - u_borderRadiusBottomLeft;
            float s = step( innerRadDist * -1.0, u_borderRadiusBottomLeft );
            return mix( innerRadDist, roundedDist, s );
        }
    }

    vec4 sampleTexture() {
        float textureRatio = u_tSize.x / u_tSize.y;
        float panelRatio = u_size.x / u_size.y;
        vec2 uv = vUv;
        if ( u_backgroundMapping == 1 ) { // contain
            if ( textureRatio < panelRatio ) { // repeat on X
                float newX = uv.x * ( panelRatio / textureRatio );
                newX += 0.5 - 0.5 * ( panelRatio / textureRatio );
                uv.x = newX;
            } else { // repeat on Y
                float newY = uv.y * ( textureRatio / panelRatio );
                newY += 0.5 - 0.5 * ( textureRatio / panelRatio );
                uv.y = newY;
            }
        } else if ( u_backgroundMapping == 2 ) { // cover
            if ( textureRatio < panelRatio ) { // stretch on Y
                float newY = uv.y * ( textureRatio / panelRatio );
                newY += 0.5 - 0.5 * ( textureRatio / panelRatio );
                uv.y = newY;
            } else { // stretch on X
                float newX = uv.x * ( panelRatio / textureRatio );
                newX += 0.5 - 0.5 * ( panelRatio / textureRatio );
                uv.x = newX;
            }
        }
        return texture2D( u_texture, uv ).rgba;
    }

	void main() {

        float edgeDist = getEdgeDist();
        float change = fwidth( edgeDist );

		vec4 textureSample = sampleTexture();
        vec3 blendedColor = textureSample.rgb * u_color;

        float alpha = smoothstep( change, 0.0, edgeDist );
        float blendedOpacity = u_opacity * textureSample.a * alpha;

        vec4 frameColor = vec4( blendedColor, blendedOpacity );

        if ( u_borderWidth <= 0.0 ) {
            gl_FragColor = frameColor;
        } else {
            vec4 borderColor = vec4( u_borderColor, u_borderOpacity * alpha );
            float stp = smoothstep( edgeDist + change, edgeDist, u_borderWidth * -1.0 );
            gl_FragColor = mix( frameColor, borderColor, stp );
        }

		#include <clipping_planes_fragment>
	}
`;
