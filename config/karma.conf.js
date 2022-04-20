const path = require('path');

module.exports = function ( config ) {
	config.set( {
		frameworks: [ 'mocha', 'chai' ],
		files: [
			"./node_modules/three/build/three.min.js",
			"./build/three-mesh-ui.min.js",
			{ pattern: './examples/assets/**', included:false, served:true },
			{ pattern: './tests/**/*.js', type:"module", watched: false },
		],
		basePath: "../",
		reporters: [ 'mocha' , 'coverage-istanbul' ],
		preprocessors: {
			"./build/**/*.js": ["karma-coverage-istanbul-instrumenter"],
			"./src/**/*.js": ["karma-coverage-istanbul-instrumenter"],
		},

		coverageIstanbulInstrumenter: {
			esModules: true
		},

		coverageIstanbulReporter: {
			reports: [ "text" ],
		},
		port: 9876,  // karma web server port
		colors: true,
		logLevel: config.LOG,
		browsers: [ 'ChromeHeadless' ],
		autoWatch: false,
		concurrency: Infinity
	} );
};
