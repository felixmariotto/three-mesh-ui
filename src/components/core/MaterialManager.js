
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
export default function MaterialManager( Base = class {} ) {

	return class MaterialManager extends Base {

        getBackgroundUniforms() {

            const texture = this.getBackgroundTexture();

            let color, opacity

            if ( texture.isDefault ) {

                color = this.getBackgroundColor();
                opacity = this.getBackgroundOpacity();

            } else {

                color = this.backgroundColor || Defaults.backgroundWhiteColor;

                opacity = ( !this.backgroundOpacity && this.backgroundOpacity !== 0 ) ?
                    Defaults.backgroundOpaqueOpacity :
                    this.backgroundOpacity;

            }

            return {
                texture,
                color,
                opacity
            }

        }

        /** Update existing backgroundMaterial uniforms */
        updateBackgroundMaterial() {

            if ( this.backgroundUniforms ) {

                const uniforms = this.getBackgroundUniforms();

                this.backgroundUniforms.u_texture.value = uniforms.texture;
                this.backgroundUniforms.u_color.value = uniforms.color;
                this.backgroundUniforms.u_opacity.value = uniforms.opacity;

            }

        }

        /** Update existing fontMaterial uniforms */
        updateTextMaterial() {

            if ( this.textUniforms ) {

                this.textUniforms.u_texture.value = this.getFontTexture();
                this.textUniforms.u_color.value = this.getFontColor();
                this.textUniforms.u_opacity.value = this.getFontOpacity();

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

            } else if (
                newUniforms.texture !== this.backgroundUniforms.u_texture.value ||
                newUniforms.color !== this.backgroundUniforms.u_color.value ||
                newUniforms.opacity !== this.backgroundUniforms.u_opacity.value
            ) {

                this.updateBackgroundMaterial();

            }

            return this.backgroundMaterial

        }

        /** Called by Text to get the font material */
        getFontMaterial() {

            const newUniforms = {
                'u_texture': this.getFontTexture(),
                'u_color': this.getFontColor(),
                'u_opacity': this.getFontOpacity()
            };

            if ( !this.fontMaterial || !this.textUniforms ) {

                this.fontMaterial = this._makeTextMaterial( newUniforms );

            } else if (
                newUniforms.u_texture !== this.textUniforms.u_texture.value ||
                newUniforms.u_color !== this.textUniforms.u_color.value ||
                newUniforms.u_opacity !== this.textUniforms.u_opacity.value
            ) {

                this.updateTextMaterial();

            }

            return this.fontMaterial

        }

        /** @private */
        _makeTextMaterial( materialOptions ) {

            this.textUniforms = {
                'u_texture': { value: materialOptions.u_texture },
                'u_color': { value: materialOptions.u_color },
                'u_opacity': { value: materialOptions.u_opacity }
            }

            /*
            setInterval( ()=> {
                this.textUniforms.u_color.value.set( 0xffffff * Math.random() );
            }, 100 )
            */

            return new ShaderMaterial({
                uniforms: this.textUniforms,
                transparent: true,
                clipping: true,
                vertexShader: textVertex,
                fragmentShader: textFragment
            })

        }

        /** @private */
        _makeBackgroundMaterial( materialOptions ) {

            this.backgroundUniforms = {
                'u_texture': { value: materialOptions.texture },
                'u_color': { value: materialOptions.color },
                'u_opacity': { value: materialOptions.opacity }
            };

            /*
            setInterval( ()=> {
                this.backgroundUniforms.u_color.value.set( 0xffffff * Math.random() );
            }, 100 )
            */

            return new ShaderMaterial({
                uniforms: this.backgroundUniforms,
                transparent: true,
                clipping: true,
                vertexShader: backgroundVertex,
                fragmentShader: backgroundFragment
            })

        }

	}

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
		gl_Position.z-= 0.005;

		#include <clipping_planes_vertex>

	}
`;

//

const textFragment = `
	uniform sampler2D u_texture;
	uniform vec3 u_color;
	uniform float u_opacity;

	varying vec2 vUv;

	#include <clipping_planes_pars_fragment>

	float median(float r, float g, float b) {
		return max(min(r, g), min(max(r, g), b));
	}

	void main() {

		vec3 textureSample = texture2D( u_texture, vUv ).rgb;
		float sigDist = median( textureSample.r, textureSample.g, textureSample.b ) - 0.5;
		float alpha = clamp( sigDist / fwidth( sigDist ) + 0.5, 0.0, 1.0 );
		gl_FragColor = vec4( u_color, min( alpha, u_opacity ) );
	
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

	varying vec2 vUv;

	#include <clipping_planes_pars_fragment>

	void main() {

		vec4 textureSample = texture2D( u_texture, vUv ).rgba;

        float blendedOpacity = u_opacity * textureSample.a;

        vec3 blendedColor = textureSample.rgb * u_color;

		gl_FragColor = vec4( blendedColor, blendedOpacity );
	
		#include <clipping_planes_fragment>

	}
`;
