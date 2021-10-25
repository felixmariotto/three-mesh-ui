/**

Job: nothing yet, but adding a isInline parameter to an inline component

Knows: parent dimensions

@template {!Constructor} T
@param {T} Base

*/
export default function InlineComponent( Base ) {

    return class InlineComponent extends Base {

        isInline = true;

    }
}
