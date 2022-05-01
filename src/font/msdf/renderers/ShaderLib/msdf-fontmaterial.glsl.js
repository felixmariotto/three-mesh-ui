import msdfAlphaglyphParsVertexGlsl from '../ShaderChunks/msdf-alphaglyph.pars.vertex.glsl';
import msdfOffsetglyphVertexGlsl from '../ShaderChunks/msdf-offsetglyph.vertex.glsl';
import msdfAlphaglyphParsFragmentGlsl from '../ShaderChunks/msdf-alphaglyph.pars.fragment.glsl';
import msdfAlphaglyphFragmentGlsl from '../ShaderChunks/msdf-alphaglyph.fragment.glsl';
import msdfAlphaglyphVertexGlsl from '../ShaderChunks/msdf-alphaglyph.vertex.glsl';

/**
 *
 * @type {string}
 */
export const vertexShader = /* glsl */`
${msdfAlphaglyphParsVertexGlsl}
#include <clipping_planes_pars_vertex>
void main() {
	${msdfAlphaglyphVertexGlsl}
	#include <begin_vertex>
	#include <project_vertex>
	${msdfOffsetglyphVertexGlsl}
	#include <clipping_planes_vertex>
}
`

/**
 *
 * @type {string}
 */
export const fragmentShader = /* glsl */`
uniform vec3 diffuse;
uniform float opacity;
${msdfAlphaglyphParsFragmentGlsl}
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	// instead of <color_fragment> : vec4 diffuseColor
	vec4 diffuseColor = vec4( diffuse, opacity );
	${msdfAlphaglyphFragmentGlsl}
	#include <alphatest_fragment>
	// instead of <output_fragment>
	gl_FragColor = diffuseColor;
	#include <clipping_planes_fragment>
}
`
