/* global global */

import Block from './components/Block.js';
import Text from './components/Text.js';
import InlineBlock from './components/InlineBlock.js';
import Keyboard from './components/Keyboard.js';
import UpdateManager from './components/core/UpdateManager.js';

const update = () => UpdateManager.update()

const ThreeMeshUI = {
	Block,
	Text,
	InlineBlock,
	Keyboard,
	update,
};

if (global) global.ThreeMeshUI = ThreeMeshUI;

export { Block }
export { Text }
export { InlineBlock }
export { Keyboard }
export { update }

export default ThreeMeshUI
