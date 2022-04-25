import msdfAlphaglyphVertexGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl';
import msdfAlphaglyphFragmentGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl';
import msdfAlphaglyphParsFragmentGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl';
import msdfAlphaglyphParsVertexGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl';
import msdfOffsetglyphVertexGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl';

/* eslint-disable camelcase */
export const ShaderChunk = {
	msdf_alphaglyph_pars_vertex : msdfAlphaglyphParsVertexGlsl,
	msdf_alphaglyph_vertex : msdfAlphaglyphVertexGlsl,
	msdf_offset_vertex : msdfOffsetglyphVertexGlsl,
	msdf_alphaglyph_pars_fragment : msdfAlphaglyphParsFragmentGlsl,
	msdf_alphaglyph_fragment : msdfAlphaglyphFragmentGlsl
}
/* eslint-enable camelcase */
