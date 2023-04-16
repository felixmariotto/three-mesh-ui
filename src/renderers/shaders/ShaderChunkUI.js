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

/**
 * @typedef {Object} ChunksUI
 * @property msdf_alphaglyph_vertex {string}
 * @property frame_border_fragment {string}
 * @property frame_background_pars_fragment {string}
 * @property frame_common_pars {string}
 * @property msdf_alphaglyph_pars_vertex {string}
 * @property frame_border_pars_fragment {string}
 * @property msdf_offset_vertex {string}
 * @property frame_border_pars_vertex {string}
 * @property msdf_alphaglyph_pars_fragment {string}
 * @property frame_border_vertex {string}
 * @property frame_background_fragment {string}
 * @property msdf_alphaglyph_fragment {string}
 */


export const ShaderChunkUI = {
	msdfAlphaglyphParsVertexGlsl,
	msdfAlphaglyphVertexGlsl,
	msdfOffsetglyphVertexGlsl,
	msdfAlphaglyphParsFragmentGlsl,
	msdfAlphaglyphFragmentGlsl,
	frameBorderParsVertexGlsl,
	frameBorderVertexGlsl,
	frameCommonParsFragmentGlsl,
	frameBorderParsFragmentGlsl,
	frameBorderFragmentGlsl,
	frameBackgroundParsFragmentGlsl,
	frameBackgroundFragmentGlsl,
};
/* eslint-enable camelcase */
