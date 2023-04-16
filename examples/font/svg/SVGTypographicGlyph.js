import { TypographicGlyph } from 'three-mesh-ui';
import { Shape, ShapePath, Vector2 } from 'three';
import SVGInlineGlyph from './SVGInlineGlyph';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';


export default class SVGTypographicGlyph extends TypographicGlyph {

	/**
	 *
	 * @param {SVGTypographicFont} fontDescription
	 * @param {SVGElement|{char:string,xadvance:number}} svgElement
	 */
	constructor( fontDescription, svgElement ) {

		super( fontDescription );

		this._width = fontDescription.size;
		this._heigth = fontDescription.lineBase;

		if ( svgElement.char ) {

			this._char = svgElement.char;
			this._xadvance = svgElement.xadvance;
			this._shapePath = new Shape()
				.moveTo( 0, 0 )
				.lineTo( 0, this._heigth )
				.lineTo( this._width, this._heigth )
				.lineTo( this._width, 0 )
				.lineTo( 0, 0 );

		} else {

			this._char = svgElement.getAttribute('unicode');

			if( svgElement.hasAttribute('horiz-adv-x') ) {

				this._xadvance = parseFloat( svgElement.getAttribute( 'horiz-adv-x' ) ) / fontDescription.divisor;

			} else {

				this._xadvance = fontDescription.xadvance / fontDescription.divisor;

			}

			this._yoffset = this.height/2;

			const paths = _transformSVGPath( svgElement.getAttribute('d') );
			// this._shapePath = paths.toShapes( ShapeUtils.isClockWise( paths.subPaths[0].getPoints()));
			this._shapePath = SVGLoader.createShapes( paths );

		}

	}

	/**
	 *
	 * @return {ShapePath|Shape}
	 */
	get shape() { return this._shapePath; }

	/**
	 * @override
	 * @returns {SVGInlineGlyph}
	 */
	asInlineGlyph() {

		return new SVGInlineGlyph( this );

	}

}


// From d3-threeD.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
const DEGS_TO_RADS = Math.PI / 180;
const DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46, MINUS = 45;

/**
 *
 * @param pathStr
 * @return {ShapePath}
 * @private
 */
function _transformSVGPath( pathStr ) {

	const path = new ShapePath();

	let idx = 1, activeCmd,
		x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
		x1 = 0, x2 = 0, y1 = 0, y2 = 0,
		rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;

	const len = pathStr.length;

	function eatNum() {

		let sidx, c, isFloat = false, s;

		// eat delims

		while ( idx < len ) {

			c = pathStr.charCodeAt( idx );

			if ( c !== COMMA && c !== SPACE ) break;

			idx++;

		}

		if ( c === MINUS ) {

			sidx = idx++;

		} else {

			sidx = idx;

		}

		// eat number

		while ( idx < len ) {

			c = pathStr.charCodeAt( idx );

			if ( DIGIT_0 <= c && c <= DIGIT_9 ) {

				idx++;
				continue;

			} else if ( c === PERIOD ) {

				idx++;
				isFloat = true;
				continue;

			}

			s = pathStr.substring( sidx, idx );
			return isFloat ? parseFloat( s ) : parseInt( s );

		}

		s = pathStr.substring( sidx );
		return isFloat ? parseFloat( s ) : parseInt( s );

	}

	function nextIsNum() {

		let c;

		// do permanently eat any delims...

		while ( idx < len ) {

			c = pathStr.charCodeAt( idx );

			if ( c !== COMMA && c !== SPACE ) break;

			idx++;

		}

		c = pathStr.charCodeAt( idx );
		return ( c === MINUS || ( DIGIT_0 <= c && c <= DIGIT_9 ) );

	}

	let canRepeat;
	activeCmd = pathStr[ 0 ];

	while ( idx <= len ) {

		canRepeat = true;

		switch ( activeCmd ) {

			// moveto commands, become lineto's if repeated
			case 'M':
				x = eatNum();
				y = eatNum();
				path.moveTo( x, y );
				activeCmd = 'L';
				firstX = x;
				firstY = y;
				break;

			case 'm':
				x += eatNum();
				y += eatNum();
				path.moveTo( x, y );
				activeCmd = 'l';
				firstX = x;
				firstY = y;
				break;

			case 'Z':
			case 'z':
				canRepeat = false;
				if ( x !== firstX || y !== firstY ) path.lineTo( firstX, firstY );
				break;

			// - lines!
			case 'L':
			case 'H':
			case 'V':
				nx = ( activeCmd === 'V' ) ? x : eatNum();
				ny = ( activeCmd === 'H' ) ? y : eatNum();
				path.lineTo( nx, ny );
				x = nx;
				y = ny;
				break;

			case 'l':
			case 'h':
			case 'v':
				nx = ( activeCmd === 'v' ) ? x : ( x + eatNum() );
				ny = ( activeCmd === 'h' ) ? y : ( y + eatNum() );
				path.lineTo( nx, ny );
				x = nx;
				y = ny;
				break;

			// - cubic bezier
			case 'C':
				x1 = eatNum();
				y1 = eatNum();
			//fallthrough

			case 'S':
				if ( activeCmd === 'S' ) {

					x1 = 2 * x - x2;
					y1 = 2 * y - y2;

				}

				x2 = eatNum();
				y2 = eatNum();
				nx = eatNum();
				ny = eatNum();
				path.bezierCurveTo( x1, y1, x2, y2, nx, ny );
				x = nx;
				y = ny;
				break;

			case 'c':
				x1 = x + eatNum();
				y1 = y + eatNum();
			//fallthrough

			case 's':
				if ( activeCmd === 's' ) {

					x1 = 2 * x - x2;
					y1 = 2 * y - y2;

				}

				x2 = x + eatNum();
				y2 = y + eatNum();
				nx = x + eatNum();
				ny = y + eatNum();
				path.bezierCurveTo( x1, y1, x2, y2, nx, ny );
				x = nx;
				y = ny;
				break;

			// - quadratic bezier
			case 'Q':
				x1 = eatNum();
				y1 = eatNum();
			//fallthrough

			case 'T':
				if ( activeCmd === 'T' ) {

					x1 = 2 * x - x1;
					y1 = 2 * y - y1;

				}

				nx = eatNum();
				ny = eatNum();
				path.quadraticCurveTo( x1, y1, nx, ny );
				x = nx;
				y = ny;
				break;

			case 'q':
				x1 = x + eatNum();
				y1 = y + eatNum();
			//fallthrough

			case 't':
				if ( activeCmd === 't' ) {

					x1 = 2 * x - x1;
					y1 = 2 * y - y1;

				}

				nx = x + eatNum();
				ny = y + eatNum();
				path.quadraticCurveTo( x1, y1, nx, ny );
				x = nx;
				y = ny;
				break;

			// - elliptical arc
			case 'A':
				rx = eatNum();
				ry = eatNum();
				xar = eatNum() * DEGS_TO_RADS;
				laf = eatNum();
				sf = eatNum();
				nx = eatNum();
				ny = eatNum();
				if ( rx !== ry ) console.warn( 'Forcing elliptical arc to be a circular one:', rx, ry );

				// SVG implementation notes does all the math for us! woo!
				// http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes

				// step1, using x1 as x1'

				x1 = Math.cos( xar ) * ( x - nx ) / 2 + Math.sin( xar ) * ( y - ny ) / 2;
				y1 = -Math.sin( xar ) * ( x - nx ) / 2 + Math.cos( xar ) * ( y - ny ) / 2;

				// step 2, using x2 as cx'

				let norm = Math.sqrt( ( rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1 ) /
					( rx * rx * y1 * y1 + ry * ry * x1 * x1 ) );

				if ( laf === sf ) norm = -norm;

				x2 = norm * rx * y1 / ry;
				y2 = norm * -ry * x1 / rx;

				// step 3

				cx = Math.cos( xar ) * x2 - Math.sin( xar ) * y2 + ( x + nx ) / 2;
				cy = Math.sin( xar ) * x2 + Math.cos( xar ) * y2 + ( y + ny ) / 2;

				const u = new Vector2( 1, 0 );
				const v = new Vector2( ( x1 - x2 ) / rx, ( y1 - y2 ) / ry );

				let startAng = Math.acos( u.dot( v ) / u.length() / v.length() );

				if ( ( ( u.x * v.y ) - ( u.y * v.x ) ) < 0 ) startAng = -startAng;

				// we can reuse 'v' from start angle as our 'u' for delta angle
				u.x = ( -x1 - x2 ) / rx;
				u.y = ( -y1 - y2 ) / ry;

				let deltaAng = Math.acos( v.dot( u ) / v.length() / u.length() );

				// This normalization ends up making our curves fail to triangulate...

				if ( ( ( v.x * u.y ) - ( v.y * u.x ) ) < 0 ) deltaAng = -deltaAng;
				if ( !sf && deltaAng > 0 ) deltaAng -= Math.PI * 2;
				if ( sf && deltaAng < 0 ) deltaAng += Math.PI * 2;

				path.absarc( cx, cy, rx, startAng, startAng + deltaAng, sf );
				x = nx;
				y = ny;
				break;

			default:
				if( activeCmd.length === 1 && activeCmd.charCodeAt(0) === SPACE ) {

					// allows that case, it could comes from untrimmed data value

				}
				else {
					throw new Error( 'Wrong path command: ' + activeCmd.charCodeAt(0),  );
				}


		}

		// just reissue the command

		if ( canRepeat && nextIsNum() ) continue;

		activeCmd = pathStr[ idx++ ];

	}

	return path;

}


