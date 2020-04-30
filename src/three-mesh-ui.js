import MeshUIComponent from './core/MeshUIComponent';
import Block from './components/Block';
import Paragraph from './components/Paragraph';

const ThreeMeshUI = {
	MeshUIComponent,
	Block,
	Paragraph
};

global.ThreeMeshUI = ThreeMeshUI;

export { MeshUIComponent }
export { Block }
export { Paragraph }
export default ThreeMeshUI