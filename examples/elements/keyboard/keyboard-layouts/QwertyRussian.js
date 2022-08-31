/**

Contains key maps for the Keyboard component.
Most languages need a specific keyboard. Therefore, Keyboard takes a language attribute
and if not passed tries to detect the language. If not found, it uses the basic QZERTY layout.

 */
export default {
	locales : ['ru'],
	charsetCount: 2,
	keys:
		[
			[
				[
					{ width: 1 / 12, chars: [ { lowerCase: 'й', upperCase: 'Й' }, { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ц', upperCase: 'Ц' }, { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'у', upperCase: 'У' }, { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'к', upperCase: 'К' }, { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'е', upperCase: 'Е' }, { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'н', upperCase: 'Н' }, { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'г', upperCase: 'Г' }, { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ш', upperCase: 'Ш' }, { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'щ', upperCase: 'Щ' }, { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'з', upperCase: 'З' }, { lowerCase: 'p', upperCase: 'P' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'х', upperCase: 'Х' }, { lowerCase: '{', upperCase: '[' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ъ', upperCase: 'Ъ' }, { lowerCase: '}', upperCase: ']' } ] }
				],

				[
					{ width: 1 / 12, chars: [ { lowerCase: 'ф', upperCase: 'Ф' }, { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ы', upperCase: 'Ы' }, { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'в', upperCase: 'В' }, { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'а', upperCase: 'А' }, { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'п', upperCase: 'П' }, { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'р', upperCase: 'Р' }, { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'о', upperCase: 'О' }, { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'л', upperCase: 'Л' }, { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'д', upperCase: 'Д' }, { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ж', upperCase: 'Ж' }, { lowerCase: ':', upperCase: ';' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'э', upperCase: 'Э' }, { lowerCase: '"', upperCase: '\'' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ё', upperCase: 'Ё' }, { lowerCase: '|', upperCase: '\\' } ] }
				],

				[
					{ width: 1.5 / 12, command: 'capslock', chars: [ { icon: 'capslock' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'я', upperCase: 'Я' }, { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ч', upperCase: 'Ч' }, { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'с', upperCase: 'С' }, { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'м', upperCase: 'М' }, { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'и', upperCase: 'И' }, { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'т', upperCase: 'Т' }, { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ь', upperCase: 'Ь' }, { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'б', upperCase: 'Б' }, { lowerCase: ',', upperCase: '' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ю', upperCase: 'Ю' }, { lowerCase: '.', upperCase: '' } ] },
					{ width: 1.5 / 12, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.15, command: 'switch-set', chars: [ { lowerCase: 'eng' } ] },
					{ width: 0.15, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
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
					{ width: 0.3, command: 'switch', chars: [ { lowerCase: 'АБВ' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],
};
