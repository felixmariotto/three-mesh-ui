/**

Contains key maps for the Keyboard component.
Most languages need a specific keyboard. Therefore, Keyboard takes a language attribute
and if not passed tries to detect the language. If not found, it uses the basic QZERTY layout.

 */
export default {

	locales: ['de','de-DE','de-AT','de-LI','de-CH'],
	charsetCount: 1,
	keys:
		[
			[
				[
					{ width: 1 / 11, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'p', upperCase: 'P' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ü', upperCase: 'Ü' } ] }
				],

				[
					{ width: 1 / 11, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ö', upperCase: 'Ö' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ä', upperCase: 'Ä' } ] }
				],

				[
					{ width: 2 / 11, command: 'capslock', chars: [ { icon: 'capslock' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 2 / 11, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],
};
