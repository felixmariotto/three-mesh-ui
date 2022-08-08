import Element from './Element';
import StyleProperty from '../properties/StyleProperty';
import BoundsProperty from '../properties/BoundsProperty';
import FontProperty from '../properties/FontProperty';
import TextContentProperty from '../properties/TextContentProperty';
import GlyphsProperty from '../properties/GlyphsProperty';
import InlinesProperty from '../properties/InlinesProperty';
import LineBreakProperty from '../properties/LineBreakProperty';
import InlineManager from '../properties/InlineManager';
import InlineJustificator from '../properties/InlineJustificator';
import BoxManager from '../properties/BoxManager';
import UpdateManager from '../../components/core/UpdateManager';
import Background from '../properties/Background';


export default class ElementVR extends Element {

	constructor() {

		super();

		this._bounds = new BoundsProperty();
		// styles;
		this._styles = new StyleProperty();

		this._font = new FontProperty();

		this._lineBreak = new LineBreakProperty();

		this._textContent = new TextContentProperty();

		this._glyphs = new GlyphsProperty();

		this._inlines = new InlinesProperty();
		this._inlineManager = new InlineManager();
		this._inlineJustificator = new InlineJustificator();

		this._boxManager = new BoxManager();

		this._background = new Background();

		this._components.push(
			this._bounds,

			this._styles,

			this._font,

			this._lineBreak,

			this._textContent,

			this._glyphs,

			this._inlines,

			this._background,

			this._inlineManager,

			this._boxManager
		)

		UpdateManager.register7xx( this );

	}

	forceOutput() {

		const out = {};
		for ( const component of this._components ) {

			component.update( this, out );
			component._needsUpdate = false;

		}

		console.log( "forced output", out );

		this._transferToMaterial( out );

	}

	/**
	 *
	 * @return {StyleProperty}
	 */
	get style() { return this._styles; }

	/**
	 *
	 * @return {number}
	 */
	get offsetWidth() { return this._bounds._offsetWidth; }

	/**
	 *
	 * @return {number}
	 */
	get offsetHeight () { return this._bounds._offsetHeight; }

	/**
	 *
	 * @return {number}
	 */
	get innerWidth () { return this._bounds._innerWidth; }

	/**
	 *
	 * @return {number}
	 */
	get innerHeight () { return this._bounds._innerHeight; }

	/**
	 *
	 * @return {number}
	 */
	get centerX() { return this._bounds._centerX; }

	/**
	 *
	 * @return {number}
	 */
	get centerY () { return this._bounds._centerY; }

	/**
	 *
	 * @param {string} v
	 */
	set textContent ( v ) {

		this._textContent.value = v;
		this._needsUpdate = true;

	}

	/**
	 *
	 * @return {string}
	 */
	get textContent () {

		return this._textContent.value + " " +  this._children.childrenUIs.map( child => child.textContent ).join( " " );

	}

	/**
	 *
	 * @return {Lines}
	 */
	get lines() {

		return this._inlineManager.value;

	}

	clear() {

		super.clear();

		this._styles.dispose();
		this._styles = null;

		this._bounds = null;

		this._font.dispose();
		this._font = null;

		return this;
	}

}


