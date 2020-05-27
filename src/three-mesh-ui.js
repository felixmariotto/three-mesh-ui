import Block from './components/Block.js';
import Text from './components/Text.js';
import Keyboard from './components/Keyboard.js';
import {UpdateManager, update} from './components/core/UpdateManager.js';

const ThreeMeshUI = {
	Block,
	Text,
	Keyboard,
	update
};

global.ThreeMeshUI = ThreeMeshUI;

export { Block }
export { Text }
export { Keyboard }
export { UpdateManager }

export default ThreeMeshUI