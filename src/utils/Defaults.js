
import { Color } from 'three';
import { CanvasTexture } from 'three';

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
	borderRadius: 0.01,
	borderWidth: 0,
	borderColor: new Color( 'black' ),
	backgroundSize: "cover",
	backgroundColor: new Color( 0x222222 ),
	backgroundWhiteColor: new Color( 0xffffff ),
	backgroundOpacity: 0.8,
	backgroundOpaqueOpacity: 1.0,
	backgroundTexture: DefaultBackgroundTexture(),
	hiddenOverflow: false,
	letterSpacing: 0
};

//

function DefaultBackgroundTexture() {

	const ctx = document.createElement('canvas').getContext('2d');
	ctx.canvas.width = 1;
	ctx.canvas.height = 1;
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, 1, 1);
	const texture = new CanvasTexture(ctx.canvas);
	texture.isDefault = true;
	return texture;

}
