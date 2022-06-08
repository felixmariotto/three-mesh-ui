const path = require('path');
const { LOG_DEBUG } = require( 'karma/lib/constants' );

module.exports = function ( config ) {

	// allows tests on specific files
	const specFiles = config.specs ? config.specs : './tests/specs/**/*.js';

	config.set( {
		frameworks: [ 'mocha', 'chai' ],
		files: [
			"./node_modules/three/build/three.min.js",
			{ pattern: "./build/three-mesh-ui.js", watched: true },
			{ pattern: './examples/assets/**', included: false, served: true },
			{ pattern: specFiles, watched: true, type: "module" },
			{ pattern: './tests/utils/**/*.js', watched: true, included: false },
		],
		basePath: "../",
		reporters: [ 'mocha', 'coverage-istanbul' ],
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
		// logLevel: config.LOG,
		browsers: [ 'Chrome', 'ChromeHeadless' ],
		autoWatch: true,
		concurrency: Infinity
	} );
};
