const FONT_WEIGHT_LOOK_UP_TABLE = {
	'light'		: '100',
	'normal'	: '400',
	'bold' 		: '700',
	'bolder' 	: '900'
}

/**
 *
 * @param weight
 * @return {string}
 */
export function uniformizeFontWeight( weight ) {

	if( !isNaN(weight) ) return weight.toString();

	const converted = FONT_WEIGHT_LOOK_UP_TABLE[weight];

	if( converted ) return converted;

	return weight;

}
