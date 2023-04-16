/**

Contains key maps for the Keyboard component.
Most languages need a specific keyboard. Therefore, Keyboard takes a language attribute
and if not passed tries to detect the language. If not found, it uses the basic QZERTY layout.

 */
export default {
	locales: [ 'en', 'en-GB', 'en-US' ],
	charsetCount: 1,
	keys:
		[
			[
				[
					{ width: 0.1, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 0.1, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'p', upperCase: 'P' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 0.1, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'l', upperCase: 'L' } ] }
				],

				[
					{ width: 0.15, command: 'capslock', chars: [ { icon: 'capslock' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 0.15, command: 'backspace', chars: [ { icon: 'backspace' } ] }
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
