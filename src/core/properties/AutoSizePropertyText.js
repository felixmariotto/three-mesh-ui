import BaseProperty from './BaseProperty';

/**
 * Autosize are only trigger when natural size changed
 */
export default class AutoSizePropertyText extends BaseProperty {

	constructor() {

		super( 'autosize' );

	}

	process( element ) {

		if( element._layouter._value && element._layouter._value.length ) {

			const lines = element._layouter._value;

			// as this is from children offsetWidth, it means parent innerWidth
			const padding = element._padding._value;
			const border = element._borderWidth._value;

			// has auto size get the height from children
			if ( element._width._auto ) {

				element._bounds.setOffsetWidth( element, lines.width + padding.w + padding.y + border.w + border.y );

			}

			if ( element._height._auto ) {

				element._bounds.setOffsetHeight( element, lines.height + padding.x + padding.z + border.x + border.z );

			}

		}

	}

}
