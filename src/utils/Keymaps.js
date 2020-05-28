
/*

Contains key maps for the Keyboard component.
Most languages need a specific keyboard. Therefore, Keyboard takes a language attribute
and if not passed tries to detect the language. If not found, it uses the basic QZERTY layout.

*/

export default {

	fr:
	[

		[

			[
				{ width: 0.1, chars: [{ lowerCase: "a", upperCase: "A" }] },
				{ width: 0.1, chars: [{ lowerCase: "z", upperCase: "Z" }] },
				{ width: 0.1, chars: [{ lowerCase: "e", upperCase: "E" }] },
				{ width: 0.1, chars: [{ lowerCase: "r", upperCase: "R" }] },
				{ width: 0.1, chars: [{ lowerCase: "t", upperCase: "T" }] },
				{ width: 0.1, chars: [{ lowerCase: "y", upperCase: "Y" }] },
				{ width: 0.1, chars: [{ lowerCase: "u", upperCase: "U" }] },
				{ width: 0.1, chars: [{ lowerCase: "i", upperCase: "I" }] },
				{ width: 0.1, chars: [{ lowerCase: "o", upperCase: "O" }] },
				{ width: 0.1, chars: [{ lowerCase: "p", upperCase: "P" }] }
			],

			[
				{ width: 0.1, chars: [{ lowerCase: "q", upperCase: "Q" }] },
				{ width: 0.1, chars: [{ lowerCase: "s", upperCase: "S" }] },
				{ width: 0.1, chars: [{ lowerCase: "d", upperCase: "D" }] },
				{ width: 0.1, chars: [{ lowerCase: "f", upperCase: "F" }] },
				{ width: 0.1, chars: [{ lowerCase: "g", upperCase: "G" }] },
				{ width: 0.1, chars: [{ lowerCase: "h", upperCase: "H" }] },
				{ width: 0.1, chars: [{ lowerCase: "j", upperCase: "J" }] },
				{ width: 0.1, chars: [{ lowerCase: "k", upperCase: "K" }] },
				{ width: 0.1, chars: [{ lowerCase: "l", upperCase: "L" }] },
				{ width: 0.1, chars: [{ lowerCase: "m", upperCase: "M" }] }
			],

			[
				{ width: 0.2, command: 'shift', chars: [{ icon: "shift" }] },
				{ width: 0.1, chars: [{ lowerCase: "w", upperCase: "W" }] },
				{ width: 0.1, chars: [{ lowerCase: "x", upperCase: "X" }] },
				{ width: 0.1, chars: [{ lowerCase: "c", upperCase: "C" }] },
				{ width: 0.1, chars: [{ lowerCase: "v", upperCase: "V" }] },
				{ width: 0.1, chars: [{ lowerCase: "b", upperCase: "B" }] },
				{ width: 0.1, chars: [{ lowerCase: "n", upperCase: "N" }] },
				{ width: 0.2, command: 'backspace', chars: [{ icon: "cancel" }] }
			],

			[
				{ width: 0.2, command: 'switch', chars: [{ lowerCase: ".?12" }] },
				{ width: 0.1, chars: [{ lowerCase: "," }] },
				{ width: 0.4, command: 'space', chars: [{ icon: "space" }] },
				{ width: 0.1, chars: [{ lowerCase: "." }] },
				{ width: 0.2, command: 'enter', chars: [{ icon: "enter" }] }
			]

		],

		[

			[
				{ width: 0.1, chars: [{ lowerCase: "1" }] },
				{ width: 0.1, chars: [{ lowerCase: "2" }] },
				{ width: 0.1, chars: [{ lowerCase: "3" }] },
				{ width: 0.1, chars: [{ lowerCase: "4" }] },
				{ width: 0.1, chars: [{ lowerCase: "5" }] },
				{ width: 0.1, chars: [{ lowerCase: "6" }] },
				{ width: 0.1, chars: [{ lowerCase: "7" }] },
				{ width: 0.1, chars: [{ lowerCase: "8" }] },
				{ width: 0.1, chars: [{ lowerCase: "9" }] },
				{ width: 0.1, chars: [{ lowerCase: "0" }] }
			],

			[
				{ width: 0.1, chars: [{ lowerCase: "@" }] },
				{ width: 0.1, chars: [{ lowerCase: "#" }] },
				{ width: 0.1, chars: [{ lowerCase: "|" }] },
				{ width: 0.1, chars: [{ lowerCase: "_" }] },
				{ width: 0.1, chars: [{ lowerCase: "&" }] },
				{ width: 0.1, chars: [{ lowerCase: "-" }] },
				{ width: 0.1, chars: [{ lowerCase: "+" }] },
				{ width: 0.1, chars: [{ lowerCase: "(" }] },
				{ width: 0.1, chars: [{ lowerCase: ")" }] },
				{ width: 0.1, chars: [{ lowerCase: "/" }] }
			],

			[
				{ width: 0.1, chars: [{ lowerCase: "=" }] },
				{ width: 0.1, chars: [{ lowerCase: "*" }] },
				{ width: 0.1, chars: [{ lowerCase: '"' }] },
				{ width: 0.1, chars: [{ lowerCase: "'" }] },
				{ width: 0.1, chars: [{ lowerCase: ":" }] },
				{ width: 0.1, chars: [{ lowerCase: ";" }] },
				{ width: 0.1, chars: [{ lowerCase: "!" }] },
				{ width: 0.1, chars: [{ lowerCase: "?" }] },
				{ width: 0.2, command: 'backspace', chars: [{ icon: "backspace" }] }
			],

			[
				{ width: 0.2, command: 'switch', chars: [{ lowerCase: ".?12" }] },
				{ width: 0.1, chars: [{ lowerCase: "," }] },
				{ width: 0.4, command: 'space', chars: [{ icon: "space" }] },
				{ width: 0.1, chars: [{ lowerCase: "." }] },
				{ width: 0.2, command: 'enter', chars: [{ icon: "enter" }] }
			]

		]

	],

	///////////////////////////////////////////////////////////
	/*
	eng:
	[

		[

			[
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
			],

			[
				a: { width: 0.1, upperCase: "A" },
				s: { width: 0.1, upperCase: "S" },
				d: { width: 0.1, upperCase: "D" },
				f: { width: 0.1, upperCase: "F" },
				g: { width: 0.1, upperCase: "G" },
				h: { width: 0.1, upperCase: "H" },
				j: { width: 0.1, upperCase: "J" },
				k: { width: 0.1, upperCase: "K" },
				l: { width: 0.1, upperCase: "L" }
			],

			[
				shift: { width: 0.15, command: 'shift' },
				z: { width: 0.1, upperCase: "Z" },
				x: { width: 0.1, upperCase: "X" },
				c: { width: 0.1, upperCase: "C" },
				v: { width: 0.1, upperCase: "V" },
				b: { width: 0.1, upperCase: "B" },
				n: { width: 0.1, upperCase: "N" },
				m: { width: 0.1, upperCase: "M" },
				cancel: { width: 0.15, command: 'backspace' }
			],

			[
				'.?12': { width: 0.2, command: 'switch' },
				',': { width: 0.1 },
				space: { width: 0.4, command: 'space' },
				'.': { width: 0.1 },
				enter: { width: 0.2, command: 'enter' }
			]

		],

		[

			[
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
			],

			[
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
			],

			[
				'=': { width: 0.1 },
				'*': { width: 0.1 },
				'"': { width: 0.1 },
				"'": { width: 0.1 },
				':': { width: 0.1 },
				';': { width: 0.1 },
				'!': { width: 0.1 },
				'?': { width: 0.1 },
				backspace: { width: 0.2, command: 'backspace' }
			],

			[
				'.?12': { width: 0.2, command: 'switch' },
				',': { width: 0.1 },
				space: { width: 0.4, command: 'space' },
				'.': { width: 0.1 },
				enter: { width: 0.2, command: 'enter' }
			]

		]

	],

	ru:
	[

		[

			[
				й: { width: 1/12, upperCase: "Й" },
				ц: { width: 1/12, upperCase: "Ц" },
				у: { width: 1/12, upperCase: "У" },
				к: { width: 1/12, upperCase: "К" },
				е: { width: 1/12, upperCase: "Е" },
				н: { width: 1/12, upperCase: "Н" },
				г: { width: 1/12, upperCase: "Г" },
				ш: { width: 1/12, upperCase: "Ш" },
				щ: { width: 1/12, upperCase: "Щ" },
				э: { width: 1/12, upperCase: "Э" },
				х: { width: 1/12, upperCase: "Х" },
				ъ: { width: 1/12, upperCase: "Ъ" }
			],

			[
				ф: { width: 1/12, upperCase: "Ф" },
				ы: { width: 1/12, upperCase: "Ы" },
				в: { width: 1/12, upperCase: "В" },
				а: { width: 1/12, upperCase: "А" },
				п: { width: 1/12, upperCase: "П" },
				р: { width: 1/12, upperCase: "Р" },
				о: { width: 1/12, upperCase: "О" },
				л: { width: 1/12, upperCase: "Л" },
				д: { width: 1/12, upperCase: "Д" },
				ж: { width: 1/12, upperCase: "Ж" },
				з: { width: 1/12, upperCase: "З" },
				ё: { width: 1/12, upperCase: "Ё" }
			],

			[
				shift: { width: 1.5/12, command: 'shift' },
				я: { width: 1/12, upperCase: "Я" },
				ч: { width: 1/12, upperCase: "Ч" },
				с: { width: 1/12, upperCase: "С" },
				м: { width: 1/12, upperCase: "М" },
				и: { width: 1/12, upperCase: "И" },
				т: { width: 1/12, upperCase: "Т" },
				ь: { width: 1/12, upperCase: "Ь" },
				б: { width: 1/12, upperCase: "Б" },
				ю: { width: 1/12, upperCase: "Ю" },
				cancel: { width: 1.5/12, command: 'backspace' }
			],

			[
				'eng': { width: 0.15, command: 'switch-set' },
				'.?12': { width: 0.15, command: 'switch' },
				space: { width: 0.4, command: 'space' },
				'.': { width: 0.1 },
				enter: { width: 0.2, command: 'enter' }
			]

		],

		[

			[
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
			],

			[
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
			],

			[
				'=': { width: 0.1 },
				'*': { width: 0.1 },
				'"': { width: 0.1 },
				"'": { width: 0.1 },
				':': { width: 0.1 },
				';': { width: 0.1 },
				'!': { width: 0.1 },
				'?': { width: 0.1 },
				backspace: { width: 0.2, command: 'backspace' }
			],

			[
				'АБВ': { width: 0.3, command: 'switch' },
				space: { width: 0.4, command: 'space' },
				'.': { width: 0.1 },
				enter: { width: 0.2, command: 'enter' }
			]

		]

	]
	*/

}