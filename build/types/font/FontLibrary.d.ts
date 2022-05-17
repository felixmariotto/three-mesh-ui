export default FontLibrary;
declare namespace FontLibrary {
    export { addFontFamily };
    export { getFontFamily };
    export { prepare };
    export { setMissingCharacterHandler };
    export { missingCharacter };
}
/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
declare function addFontFamily(name: string): FontFamily;
/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
declare function getFontFamily(name: string): FontFamily;
/**
 *
 * @param {FontFamily} fontFamily
 * @returns {Promise<unknown>}
 */
declare function prepare(fontFamily: FontFamily, ...args: any[]): Promise<unknown>;
/**
 *
 * @param { (fontVariant:FontVariant, character:string ) => string|null } handler
 */
declare function setMissingCharacterHandler(handler: (fontVariant: FontVariant, character: string) => string | null): void;
/**
 *
 * @param {FontVariant} fontVariant
 * @param {string} character
 *
 * @returns {string}
 */
declare function missingCharacter(fontVariant: FontVariant, character: string): string;
import FontFamily from "./FontFamily";
import FontVariant from "./FontVariant";
