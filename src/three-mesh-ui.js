import MeshUIComponent from './core/MeshUIComponent';
import Block from './components/Block';
import Paragraph from './components/Paragraph';
import Text from './components/Text';

const ThreeMeshUI = {
	MeshUIComponent,
	Block,
	Paragraph,
	Text
};

global.ThreeMeshUI = ThreeMeshUI;

export { MeshUIComponent }
export { Block }
export { Paragraph }
export { Text }
export default ThreeMeshUI