
/*
	Job: List the default values of the lib components
	Knows: Nothing
*/

import { MeshBasicMaterial } from 'three';

const DEFAULTS = {

	fontMaterial: new MeshBasicMaterial({
		color: 0x006699,
		side: 2
	})



};

export default {
	DEFAULTS
};