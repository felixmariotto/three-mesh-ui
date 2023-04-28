/* global global */

import UpdateManager from './components/core/UpdateManager.js';
import FontLibrary from './font/FontLibrary.js';
import { ShaderChunkUI } from './renderers/shaders/ShaderChunkUI';
import TypographicFont from './font/TypographicFont';
import TypographicGlyph from './font/TypographicGlyph';
import InlineGlyph from './font/InlineGlyph';
import MSDFFontMaterialUtils from './font/msdf/utils/MSDFFontMaterialUtils';
import * as DefaultValues from './core/DefaultValues';
import MeshUIBaseElement from './core/elements/MeshUIBaseElement';
import BlockElement from './elements/basic/BlockElement';
import TextElement from './elements/basic/TextElement';
import InlineElement from './elements/basic/InlineElement';
import InlineBlockElement from './elements/basic/InlineBlockElement';
import InheritableProperty from './core/properties/InheritableProperty';
import BaseProperty from './core/properties/BaseProperty';
import * as MaterialTransformers from './utils/mediator/transformers/MaterialTransformers';
import Behavior from './utils/Behavior';
import FontVariant from './font/FontVariant';




const update = () => UpdateManager.update();

const ThreeMeshUI = {
	BaseProperty,
	Block: BlockElement,
	Text : TextElement,
	Inline: InlineElement,
	InlineBlock : InlineBlockElement,
	// Keyboard : KeyboardElement,
	MeshUIBaseElement,
	FontLibrary,
	update,
	MSDFFontMaterialUtils,
	ShaderChunkUI,
	Behavior,
	FontVariant
};


if ( typeof global !== 'undefined' ) global.ThreeMeshUI = ThreeMeshUI;

export { BlockElement as Block };
export { TextElement as Text };
export { InlineElement as Inline };
export { InlineBlockElement as InlineBlock };
export { FontLibrary };
export { update };
export { ShaderChunkUI };
export { MSDFFontMaterialUtils };
export { TypographicFont }
export { TypographicGlyph }
export { InlineGlyph }
export { MeshUIBaseElement }
export { DefaultValues }
export { InheritableProperty }
export { BaseProperty }
export { MaterialTransformers }
export { Behavior }
export { FontVariant }

export default ThreeMeshUI;

// console.warn("ThreeMeshUI v7.1.x - Three "+window.__THREE__)




