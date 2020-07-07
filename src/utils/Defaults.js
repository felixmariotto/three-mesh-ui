
import { Color } from 'three/src/math/Color.js';
import { CanvasTexture } from 'three/src/textures/CanvasTexture.js';

/** List the default values of the lib components */
export default {
	container: null,
	fontFamily: null,
	fontSize: 0.05,
	offset: 0.01,
	interLine: 0.01,
	breakOn: '- ,.:?!',
	contentDirection: "column",
	alignContent: "center",
	justifyContent: "start",
	fontTexture: null,
	textType: "MSDF",
	fontColor: new Color( 0xffffff ),
	fontOpacity: 1,
	borderRadius: 0.015,
	backgroundSize: "cover",
	backgroundColor: new Color( 0x222222 ),
	backgroundOpacity: 0.8,
	backgroundTexture: DefaultBackgroundTexture(),
	hiddenOverflow: false,
};

//

function DefaultBackgroundTexture() {

	const ctx = document.createElement('canvas').getContext('2d');
	ctx.canvas.width = 1;
	ctx.canvas.height = 1;
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, 1, 1);
	return new CanvasTexture(ctx.canvas);

};
