
/*

Contains key maps for the Keyboard component.
Most languages need a specific keyboard. Therefore, Keyboard takes a language attribute
and if not passed tries to detect the language. If not found, it uses the basic QZERTY layout.

*/

export default {

	fr:
	[

		[

			{
				a: { width: 0.1, upperCase: "A" },
				z: { width: 0.1, upperCase: "Z" },
				e: { width: 0.1, upperCase: "E" },
				r: { width: 0.1, upperCase: "R" },
				t: { width: 0.1, upperCase: "T" },
				y: { width: 0.1, upperCase: "Y" },
				u: { width: 0.1, upperCase: "U" },
				i: { width: 0.1, upperCase: "I" },
				o: { width: 0.1, upperCase: "O" },
				p: { width: 0.1, upperCase: "P" }
			},

			{
				q: { width: 0.1, upperCase: "Q" },
				s: { width: 0.1, upperCase: "S" },
				d: { width: 0.1, upperCase: "D" },
				f: { width: 0.1, upperCase: "F" },
				g: { width: 0.1, upperCase: "G" },
				h: { width: 0.1, upperCase: "H" },
				j: { width: 0.1, upperCase: "J" },
				k: { width: 0.1, upperCase: "K" },
				l: { width: 0.1, upperCase: "L" },
				m: { width: 0.1, upperCase: "M" }
			},

			{
				shift: { width: 0.2, command: 'shift' },
				w: { width: 0.1, upperCase: "W" },
				x: { width: 0.1, upperCase: "X" },
				c: { width: 0.1, upperCase: "C" },
				v: { width: 0.1, upperCase: "V" },
				b: { width: 0.1, upperCase: "B" },
				n: { width: 0.1, upperCase: "N" },
				cancel: { width: 0.2, command: 'backspace' }
			},

			{
				'.?12': { width: 0.2, command: 'switch' },
				',': { width: 0.1 },
				space: { width: 0.4, command: 'space' },
				'.': { width: 0.1 },
				enter: { width: 0.2, command: 'enter' }
			}

		],

		[

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
				backspace: { width: 0.2, command: 'backspace' }
			},

			{
				'.?12': { width: 0.2, command: 'switch' },
				',': { width: 0.1 },
				space: { width: 0.4, command: 'space' },
				'.': { width: 0.1 },
				enter: { width: 0.2, command: 'enter' }
			}

		]

	],

	eng:
	[

		[

			{
				q: { width: 0.1, upperCase: "Q" },
				w: { width: 0.1, upperCase: "W" },
				e: { width: 0.1, upperCase: "E" },
				r: { width: 0.1, upperCase: "R" },
				t: { width: 0.1, upperCase: "T" },
				y: { width: 0.1, upperCase: "Y" },
				u: { width: 0.1, upperCase: "U" },
				i: { width: 0.1, upperCase: "I" },
				o: { width: 0.1, upperCase: "O" },
				p: { width: 0.1, upperCase: "P" }
			},

			{
				a: { width: 0.1, upperCase: "A" },
				s: { width: 0.1, upperCase: "S" },
				d: { width: 0.1, upperCase: "D" },
				f: { width: 0.1, upperCase: "F" },
				g: { width: 0.1, upperCase: "G" },
				h: { width: 0.1, upperCase: "H" },
				j: { width: 0.1, upperCase: "J" },
				k: { width: 0.1, upperCase: "K" },
				l: { width: 0.1, upperCase: "L" }
			},

			{
				shift: { width: 0.15, command: 'shift' },
				w: { width: 0.1, upperCase: "Z" },
				x: { width: 0.1, upperCase: "X" },
				c: { width: 0.1, upperCase: "C" },
				v: { width: 0.1, upperCase: "V" },
				b: { width: 0.1, upperCase: "B" },
				n: { width: 0.1, upperCase: "N" },
				m: { width: 0.1, upperCase: "M" },
				cancel: { width: 0.15, command: 'backspace' }
			},

			{
				'.?12': { width: 0.2, command: 'switch' },
				',': { width: 0.1 },
				space: { width: 0.4, command: 'space' },
				'.': { width: 0.1 },
				enter: { width: 0.2, command: 'enter' }
			}

		],

		[

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
				backspace: { width: 0.2, command: 'backspace' }
			},

			{
				'.?12': { width: 0.2, command: 'switch' },
				',': { width: 0.1 },
				space: { width: 0.4, command: 'space' },
				'.': { width: 0.1 },
				enter: { width: 0.2, command: 'enter' }
			}

		]

	]

}