
/*
	Job: List the default values of the lib components
	Knows: Nothing
*/

import { MeshBasicMaterial } from 'three';

const DEFAULTS = {

	fontMaterial: new MeshBasicMaterial({
		color: 0x003047,
		side: 2
	}),

	frameMaterial: new MeshBasicMaterial({
		color: 0x000000,
		side: 2,
		transparent: true,
		opacity: 0.2
	})

};

export default {
	DEFAULTS
};