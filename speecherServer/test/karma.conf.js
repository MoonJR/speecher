// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-10-12 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'public/components/angular/angular.js',
      'public/components/angular-animate/angular-animate.js',
      'public/components/angular-cookies/angular-cookies.js',
      'public/components/angular-resource/angular-resource.js',
      'public/components/angular-route/angular-route.js',
      'public/components/angular-sanitize/angular-sanitize.js',
      'public/components/angular-touch/angular-touch.js',
      'public/components/angular-mocks/angular-mocks.js',
      'public/components/angular-material/angular-material.js',
      'public/components/angular-aria/angular-aria.js',
      // endbower
      "public/angularjs/*.js",
      //"test/mock/**/*.js",
      "test/angularjs/*.js",

      '/.../bower_components/angular-aria/angular-aria.js',
      '/.../bower_components/angular-material/.js',


    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
      "karma-coverage"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'public/angularjs/*.js' : ['coverage']
    },

    coverageReporter: {
      dir: 'reports/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'text', subdir: '.', file: 'coverage.txt' },
        { type: 'text-summary', subdir: '.', file: 'coverage-summary.txt' },
        { type: 'cobertura', subdir: '.', file: 'coverage-cobertura.xml' },
      ]
    },

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
