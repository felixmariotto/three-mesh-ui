
/*

Contains key maps for the Keyboard component.
Most languages need a specific keyboard. Therefore, Keyboard takes a language attribute
and if not passed tries to detect the language. If not found, it uses the basic QZERTY layout.

*/

export default {

	fr: {

		letters: [

			{
				a: { width: 0.1 },
				z: { width: 0.1 },
				e: { width: 0.1 },
				r: { width: 0.1 },
				t: { width: 0.1 },
				y: { width: 0.1 },
				u: { width: 0.1 },
				i: { width: 0.1 },
				o: { width: 0.1 },
				p: { width: 0.1 }
			},

			{
				q: { width: 0.1 },
				s: { width: 0.1 },
				d: { width: 0.1 },
				f: { width: 0.1 },
				g: { width: 0.1 },
				h: { width: 0.1 },
				j: { width: 0.1 },
				k: { width: 0.1 },
				l: { width: 0.1 },
				m: { width: 0.1 }
			},

			{
				shift: { width: 0.2 },
				w: { width: 0.1 },
				x: { width: 0.1 },
				c: { width: 0.1 },
				v: { width: 0.1 },
				b: { width: 0.1 },
				n: { width: 0.1 },
				backspace: { width: 0.2 }
			},

			{
				'.?12': { width: 0.2 },
				',': { width: 0.1 },
				space: { width: 0.4 },
				'.': { width: 0.1 },
				enter: { width: 0.2 }
			}

		],

		symbols: [

			{
				'1': { width: 0.1 },
				'2': { width: 0.1 },
				'3': { width: 0.1 },
				'4': { width: 0.1 },
				'5': { width: 0.1 },
				'6': { width: 0.1 },
				'7': { width: 0.1 },
				'8': { width: 0.1 },
				'9': { width: 0.1 },
				'0': { width: 0.1 }
			},

			{
				'@': { width: 0.1 },
				'#': { width: 0.1 },
				'|': { width: 0.1 },
				'_': { width: 0.1 },
				'&': { width: 0.1 },
				'-': { width: 0.1 },
				'+': { width: 0.1 },
				'(': { width: 0.1 },
				')': { width: 0.1 },
				'/': { width: 0.1 },
			},

			{
				'=': { width: 0.1 },
				'*': { width: 0.1 },
				'"': { width: 0.1 },
				"'": { width: 0.1 },
				':': { width: 0.1 },
				';': { width: 0.1 },
				'!': { width: 0.1 },
				'?': { width: 0.1 },
				backspace: { width: 0.2 }
			},

			{
				'.?12': { width: 0.2 },
				',': { width: 0.1 },
				space: { width: 0.4 },
				'.': { width: 0.1 },
				enter: { width: 0.2 }
			}

		]

	}

}