/**

Job: nothing yet, but adding a isInline parameter to an inline component

Knows: parent dimensions

 */
export default function InlineComponent( Base = class {
} ) {

	return class InlineComponent extends Base {

		constructor( options ) {

			super( options );

			this.isInline = true;

		}

	};
}
