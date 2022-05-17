/**
 * Check the validity of a whitespace
 * @param value
 * @returns {string}
 */
export function isValid(value: any): string;
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace#whitespace_helper_functions
 *
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use Javascript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 **/
export const WHITE_CHARS: {
    '\t': string;
    '\n': string;
    '\r': string;
    ' ': string;
};
export const NORMAL: "normal";
export const NOWRAP: "nowrap";
export const PRE: "pre";
export const PRE_LINE: "pre-line";
export const PRE_WRAP: "pre-wrap";
export function collapseWhitespaceOnString(textContent: any, whiteSpace: any): any;
export function newlineBreakability(whiteSpace: any): string | null;
export function shouldBreak(inlines: any, i: any, lastInlineOffset: any, options: any): boolean;
export function collapseWhitespaceOnInlines(line: any, whiteSpace: ('normal' | 'pre-wrap' | 'pre-line')): any;
