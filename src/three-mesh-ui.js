/* global global */

import Block from './components/Block.js';
import Text from './components/Text.js';
import InlineBlock from './components/InlineBlock.js';
import Keyboard from './components/Keyboard.js';
import UpdateManager from './components/core/UpdateManager.js';
import FontLibrary from './font/FontLibrary.js';
import * as TextAlign from './utils/inline-layout/TextAlign';
import * as Whitespace from './utils/inline-layout/Whitespace';
import * as JustifyContent from './utils/block-layout/JustifyContent';
import * as AlignItems from './utils/block-layout/AlignItems';
import * as ContentDirection from './utils/block-layout/ContentDirection';
import MSDFFontMaterialUtils from './font/msdf/utils/MSDFFontMaterialUtils';
import { ShaderChunk } from './renderers/shaders/ShaderChunk';

const update = () => UpdateManager.update();

const ThreeMeshUI = {
	Block,
	Text,
	InlineBlock,
	Keyboard,
	FontLibrary,
	update,
	TextAlign,
	Whitespace,
	JustifyContent,
	AlignItems,
	ContentDirection,
	MSDFFontMaterialUtils,
	ShaderChunk,
};


if ( typeof global !== 'undefined' ) global.ThreeMeshUI = ThreeMeshUI;

export { Block };
export { Text };
export { InlineBlock };
export { Keyboard };
export { FontLibrary };
export { update };
export { TextAlign };
export { Whitespace };
export { JustifyContent};
export { AlignItems };
export { ContentDirection };
export { ShaderChunk };
export { MSDFFontMaterialUtils };

export default ThreeMeshUI;
