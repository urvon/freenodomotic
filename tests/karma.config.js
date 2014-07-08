// Karma configuration
// Generated on Tue Jul 01 2014 14:24:55 GMT+0200 (Paris, Madrid (heure d’été))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [      
	  '../public/js/lib/angular/angular.js',
	  '../public/js/lib/angular/angular-route.js',	  
	  '../public/js/lib/angular/angular-resource.js',
	  '../public/js/lib/angular/angular-cookies.js',
	  '../public/js/lib/angular/angular-mocks.js',
	  '../public/js/lib/angular/ng-context-menu.js',
	  '../public/js/lib/stomp.js',
	  '../public/js/lib/socket.io.js',
	  '../public/js/lib/angular/angular-stomp.js',
	  'http://cdn.sockjs.org/sockjs-0.3.min.js',
	  '../public/bootstrap/js/ui-bootstrap-tpls-0.11.0.js',
	  '../public/js/lib/angular/angular-draganddrop.js',
	  '../public/js/lib/jquery/jquery-2.0.3.min.js',
	  '../public/bootstrap/js/bootstrap.min.js',
	  '../public/js/app.js',
	  '../public/js/services.js',
	  '../public/js/controllers.js',
	  '../public/js/filters.js',
	  '../public/js/directives.js',
	  '../public/js/dashboard.js',
	  '../public/js/triggers.js',
	  '../public/js/commands.js',
	  'commands.test.js'
    ],


    // list of files to exclude
    exclude: [
		/*'../public/js/lib/angular/angular-animate.js',
		'../public/js/lib/angular/angular-animate.min.js',
		'../public/js/lib/angular/angular-cookies.js',
		//'../public/js/lib/angular/angular-cookies.min.js',
		'../public/js/lib/angular/angular-sanitize.min.js',
		'../public/js/lib/angular/angular-sanitize.js'*/
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
