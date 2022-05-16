import msdfAlphaglyphVertexGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl';
import msdfAlphaglyphFragmentGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl';
import msdfAlphaglyphParsFragmentGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl';
import msdfAlphaglyphParsVertexGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl';
import msdfOffsetglyphVertexGlsl from '../../font/msdf/renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl';
import frameBorderParsVertexGlsl from '../../frame/renderers/ShaderChunk/frame-border.pars.vertex.glsl';
import frameBorderVertexGlsl from '../../frame/renderers/ShaderChunk/frame-border.vertex.glsl';
import frameBorderParsFragmentGlsl from '../../frame/renderers/ShaderChunk/frame-border.pars.fragment.glsl';
import frameBorderFragmentGlsl from '../../frame/renderers/ShaderChunk/frame-border.fragment.glsl';
import frameCommonParsFragmentGlsl from '../../frame/renderers/ShaderChunk/frame-common.pars.fragment.glsl';
import frameBackgroundParsFragmentGlsl from '../../frame/renderers/ShaderChunk/frame-background.pars.fragment.glsl';
import frameBackgroundFragmentGlsl from '../../frame/renderers/ShaderChunk/frame-background.fragment.glsl';


/* eslint-disable camelcase */
export const ShaderChunkUI = {
	msdf_alphaglyph_pars_vertex: msdfAlphaglyphParsVertexGlsl,
	msdf_alphaglyph_vertex: msdfAlphaglyphVertexGlsl,
	msdf_offset_vertex: msdfOffsetglyphVertexGlsl,
	msdf_alphaglyph_pars_fragment: msdfAlphaglyphParsFragmentGlsl,
	msdf_alphaglyph_fragment: msdfAlphaglyphFragmentGlsl,
	frame_border_pars_vertex: frameBorderParsVertexGlsl,
	frame_border_vertex: frameBorderVertexGlsl,
	frame_common_pars: frameCommonParsFragmentGlsl,
	frame_border_pars_fragment: frameBorderParsFragmentGlsl,
	frame_border_fragment: frameBorderFragmentGlsl,
	frame_background_pars_fragment: frameBackgroundParsFragmentGlsl,
	frame_background_fragment: frameBackgroundFragmentGlsl,
};
/* eslint-enable camelcase */
