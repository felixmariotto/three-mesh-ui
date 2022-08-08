/**
 * This regex can isolate string parts of css queries
 * 		ie: `.my-class[data-foo="foobar is a string segment"]`
 *
 * @type RegExp
 */
export const STRING_SEGMENTS_REGEX: RegExp;
/**
 * This regex can split a CSS Combinator and the following query segment
 * @see https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators
 *
 * @type RegExp
 */
export const CSS_COMBINATORS_MATCH_REGEX: RegExp;
/**
 * This regex isolates css combinators
 * @type RegExp
 */
export const CSS_COMBINATORS_REPLACE_REGEX: RegExp;
/**
 * This regex isolates css id
 * @type RegExp
 * */
export const CSS_ID_MATCH_REGEX: RegExp;
/**
 * This regex isolates classes.
 * This must be ran after any string segments has been removed (attributes)
 * @type RegExp
 */
export const CSS_CLASSES_MATCH_REGEX: RegExp;
/**
 * This regex isolates pseudo-classes
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
 * @type RegExp
 */
export const CSS_PSEUDO_CLASS_MATCH_REGEX: RegExp;
/**
 * This regex isolates tagname in css queries
 * @type RegExp
 */
export const CSS_TAGNAME_MATCH_REGEX: RegExp;
/**
 * This regex isolates attributes
 * @type {RegExp}
 */
export const CSS_ATTRIBUTES_MATCH_REGEX: RegExp;
/**
 * This regex split isolated attributes into its components
 * @type {RegExp}
 */
export const CSS_ATTRIBUTE_COMPONENTS_MATCH_REGEX: RegExp;
