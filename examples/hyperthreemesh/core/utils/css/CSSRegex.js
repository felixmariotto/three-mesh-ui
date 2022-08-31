/* eslint-disable no-useless-escape */

/**
 * This regex can isolate string parts of css queries
 * 		ie: `.my-class[data-foo="foobar is a string segment"]`
 *
 * @type RegExp
 */
export const STRING_SEGMENTS_REGEX = /((?:")([^"]*)(?:"))/g;

/**
 * This regex can split a CSS Combinator and the following query segment
 * @see https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators
 *
 * @type RegExp
 */
export const CSS_COMBINATORS_MATCH_REGEX = /([ >~+]*)([^+>~ ]+)/g;

/**
 * This regex isolates css combinators
 * @type RegExp
 */
export const CSS_COMBINATORS_REPLACE_REGEX = /^[ >~+]+/;

/**
 * This regex isolates css id
 * @type RegExp
 * */
export const CSS_ID_MATCH_REGEX = /(#)([\w_-]+)/;

/**
 * This regex isolates classes.
 * This must be ran after any string segments has been removed (attributes)
 * @type RegExp
 */
export const CSS_CLASSES_MATCH_REGEX = /(\.)([\w_-]+)/g;

/**
 * This regex isolates pseudo-classes
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
 * @type RegExp
 */
export const CSS_PSEUDO_CLASS_MATCH_REGEX = /(:)([A-z0-9\-_]*)/g;

/**
 * This regex isolates tagname in css queries
 * @type RegExp
 */
export const CSS_TAGNAME_MATCH_REGEX = /^[^#\.:\[]*/g;

/**
 * This regex isolates attributes
 * @type {RegExp}
 */
export const CSS_ATTRIBUTES_MATCH_REGEX = /(\[([^\]]*)\])/g;

/**
 * This regex split isolated attributes into its components
 * @type {RegExp}
 */
export const CSS_ATTRIBUTE_COMPONENTS_MATCH_REGEX = /([^*~$^=]+)(([*~$^]?=)(.*))?/;
/* eslint-enable no-useless-escape */
