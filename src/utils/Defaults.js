import { Color, Vector4 } from 'three';
import { START as justifyContent } from "./block-layout/JustifyContent";
import { CENTER as alignItems } from "./block-layout/AlignItems";
import { COLUMN as contentDirection } from './block-layout/ContentDirection';
import { CENTER as textAlign } from './inline-layout/TextAlign';
import { PRE_LINE as whiteSpace } from './inline-layout/Whitespace';
import { NORMAL as fontWeight } from './font/FontWeight';
import { NORMAL as fontStyle } from './font/FontStyle';


/** List the default values of the lib components */
export default {
	container: null,
	fontFamily: null,
	fontSize: 0.05,
	fontKerning: 'normal', // FontKerning would act like css : "none"|"normal"|"auto"("auto" not yet implemented)
	fontStyle,
	fontWeight,
	bestFit: 'none',
	offset: 0.01,
	interLine: 0.01,
	breakOn: '- ,.:?!\n',// added '\n' to also acts as friendly breaks when white-space:normal
	whiteSpace,
	contentDirection,
	alignItems,
	justifyContent,
	fontTexture: null,
	textAlign,
	fontColor: new Color( 0xffffff ),
	fontOpacity: 1,
	fontPXRange: 4,
	fontSupersampling: true,
	borderRadius: new Vector4( 0.01,0.01,0.01, 0.01 ),
	borderWidth: new Vector4( 0, 0, 0, 0 ),
	borderColor: new Color( 'black' ),
	borderOpacity: 1,
	backgroundSize: "cover",
	backgroundColor: new Color( 0x222222 ),
	backgroundWhiteColor: new Color( 0xffffff ),
	backgroundOpacity: 0.8,
	backgroundOpaqueOpacity: 1.0,
	// this default value is a function to avoid initialization issues (see issue #126)
	// backgroundTexture: makeBackgroundTexture,
	backgroundTexture: null,
	hiddenOverflow: false,
	letterSpacing: 0
};
