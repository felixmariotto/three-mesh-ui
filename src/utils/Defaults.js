
/*
	Job: List the default values of the lib components
	Knows: Nothing
*/

import { MeshBasicMaterial, Color } from 'three';

export default {
	container: null,
	fontFamily: null,
	fontSize: 0.05,
	offset: 0.01,
	interline: 0.01,
	breakOn: '- ',
	contentDirection: "column",
	alignContent: "center",
	justifyContent: "start",
	fontTexture: null,
	textType: "MSDF",
	fontColor: new Color( 0xffffff ),
	fontOpacity: 1,
	borderRadius: 0.015,
	backgroundSize: "contain",

	fontMaterial: new MeshBasicMaterial({
		color: 0xffffff
	}),

	backgroundMaterial: new MeshBasicMaterial({
		color: 0x000000,
		side: 2,
		transparent: true,
		opacity: 0.4
	})

};
