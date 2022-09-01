
const glob = require('glob');
const fs = require('fs');

const regex = /^.*_.*$/gm;

console.log( __dirname );
const declarations = glob.sync( './build/types/**/*.d.ts' );

console.log( declarations );

for ( const declarationFile of declarations ) {

	const rawContent = fs.readFileSync( declarationFile, 'utf-8' );
	fs.writeFileSync( declarationFile, rawContent.replace(regex,'') );

}
