import Block from './components/Block';
import Text from './components/Text';
import Keyboard from './components/Keyboard';
import {UpdateManager, update} from './components/core/UpdateManager';

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