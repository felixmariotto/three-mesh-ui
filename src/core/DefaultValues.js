/** List the default values of the lib components */
const _values = {
	fontFamily: null,
	fontSize: 0.05,
	fontKerning: 'normal',
	fontStyle: 'normal',
	fontWeight : '400',
	offset: 0.005,
	lineHeight: 1.2,
	lineBreak: '- ,.:?!\n',// added '\n' to also acts as friendly breaks when white-space:normal
	whiteSpace: 'pre-line',
	flexDirection : 'column',
	justifyContent : 'start',
	alignItems : 'start',
	backgroundImage: null,
	textAlign : 'left',
	boxSizing: 'content-box',
	position: 'static',
	color: 0xff99ff,
	fontColor: 0xffffff,
	fontOpacity: 1,
	opacity: 1,
	fontPXRange: 4,
	fontSupersampling: true,
	fontSmooth: 'antialiased',
	borderRadius: 0,
	borderWidth: 0,
	borderColor: 'black',
	borderOpacity: 1,
	backgroundSize: "cover",
	backgroundColor: 0x222222,
	backgroundOpacity: 0.5,
	overflow: 'visible',
	letterSpacing: 0,
	invertAlpha : false,
	segments: 1
};

/**
 * @param {import('./../core/elements/MeshUIBaseElement').Options} overrideProperties
 */
export const set = function ( overrideProperties ) {

	for ( const property in overrideProperties ) {

		_values[property] = overrideProperties[property];

	}

}

/**
 *
 * @param {string} property
 * @return {any}
 */
export const get = function ( property ) {

	if( !Object.prototype.hasOwnProperty.call( _values, property) ) {

		console.warn( `ThreeMeshUI::DefaultValues is trying to retrieve non-existing property '${property}'`);

	}

	return _values[property];

}
