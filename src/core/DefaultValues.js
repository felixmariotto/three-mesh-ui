/** List the default values of the lib components */
const _values = {
	fontFamily: null,
	fontSize: 0.05,
	fontKerning: 'normal',
	fontStyle: 'normal',
	fontWeight : 'normal',
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
	color: 0xffffff,
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
	backgroundColor: 0x000000,
	backgroundOpacity: 0,
	overflow: 'visible',
	letterSpacing: 0,
	invertAlpha : false,
	segments: 1,
	backgroundSide : 0, //FrontSide
	backgroundAlphaTest: 0.02,
	fontSide: 0, // FrontSide
	fontAlphaTest: 0.02,
	padding: 0,
	margin: 0,
	verticalAlign: "baseline"
};

const _blocks = {

};

const _inlines = {
	fontStyle: 'inherit',
	fontWeight: 'inherit',
	color: 'inherit'
}

const _registry = {
	default: _values,
	block: _blocks,
	inline : _inlines
}

/**
 * @param {import('./../core/elements/MeshUIBaseElement').Options} overrideProperties
 * @param [type='default']
 */
export const set = function ( overrideProperties , type = 'default' ) {

	const values = _registry[type] || _registry.default;

	for ( const property in overrideProperties ) {

		values[property] = overrideProperties[property];

	}

}

/**
 *
 * @param {string} property
 * @return {any}
 */
export const get = function ( property, type = 'default' ) {

	const values = _registry[type] ? {..._values,..._registry[type]} : {..._registry.default};

	if( !property ) return values;

	if( !Object.prototype.hasOwnProperty.call( values, property) ) {

		console.warn( `ThreeMeshUI::DefaultValues is trying to retrieve non-existing property '${property}'`);

	}

	return values[property];

}
