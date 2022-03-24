/* global global */

import Block from './components/Block.js';
import Text from './components/Text.js';
import InlineBlock from './components/InlineBlock.js';
import Keyboard from './components/Keyboard.js';
import UpdateManager from './components/core/UpdateManager.js';
import FontLibrary from './components/core/FontLibrary.js';
import * as textAlign from './utils/TextAlign';
import * as whiteSpace from './utils/Whitespace';

const update = () => UpdateManager.update();

const ThreeMeshUI = {
	Block,
	Text,
	InlineBlock,
	Keyboard,
	FontLibrary,
	update,
	textAlign,
	whiteSpace,
};

if ( typeof global !== 'undefined' ) global.ThreeMeshUI = ThreeMeshUI;

export { Block };
export { Text };
export { InlineBlock };
export { Keyboard };
export { FontLibrary };
export { update };
export { textAlign };
export { whiteSpace };

export default ThreeMeshUI;
