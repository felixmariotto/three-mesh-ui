// import { ShaderChunkUI } from 'three-mesh-ui';
import { ShaderChunkUI } from '../../../renderers/shaders/ShaderChunkUI';

export const vertexShader = /* glsl */`
// Would be automatic on three materials and from USE_UV
#ifdef USE_MAP
varying vec2 vUv;
#endif

${ShaderChunkUI.frame_border_pars_vertex}

#include <clipping_planes_pars_vertex>

void main() {

	#ifdef USE_MAP
	vUv = uv;
	#endif

	${ShaderChunkUI.frame_border_vertex}

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;

	#include <clipping_planes_vertex>

}
`

export const fragmentShader = /* glsl */`

// Basic
uniform vec3 diffuse;
uniform float opacity;

#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif

${ShaderChunkUI.frame_common_pars}

${ShaderChunkUI.frame_border_pars_fragment}


#ifdef USE_MAP
varying vec2 vUv;
uniform sampler2D map;
#endif

${ShaderChunkUI.frame_background_pars_fragment}

#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );

	// map
	${ShaderChunkUI.frame_background_fragment}

	${ShaderChunkUI.frame_border_fragment}

	#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

	#endif

	// output
	gl_FragColor = diffuseColor;


	#include <clipping_planes_fragment>
}
`
