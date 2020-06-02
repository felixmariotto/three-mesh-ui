/*

Job: - Host the materials of a given component.
	 - Keep track of the material clippingPlanes parameters
	 - When materials attributes are updated, update the material
	 - When parents update their dimensions, update clippingPlanes

Knows: - Its component and all its parents
	   - Its component material
	   - Its component's anscestors' dimension

*/

import { MeshBasicMaterial } from 'three';

import { ShaderMaterial } from 'three/src/materials/ShaderMaterial.js';

import DEFAULTS from '../../utils/Defaults.js';

//

export default function MaterialManager() {

	return {
		getBackgroundMaterial,
		getFontMaterial
	}

};

//

function getBackgroundMaterial() {

	this.backgroundMaterial = DEFAULTS.backgroundMaterial.clone();

	addClippingPlanesTo( this.backgroundMaterial, this );

	return this.backgroundMaterial

};

//

function getFontMaterial() {

	this.fontMaterial = makeShader.call( this );

	addClippingPlanesTo( this.fontMaterial, this );

	return this.fontMaterial

};

//

function addClippingPlanesTo( material, component ) {

	const planes = component.getPlanes();

	planes.forEach( (plane)=> {

		plane.applyMatrix4( component.parent.matrixWorld );

	});

	material.clippingPlanes = planes;

};

//

function makeShader() {

	return new ShaderMaterial({
		uniforms: {
			u_texture: { value: this.getFontTexture() },
			u_color: { value: this.getFontColor() },
			u_opacity: { value: this.getFontOpacity() }
		},
		transparent: true,
		clipping: true,
		vertexShader: VertexShader(),
		fragmentShader: FragmentShader(),
	});

};

////////////////
// MSDF shaders
////////////////

function VertexShader() {

	return `
		varying vec2 vUv;

		#include <clipping_planes_pars_vertex>

		void main() {

			vUv = uv;
			vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * mvPosition;
			gl_Position.z-= 0.005;

			#include <clipping_planes_vertex>

		}
	`

};

// returns an MSDF fragment shader with the right font color and opacity

function FragmentShader() {

	return `
		#ifdef GL_OES_standard_derivatives
		#extension GL_OES_standard_derivatives : enable
		#endif

		uniform sampler2D u_texture;
		uniform vec3 u_color;
		uniform float u_opacity;

		varying vec2 vUv;

		#include <clipping_planes_pars_fragment>

		float median(float r, float g, float b) {
			return max(min(r, g), min(max(r, g), b));
		}

		void main() {

			vec3 sample = texture2D( u_texture, vUv ).rgb;
			float sigDist = median( sample.r, sample.g, sample.b ) - 0.5;
			float alpha = clamp( sigDist / fwidth( sigDist ) + 0.5, 0.0, 1.0 );
			gl_FragColor = vec4( u_color, min( alpha, u_opacity ) );
		
			#include <clipping_planes_fragment>

		}
	`

};
