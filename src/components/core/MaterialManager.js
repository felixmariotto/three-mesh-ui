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
		getFontMaterial,
		updateClippingPlanes
	}

};

//

function getBackgroundMaterial() {

	this.backgroundMaterial = DEFAULTS.backgroundMaterial.clone();

	this.updateClippingPlanes();

	return this.backgroundMaterial

};

//

function getFontMaterial() {

	const newUniforms = {
		u_texture: this.getFontTexture(),
		u_color: this.getFontColor(),
		u_opacity: this.getFontOpacity()
	};

	if ( newUniforms.u_texture !== textUniforms.u_texture.value ||
		 newUniforms.u_color !== textUniforms.u_color.value ||
		 newUniforms.u_opacity !== textUniforms.u_opacity.value ) {

		this.fontMaterial = makeShaderMaterial.call( this, newUniforms );

	};

	this.updateClippingPlanes();

	return this.fontMaterial

};

//

function updateClippingPlanes() {

	const newClippingPlanes = this.getClippingPlanes();

	if ( JSON.stringify(newClippingPlanes) !== JSON.stringify(this.clippingPlanes) ) {

		this.clippingPlanes = newClippingPlanes;

		if ( this.fontMaterial ) this.fontMaterial.clippingPlanes = this.clippingPlanes;

		if ( this.backgroundMaterial ) this.backgroundMaterial.clippingPlanes = this.clippingPlanes;

	};

};

//

function makeShaderMaterial( materialOptions ) {

	textUniforms.u_texture.value = materialOptions.u_texture;
	textUniforms.u_color.value = materialOptions.u_color;
	textUniforms.u_opacity.value = materialOptions.u_opacity;

	/*
	setInterval( ()=> {
		textUniforms.u_color.value.set( 0xffffff * Math.random() );
	}, 100 )
	*/

	return new ShaderMaterial({
		uniforms: textUniforms,
		transparent: true,
		clipping: true,
		vertexShader: textVertex,
		fragmentShader: textFragment
	});

};

////////////////
// Text shaders
////////////////

const textUniforms = {
	u_texture: { value: undefined },
	u_color: { value: undefined },
	u_opacity: { value: undefined }
};

//

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
`;