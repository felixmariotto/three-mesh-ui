import BaseProperty from './BaseProperty';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import Inline from '../elements/glyphs/Inline';
/* eslint-enable no-unused-vars */

/**
 * @property {Array.<InlineGlyph>} value
 */
export default class InlinesPropertyInlineBlock extends BaseProperty{

	constructor() {

		super( "inlines", null, false );

		/**
		 *
		 * @type {Array.<Inline>}
		 * @internal
		 */
		this._value = [];

	}

	process( element ) {

		// First gets left side
		this._value[0].paddingLeft = element._padding._value.w;
		this._value[0].marginLeft = element._margin._value.w;

		// Last gets right side
		const lastIndex = this._value.length - 1;
		this._value[lastIndex].paddingRight = element._padding._value.y;
		this._value[lastIndex].marginRight = element._margin._value.y;

	}

}
