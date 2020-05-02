
/*
	Job: List the default values of the lib components
	Knows: Nothing
*/

import { MeshBasicMaterial } from 'three';

export default {
	container: null,
	fontFamily: null,
	fontSize: 0.05,
	offset: 0.02,
	interline: 0,
	contentDirection: "column",
	alignContent: "center",
	justifyContent: "start",

	fontMaterial: new MeshBasicMaterial({
		color: 0x003047
	}),

	frameMaterial: new MeshBasicMaterial({
		color: 0x000000,
		side: 2,
		transparent: true,
		opacity: 0.2
	})

};
