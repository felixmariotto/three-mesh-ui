/* global global */

import Block from './components/Block.js';
import Text from './components/Text.js';
import InlineBlock from './components/InlineBlock.js';
import Keyboard from './components/Keyboard.js';
import UpdateManager from './components/core/UpdateManager.js';
import FontLibrary from './components/core/FontLibrary.js';

const update = () => UpdateManager.update();

const ThreeMeshUI = {
	Block,
	Text,
	InlineBlock,
	Keyboard,
	FontLibrary,
	update,
};

if ( typeof global !== 'undefined' ) global.ThreeMeshUI = ThreeMeshUI;

export { Block };
export { Text };
export { InlineBlock };
export { Keyboard };
export { FontLibrary };
export { update };

export default ThreeMeshUI;
